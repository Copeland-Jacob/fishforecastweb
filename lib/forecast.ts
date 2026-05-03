export function calculateForecast(weather: any): number {
  // 1. Initial Baseline Score
  let score = 50;

  // 2. The Comfort Factor (Temperature & Heat Index)
  // We use feelslike_f because humidity/wind chill affects fish metabolism in shallow water.
  const feelsLike = weather.feelslike_f;
  if (feelsLike >= 60 && feelsLike <= 78) {
    score += 20; // Prime metabolic range
  } else if (feelsLike < 45 || feelsLike > 90) {
    score -= 20; // Fish go deep and get lethargic
  }

  // 3. The "Stealth" Factor (Wind & Visibility)
  // Wind creates surface chop which hides the fisherman.
  // High visibility (clear water/bright sun) makes fish spooky.
  const wind = weather.wind_mph;
  const visibility = weather.vis_miles;

  if (wind >= 5 && wind <= 15) {
    score += 15; // Perfect chop
  } else if (wind > 25) {
    score -= 25; // Impossible to manage gear/boat
  }

  if (visibility < 5) {
    score -= 10; // Often means heavy fog or murky conditions (harder for sight predators)
  }

  // 4. Feeding Triggers (Clouds, UV, and Rain)
  // Low UV + High Cloud = Aggressive feeding.
  if (weather.cloud > 70 || weather.uv < 3) {
    score += 15;
  } else if (weather.uv > 8) {
    score -= 10; // Harsh midday sun drives fish to deep cover
  }

  // Light rain (precip_in) oxygenates the surface.
  if (weather.precip_in > 0 && weather.precip_in < 0.1) {
    score += 15;
  } else if (weather.precip_in > 0.3) {
    score -= 15; // Heavy rain messes up water clarity (barbs/silt)
  }

  // 5. Pressure Stability
  // Since WeatherAPI provides a snapshot, we target the "Golden Range"
  const pressure = weather.pressure_in;
  if (pressure >= 29.8 && pressure <= 30.2) {
    score += 10; // Stable high activity
  } else if (pressure < 29.6) {
    score += 5; // Low pressure often precedes a bite, but can be messy
  }

  // 6. Time of Day / Light Transition
  // Golden hour (is_day transition) is huge.
  // We simulate this by checking if it's night (is_day: 0)
  if (weather.is_day === 0) {
    score += 10; // Night fishing/Dawn/Dusk boost
  }

  // 7. Safety & Harsh Conditions Check (The "Dealbreaker" Penalty)
  // If gusts are double the wind speed or UV is extreme, cap the potential.
  if (weather.gust_mph > weather.wind_mph * 1.5) {
    score -= 10;
  }

  // Final Clamp and Round
  return Math.round(Math.max(0, Math.min(100, score)));
}
