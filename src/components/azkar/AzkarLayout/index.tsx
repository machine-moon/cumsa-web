"use client";
import React, { useState } from "react";
import { CategoryList } from "@/components/azkar/CategoryList";
import { AzkarDisplay } from "@/components/azkar/AzkarDisplay";
import { useAzkarData, useAudioController } from "@/lib/azkar/state";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

interface Props {
  initialCategoryId?: number;
}

export function AzkarLayout({ initialCategoryId }: Props) {
  const {
    categories,
    activeCategoryId,
    setActiveCategoryId,
    azkar,
    loadingAzkar,
    loadingCategories,
    error,
    display,
    setDisplay,
  } = useAzkarData(initialCategoryId);
  const { play, isPlaying, loading: audioLoading, error: audioError } = useAudioController();
  const [showMenu, setShowMenu] = useState(false);

  const retry = () => {
    if (activeCategoryId) setActiveCategoryId(activeCategoryId);
    else setActiveCategoryId(categories[0]?.ID);
  };
  return (
    <div className="flex flex-col h-[calc(100vh-140px)] relative rounded-xl overflow-hidden border border-[var(--blue)]/25 bg-gradient-to-br from-white via-[#e6f9fb] to-[#d2f3f7] shadow-[0_0_0_1px_var(--blue)_inset,0_4px_18px_-4px_rgba(0,0,0,0.08)]">
      <div className="pointer-events-none absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_20%_15%,rgba(90,206,216,0.18),transparent_60%)] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_80%_85%,rgba(90,206,216,0.12),transparent_65%)]"></div>
      {error && (
        <div className="absolute top-1 right-2 text-[10px] text-[var(--red)] flex gap-2 items-center">
          {error}{" "}
          <button onClick={retry} className="underline text-[var(--blue)]">
            retry
          </button>
        </div>
      )}
      <div className="md:hidden flex items-center justify-between px-3 py-2 border-b border-white/10 bg-[var(--navy)]/60">
        <button
          onClick={() => setShowMenu((s) => !s)}
          className="text-sm px-3 py-1 rounded bg-[var(--blue)] text-white shadow-lg flex items-center gap-2 active:scale-95 transition-transform font-semibold border border-white/20"
          style={{
            boxShadow: "0 2px 12px 0 rgba(90,206,216,0.18)",
            background: "linear-gradient(90deg, var(--blue) 70%, #5aced8 100%)",
          }}
        >
          <span className="inline-block w-5 h-5 text-white">
            <HiOutlineMenuAlt3 />
          </span>
          {showMenu ? "Close" : "Categories"}
        </button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className={`${showMenu ? "block" : "hidden"} md:block`}>
          {/* sidebar wrapper */}
          <CategoryList
            categories={categories}
            activeId={activeCategoryId}
            onSelect={(id) => {
              setActiveCategoryId(id);
              setShowMenu(false);
            }}
            onPlayAudio={play}
            isPlaying={isPlaying}
            audioLoading={audioLoading}
            audioError={audioError}
          />
        </div>
        <div className="flex-1 flex flex-col relative">
          <AzkarDisplay
            azkar={azkar}
            loading={loadingCategories || loadingAzkar}
            onPlayAudio={play}
            isPlaying={isPlaying}
            audioLoading={audioLoading}
            audioError={audioError}
            display={display}
            onDisplayChange={(partial) => setDisplay((prev) => ({ ...prev, ...partial }))}
          />
        </div>
      </div>
    </div>
  );
}
