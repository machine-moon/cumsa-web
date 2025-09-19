import { getAllEvents, updateEvent, Event } from "@/lib/eventsDb";
import { redirect } from "next/navigation";
import { EditClient } from "@/components/eventPortal/EditClient";
import fs from "fs";
import path from "path";
import BackButton from "@/components/BackButton";

function listEventImages(): string[] {
  const dir = path.join(process.cwd(), "public", "events");
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => !f.startsWith("."))
      .filter((f) => /(png|jpe?g|webp|gif)$/i.test(f))
      .map((f) => `/api/event-images/${f}`);
  } catch {
    return [];
  }
}

async function save(formData: FormData) {
  "use server";

  try {
    const id = Number(formData.get("id"));
    const title = String(formData.get("title") || "");
    const date = String(formData.get("date") || "");
    const time = formData.get("time") ? String(formData.get("time")) : "";
    const location = String(formData.get("location") || "");
    const fee = formData.get("fee") ? String(formData.get("fee")) : "";
    const link = formData.get("link") ? String(formData.get("link")) : "";
    const image = formData.get("image") ? String(formData.get("image")) : "";
    const description = formData.get("description") ? String(formData.get("description")) : "";
    const imageStyle = String(formData.get("imageStyle") || "cover") as
      | "cover"
      | "contain"
      | "fill"
      | "scale-down"
      | "none";

    // Validate required fields
    if (!id || isNaN(id)) {
      throw new Error("Please select an event to edit");
    }
    if (!title.trim()) {
      throw new Error("Event title is required");
    }
    if (!date) {
      throw new Error("Event date is required");
    }
    if (!location.trim()) {
      throw new Error("Event location is required");
    }

    // Only validate image if one is provided
    if (image) {
      // Handle both direct paths and API paths
      let imgPath: string;
      if (image.startsWith("/api/event-images/")) {
        // Extract filename from API path
        const filename = image.split("/").pop();
        imgPath = path.join(process.cwd(), "public", "events", filename || "");
      } else {
        // Direct path to image
        imgPath = path.join(process.cwd(), "public", image.replace(/^\//, ""));
      }

      try {
        fs.accessSync(imgPath);
      } catch {
        throw new Error("Selected image file does not exist");
      }
    }

    updateEvent({ id, title, date, time, location, fee, link, image, imageStyle, description });
  } catch (error) {
    console.error("Error in save function:", error);
    throw error;
  }

  redirect("/events");
}
export default function EditEventPage() {
  const events = getAllEvents() as Event[];
  const images = listEventImages();
  return (
    <div className="space-y-6 animate-fade-in">
      <BackButton href="/extras/portals/events/menu" />

      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-[var(--blue)] mb-2">Edit Event</h1>
        <p className="text-[var(--navy)]/80">
          Modify event details and keep information up to date
        </p>
      </div>

      <EditClient events={events} />

      <form action={save} className="space-y-6 max-w-2xl mx-auto">
        <div className="bg-[color:var(--blue)]/5 border border-[color:var(--blue)]/20 rounded-lg p-4">
          <label className="block text-sm font-semibold text-[var(--navy)] mb-2">
            Select Event to Edit
          </label>
          <select
            name="id"
            required
            className="w-full border-2 border-[color:var(--navy)]/20 rounded-lg px-4 py-3 focus:border-[var(--blue)] focus:outline-none transition-colors"
            defaultValue=""
          >
            <option value="" disabled>
              Choose an event...
            </option>
            {events.map((e: Event) => (
              <option key={e.id} value={e.id}>
                {e.title} ({e.date})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[var(--navy)] mb-2">
              Event Title
            </label>
            <input
              name="title"
              placeholder="Enter event title"
              className="w-full border-2 border-[color:var(--navy)]/20 rounded-lg px-4 py-3 focus:border-[var(--blue)] focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[var(--navy)] mb-2">Date</label>
            <input
              name="date"
              type="date"
              className="w-full border-2 border-[color:var(--navy)]/20 rounded-lg px-4 py-3 focus:border-[var(--blue)] focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[var(--navy)] mb-2">Time</label>
            <input
              name="time"
              type="time"
              placeholder="Select event time"
              className="w-full border-2 border-[color:var(--navy)]/20 rounded-lg px-4 py-3 focus:border-[var(--blue)] focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[var(--navy)] mb-2">Location</label>
            <input
              name="location"
              placeholder="Where will this event take place?"
              className="w-full border-2 border-[color:var(--navy)]/20 rounded-lg px-4 py-3 focus:border-[var(--blue)] focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[var(--navy)] mb-2">Description</label>
          <textarea
            name="description"
            rows={4}
            placeholder="Provide a detailed description of the event..."
            className="w-full border-2 border-[color:var(--navy)]/20 rounded-lg px-4 py-3 focus:border-[var(--blue)] focus:outline-none transition-colors resize-vertical"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[var(--navy)] mb-2">
              Registration Fee
            </label>
            <input
              name="fee"
              placeholder="e.g., $10 or Free"
              className="w-full border-2 border-[color:var(--navy)]/20 rounded-lg px-4 py-3 focus:border-[var(--blue)] focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[var(--navy)] mb-2">
              Registration Link
            </label>
            <input
              name="link"
              type="url"
              placeholder="https://..."
              className="w-full border-2 border-[color:var(--navy)]/20 rounded-lg px-4 py-3 focus:border-[var(--blue)] focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-[var(--navy)] mb-2">
              Event Image
            </label>
            <select
              name="image"
              className="w-full border-2 border-[color:var(--navy)]/20 rounded-lg px-4 py-3 focus:border-[var(--blue)] focus:outline-none transition-colors"
              defaultValue=""
            >
              <option value="">No image</option>
              {images.map((img) => (
                <option key={img} value={img}>
                  {img.split("/").pop()}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[var(--navy)] mb-2">
              Image Display Style
            </label>
            <select
              name="imageStyle"
              className="w-full border-2 border-[color:var(--navy)]/20 rounded-lg px-4 py-3 focus:border-[var(--blue)] focus:outline-none transition-colors"
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
          <p className="text-xs text-[var(--navy)]/70">
            Images are stored in /public/events/. Manage them in Image Manager.
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <button className="btn-cozy btn-primary flex-1" type="submit">
            Save Changes
          </button>
          <a
            href="/extras/portals/events/remove"
            className="btn-cozy bg-[var(--red)] text-white px-6"
          >
            Delete Event
          </a>
        </div>
      </form>
    </div>
  );
}
