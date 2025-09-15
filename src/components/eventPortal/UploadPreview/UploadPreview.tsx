"use client";
import { useState, ChangeEvent } from "react";
import { EventPreview } from "../EventPreview";

export function UploadPreview({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [imageStyle, setImageStyle] = useState<
    "cover" | "contain" | "fill" | "scale-down" | "none"
  >("cover");

  return (
    <div className="flex flex-col md:flex-row items-start gap-8 justify-center animate-fade-in">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-[var(--navy)]">Preview Selected Image</span>
        <EventPreview
          event={{
            title: "Sample Event",
            date: "2024-01-01",
            location: "Sample Location",
            image: selectedImage,
            imageStyle: imageStyle,
          }}
        />
      </div>
      <div className="flex flex-col gap-4 max-w-xs">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-[var(--navy)]">Available Images</span>
          <select
            className="w-full border-2 border-[color:var(--navy)]/20 rounded-lg px-3 py-2 text-sm focus:border-[var(--blue)] focus:outline-none"
            value={selectedImage || ""}
            onChange={(e) => setSelectedImage(e.target.value || undefined)}
          >
            <option value="">Select an image to preview</option>
            {images.map((img) => (
              <option key={img} value={img}>
                {img}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-[var(--navy)]">Image Display Style</span>
          <select
            className="w-full border-2 border-[color:var(--navy)]/20 rounded-lg px-3 py-2 text-sm focus:border-[var(--blue)] focus:outline-none"
            value={imageStyle}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setImageStyle(e.target.value as "cover" | "contain" | "fill" | "scale-down" | "none")
            }
          >
            <option value="cover">Cover (crop to fill)</option>
            <option value="contain">Contain (fit entire image)</option>
            <option value="fill">Fill (stretch to fit)</option>
            <option value="scale-down">Scale Down (shrink if needed)</option>
            <option value="none">None (original size)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
