"use client";

import { useState, useEffect } from "react";
import { useLocationStore } from "@/store/locationStore";

const SPECIES = ["Largemouth Bass", "Walleye", "Crappie", "Catfish"];

type Lure = {
  name: string;
  type: string;
  match: number;
  depth: string;
  tags: string[];
  icon: string;
};

type Condition = { label: string; value: string };

type TopPick = { name: string; match: number; explanation: string };

// Maps the AI's icon key -> actual SVG paths. Add more keys here as needed.
const ICON_MAP: Record<string, React.ReactNode> = {
  crankbait: <path d="M4 12l16-6-4 6 4 6-16-6z" />,
  worm: <path d="M12 3v14M8 13l4 4 4-4M7 6h10" />,
  topwater: (
    <>
      <circle cx="12" cy="9" r="3" />
      <path d="M12 12v9M8 21h8" />
    </>
  ),
  jig: <path d="M4 4l16 16M4 20L20 4" />,
  swimbait: <ellipse cx="12" cy="12" rx="7" ry="3" />,
  spinnerbait: (
    <>
      <ellipse cx="12" cy="12" rx="8" ry="3.4" />
      <path d="M4 12c1.5-1.5 3-2 4-2M20 12c-1.5 1.5-3 2-4 2" />
    </>
  ),
  other: <path d="M4 20L20 4M4 20l4-1 10-10-3-3L5 16l-1 4z" />,
};


export default function Page() {
  const location = useLocationStore((state) => state.location);
  const [selectedSpecies, setSelectedSpecies] = useState("Largemouth Bass");
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [lures, setLures] = useState<Lure[]>([]);
  const [topPick, setTopPick] = useState<TopPick | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!location) return;

    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const weatherRes = await fetch(
          `/api/weather?lat=${location.lat}&lon=${location.lon}`,
        );
        if (!weatherRes.ok) throw new Error("Failed to fetch weather");
        const weatherJson = await weatherRes.json();
        const weatherData = weatherJson.weather.current;

        const suggestionRes = await fetch("/api/lure-suggestion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            context: { ...weatherData, species: selectedSpecies },
          }),
        });

        const data = await suggestionRes.json();
        if (data.error) throw new Error(data.error);
        if (cancelled) return;

        setConditions(data.conditions ?? []);
        setLures(data.lures ?? []);
        setTopPick(data.topPick ?? null);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [location, selectedSpecies]);

  return (
    <div className="min-h-screen bg-[#0C1F2D] text-slate-100 font-sans pb-16 md:pb-0 overflow-y-auto w-full h-full">
      {!location && (
        <p className="w-65 text-center mx-auto align-middle mt-85">Select a location using the search bar above to get started!</p>
      )}
      {location && (
        <div className="flex min-h-screen">
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex flex-col gap-5 px-4 py-6 md:gap-6 md:px-8 md:py-7">
              {/* Page head */}
              <div className="flex flex-col gap-4">
                <div>
                  <h1 className="text-xl font-bold md:text-2xl">
                    Lure Suggestions for {location.name}
                  </h1>
                  <p className="mt-1 text-sm text-slate-400">
                    Based on today's water temp, clarity, and pressure trend
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="mr-1 text-sm text-slate-400">Target:</span>
                  {SPECIES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSpecies(s)}
                      className={
                        selectedSpecies === s
                          ? "rounded-full bg-cyan-400 px-4 py-2 text-xs font-bold text-slate-950 sm:text-sm"
                          : "rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-100 sm:text-sm"
                      }
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="rounded-lg border border-red-800 bg-red-950/40 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              {loading && (
                <div className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-400">
                  Reading conditions and picking lures…
                </div>
              )}

              {/* Conditions */}
              {conditions.length > 0 && (
                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-slate-800 bg-[#102738] sm:grid-cols-3 md:flex md:gap-0">
                  {conditions.map((c) => (
                    <div
                      key={c.label}
                      className="flex flex-col gap-1 bg-slate-900 px-4 py-3.5 md:flex-1 md:border-r md:border-slate-800 md:last:border-r-0"
                    >
                      <div className="text-[11px] uppercase tracking-wide text-slate-400">
                        {c.label}
                      </div>
                      <div
                        className={
                          c.label === "Pressure"
                            ? "text-sm font-semibold text-cyan-400 sm:text-[15px]"
                            : "text-sm font-semibold sm:text-[15px]"
                        }
                      >
                        {c.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Top pick */}
              {topPick && (
                <div className="flex flex-col gap-4 rounded-2xl border border-teal-700 bg-gradient-to-br from-cyan-400/10 to-slate-900/40 p-5 sm:flex-row sm:items-center md:p-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-800">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#22d3ee"
                      strokeWidth="1.6"
                    >
                      <ellipse cx="12" cy="12" rx="8" ry="3.4" />
                      <path d="M4 12c1.5-1.5 3-2 4-2M20 12c-1.5 1.5-3 2-4 2" />
                      <circle cx="8" cy="12" r="0.6" fill="#22d3ee" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-bold uppercase tracking-wide text-amber-400">
                      Top Pick Right Now
                    </div>
                    <h2 className="mt-1 text-lg font-bold sm:text-xl">
                      {topPick.name}
                    </h2>
                    <p className="mt-1.5 max-w-lg text-sm text-slate-400">
                      {topPick.explanation}
                    </p>
                  </div>
                  <div
                    className="mx-auto flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full sm:mx-0"
                    style={{
                      background: `conic-gradient(#22d3ee 0% ${topPick.match}%, #1e293b ${topPick.match}% 100%)`,
                    }}
                  >
                    <div className="flex h-[58px] w-[58px] flex-col items-center justify-center rounded-full bg-slate-900">
                      <b className="text-base">{topPick.match}%</b>
                      <span className="text-[9px] text-slate-400">MATCH</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Section title */}
              {lures.length > 0 && (
                <div className="flex items-center gap-2.5 text-sm font-bold">
                  More Lures Worth Tying On
                  <span className="rounded-md border border-slate-800 bg-slate-800 px-2 py-1 text-[11px] font-bold text-cyan-400">
                    {lures.length} results
                  </span>
                </div>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {lures.map((lure, i) => (
                  <div
                    key={`${lure.name}-${i}`}
                    className="flex flex-col gap-2.5 rounded-xl border border-slate-800 bg-slate-900 p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-800 bg-slate-800">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#22d3ee"
                          strokeWidth="1.6"
                        >
                          {ICON_MAP[lure.icon] ?? ICON_MAP.other}
                        </svg>
                      </div>
                      <div className="rounded-full border border-teal-700 bg-cyan-400/10 px-2.5 py-1 text-xs font-bold text-cyan-400">
                        {lure.match}% match
                      </div>
                    </div>
                    <h3 className="text-[15px] font-bold">{lure.name}</h3>
                    <div className="-mt-1.5 text-xs text-slate-400">
                      {lure.type}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {lure.tags.map((t, tagIndex) => (
                        <div
                          key={`${lure.name}-tag-${tagIndex}`}
                          className="rounded-md border border-slate-800 bg-slate-800 px-2 py-1 text-[11px] text-slate-400"
                        >
                          {t}
                        </div>
                      ))}
                    </div>
                    <div className="mt-1 flex items-center justify-between border-t border-slate-800 pt-2.5">
                      <div className="text-xs text-slate-400">{lure.depth}</div>
                      <button className="text-xs font-bold text-cyan-400 hover:underline">
                        View details →
                      </button>
                    </div>
                  </div>
                ))}

                <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-700 bg-slate-900 p-6 text-center">
                  <div className="text-sm text-slate-400">
                    Unlock 12 more matched lures
                    <br />
                    and tackle box tracking
                  </div>
                  <button className="rounded-lg bg-cyan-400 px-5 py-2 text-sm font-bold text-slate-950">
                    Upgrade
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}