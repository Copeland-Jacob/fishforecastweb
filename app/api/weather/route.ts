import { getWeather } from "@/lib/weather";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
  const { searchParams } = new URL(req.url);

  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon){
    return NextResponse.json({
        error: "missing lat or lon",
        results: []
    })
  }

  const weather = await getWeather(lat, lon)

  return NextResponse.json({ weather });

}