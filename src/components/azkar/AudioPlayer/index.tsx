"use client";
import React from "react";

interface Props {
  id: string;
  audioUrl: string;
  label?: string;
  onPlay: (url: string, id: string) => void;
  isActive: boolean;
  loading: boolean;
  error?: string | null;
}

export function AudioPlayer({ id, audioUrl, label, onPlay, isActive, loading, error }: Props) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onPlay(audioUrl, id)}
        className={`min-w-[64px] text-center px-3 py-1 rounded-md text-xs font-medium transition-colors border shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue)]/50 ${isActive ? "bg-[var(--blue)] border-[var(--blue)] text-white" : "bg-white border-[var(--blue)]/30 text-[var(--foreground)] hover:bg-[var(--blue)] hover:text-white"}`}
        disabled={loading}
      >
        {loading && isActive ? "..." : isActive ? "Pause" : "Play"}
      </button>
      {label && <span className="text-[10px] text-[var(--muted)]">{label}</span>}
      {error && isActive && <span className="text-[10px] text-[var(--red)]">{error}</span>}
    </div>
  );
}
