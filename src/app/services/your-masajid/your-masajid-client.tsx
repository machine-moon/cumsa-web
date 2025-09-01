"use client";
import { useState } from "react";
import MasajidMapClient from "@/components/MasajidMapClient";

const MOSQUES = [
  {
    name: "Ottawa Mosque (OMA)",
    address: "251 Northwestern Ave, Ottawa, ON",
    lat: 45.4039,
    lng: -75.7287,
    phone: "(613) 722-8763",
    website: "https://www.omaottawa.org/",
  },
  {
    name: "Masjid ar-Rahmah (AMA)",
    address: "1216 Hunt Club Rd, Ottawa, ON",
    lat: 45.3454,
    lng: -75.6457,
    phone: "(613) 523-9977",
    website: "https://www.amacanada.org/",
  },
  {
    name: "South Nepean Muslim Community (SNMC)",
    address: "3020 Woodroffe Ave, Nepean, ON",
    lat: 45.2883,
    lng: -75.7396,
    phone: "(613) 440-6300",
    website: "https://snmc.ca/",
  },
  {
    name: "Kanata Muslim Association (KMA)",
    address: "351 Sandhill Rd, Kanata, ON",
    lat: 45.3023,
    lng: -75.9167,
    phone: "(613) 973-5000",
    website: "https://kanatamuslims.ca/",
  },
  {
    name: "Centre Islamique de l’Outaouais (CIO)",
    address: "4 Rue Lois, Gatineau, QC",
    lat: 45.4286,
    lng: -75.7101,
    phone: "(819) 777-0114",
    website: "https://www.cio-qc.ca/",
  },
];

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
