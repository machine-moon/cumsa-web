"use client";
import { useMemo, useState } from "react";

type Listing = {
  id: string;
  title: string;
  gender: "brothers" | "sisters";
  location: string;
  price: number;
  link?: string;
};

const MOCK: Listing[] = [
  { id: "1", title: "Room near campus", gender: "brothers", location: "Sandy Hill", price: 700 },
  { id: "2", title: "Shared apartment", gender: "sisters", location: "Centretown", price: 650 },
  { id: "3", title: "Basement room", gender: "brothers", location: "Nepean", price: 550 },
];

export default function RoommateClient() {
  const [q, setQ] = useState("");
  const [gender, setGender] = useState<"all" | "brothers" | "sisters">("all");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const results = useMemo(() => {
    return MOCK.filter((l) => {
      if (gender !== "all" && l.gender !== gender) return false;
      if (maxPrice !== "" && l.price > maxPrice) return false;
      const query = q.trim().toLowerCase();
      if (!query) return true;
      return l.title.toLowerCase().includes(query) || l.location.toLowerCase().includes(query);
    });
  }, [q, gender, maxPrice]);

  return (
    <div className="container-base py-12">
      <h1 className="text-3xl font-bold">Roommate Services</h1>
      <p className="mt-2 text-gray-700">
        Search and filter community housing posts. Separate filters for brothers and sisters.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by title or location"
          className="md:col-span-2 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
        />
        <select
          value={gender}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setGender(e.target.value as "all" | "brothers" | "sisters")
          }
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
        >
          <option value="all">All</option>
          <option value="brothers">Brothers</option>
          <option value="sisters">Sisters</option>
        </select>
        <input
          type="number"
          min={0}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
          placeholder="Max price ($)"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
        />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {results.map((l) => (
          <div key={l.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold">{l.title}</h3>
              <span
                className={`text-xs px-2 py-1 rounded-full ${l.gender === "brothers" ? "bg-blue-100 text-blue-700" : "bg-pink-100 text-pink-700"}`}
              >
                {l.gender === "brothers" ? "Brothers" : "Sisters"}
              </span>
            </div>
            <p className="mt-1 text-gray-600">{l.location}</p>
            <p className="mt-2 font-medium">${l.price} / mo</p>
            {l.link && (
              <a
                href={l.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-[var(--blue)]"
              >
                View post
              </a>
            )}
          </div>
        ))}
        {results.length === 0 && (
          <p className="text-gray-600">No results. Try adjusting filters.</p>
        )}
      </div>
    </div>
  );
}
