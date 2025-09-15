"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { MOSQUES } from "@/lib/constants";
import { FaChevronDown } from "react-icons/fa";

// Dynamically import MasajidMapClient with SSR disabled to prevent window errors
const MasajidMapClient = dynamic(() => import("@/components/MasajidMapClient"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[480px] bg-gray-100 rounded-xl">
      Loading map...
    </div>
  ),
});

type Masjid = {
  name: string;
  address: string;
  lat: number;
  lng: number;
  website?: string;
  phone?: string;
  osm_id?: number;
};

export default function YourMasajidClient({ initialMosques }: { initialMosques?: Masjid[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  // Use initialMosques if provided and not empty, otherwise fall back to MOSQUES constant
  const mosques = initialMosques && initialMosques.length > 0 ? initialMosques : MOSQUES;

  return (
    <div className="mt-8 grid gap-8 md:grid-cols-2">
      <div className="space-y-3">
        {mosques.map((m, i) => (
          <div key={m.name} className="rounded-lg border border-black/10 bg-white">
            <button
              className="w-full flex items-center justify-between px-4 py-3 text-left font-medium hover:bg-black/[0.03] transition-base"
              onClick={() => setOpenIdx((v) => (v === i ? null : i))}
              aria-expanded={openIdx === i}
            >
              <span>{m.name}</span>
              <FaChevronDown
                className={`w-4 h-4 transition-transform ${openIdx === i ? "rotate-180" : ""}`}
                aria-hidden
              />
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
        <MasajidMapClient mosques={mosques} />
      </div>
    </div>
  );
}
