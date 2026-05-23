"use client";

import Map, { Popup } from "react-map-gl/maplibre";
import { useState } from "react";
import type { StyleSpecification } from "maplibre-gl";
import { MapPin } from "lucide-react";
import { useLocationStore } from "@/store/locationStore";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [selected, setSelected] = useState<any>(null);
  const setLocation = useLocationStore((state) => state.setLocation);
  const [geo, setGeo] = useState<any>();

  const reverseGeocode = async (lat: number, lon: number) => {
    const res = await fetch("/api/geocode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lat, lon }),
    });

    if (!res.ok) {
      console.error(await res.text());
      return null;
    }

    return await res.json();
  };

  const forecastScore = async (lat: number, lon: number) => {
    const res = await fetch(`/api/forecast?lat=${lat}&lon=${lon}`);

    const data = await res.json();
    return data;
  };

  const style: StyleSpecification = {
    version: 8,
    sources: {
      osm: {
        type: "raster",
        tiles: [
          "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
          "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
          "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
        ],
        tileSize: 256,
        attribution: "© OpenStreetMap contributors",
      },
    },
    layers: [
      {
        id: "osm",
        type: "raster",
        source: "osm",
      },
    ],
  };

  const openDashboard = () => {
    setLocation({
      name: selected.name,
      city: geo.city,
      state: geo.state,
      lat: selected.lat,
      lon: selected.lon,
    });
    router.push("/dashboard");
  };

  return (
    <main className="w-full h-full bg-[#0C1F2D]">
      <Map
        initialViewState={{
          longitude: -95.388,
          latitude: 25.749,
          zoom: 4,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={style}
        onClick={async (e) => {
          const geocode = await reverseGeocode(e.lngLat.lat, e.lngLat.lng);
          setGeo(geocode);
          const score = await forecastScore(e.lngLat.lat, e.lngLat.lng);
          setSelected({
            lat: e.lngLat.lat,
            lon: e.lngLat.lng,
            name: geocode.label,
            score: score.score,
          });
        }}
      >
        {selected && (
          <Popup
            longitude={selected.lon}
            latitude={selected.lat}
            anchor="bottom"
            closeButton={false}
            closeOnClick={false}
            offset={10}
            onClose={() => setSelected(null)}
            className="w-55 h-20 pl-0"
          >
            <div className="rounded-2xl flex flex-row">
              <div className="flex flex-row my-auto">
                <MapPin className="w-8 h-8 my-auto text-black" />

                <div className="flex flex-col">
                  <p className="w-30 text-[13px] overflow-auto font-bold text-black">
                    {selected.name}
                  </p>

                  <button
                    className="text-blue-500 w-30 text-left"
                    onClick={openDashboard}
                  >
                    View in Dashboard
                  </button>
                </div>
              </div>

              <div className="w-14 h-14 rounded-full bg-blue-400 my-auto flex justify-center text-center items-center shrink-0">
                <p className="text-white text-2xl font-bold">
                  {selected.score}
                </p>
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </main>
  );
}
