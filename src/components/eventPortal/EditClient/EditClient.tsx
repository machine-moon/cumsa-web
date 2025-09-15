"use client";
import { useEffect, useState } from "react";
import type { Event } from "@/lib/eventsDb";
import { EventPreview, PreviewEvent } from "../EventPreview";

export function EditClient({ events }: { events: Event[] }) {
  const [preview, setPreview] = useState<PreviewEvent>({
    title: "",
    date: "",
    time: "",
    location: "",
    imageStyle: "cover",
    description: "",
  });
  const [image, setImage] = useState<string | undefined>(undefined);
  const [imageStyle, setImageStyle] = useState<
    "cover" | "contain" | "fill" | "scale-down" | "none"
  >("cover");

  useEffect(() => {
    const select = document.querySelector("select[name=id]") as HTMLSelectElement | null;
    if (!select) return;
    function fill() {
      if (!select) return;
      const id = Number(select.value);
      const ev = events.find((e) => e.id === id);
      if (!ev) return;
      const map: Record<string, string | undefined> = {
        title: ev.title,
        date: ev.date,
        time: ev.time,
        location: ev.location,
        fee: ev.fee,
        link: ev.link,
        image: ev.image,
        imageStyle: ev.imageStyle || "cover",
        description: ev.description,
      };
      Object.entries(map).forEach(([name, val]) => {
        const input = document.querySelector(`[name=${name}]`) as
          | HTMLInputElement
          | HTMLSelectElement
          | null;
        if (input && val !== undefined) {
          input.value = val;
          input.dispatchEvent(new Event("input", { bubbles: true }));
        }
      });
      setPreview({
        title: ev.title || "",
        date: ev.date || "",
        time: ev.time || "",
        location: ev.location || "",
        fee: ev.fee || "",
        link: ev.link || "",
        imageStyle: ev.imageStyle || "cover",
        description: ev.description || "",
      });
      setImage(ev.image || undefined);
      setImageStyle(ev.imageStyle || "cover");
    }
    select.addEventListener("change", fill);
    return () => select.removeEventListener("change", fill);
  }, [events]);

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
