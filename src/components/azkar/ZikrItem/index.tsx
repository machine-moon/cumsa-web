"use client";
import React from "react";
import { Zikr } from "@/lib/azkar/types";
import { AudioPlayer } from "@/components/azkar/AudioPlayer";

interface Props {
  zikr: Zikr;
  display: { arabic: boolean; transliteration: boolean; translation: boolean };
  onPlayAudio: (url: string, id: string) => void;
  isPlaying: (id: string) => boolean;
  audioLoading: boolean;
  audioError: string | null;
}

export function ZikrItem({
  zikr,
  display,
  onPlayAudio,
  isPlaying,
  audioLoading,
  audioError,
}: Props) {
  return (
    <div className="relative p-4 rounded-lg bg-white/80 backdrop-blur border border-[var(--blue)]/25 flex flex-col gap-3 text-sm sm:text-base shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)] animate-fade-in">
      {display.arabic && (
        <div className="text-right font-medium leading-relaxed text-lg sm:text-xl" dir="rtl">
          {zikr.ARABIC_TEXT}
        </div>
      )}
      {display.transliteration && (
        <div
          className="text-right leading-relaxed text-sm sm:text-base text-[var(--foreground)]/70"
          dir="rtl"
        >
          {zikr.LANGUAGE_ARABIC_TRANSLATED_TEXT}
        </div>
      )}
      {display.translation && (
        <div className="text-[var(--foreground)]/80 leading-relaxed text-xs sm:text-sm" dir="ltr">
          {zikr.TRANSLATED_TEXT}
        </div>
      )}
      <div className="flex items-center justify-between mt-1 gap-4">
        <span className="text-xs text-[var(--muted)] min-h-[14px] flex items-center">
          {zikr.REPEAT !== 1 ? `Repeat: ${zikr.REPEAT} times` : ""}
        </span>
        {zikr.AUDIO && (
          <AudioPlayer
            id={`zikr-${zikr.ID}`}
            audioUrl={zikr.AUDIO}
            onPlay={onPlayAudio}
            isActive={isPlaying(`zikr-${zikr.ID}`)}
            loading={audioLoading && isPlaying(`zikr-${zikr.ID}`)}
            error={audioError}
          />
        )}
      </div>
    </div>
  );
}
