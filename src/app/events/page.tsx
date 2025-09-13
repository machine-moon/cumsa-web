"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  IoCalendarOutline,
  IoLocationSharp,
  IoCash,
  IoArrowForward,
  IoWarning,
  IoTimeOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { to12Hour } from "@/lib/to12Hour";
import { EventModal } from "@/components/EventModal";

type Event = {
  id: number;
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

// Event Card Component for better maintainability
function EventCard({ event, onInfoClick }: { event: Event; onInfoClick: (event: Event) => void }) {
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
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={event.image || "/MSA.png"}
          alt={event.title}
          fill
          className={`${getImageClassName(event.imageStyle)} transition-transform duration-300 group-hover:scale-105`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3
          className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors duration-200 overflow-hidden"
          style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}
        >
          {event.title}
        </h3>

        <div className="space-y-1.5 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <IoCalendarOutline className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span className="font-medium">{formatDate(event.date)}</span>
          </div>

          {event.time && (
            <div className="flex items-center gap-2">
              <IoTimeOutline className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <span className="font-medium">{to12Hour(event.time)}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <IoLocationSharp className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>

          {event.fee && (
            <div className="flex items-center gap-2">
              <IoCash className="w-4 h-4 text-yellow-500 flex-shrink-0" />
              <span className="font-medium text-gray-700">{event.fee}</span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-2">
          {event.description && (
            <button
              onClick={() => onInfoClick(event)}
              className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-all duration-200"
            >
              <IoInformationCircleOutline className="w-3 h-3" />
              Info
            </button>
          )}
          <div className="flex-1" />
          {event.link && (
            <Link
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 text-xs text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-all duration-200"
            >
              <IoArrowForward className="w-3 h-3" />
              Register
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// Loading skeleton component
function EventSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded-md w-3/4" />
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-32" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Empty state component
function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <IoCalendarOutline className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Events Found</h3>
      <p className="text-gray-500 max-w-sm">
        There are no upcoming events at the moment. Check back soon for exciting new events! ✨
      </p>
    </div>
  );
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInfoClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/events");
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (error) {
    return (
      <div className="container-base py-12">
        <div className="portal-glow">
          <div className="w-full p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <IoWarning className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-base py-12">
      <div className="portal-glow">
        <div className="w-full p-8 space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-700 font-medium text-sm">
              <IoCalendarOutline className="w-4 h-4" />
              Upcoming Events
            </div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              Join Our Amazing{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Events
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover exciting opportunities to connect, learn, and grow with our community!
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
              // Show skeletons while loading
              Array.from({ length: 8 }, (_, i) => <EventSkeleton key={i} />)
            ) : events.length > 0 ? (
              // Show events
              events.map((event) => (
                <EventCard key={event.id} event={event} onInfoClick={handleInfoClick} />
              ))
            ) : (
              // Show empty state
              <EmptyState />
            )}
          </div>

          {/* Footer Note */}
          {!loading && events.length > 0 && (
            <div className="text-center pt-8 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Found {events.length} upcoming event{events.length !== 1 ? "s" : ""} •
                <span className="ml-1">More events coming soon!</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Event Modal */}
      <EventModal event={selectedEvent} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
