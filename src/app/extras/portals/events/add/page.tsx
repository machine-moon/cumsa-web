import { redirect } from "next/navigation";
import { addEvent } from "@/lib/eventsDb";
import fs from "fs";
import path from "path";
import { AddClient } from "@/components/eventPortal/AddClient";
import BackButton from "@/components/BackButton";

function listEventImages(): string[] {
  const dir = path.join(process.cwd(), "public", "events");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => !f.startsWith("."))
      .filter((f) => /(png|jpe?g|webp|gif)$/i.test(f))
      .map((f) => `/events/${f}`);
  } catch {
    return [];
  }
}

async function create(formData: FormData) {
  "use server";
  const title = String(formData.get("title") || "");
  const date = String(formData.get("date") || "");
  const location = String(formData.get("location") || "");
  const fee = String(formData.get("fee") || "");
  const link = String(formData.get("link") || "");
  const image = String(formData.get("image") || "");
  const imageStyle = String(formData.get("imageStyle") || "cover") as
    | "cover"
    | "contain"
    | "fill"
    | "scale-down"
    | "none";
  if (!title || !date || !location) return;
  const imgPath = path.join(process.cwd(), "public", image.replace(/^\//, ""));
  try {
    fs.accessSync(imgPath);
  } catch {
    return;
  }
  addEvent({ title, date, location, fee, link, image, imageStyle });
  redirect("/events");
}

export default function AddEventPage() {
  const images = listEventImages();
  return (
    <div className="space-y-6">
      <BackButton href="/extras/portals/events/menu" />

      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-[var(--blue)] mb-2">Add New Event</h1>
        <p className="text-gray-600">Create an engaging event that our community will love</p>
      </div>

      <AddClient />

      <form action={create} className="space-y-6 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Event Title *</label>
            <input
              name="title"
              required
              placeholder="Enter event title"
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-[var(--blue)] focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
            <input
              name="date"
              type="date"
              required
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-[var(--blue)] focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
          <input
            name="location"
            required
            placeholder="Where will this event take place?"
            className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-[var(--blue)] focus:outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Registration Fee
            </label>
            <input
              name="fee"
              placeholder="e.g., $10 or Free"
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-[var(--blue)] focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Registration Link
            </label>
            <input
              name="link"
              type="url"
              placeholder="https://..."
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-[var(--blue)] focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Event Image *</label>
            <select
              name="image"
              required
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-[var(--blue)] focus:outline-none transition-colors"
              defaultValue=""
            >
              <option value="" disabled>
                Select an image
              </option>
              {images.map((img) => (
                <option key={img} value={img}>
                  {img}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image Display Style
            </label>
            <select
              name="imageStyle"
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-[var(--blue)] focus:outline-none transition-colors"
              defaultValue="cover"
            >
              <option value="cover">Cover (crop to fill)</option>
              <option value="contain">Contain (fit entire image)</option>
              <option value="fill">Fill (stretch to fit)</option>
              <option value="scale-down">Scale Down (shrink if needed)</option>
              <option value="none">None (original size)</option>
            </select>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <span>📁</span>
            Images are stored in /public/events/. Upload new images using the Upload Image page.
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <button className="btn-cozy btn-primary flex-1" type="submit">
            Create Event
          </button>
          <a href="/extras/portals/events/upload-image" className="btn-cozy btn-outline px-6">
            Upload Image
          </a>
        </div>
      </form>
    </div>
  );
}
