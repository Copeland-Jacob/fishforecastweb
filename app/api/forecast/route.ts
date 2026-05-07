import { getWeather } from "@/lib/weather";
import timeToNum, {
  calculateCloudScore,
  calculateForecast,
  calculatePressureScore,
  calculateTempScore,
  calculateWeatherScore,
  calculateWindScore,
} from "@/lib/forecast";
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

  const score = calculateForecast(weather);
  const windScore = calculateWindScore(weather);
  const tempScore = calculateTempScore(weather);
  const pressureScore = calculatePressureScore(weather);
  const cloudScore = calculateCloudScore(weather);
  const weatherScore = calculateWeatherScore(weather);
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
