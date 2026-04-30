export async function getWeather(lat: string, lon: string) {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_KEY}&q=${lat},${lon}&days=3&aqi=no&alerts=no`,
      { cache: "no-store" }
    );

    const data = await res.json();

    return data;
  } catch (error) {
    console.log("Weather fetch failed:", error);
    return null;
  }
}