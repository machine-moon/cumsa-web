import fs from "fs";
import path from "path";
import BackButton from "@/components/BackButton";
import { ImageManagerClient, type ImageInfo } from "@/components/eventPortal/ImageManager";
import { countEventsUsingImage, updateEventsImage } from "@/lib/eventsDb";

const SUPPORTED_FORMATS = [".png", ".jpg", ".jpeg", ".webp", ".gif"];
const SUPPORTED_MIME_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif"];

function listEventImages(): ImageInfo[] {
  const dir = path.join(process.cwd(), "public", "events");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => !f.startsWith("."))
      .filter((f) => /(png|jpe?g|webp|gif)$/i.test(f))
      .map((f) => {
        const s = fs.statSync(path.join(dir, f));
        return { url: `/events/${f}`, name: f, size: s.size, mtime: s.mtimeMs } as ImageInfo;
      });
  } catch {
    return [] as ImageInfo[];
  }
}

const UPLOAD_MAX_MB = Number(process.env.UPLOAD_MAX_MB ?? "10");
const UPLOAD_MAX_BYTES = UPLOAD_MAX_MB * 1024 * 1024;

function validateImageFile(file: File): string | null {
  if (!file) return "No file provided";
  if (file.size > UPLOAD_MAX_BYTES) return `File size must be less than ${UPLOAD_MAX_MB}MB`;
  if (!SUPPORTED_MIME_TYPES.includes(file.type.toLowerCase()))
    return `Unsupported file type: ${file.type}`;
  const ext = path.extname(file.name).toLowerCase();
  if (!SUPPORTED_FORMATS.includes(ext))
    return `Unsupported file extension: ${ext}. Allowed: ${SUPPORTED_FORMATS.join(", ")}`;
  return null;
}

async function uploadAction(formData: FormData): Promise<boolean> {
  "use server";
  try {
    const file = formData.get("file") as File | null;
    const saveAs = String(formData.get("saveAs") || "");
    if (!file || !saveAs) return false;
    const err = validateImageFile(file);
    if (err) return false;
    const destDir = path.join(process.cwd(), "public", "events");
    fs.mkdirSync(destDir, { recursive: true });
    const ext = path.extname(file.name).toLowerCase();
    const safeBase = saveAs.replace(/\.[^.]+$/, "").replace(/[^a-z0-9._-]/gi, "_");
    const safeName = `${safeBase}${ext}`.replace(/_{2,}/g, "_");
    const filePath = path.join(destDir, safeName);
    try {
      fs.accessSync(filePath);
      return false; // do not overwrite
    } catch {}
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    return true;
  } catch {
    return false;
  }
}

async function deleteAction(formData: FormData): Promise<boolean> {
  "use server";
  const name = String(formData.get("name") || "");
  if (!name) return false;
  const url = `/events/${name}`;
  if (countEventsUsingImage(url) > 0) return false;
  const p = path.join(process.cwd(), "public", "events", name);
  try {
    fs.unlinkSync(p);
    return true;
  } catch {
    return false;
  }
}

async function renameAction(formData: FormData): Promise<boolean> {
  "use server";
  const oldName = String(formData.get("oldName") || "");
  const newName = String(formData.get("newName") || "");
  if (!oldName || !newName) return false;
  const oldExt = path.extname(oldName).toLowerCase();
  const newExt = path.extname(newName).toLowerCase();
  if (oldExt !== newExt) return false;
  const base = newName.replace(/\.[^.]+$/, "");
  const safeBase = base.replace(/[^a-z0-9._-]/gi, "_");
  const safeNewName = `${safeBase}${oldExt}`.replace(/_{2,}/g, "_");
  const dir = path.join(process.cwd(), "public", "events");
  const from = path.join(dir, oldName);
  const to = path.join(dir, safeNewName);
  try {
    try {
      fs.accessSync(to);
      return false; // do not overwrite
    } catch {}
    fs.renameSync(from, to);
    const oldUrl = `/events/${oldName}`;
    const newUrl = `/events/${safeNewName}`;
    updateEventsImage(oldUrl, newUrl);
    return true;
  } catch {
    return false;
  }
}

async function usageAction(formData: FormData): Promise<number> {
  "use server";
  const url = String(formData.get("url") || "");
  if (!url) return 0;
  try {
    return countEventsUsingImage(url);
  } catch {
    return 0;
  }
}

export default function ImageManagerPage() {
  const images = listEventImages();
  return (
    <div className="space-y-6 animate-fade-in">
      <BackButton href="/extras/portals/events/menu" />

      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-[var(--blue)] mb-2">Image Manager</h1>
        <p className="text-[var(--navy)]/80">Upload, preview, rename, and delete event images</p>
      </div>

      <ImageManagerClient
        images={images}
        uploadAction={uploadAction}
        deleteAction={deleteAction}
        renameAction={renameAction}
        usageAction={usageAction}
      />
    </div>
  );
}
