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
    <div className="container-base py-12">
      <h1 className="text-3xl font-bold">United Muslim Organizations of Ottawa–Gatineau</h1>
      <p className="mt-4 text-gray-700">
        Explore local masajid and community centers in the Ottawa–Gatineau region.
      </p>
      {/* pass fetched masajid to client component */}
      {/* @ts-expect-error Server -> Client prop */}
      <YourMasajidClient initialMosques={masajid} />
    </div>
  );
}
