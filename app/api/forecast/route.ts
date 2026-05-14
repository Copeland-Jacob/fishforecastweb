import { getWeather } from "@/lib/weather";
import timeToNum, { calculateForecast } from "@/lib/forecast";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({
      error: "Missing lat or lon",
    });
  }

  const data = await getWeather(lat, lon);

  const weather = data.current;

  const forecast = calculateForecast(weather);
  const score = forecast.score;
  const windScore = forecast.windScore;
  const tempScore = forecast.tempScore;
  const pressureScore = forecast.pressureScore;
  const cloudScore = forecast.cloudScore;
  const weatherScore = forecast.weatherScore;
  const time = timeToNum(weather.last_updated);

  return NextResponse.json({
    score,
    windScore,
    tempScore,
    pressureScore,
    cloudScore,
    weatherScore,
    time,
  });
}
