"use client";
import Image from "next/image";

// Skeleton data for photos (replace with real URLs later)
const photos = [
  { id: 1, src: "/placeholder1.jpg", alt: "Event Photo 1", title: "Community Gathering" },
  { id: 2, src: "/placeholder2.jpg", alt: "Event Photo 2", title: "Prayer Session" },
  { id: 3, src: "/placeholder3.jpg", alt: "Event Photo 3", title: "Charity Drive" },
  { id: 4, src: "/placeholder4.jpg", alt: "Event Photo 4", title: "Cultural Event" },
  { id: 5, src: "/placeholder5.jpg", alt: "Event Photo 5", title: "Youth Program" },
  { id: 6, src: "/placeholder6.jpg", alt: "Event Photo 6", title: "Fundraiser" },
];

export default function GalleryPage() {
  return (
    <div className="container-base py-8">
      <h1 className="text-3xl font-bold text-[var(--navy)] mb-8">Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="aspect-square bg-gray-200 flex items-center justify-center">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={300}
                height={300}
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.jpg"; // Fallback
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[var(--navy)]">{photo.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
