"use client";
import { useState } from "react";
import type { Event } from "@/lib/eventsDb";

interface EditFormProps {
  events: Event[];
  images: string[];
  onSubmit: (formData: FormData) => Promise<void>;
}

export function EditForm({ events, images, onSubmit }: EditFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedEventId) {
      alert("Please select an event to edit");
      return;
    }

    const formData = new FormData(e.currentTarget);

    // Basic client-side validation
    const title = formData.get("title") as string;
    const date = formData.get("date") as string;
    const location = formData.get("location") as string;

    if (!title?.trim()) {
      alert("Event title is required");
      return;
    }
    if (!date) {
      alert("Event date is required");
      return;
    }
    if (!location?.trim()) {
      alert("Event location is required");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Form submission error:", error);
      alert(error instanceof Error ? error.message : "Failed to save changes. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-[color:var(--blue)]/5 border border-[color:var(--blue)]/20 rounded-lg p-4">
        <label className="block text-sm font-semibold text-[var(--navy)] mb-2">
          Select Event to Edit
        </label>
        <select
          name="id"
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
          required
          className="w-full border-2 border-[color:var(--navy)]/20 rounded-lg px-4 py-3 focus:border-[var(--blue)] focus:outline-none transition-colors"
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
            Event Title *
          </label>
          <input
            name="title"
            required
            placeholder="Enter event title"
            className="w-full border-2 border-[color:var(--navy)]/20 rounded-lg px-4 py-3 focus:border-[var(--blue)] focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[var(--navy)] mb-2">Date *</label>
          <input
            name="date"
            type="date"
            required
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
          <label className="block text-sm font-semibold text-[var(--navy)] mb-2">Location *</label>
          <input
            name="location"
            required
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
          <label className="block text-sm font-semibold text-[var(--navy)] mb-2">Event Image</label>
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
        <button className="btn-cozy btn-primary flex-1" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
        <a
          href="/extras/portals/events/remove"
          className="btn-cozy bg-[var(--red)] text-white px-6"
        >
          Delete Event
        </a>
      </div>
    </form>
  );
}
