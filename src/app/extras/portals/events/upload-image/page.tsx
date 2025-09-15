import fs from "fs";
import path from "path";
import { redirect } from "next/navigation";
import BackButton from "@/components/BackButton";
import { UploadPreview } from "@/components/eventPortal/UploadPreview";

const SUPPORTED_FORMATS = [".png", ".jpg", ".jpeg", ".webp", ".gif"];
const SUPPORTED_MIME_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif"];

function listEventImages(): string[] {
  const dir = path.join(process.cwd(), "public", "events");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => !f.startsWith("."))
      .filter((f) => /(png|jpe?g|webp|gif)$/i.test(f))
      .map((f) => `/events/${f}`);
  } catch (error) {
    console.error("Failed to read events directory:", error);
    return [];
  }
}

const UPLOAD_MAX_MB = Number(process.env.UPLOAD_MAX_MB ?? "10");
const UPLOAD_MAX_BYTES = UPLOAD_MAX_MB * 1024 * 1024;

function validateImageFile(file: File): string | null {
  if (!file) return "No file provided";

  if (file.size > UPLOAD_MAX_BYTES) {
    return `File size must be less than ${UPLOAD_MAX_MB}MB`;
  }

  if (!SUPPORTED_MIME_TYPES.includes(file.type.toLowerCase())) {
    return `Unsupported file type: ${file.type}. Supported formats: PNG, JPG, JPEG, WebP, GIF`;
  }

  const ext = path.extname(file.name).toLowerCase();
  if (!SUPPORTED_FORMATS.includes(ext)) {
    return `Unsupported file extension: ${ext}. Supported formats: ${SUPPORTED_FORMATS.join(", ")}`;
  }

  return null;
}

async function upload(formData: FormData) {
  "use server";

  try {
    const file = formData.get("file") as File | null;

    const validationError = validateImageFile(file!);
    if (validationError) {
      console.error("File validation error:", validationError);
      return;
    }

    const bytes = await file!.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const destDir = path.join(process.cwd(), "public", "events");

    try {
      fs.mkdirSync(destDir, { recursive: true });
    } catch (dirError) {
      console.error("Failed to create directory:", dirError);
      return;
    }

    const safeName = file!.name.replace(/[^a-z0-9._-]/gi, "_").replace(/_{2,}/g, "_");

    const filePath = path.join(destDir, safeName);

    try {
      fs.writeFileSync(filePath, buffer);
      console.log(`Successfully uploaded file: ${safeName}`);
    } catch (writeError) {
      console.error("Failed to write file:", writeError);
      return;
    }
  } catch (error) {
    console.error("Upload error:", error);
    return;
  }

  redirect("/extras/portals/events/add");
}

export default function UploadImagePage() {
  const images = listEventImages();
  return (
    <div className="space-y-6 animate-fade-in">
      <BackButton href="/extras/portals/events/menu" />

      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-[var(--blue)] mb-2">Upload Event Image</h1>
        <p className="text-[var(--navy)]/80">Add new images for your events</p>
      </div>

      <UploadPreview images={images} />

      <div className="max-w-lg mx-auto">
        <div className="border border-gray-200 rounded-lg p-6 bg-white/70 backdrop-blur">
          <div className="mb-4">
            <h3 className="font-semibold text-[var(--navy)]">Upload New Image</h3>
            <p className="text-sm text-[var(--navy)]/70">
              Choose a high‑quality image for your event
            </p>
          </div>

          <form action={upload} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[var(--navy)] mb-2">
                Select Image File
              </label>
              <input
                type="file"
                name="file"
                required
                accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
                className="block w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-[var(--blue)] focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[color:var(--blue)]/10 file:text-[color:var(--navy)] hover:file:bg-[color:var(--blue)]/20"
              />
              <div className="mt-2 text-xs text-[var(--navy)]/70 space-y-1">
                <p>Accepted formats: PNG, JPG, JPEG, WebP, GIF</p>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <a href="/extras/portals/events/add" className="btn-cozy btn-outline flex-1">
                Cancel
              </a>
              <button className="btn-cozy btn-primary flex-1" type="submit">
                Upload & Continue
              </button>
            </div>
          </form>
        </div>

        {images.length > 0 && (
          <div className="mt-6 p-4 bg-white/70 border border-gray-200 rounded-lg">
            <h4 className="font-semibold text-[var(--navy)] mb-2">
              Current Images ({images.length})
            </h4>
            <div className="grid grid-cols-3 gap-2 text-xs text-[var(--navy)]/80">
              {images.slice(0, 6).map((img) => (
                <div key={img} className="truncate p-2 bg-white rounded border">
                  {img.split("/").pop()}
                </div>
              ))}
              {images.length > 6 && (
                <div className="p-2 text-center text-[var(--navy)]/60">
                  +{images.length - 6} more
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
