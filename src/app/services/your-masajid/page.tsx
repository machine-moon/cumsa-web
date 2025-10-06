export const metadata = { title: "Your Masajid | CUMSA" };
import YourMasajidClient from "@/app/services/your-masajid/your-masajid-client";

type NominatimPlace = {
  name?: string;
  display_name?: string;
  lat: string;
  lon: string;
  extratags?: { website?: string };
  osm_id?: number;
};

type Masjid = {
  name: string;
  address: string;
  lat: number;
  lng: number;
  website?: string;
  osm_id?: number;
};

async function fetchMasajid(): Promise<Masjid[]> {
  const res = await fetch(
    "https://nominatim.openstreetmap.org/search.php?q=mosque+Ottawa&format=jsonv2&limit=16",
    { cache: "no-store" },
  );
  if (!res.ok) return [];
  const data: NominatimPlace[] = await res.json();
  return data.map((d) => ({
    name: d.name || (d.display_name ? d.display_name.split(",")[0] : "Unnamed"),
    address: d.display_name || "",
    lat: parseFloat(d.lat),
    lng: parseFloat(d.lon),
    website: d.extratags?.website,
    osm_id: d.osm_id,
  }));
}

export default async function YourMasajidPage() {
  const masajid = await fetchMasajid();

  return (
    <div className="bg-[var(--background)] min-h-screen py-12">
      <div className="container-base">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Local Mosques</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore local masajid and community centers in the Ottawa–Gatineau region.
          </p>
        </div>
        <div className="animate-slide-in-left">
          <YourMasajidClient initialMosques={masajid} />
        </div>
      </div>
    </div>
  );
}
