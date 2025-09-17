"use client";
import React, { useState, useMemo } from "react";
import { Category } from "@/lib/azkar/types";
import { AudioPlayer } from "@/components/azkar/AudioPlayer";

interface Props {
  categories: Category[];
  activeId?: number;
  onSelect: (id: number) => void;
  onPlayAudio: (url: string, id: string) => void;
  isPlaying: (id: string) => boolean;
  audioLoading: boolean;
  audioError: string | null;
}

export function CategoryList({
  categories,
  activeId,
  onSelect,
  onPlayAudio,
  isPlaying,
  audioLoading,
  audioError,
}: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!Array.isArray(categories)) {
      return [];
    }
    const safe = categories;
    const q = query.trim().toLowerCase();
    if (!q) return safe;
    return safe.filter((c) => c.TITLE.toLowerCase().includes(q));
  }, [categories, query]);

  if (!Array.isArray(categories)) {
    return (
      <aside className="w-60 sm:w-64 shrink-0 border-r border-black/10 h-full flex items-center justify-center text-[10px] text-[var(--red)]">
        Invalid categories
      </aside>
    );
  }
  return (
    <aside className="w-60 sm:w-64 shrink-0 border-r border-[var(--blue)]/20 overflow-y-auto h-full bg-gradient-to-b from-white via-[#f1fdff] to-[#e3f7fa] text-xs sm:text-sm custom-scroll">
      <div className="p-2 sticky top-0 bg-gradient-to-b from-white via-white to-transparent">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="w-full px-2 py-1 rounded border text-xs outline-none focus:ring-1 ring-[var(--blue)] bg-white/80"
        />
      </div>
      <ul className="p-2 pt-0 space-y-1">
        {filtered.map((c, i) => (
          <li
            key={c.ID}
            style={{ animationDelay: `${i * 40}ms` }}
            className={`rounded transition-colors animate-fade-in ${
              activeId === c.ID
                ? "bg-[var(--blue)]/15 ring-1 ring-[var(--blue)]/40"
                : "hover:bg-[var(--blue)]/8"
            }`}
          >
            <div
              className="w-full px-3 py-2 flex flex-col gap-2 cursor-pointer"
              onClick={() => onSelect(c.ID)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSelect(c.ID);
              }}
            >
              <span
                className={`text-sm font-medium ${
                  activeId === c.ID ? "text-[var(--blue)]" : "text-[var(--foreground)]"
                }`}
              >
                {c.TITLE}
              </span>
              {c.AUDIO_URL && (
                <div onClick={(e) => e.stopPropagation()} className="flex justify-center pt-1">
                  <AudioPlayer
                    id={`cat-${c.ID}`}
                    audioUrl={c.AUDIO_URL}
                    onPlay={onPlayAudio}
                    isActive={isPlaying(`cat-${c.ID}`)}
                    loading={audioLoading && isPlaying(`cat-${c.ID}`)}
                    error={audioError}
                  />
                </div>
              )}
            </div>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="text-[10px] text-gray-500 px-2 py-3">No matches</li>
        )}
      </ul>
    </aside>
  );
}
