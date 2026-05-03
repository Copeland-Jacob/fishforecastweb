import { getWeather } from "@/lib/weather";
import { calculateForecast } from "@/lib/forecast";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
    const { searchParams } = new URL(req.url);

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if(!lat || !lon){
        return NextResponse.json({
            error: "Missing lat or lon"
        })
    }

    const data = await getWeather(lat, lon);

    const weather = data.current

    const score = calculateForecast(weather)

    return NextResponse.json({
        score
    })
}