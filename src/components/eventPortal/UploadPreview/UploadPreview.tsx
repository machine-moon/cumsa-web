"use client";
import { useState, ChangeEvent } from "react";
import { EventPreview } from "../EventPreview";

export function UploadPreview({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [imageStyle, setImageStyle] = useState<
    "cover" | "contain" | "fill" | "scale-down" | "none"
  >("cover");

  return (
    <div className="flex flex-col md:flex-row items-start gap-8 justify-center">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-600">Preview Selected Image</span>
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
          <span className="text-sm font-medium text-gray-600">Available Images</span>
          <select
            className="w-full border rounded px-3 py-2 text-sm"
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
          <span className="text-sm font-medium text-gray-600">Image Display Style</span>
          <select
            className="w-full border rounded px-3 py-2 text-sm"
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
