import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q) {
      return NextResponse.json({ results: [] });
    }

    const apiKey = process.env.GEO_KEY;

    if (!apiKey) {
      return NextResponse.json({
        error: "Missing GEO_KEY",
        results: [],
      });
    }

    const res = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(q)}&apiKey=${apiKey}`
    );

    const data = await res.json();

    const results =
      data.features?.map((item: any, index: number) => ({
        id: index,
        name: item.properties.formatted,
        city: item.name,
        state: item.region,
        lat: item.properties.lat,
        lon: item.properties.lon,
      })) || [];

    return NextResponse.json({ results });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      error: "Search failed",
      results: [],
    });
  }
}