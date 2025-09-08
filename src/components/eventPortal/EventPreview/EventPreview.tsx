"use client";
import Image from "next/image";
import { useState } from "react";
import {
  IoImage,
  IoCheckmark,
  IoCalendarOutline,
  IoLocationSharp,
  IoCash,
  IoLink,
} from "react-icons/io5";

export type PreviewEvent = {
  title: string;
  date: string;
  location: string;
  fee?: string;
  link?: string;
  image?: string;
  imageStyle?: "cover" | "contain" | "fill" | "scale-down" | "none";
};

export function EventPreview({ event }: { event: PreviewEvent }) {
  const [error, setError] = useState(false);

  // Map CSS object-fit values to Tailwind classes
  const getImageClassName = (style: string | undefined) => {
    switch (style) {
      case "contain":
        return "object-contain";
      case "fill":
        return "object-fill";
      case "scale-down":
        return "object-scale-down";
      case "none":
        return "object-none";
      case "cover":
      default:
        return "object-cover";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === "YYYY-MM-DD") return "Select Date";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 w-60">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {!error && event.image ? (
          <Image
            src={event.image}
            alt={event.title || "preview"}
            fill
            className={`${getImageClassName(event.imageStyle)} transition-transform duration-300 group-hover:scale-105`}
            onError={() => setError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300">
            <div className="text-center p-4">
              <IoImage className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-xs text-gray-500">
                {error ? "Failed to load image" : "No image selected"}
              </p>
            </div>
          </div>
        )}

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Preview badge */}
        <div className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full shadow-lg">
          Preview
        </div>

        {/* Registration indicator */}
        {event.link && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <IoCheckmark className="w-3 h-3 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3
          className="font-bold text-gray-900 text-sm leading-tight group-hover:text-blue-600 transition-colors duration-200 overflow-hidden"
          style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}
        >
          {event.title || "Enter Event Title"}
        </h3>

        <div className="space-y-1.5 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <IoCalendarOutline className="w-3 h-3 text-blue-500 flex-shrink-0" />
            <span className="font-medium">{formatDate(event.date)}</span>
          </div>

          <div className="flex items-center gap-2">
            <IoLocationSharp className="w-3 h-3 text-green-500 flex-shrink-0" />
            <span className="truncate">{event.location || "Enter Location"}</span>
          </div>

          {event.fee && (
            <div className="flex items-center gap-2">
              <IoCash className="w-3 h-3 text-yellow-500 flex-shrink-0" />
              <span className="font-medium text-gray-700">{event.fee}</span>
            </div>
          )}

          {event.link && (
            <div className="flex items-center gap-2">
              <IoLink className="w-3 h-3 text-purple-500 flex-shrink-0" />
              <span className="text-purple-600 font-medium">Registration Link</span>
            </div>
          )}
        </div>
      </div>

      {/* Image style indicator */}
      {event.imageStyle && event.imageStyle !== "cover" && (
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {event.imageStyle}
        </div>
      )}
    </div>
  );
}
