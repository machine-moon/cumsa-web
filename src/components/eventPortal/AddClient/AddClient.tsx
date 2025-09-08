"use client";
import { useState, useEffect } from "react";
import { EventPreview, PreviewEvent } from "../EventPreview";

export function AddClient() {
  const [preview, setPreview] = useState<PreviewEvent>({
    title: "",
    date: "",
    location: "",
    imageStyle: "cover",
  });
  const [image, setImage] = useState<string | undefined>(undefined);
  const [imageStyle, setImageStyle] = useState<
    "cover" | "contain" | "fill" | "scale-down" | "none"
  >("cover");

  // wire inputs by listening for form field changes via delegation
  useEffect(() => {
    function handler(e: globalThis.Event) {
      const target = e.target as HTMLInputElement | HTMLSelectElement | null;
      if (!target || !target.name) return;
      setPreview((p: PreviewEvent) => ({ ...p, [target.name]: target.value }));
      if (target.name === "image") setImage(target.value || undefined);
      if (target.name === "imageStyle")
        setImageStyle(target.value as "cover" | "contain" | "fill" | "scale-down" | "none");
    }
    document.addEventListener("input", handler);
    return () => document.removeEventListener("input", handler);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-start gap-8 justify-center">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-gray-600">Live Preview</span>
        <EventPreview event={{ ...preview, image, imageStyle }} />
      </div>
    </div>
  );
}
