export default function timeToNum(time: string) {
  const split = time.split(" ");
  const timeOnly = split[1];
  const newTimeS = timeOnly.replace(":", "");
  const newTime = Number(newTimeS);
  return newTime;
}

export function calculateForecast(weather: any) {
  let weatherScore = 1;
  let windScore = 2;
  let pressureScore = 2;
  let cloudScore = 2;
  let tempScore = 2;

  // 1. Initial Baseline Score
  let score = 50;
  // 2. The Comfort Factor (Temperature & Heat Index)
  // We use feelslike_f because humidity/wind chill affects fish metabolism in shallow water.
  const temp = weather.temp_f;
  if (temp >= 60 && temp <= 78) {
    score += 10; // Prime metabolic range
    tempScore = 3;
    weatherScore++;
  } else if (temp < 45 || temp > 90) {
    score -= 10; // Fish go deep and get lethargic
    tempScore = 1;
  }

  const time = timeToNum(weather.last_updated || weather.time);

  if (time > 530 && time < 900) {
    score += 20;
  } else if (time >= 1830 && time < 2100) {
    score += 20;
  } else {
    score -= 5;
  }

  // 3. The "Stealth" Factor (Wind & Visibility)
  // Wind creates surface chop which hides the fisherman.
  // High visibility (clear water/bright sun) makes fish spooky.
  const wind = weather.wind_mph;
  console.log(wind);

  if (wind >= 5 && wind <= 10) {
    score += 10; // Perfect chop
    windScore = 3;
    weatherScore++;
  } else if (wind > 17) {
    score -= 10;
    windScore = 1;
  }

  console.log(windScore);

  // 4. Feeding Triggers (Clouds, UV, and Rain)
  // Low UV + High Cloud = Aggressive feeding.
  if (weather.cloud > 70 && weather.uv <= 7) {
    score += 10;
    cloudScore = 3;
    weatherScore++;
  } else if (weather.uv > 8) {
    score -= 10; // Harsh midday sun drives fish to deep cover
    cloudScore = 1;
  }

  // 5. Pressure Stability
  // Since WeatherAPI provides a snapshot, we target the "Golden Range"
  const pressure = weather.pressure_in;
  if (pressure >= 29.8 && pressure <= 30.2) {
    score += 10; // Stable high activity
    pressureScore = 3;
  } else if (pressure < 29.6) {
    score += 5; // Low pressure often precedes a bite, but can be messy
    pressureScore = 1;
  }

  // Final Clamp and Round
  return {
    score: Math.round(Math.max(0, Math.min(100, score))),
    windScore: windScore,
    weatherScore: Math.round(Math.max(0, Math.min(3, weatherScore))),
    tempScore: tempScore,
    pressureScore: pressureScore,
    cloudScore: cloudScore,
  };
}
