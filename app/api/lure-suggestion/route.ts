import { NextResponse } from "next/server";

const ICON_KEYS = [
  "crankbait",
  "worm",
  "topwater",
  "jig",
  "swimbait",
  "spinnerbait",
  "other",
] as const;

const SYSTEM_PROMPT = `You are an expert bass fishing coach. You will receive current weather/water
conditions as JSON. Respond with ONLY valid JSON (no markdown, no commentary, no code fences) matching
this exact shape:

{
  "conditions": [
    { "label": "Water Temp", "value": "68°F" },
    { "label": "Clarity", "value": "Slightly Stained" },
    { "label": "Sky", "value": "Overcast" },
    { "label": "Pressure", "value": "Falling" },
    { "label": "Best Depth", "value": "4-8 ft" }
  ],
  "topPick": {
    "name": "Spinnerbait — Chartreuse/White",
    "match": 92,
    "explanation": "1-2 sentence reasoning tied to the conditions"
  },
  "lures": [
    {
      "name": "Lipless Crankbait",
      "type": "Red / Craw pattern",
      "match": 85,
      "depth": "3-6 ft",
      "tags": ["Covers water fast", "Overcast"],
      "icon": "crankbait"
    }
  ]
}

Rules:
- Return exactly 7 lures in "lures", sorted by "match" descending.
- "icon" must be one of: ${ICON_KEYS.join(", ")}. Pick whichever fits the lure type best.
- Base every value on the actual conditions you're given, for the given fish behavior specifically.
- Remember that some fish prefer lures and others prefer natural live bait
-Remember fish behavior and that topwater is strong during morning and evening
- Output raw JSON only. No backticks, no prose before or after.
Return ONLY valid JSON.
Do not include markdown, explanations, or comments.
Escape all quotation marks inside strings.
Make sure the JSON can be parsed with JSON.parse().
Use double quotes for all keys and string values.`

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!process.env.GROQ_KEY) {
      return NextResponse.json({ error: "Missing GROQ_KEY env var" }, { status: 500 });
    }

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        response_format: { type: "json_object" },
        temperature: 0.7,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: JSON.stringify(body.context ?? {}) },
        ],
      }),
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      return NextResponse.json(
        { error: `Groq request failed: ${groqRes.status} ${errText}` },
        { status: 502 },
      );
    }

    const groqData = await groqRes.json();
    const raw = groqData?.choices?.[0]?.message?.content;

    if (!raw) {
      return NextResponse.json({ error: "No content returned from model" }, { status: 502 });
    }

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: "Model did not return valid JSON", raw },
        { status: 502 },
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}