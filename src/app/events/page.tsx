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
      const date = new Date(dateString + "T00:00:00");
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
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={event.image || "/MSA.png"}
          alt={event.title}
          fill
          className={`${getImageClassName(event.imageStyle)} transition-transform duration-300 group-hover:scale-105`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4 space-y-2">
        <h3
          className="font-bold text-gray-900 text-lg leading-tight transition-colors duration-200 overflow-hidden"
          style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}
        >
          {event.title}
        </h3>

        <div className="space-y-1.5 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <IoCalendarOutline className="w-4 h-4 text-[var(--blue)] flex-shrink-0" />
            <span className="font-medium">{formatDate(event.date)}</span>
          </div>

          {event.time && (
            <div className="flex items-center gap-2">
              <IoTimeOutline className="w-4 h-4 text-[var(--red)] flex-shrink-0" />
              <span className="font-medium">{to12Hour(event.time)}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <IoLocationSharp className="w-4 h-4 text-[var(--navy)] flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>

          {event.fee && (
            <div className="flex items-center gap-2">
              <IoCash className="w-4 h-4 text-[var(--green)] flex-shrink-0" />
              <span className="font-medium text-gray-700">{event.fee}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          {event.description && (
            <button
              onClick={() => onInfoClick(event)}
              className="flex items-center gap-1 px-2 py-1 text-xs text-[var(--blue)] hover:text-[var(--navy)] hover:bg-gray-100 rounded-md transition-all duration-200"
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
              className="flex items-center gap-1 px-2 py-1 text-xs text-[var(--navy)] hover:text-[var(--navy)] hover:bg-gray-100 rounded-md transition-all duration-200"
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
  const [view, setView] = useState<"upcoming" | "past">("upcoming");
  const [transitioning, setTransitioning] = useState(false);

  const handleInfoClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleViewChange = (newView: "upcoming" | "past") => {
    if (view !== newView) {
      setTransitioning(true);
      setTimeout(() => {
        setView(newView);
        setTransitioning(false);
      }, 300); // Match the animation duration
    }
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

  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      const q = sp.get("view");
      const ls = localStorage.getItem("eventsView");
      const initial = q === "past" || q === "upcoming" ? q : ls === "past" ? "past" : "upcoming";
      setView(initial as "upcoming" | "past");
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("eventsView", view);
      const url = new URL(window.location.href);
      if (view === "upcoming") url.searchParams.delete("view");
      else url.searchParams.set("view", "past");
      window.history.replaceState({}, "", url.toString());
    } catch {}
  }, [view]);

  if (error) {
    return (
      <div className="container-base py-12">
        <div className="portal-glow">
          <div className="w-full p-8 text-center">
            <div className="w-16 h-16 bg-[var(--red)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <IoWarning className="w-8 h-8 text-[var(--red)]" />
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

  const getEventDateTime = (e: Event) => new Date(e.date + "T" + (e.time || "23:59:59"));
  const now = new Date();
  const upcomingEvents = events
    .filter((e) => getEventDateTime(e).getTime() >= now.getTime())
    .sort((a, b) => getEventDateTime(a).getTime() - getEventDateTime(b).getTime());
  const pastEvents = events
    .filter((e) => getEventDateTime(e).getTime() < now.getTime())
    .sort((a, b) => getEventDateTime(b).getTime() - getEventDateTime(a).getTime());

  const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });
  const groupByMonth = (list: Event[]) => {
    const groups: { label: string; items: Event[] }[] = [];
    const map = new Map<string, Event[]>();
    for (const ev of list) {
      const d = new Date(ev.date + "T00:00:00");
      const label = isNaN(d.getTime()) ? "Unknown" : monthFormatter.format(d);
      if (!map.has(label)) map.set(label, []);
      map.get(label)!.push(ev);
    }
    for (const [label, items] of map.entries()) groups.push({ label, items });
    return groups;
  };

  const upcomingGroups = groupByMonth(upcomingEvents);
  const pastGroups = groupByMonth(pastEvents);

  return (
    <div className="bg-[var(--background)] min-h-screen py-12">
      <div className="container-base">
        <div className="portal-glow animate-fade-in">
          <div className="w-full p-8 space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--blue)]/10 rounded-full text-[var(--blue)] font-medium text-sm animate-slide-in-left">
                <IoCalendarOutline className="w-4 h-4" />
                Upcoming Events
              </div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                Join Our Amazing{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--blue)] to-[var(--navy)]">
                  Events
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover exciting opportunities to connect, learn, and grow with our community!
              </p>
            </div>

            <div
              className={`flex items-center justify-center ${transitioning ? "pointer-events-none" : ""}`}
            >
              <div
                role="tablist"
                aria-label="Event view"
                className="inline-flex items-center rounded-lg border border-gray-200 bg-gray-50 p-1 relative overflow-hidden"
              >
                <div
                  className={`absolute top-0 bottom-0 left-0 transition-transform duration-300 bg-[var(--blue)]/10 rounded-md pointer-events-none ${view === "upcoming" ? "translate-x-0" : "translate-x-full"}`}
                  style={{ width: "50%" }}
                />
                <button
                  role="tab"
                  aria-selected={view === "upcoming"}
                  onClick={() => handleViewChange("upcoming")}
                  className={`px-3 py-1.5 relative z-10 rounded-md text-sm font-medium transition-all duration-300 transform ${view === "upcoming" ? "text-[var(--blue)]" : "text-gray-700 hover:text-gray-900 hover:scale-105 hover:bg-gray-100"}`}
                >
                  Upcoming
                </button>
                <button
                  role="tab"
                  aria-selected={view === "past"}
                  onClick={() => handleViewChange("past")}
                  className={`px-3 py-1.5 relative z-10 rounded-md text-sm font-medium transition-all duration-300 transform ${view === "past" ? "text-[var(--blue)]" : "text-gray-700 hover:text-gray-900 hover:scale-105 hover:bg-gray-100"}`}
                >
                  Past
                </button>
              </div>
            </div>

            <div
              className={`transition-opacity duration-300 ${transitioning ? "opacity-0" : "opacity-100"}`}
            >
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }, (_, i) => (
                    <EventSkeleton key={i} />
                  ))}
                </div>
              ) : view === "upcoming" ? (
                upcomingGroups.length > 0 ? (
                  <div className="space-y-10">
                    {upcomingGroups.map((group) => (
                      <section key={group.label} aria-label={group.label} className="space-y-4">
                        <div className="sticky top-2 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100 py-1">
                          <div className="flex items-center gap-3">
                            <div className="h-5 w-1 rounded bg-[var(--blue)]" />
                            <h2 className="text-xl font-semibold text-gray-900">{group.label}</h2>
                            <span className="text-sm text-gray-500">{group.items.length}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {group.items.map((event) => (
                            <EventCard key={event.id} event={event} onInfoClick={handleInfoClick} />
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                ) : (
                  <EmptyState />
                )
              ) : view === "past" ? (
                pastGroups.length > 0 ? (
                  <div className="space-y-8 pt-2">
                    {pastGroups.map((group) => (
                      <section
                        key={`past-${group.label}`}
                        aria-label={`Past ${group.label}`}
                        className="space-y-4"
                      >
                        <div className="sticky top-2 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100 py-1">
                          <div className="flex items-center gap-3">
                            <div className="h-4 w-1 rounded bg-[var(--blue)]/60" />
                            <h3 className="text-lg font-semibold text-gray-800">{group.label}</h3>
                            <span className="text-sm text-gray-500">{group.items.length}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {group.items.map((event) => (
                            <EventCard
                              key={`past-${event.id}`}
                              event={event}
                              onInfoClick={handleInfoClick}
                            />
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-sm text-gray-500">No past events</div>
                )
              ) : null}
            </div>

            {!loading && view === "upcoming" && upcomingEvents.length > 0 && (
              <div className="text-center pt-8 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Found {upcomingEvents.length} upcoming event
                  {upcomingEvents.length !== 1 ? "s" : ""} •
                  <span className="ml-1">More events coming soon!</span>
                </p>
              </div>
            )}

            {view === "past" && !loading && pastEvents.length > 0 && (
              <div className="text-center pt-8 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  {pastEvents.length} past event{pastEvents.length !== 1 ? "s" : ""}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <EventModal event={selectedEvent} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
