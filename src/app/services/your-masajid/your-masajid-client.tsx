"use client";
import { useState } from "react";
import MasajidMapClient from "@/components/MasajidMapClient";
import { MOSQUES } from "@/lib/constants";

export default function YourMasajidClient() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="mt-8 grid gap-8 md:grid-cols-2">
      <div className="space-y-3">
        {MOSQUES.map((m, i) => (
          <div key={m.name} className="rounded-lg border border-black/10 bg-white">
            <button
              className="w-full flex items-center justify-between px-4 py-3 text-left font-medium hover:bg-black/[0.03] transition-base"
              onClick={() => setOpenIdx((v) => (v === i ? null : i))}
              aria-expanded={openIdx === i}
            >
              <span>{m.name}</span>
              <svg
                className={`w-4 h-4 transition-transform ${openIdx === i ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden
              >
                <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.116l3.71-3.885a.75.75 0 1 1 1.08 1.04l-4.24 4.44a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z" />
              </svg>
            </button>
            {openIdx === i && (
              <div className="px-4 pb-4 text-sm text-gray-700 space-y-1">
                <div className="font-semibold text-[var(--red)]">Information</div>
                <div>{m.address}</div>
                {m.phone && <div>{m.phone}</div>}
                {m.website && (
                  <div>
                    <a
                      href={m.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-cta"
                    >
                      Website →
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        <MasajidMapClient mosques={MOSQUES} />
      </div>
    </div>
  );
}
