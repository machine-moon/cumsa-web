"use client";
import React from "react";
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
  if (!Array.isArray(categories)) {
    return (
      <aside className="w-60 sm:w-64 shrink-0 border-r border-black/10 h-full flex items-center justify-center text-[10px] text-[var(--red)]">
        Invalid categories
      </aside>
    );
  }

  const safe = Array.isArray(categories) ? categories : [];
  return (
    <aside className="w-60 sm:w-64 shrink-0 border-r border-[var(--blue)]/20 overflow-y-auto h-full bg-gradient-to-b from-white via-[#f1fdff] to-[#e3f7fa] text-xs sm:text-sm custom-scroll">
      <ul className="p-2 space-y-1">
        {!Array.isArray(categories) && (
          <li className="text-[10px] text-[var(--red)]/80 px-2">Category data invalid</li>
        )}
        {safe.map((c, i) => (
          <li
            key={c.ID}
            style={{ animationDelay: `${i * 40}ms` }}
            className={`rounded transition-colors animate-fade-in ${activeId === c.ID ? "bg-[var(--blue)]/15 ring-1 ring-[var(--blue)]/40" : "hover:bg-[var(--blue)]/8"}`}
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
                className={`text-sm font-medium ${activeId === c.ID ? "text-[var(--blue)]" : "text-[var(--foreground)]"}`}
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
      </ul>
    </aside>
  );
}
