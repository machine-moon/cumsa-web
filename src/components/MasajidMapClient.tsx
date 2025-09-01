"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

type Mosque = {
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  website?: string;
};

// Use CDN marker to avoid bundling image assets
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function MasajidMapClient({ mosques }: { mosques: Mosque[] }) {
  if (!mosques || mosques.length === 0) {
    return <div className="p-4 text-sm text-gray-600">No masajid available.</div>;
  }

  const avgLat = mosques.reduce((s, m) => s + m.lat, 0) / mosques.length;
  const avgLng = mosques.reduce((s, m) => s + m.lng, 0) / mosques.length;

  return (
    <div className="rounded-xl overflow-hidden shadow ring-1 ring-black/10 bg-white">
      <MapContainer
        center={[avgLat, avgLng]}
        zoom={11}
        style={{ height: 480, width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mosques.map((m) => (
          <Marker key={m.name} position={[m.lat, m.lng]}>
            <Popup>
              <div className="max-w-xs">
                <div className="font-semibold">{m.name}</div>
                <div className="text-sm">{m.address}</div>
                {m.phone && <div className="text-sm">{m.phone}</div>}
                {m.website && (
                  <div className="mt-1">
                    <a href={m.website} target="_blank" rel="noreferrer" className="link-cta">
                      Website →
                    </a>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
