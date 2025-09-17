"use client";
import React, { useState } from "react";

interface DisplayState {
  arabic: boolean;
  transliteration: boolean;
  translation: boolean;
}
interface Props {
  mode: DisplayState;
  onChange: (d: Partial<DisplayState>) => void;
}

export function LanguageToggle({ mode, onChange }: Props) {
  const [warn, setWarn] = useState(false);
  function toggle(key: keyof DisplayState) {
    const next = { ...mode, [key]: !mode[key] };
    if (!next.arabic && !next.transliteration && !next.translation) {
      setWarn(true);
      setTimeout(() => setWarn(false), 1800);
      return;
    }
    onChange({ [key]: next[key] });
  }
  const btn = (label: string, key: keyof DisplayState) => (
    <button
      key={key}
      type="button"
      onClick={() => toggle(key)}
      className={`relative px-2 py-1 rounded-md border text-xs transition-colors min-w-[88px] ${mode[key] ? "bg-[var(--blue)] border-[var(--blue)] text-white shadow-sm" : "bg-white border-[var(--blue)]/40 text-[var(--foreground)] hover:bg-[var(--blue)]/10"}`}
    >
      {label}
    </button>
  );
  return (
    <div className="flex items-center gap-2 text-xs relative">
      {btn("Arabic", "arabic")}
      {btn("Transliteration", "transliteration")}
      {btn("Translation", "translation")}
      {warn && (
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] bg-[var(--red)]/90 text-white px-2 py-[1px] rounded animate-fade-in">
          Need at least one
        </span>
      )}
    </div>
  );
}
