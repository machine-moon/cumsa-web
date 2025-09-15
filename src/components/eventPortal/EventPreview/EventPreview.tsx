"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  IoImage,
  IoCheckmark,
  IoCalendarOutline,
  IoLocationSharp,
  IoCash,
  IoLink,
  IoWarning,
  IoTimeOutline,
} from "react-icons/io5";
import { to12Hour } from "@/lib/to12Hour";

export type PreviewEvent = {
  title: string;
  date: string;
  time?: string;
  location: string;
  fee?: string;
  link?: string;
  image?: string;
  imageStyle?: "cover" | "contain" | "fill" | "scale-down" | "none";
  description?: string;
};

export function EventPreview({ event }: { event: PreviewEvent }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

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

  const handleImageError = (errorEvent: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error("Image failed to load:", event.image, errorEvent);
    setError(true);
    setLoading(false);

    const imageUrl = event.image || "";
    const extension = imageUrl.split(".").pop()?.toLowerCase();

    if (extension === "webp") {
      setErrorMessage("WebP format may not be supported in this context");
    } else if (!["png", "jpg", "jpeg", "gif", "webp"].includes(extension || "")) {
      setErrorMessage("Unsupported image format");
    } else {
      setErrorMessage("Failed to load image");
    }
  };

  const handleImageLoad = () => {
    setLoading(false);
    setError(false);
    setErrorMessage("");
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 w-60">
      <div className="relative aspect-[4/3] overflow-hidden">
        {!error && event.image ? (
          <>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
                <div className="text-center">
                  <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-xs text-gray-500">Loading image...</p>
                </div>
              </div>
            )}
            <Image
              src={event.image}
              alt={event.title || "preview"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
              className={`${getImageClassName(event.imageStyle)} transition-transform duration-300 group-hover:scale-105 ${loading ? "opacity-0" : "opacity-100"}`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              unoptimized={event.image.includes(".webp")}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300">
            <div className="text-center p-4">
              {error ? (
                <>
                  <IoWarning className="w-8 h-8 text-red-400 mx-auto mb-2" />
                  <p className="text-xs text-red-600 font-medium mb-1">Image Error</p>
                  <p className="text-xs text-gray-500">{errorMessage || "Failed to load image"}</p>
                </>
              ) : (
                <>
                  <IoImage className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">No image selected</p>
                </>
              )}
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full shadow-lg">
          Preview
        </div>

        {event.link && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <IoCheckmark className="w-3 h-3 text-white" />
            </div>
          </div>
        )}
      </div>

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

          {event.time && (
            <div className="flex items-center gap-2">
              <IoTimeOutline className="w-3 h-3 text-orange-500 flex-shrink-0" />
              <span className="font-medium">{to12Hour(event.time)}</span>
            </div>
          )}

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

      {event.imageStyle && event.imageStyle !== "cover" && (
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {event.imageStyle}
        </div>
      )}
    </div>
  );
}
