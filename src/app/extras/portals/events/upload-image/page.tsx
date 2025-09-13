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

function validateImageFile(file: File): string | null {
  if (!file) return "No file provided";

  if (file.size > 10 * 1024 * 1024) {
    return "File size must be less than 10MB";
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
    <div className="space-y-6">
      <BackButton href="/extras/portals/events/menu" />

      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-[var(--blue)] mb-2">Upload Event Image</h1>
        <p className="text-gray-600">Add new images for your events</p>
      </div>

      <UploadPreview images={images} />

      <div className="max-w-lg mx-auto">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📸</span>
            <div>
              <h3 className="font-semibold text-blue-800">Upload New Image</h3>
              <p className="text-sm text-blue-600">Choose a high-quality image for your event</p>
            </div>
          </div>

          <form action={upload} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Image File
              </label>
              <input
                type="file"
                name="file"
                required
                accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
                className="block w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-[var(--blue)] focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <div className="mt-2 text-xs text-gray-500 space-y-1">
                <p className="flex items-center gap-1">
                  <span>✅</span>
                  Accepted formats: PNG, JPG, JPEG, WebP, GIF
                </p>
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
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-2">Current Images ({images.length})</h4>
            <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
              {images.slice(0, 6).map((img) => (
                <div key={img} className="truncate p-2 bg-white rounded border">
                  {img.split("/").pop()}
                </div>
              ))}
              {images.length > 6 && (
                <div className="p-2 text-center text-gray-500">+{images.length - 6} more</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
