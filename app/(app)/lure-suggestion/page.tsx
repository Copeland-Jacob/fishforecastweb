"use client"

import { useState } from "react";

const SPECIES = ["Largemouth Bass", "Walleye", "Crappie", "Catfish"];

const CONDITIONS = [
  { label: "Water Temp", value: "68°F" },
  { label: "Clarity", value: "Slightly Stained" },
  { label: "Sky", value: "Overcast" },
  { label: "Pressure", value: "Falling ↓", teal: true },
  { label: "Best Depth", value: "4–8 ft" },
];

const LURES = [
  {
    name: "Lipless Crankbait",
    type: "Red / Craw pattern",
    match: 85,
    depth: "3–6 ft",
    tags: ["Covers water fast", "Overcast"],
    icon: <path d="M4 12l16-6-4 6 4 6-16-6z" />,
  },
  {
    name: "Texas-Rigged Worm",
    type: 'Green Pumpkin, 7"',
    match: 79,
    depth: "2–10 ft",
    tags: ["Slow presentation", "Cover/weeds"],
    icon: <path d="M12 3v14M8 13l4 4 4-4M7 6h10" />,
  },
  {
    name: "Popper Topwater",
    type: "Bone / Silver",
    match: 74,
    depth: "Surface",
    tags: ["Low light bite", "Calm surface"],
    icon: (
      <>
        <circle cx="12" cy="9" r="3" />
        <path d="M12 12v9M8 21h8" />
      </>
    ),
  },
  {
    name: "Jig & Craw Trailer",
    type: "Black/Blue",
    match: 68,
    depth: "5–12 ft",
    tags: ["Bottom contact", "Stained water"],
    icon: <path d="M4 4l16 16M4 20L20 4" />,
  },
  {
    name: "Paddle Tail Swimbait",
    type: "Shad / Silver",
    match: 61,
    depth: "4–9 ft",
    tags: ["Open water", "Steady retrieve"],
    icon: <ellipse cx="12" cy="12" rx="7" ry="3" />,
  },
];

const NAV_ITEMS = [
  {
    label: "Dashboard",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
  },
  {
    label: "Map",
    icon: <path d="M9 20L3 17V4l6 3m0 13l6-3m-6 3V7m6 10l6 3V7l-6-3m0 13V4m0 3L9 4" />,
  },
  {
    label: "AI Coach",
    icon: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
      </>
    ),
  },
  {
    label: "Lures",
    fullLabel: "Lure Suggestion",
    icon: <path d="M4 20L20 4M4 20l4-1 10-10-3-3L5 16l-1 4z" />,
    active: true,
  },
  {
    label: "Text",
    icon: <path d="M21 11.5a8.38 8.38 0 01-4.4 7.35A8.5 8.5 0 013 12.5 8.5 8.5 0 0111.5 4a8.38 8.38 0 017.35 4.4z" />,
  },
];

export default function LureSuggestionPage() {
  const [selectedSpecies, setSelectedSpecies] = useState("Largemouth Bass");

  return (
    <div className="min-h-screen bg-[#0C1F2D] text-slate-100 font-sans pb-16 md:pb-0 overflow-y-auto w-full h-full">
      <div className="flex min-h-screen">
        {/* Sidebar - desktop only */}
        

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          

          <div className="flex flex-col gap-5 px-4 py-6 md:gap-6 md:px-8 md:py-7">
            {/* Page head */}
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-xl font-bold md:text-2xl">Lure Suggestions for Grinnell, Iowa</h1>
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

            {/* Conditions */}
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-slate-800 bg-[#102738] sm:grid-cols-3 md:flex md:gap-0">
              {CONDITIONS.map((c) => (
                <div key={c.label} className="flex flex-col gap-1 bg-slate-900 px-4 py-3.5 md:flex-1 md:border-r md:border-slate-800 md:last:border-r-0">
                  <div className="text-[11px] uppercase tracking-wide text-slate-400">{c.label}</div>
                  <div className={c.teal ? "text-sm font-semibold text-cyan-400 sm:text-[15px]" : "text-sm font-semibold sm:text-[15px]"}>
                    {c.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Top pick */}
            <div className="flex flex-col gap-4 rounded-2xl border border-teal-700 bg-gradient-to-br from-cyan-400/10 to-slate-900/40 p-5 sm:flex-row sm:items-center md:p-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-800">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.6">
                  <ellipse cx="12" cy="12" rx="8" ry="3.4" />
                  <path d="M4 12c1.5-1.5 3-2 4-2M20 12c-1.5 1.5-3 2-4 2" />
                  <circle cx="8" cy="12" r="0.6" fill="#22d3ee" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-[11px] font-bold uppercase tracking-wide text-amber-400">Top Pick Right Now</div>
                <h2 className="mt-1 text-lg font-bold sm:text-xl">Spinnerbait — Chartreuse/White</h2>
                <p className="mt-1.5 max-w-lg text-sm text-slate-400">
                  Falling pressure and stained water are pushing {selectedSpecies.toLowerCase()} shallow and
                  active. A bladed spinnerbait moves water they can feel, and the chartreuse tail stands out
                  in low visibility.
                </p>
              </div>
              <div
                className="mx-auto flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full sm:mx-0"
                style={{ background: "conic-gradient(#22d3ee 0% 92%, #1e293b 92% 100%)" }}
              >
                <div className="flex h-[58px] w-[58px] flex-col items-center justify-center rounded-full bg-slate-900">
                  <b className="text-base">92%</b>
                  <span className="text-[9px] text-slate-400">MATCH</span>
                </div>
              </div>
            </div>

            {/* Section title */}
            <div className="flex items-center gap-2.5 text-sm font-bold">
              More Lures Worth Tying On
              <span className="rounded-md border border-slate-800 bg-slate-800 px-2 py-1 text-[11px] font-bold text-cyan-400">
                {LURES.length} results
              </span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {LURES.map((lure) => (
                <div key={lure.name} className="flex flex-col gap-2.5 rounded-xl border border-slate-800 bg-slate-900 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-800 bg-slate-800">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.6">
                        {lure.icon}
                      </svg>
                    </div>
                    <div className="rounded-full border border-teal-700 bg-cyan-400/10 px-2.5 py-1 text-xs font-bold text-cyan-400">
                      {lure.match}% match
                    </div>
                  </div>
                  <h3 className="text-[15px] font-bold">{lure.name}</h3>
                  <div className="-mt-1.5 text-xs text-slate-400">{lure.type}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {lure.tags.map((t) => (
                      <div key={t} className="rounded-md border border-slate-800 bg-slate-800 px-2 py-1 text-[11px] text-slate-400">
                        {t}
                      </div>
                    ))}
                  </div>
                  <div className="mt-1 flex items-center justify-between border-t border-slate-800 pt-2.5">
                    <div className="text-xs text-slate-400">{lure.depth}</div>
                    <button className="text-xs font-bold text-cyan-400 hover:underline">View details →</button>
                  </div>
                </div>
              ))}

              <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-700 bg-slate-900 p-6 text-center">
                <div className="text-sm text-slate-400">
                  Unlock 12 more matched lures
                  <br />
                  and tackle box tracking
                </div>
                <button className="rounded-lg bg-cyan-400 px-5 py-2 text-sm font-bold text-slate-950">Upgrade</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom tab bar - mobile only */}
      <div className="fixed inset-x-0 bottom-0 z-10 flex items-center justify-around border-t border-slate-800 bg-slate-900 py-2 md:hidden">
        {NAV_ITEMS.map((item) => (
          <div
            key={item.label}
            className={
              item.active
                ? "flex flex-col items-center gap-1 px-2 text-cyan-400"
                : "flex flex-col items-center gap-1 px-2 text-slate-400"
            }
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
              {item.icon}
            </svg>
            <span className="text-[10px] font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
