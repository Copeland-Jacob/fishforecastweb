"use client";

import { useState, useEffect } from "react";
import { useLocationStore } from "@/store/locationStore";
import { Star } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const setLocation = useLocationStore((state) => state.setLocation);

  const addLocation = async (item: any) => {
    try {
      const geoRes = await fetch("/api/geocode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat: item.lat,
          lon: item.lon,
        }),
      });

      const geo = await geoRes.json();

      const payload = {
        lat: item.lat,
        lon: item.lon,
        city: geo.label, // "Grinnell, Iowa"
      };

      const res = await fetch("/api/location/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.log("Failed to save location");
        return;
      }

      window.dispatchEvent(new Event("locationAdded"));
    } catch (err) {
      console.error("Add location error:", err);
    }
  };

  // 📍 Select location (sets Zustand state)
  const handleSelect = async (item: any) => {
    try {
      const geoRes = await fetch("/api/geocode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat: item.lat,
          lon: item.lon,
        }),
      });

      const geo = await geoRes.json();

      setLocation({
        name: item.name,
        city: geo.city,
        state: geo.state,
        lat: item.lat,
        lon: item.lon,
      });

      setQuery(item.name);
      setResults([]);
      setFocused(false);
    } catch (err) {
      console.error("Select location error:", err);
    }
  };

  // 🔍 Search API
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query) {
        setResults([]);
        return;
      }

      setLoading(true);

      try {
        const res = await fetch(`/api/search?q=${query}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error("Search error:", err);
      }

      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-full max-w-md">
      {/* INPUT */}
      <input
        className="w-full h-12 px-4 rounded-xl bg-[#102733] hover:bg-[#132d3b] text-white outline-none trasnition duration-300"
        placeholder="Search lakes, cities..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
      />

      {/* LOADING */}
      {loading && (
        <div className="absolute right-4 top-3 text-sm text-gray-400">...</div>
      )}

      {/* RESULTS DROPDOWN */}
      {focused && results.length > 0 && (
        <div className="absolute top-14 left-0 w-full bg-[#102733] rounded-xl border border-[#1e4456] z-50 overflow-hidden shadow-lg">
          {results.map((item) => (
            <div
              key={item.id}
              className="px-4 py-3 hover:bg-[#173646] cursor-pointer border-b border-[#1e4456] flex items-center justify-between"
              onClick={() => handleSelect(item)}
            >
              <span>{item.name}</span>

              <Star
                className="w-5 h-5 text-gray-500 hover:text-yellow-400 transition cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  addLocation(item);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
