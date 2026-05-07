import { calculateForecast } from "@/lib/forecast";
import numToTime from "@/lib/numToTime";
import { getWeather } from "@/lib/weather";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  type Item = {
    score: number;
    time: String;
    day: number;
  };

  const { searchParams } = new URL(req.url);
  const scores: Item[] = [];

  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({
      error: "Missing lat or lon",
    });
  }

  const data = await getWeather(lat, lon);

  const weather = data.forecast;

  for (let day = 0; day < 3; day++) {
    for (let hour = 0; hour < 24; hour++) {
      const score = await calculateForecast(
        weather.forecastday[day].hour[hour],
      );
      const time = numToTime(hour);
      scores.push({
        score,
        time,
        day,
      });
    }
  }

  const dayOneData = scores.filter((day) => day.day === 0);
  const dayTwoData = scores.filter((day) => day.day === 1);
  const dayThreeData = scores.filter((day) => day.day === 2);

  return NextResponse.json({ dayOneData, dayTwoData, dayThreeData });
}
