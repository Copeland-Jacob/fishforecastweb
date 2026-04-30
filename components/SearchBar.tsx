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

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query) {
        setResults([]);
        return;
      }

      setLoading(true);

      const res = await fetch(`/api/search?q=${query}`);
      const data = await res.json();

      setResults(data.results);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-full max-w-md mt-4 ml-110">
      
      <input
  className="w-full h-12 px-4 rounded-xl bg-[#102733] text-white outline-none ml-3"
  placeholder="Search lakes, cities..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onFocus={() => setFocused(true)}
  onBlur={() => setTimeout(() => setFocused(false), 150)}
/>

      {loading && (
        <div className="absolute right-4 top-3 text-sm text-gray-400">
          ...
        </div>
      )}

      {focused && results.length > 0 && results.map((item) => (
  <div
    key={item.id}
    className="px-4 py-3 ml-8 bg-[#102733] hover:bg-[#173646] cursor-pointer border-b border-[#1e4456] flex items-center justify-between"
    onClick={() => {
      setLocation(item);
      setQuery(item.name);
      setResults([]);
    }}
  >
    <span>{item.name}</span>

    <Star className="w-5 h-5 text-gray-500 hover:text-yellow-400 transition" onClick={() => {}}/>
  </div>
))}
    </div>
  );
}