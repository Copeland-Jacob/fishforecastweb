import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { lat, lon } = await req.json();

  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_KEY}&q=${lat},${lon}`,
  );

  const data = await res.json();

  if (!data?.location) {
    return NextResponse.json(
      { error: "Geocode failed", raw: data },
      { status: 400 },
    );
  }

  return NextResponse.json({
    city: data.location.name,
    state: data.location.region,
    country: data.location.country,
    label: `${data.location.name}, ${data.location.region}`,
  });
}
