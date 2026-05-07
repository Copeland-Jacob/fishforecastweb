"use client";
import { useLocationStore } from "@/store/locationStore";
import {
  Fish,
  Star,
  CloudSun,
  Wind,
  Gauge,
  Cloud,
  Thermometer,
  CirclePlus,
  Crown,
  Waves,
  Check,
} from "lucide-react";
import { useEffect, useState } from "react";
import LoadingWeather from "@/components/loadingWeather";
import LocationCard from "@/components/LocationCard";
import LocationBar from "@/components/LocationBar";
import ScoreGraph from "@/components/ScoreGraph";

export default function Dashboard() {
  const [rating, setRating] = useState<any>(null);
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState<any>(null);

  const [windRating, setWindRating] = useState<any>(null);
  const [tempRating, setTempRating] = useState<any>(null);
  const [pressureRating, setPressureRating] = useState<any>(null);
  const [cloudRating, setCloudRating] = useState<any>(null);
  const [weatherRating, setWeatherRating] = useState<any>(null);

  const location = useLocationStore((state) => state.location);

  useEffect(() => {
    if (!location) return;
    setLoading(true);
    const getWeather = async () => {
      const res = await fetch(
        `/api/weather?lat=${location.lat}&lon=${location.lon}`,
      );

      const data = await res.json();
      setWeather(data.weather.current);
    };
    getWeather();

    const getScore = async () => {
      const res = await fetch(
        `/api/forecast?lat=${location.lat}&lon=${location.lon}`,
      );

      const data = await res.json();

      console.log(data);

      setScore(data.score);

      if (data.score >= 0 && data.score < 20) setRating(1);
      if (data.score >= 20 && data.score < 40) setRating(2);
      if (data.score >= 40 && data.score <= 60) setRating(3);
      if (data.score > 60 && data.score < 90) setRating(4);
      if (data.score >= 90) setRating(5);

      if (data.weatherScore === 3) setWeatherRating(3);
      if (data.weatherScore === 2) setWeatherRating(2);
      if (data.weatherScore === 1) setWeatherRating(1);

      if (data.tempScore === 3) setTempRating(3);
      if (data.tempScore === 2) setTempRating(2);
      if (data.tempScore === 1) setTempRating(1);

      if (data.windScore === 3) setWindRating(3);
      if (data.windScore === 2) setWindRating(2);
      if (data.windScore === 1) setWindRating(1);

      if (data.pressureScore === 3) setPressureRating(3);
      if (data.pressureScore === 2) setPressureRating(2);
      if (data.pressureScore === 1) setPressureRating(1);

      if (data.cloudScore === 3) setCloudRating(3);
      if (data.cloudScore === 2) setCloudRating(2);
      if (data.cloudScore === 1) setCloudRating(1);
    };
    getScore();

    setLoading(false);
  }, [location]);

  return (
    <main className="w-[calc(100vw-55px)] h-[calc(100vw-20px)] bg-[#0C1F2D] flex flex-row">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row w-200 h-90 bg-[#102738] rounded-lg mt-3 ml-3 border-2 border-[#162A39]">
          {/* Main Score */}

          <div className="w-1/2 h-90 ">
            <p className="mt-2 font-bold ml-3">
              {location ? location.city : "Select a Location"}
            </p>
            <div className="flex flex-col items-center">
              <div className="relative w-75 h-75 justify-center">
                <img
                  src="./images/ring.png"
                  className="w-full  drop-shadow-[0_0_12px_rgba(21,238,237,0.35)]"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Fish className="absolute top-12 w-12 h-12 text-[#15EEED] shadow-[0_10px_30px_rgba(0,0,0,.28)]" />
                  {score ? (
                    <p className=" text-[90px] font-semibold drop-shadow-[0_4px_12px_rgba(0,0,0,.55)]">
                      {score}
                    </p>
                  ) : (
                    <p className="absolute top-20 text-[90px] font-semibold">
                      NA
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-center mt-2">
                  {rating == 1 && (
                    <>
                      <p className="absolute top-48 text-[30px] text-red-400 font-bold">
                        Poor
                      </p>
                      <div className="flex flex-row gap-2">
                        <Star className="w-7 h-7 fill-yellow-500 text-yellow-600" />
                        <Star className="w-7 h-7 fill-gray-500 text-gray-600" />
                        <Star className="w-7 h-7 fill-gray-500 text-gray-600" />
                        <Star className="w-7 h-7 fill-gray-500 text-gray-600" />
                        <Star className="w-7 h-7 fill-gray-500 text-gray-600" />
                      </div>

                      <div className="flex flex-col items-center w-full">
                        <p className="mt-1  text-xl text-gray-300">
                          Fish are not very active
                        </p>
                        <p className=" text-gray-400">Bad time to catch fish</p>
                      </div>
                    </>
                  )}
                  {rating == 2 && (
                    <>
                      <p className="absolute top-48 text-[30px] text-amber-400 font-bold">
                        Rough
                      </p>
                      <div className="flex flex-row gap-2">
                        <Star className="w-7 h-7 fill-yellow-500 text-yellow-600" />
                        <Star className="w-7 h-7 fill-yellow-500 text-yellow-600" />
                        <Star className="w-7 h-7 fill-gray-500 text-gray-600" />
                        <Star className="w-7 h-7 fill-gray-500 text-gray-600" />
                        <Star className="w-7 h-7 fill-gray-500 text-gray-600" />
                      </div>

                      <div className="flex flex-col items-center w-full">
                        <p className="mt-1  text-xl text-gray-300">
                          Fish are somewhat active
                        </p>
                        <p className=" text-gray-400">
                          Rough time to catch fish
                        </p>
                      </div>
                    </>
                  )}
                  {rating == 3 && (
                    <>
                      <p className="absolute top-48 text-[30px] text-[#d1ff2b] font-bold">
                        Decent
                      </p>
                      <div className="flex flex-row gap-2">
                        <Star className="w-7 h-7 fill-yellow-500 text-yellow-600" />
                        <Star className="w-7 h-7 fill-yellow-500 text-yellow-600" />
                        <Star className="w-7 h-7 fill-yellow-500 text-yellow-600" />
                        <Star className="w-7 h-7 fill-gray-500 text-gray-600" />
                        <Star className="w-7 h-7 fill-gray-500 text-gray-600" />
                      </div>

                      <div className="flex flex-col items-center w-full">
                        <p className="mt-1  text-xl text-gray-300">
                          Fish are moderately active
                        </p>
                        <p className=" text-gray-400">
                          Decent time to catch fish
                        </p>
                      </div>
                    </>
                  )}
                  {rating == 4 && (
                    <>
                      <p className="absolute top-48 text-[30px] text-green-400 font-bold">
                        Good
                      </p>
                      <div className="flex flex-row gap-2 ">
                        <Star className="w-7 h-7 fill-yellow-500 text-yellow-600" />
                        <Star className="w-7 h-7 fill-yellow-500 text-yellow-600" />
                        <Star className="w-7 h-7 fill-yellow-500 text-yellow-600" />
                        <Star className="w-7 h-7 fill-yellow-500 text-yellow-600" />
                        <Star className="w-7 h-7 fill-gray-500 text-gray-600" />
                      </div>

                      <div className="flex flex-col items-center w-full">
                        <p className="mt-1  text-xl text-gray-300">
                          Fish are pretty active
                        </p>
                        <p className=" text-gray-400">
                          Good time to catch fish
                        </p>
                      </div>
                    </>
                  )}
                  {rating == 5 && (
                    <>
                      <p className="absolute top-48 text-[28px] text-[#05daff] font-bold">
                        Excellent
                      </p>
                      <div className="flex flex-row gap-2">
                        <Star className="w-7 h-7 fill-yellow-500 text-yellow-600" />
                        <Star className="w-7 h-7 fill-yellow-500 text-yellow-600" />
                        <Star className="w-7 h-7 fill-yellow-500 text-yellow-600" />
                        <Star className="w-7 h-7 fill-yellow-500 text-yellow-600" />
                        <Star className="w-7 h-7 fill-yellow-500 text-yellow-600" />
                      </div>

                      <div className="flex flex-col items-center w-full">
                        <p className="mt-1  text-xl text-gray-300">
                          Fish are very active
                        </p>
                        <p className=" text-gray-400">
                          Excellent time to catch fish
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-px h-75 bg-gray-600 my-auto" />

          <div className="w-1/2 h-90 flex flex-col items-center justify-center">
            <p className="text-gray-400 text-lg pb-2">Key Factors</p>

            {/* Weather */}
            <div className="flex items-center justify-between w-4/5">
              <div className="flex items-center gap-2">
                <CloudSun className="w-10 h-10" />
                <p className="text-lg">Weather</p>
              </div>

              {weatherRating === 3 && (
                <p className="text-lg text-green-400">Good</p>
              )}
              {weatherRating === 2 && (
                <p className="text-lg text-yellow-400">Decent</p>
              )}
              {weatherRating === 1 && (
                <p className="text-lg text-red-400">Poor</p>
              )}
            </div>

            <div className="h-px w-4/5 bg-gray-600 my-2" />

            {/* Wind */}
            <div className="flex items-center justify-between w-4/5">
              <div className="flex items-center gap-2">
                <Wind className="w-10 h-10" />

                <div className="flex flex-col leading-tight">
                  <p className="text-lg">Wind</p>
                  {weather ? (
                    <p className="text-sm text-gray-400">
                      {Math.round(weather.wind_mph)} mph
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400">Loading...</p>
                  )}
                </div>
              </div>

              {windRating === 3 && (
                <p className="text-lg text-green-400">Good</p>
              )}
              {windRating === 2 && (
                <p className="text-lg text-yellow-400">Decent</p>
              )}
              {windRating === 1 && <p className="text-lg text-red-400">Poor</p>}
            </div>

            <div className="h-px w-4/5 bg-gray-600 my-2" />

            {/* Pressure */}
            <div className="flex items-center justify-between w-4/5">
              <div className="flex items-center gap-2">
                <Gauge className="w-10 h-10" />

                <div className="flex flex-col leading-tight">
                  <p className="text-lg">Pressure</p>
                  {weather ? (
                    <p className="text-sm text-gray-400">
                      {weather.pressure_in} inHg
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400">Loading...</p>
                  )}
                </div>
              </div>

              {pressureRating === 3 && (
                <p className="text-lg text-green-400">Good</p>
              )}
              {pressureRating === 2 && (
                <p className="text-lg text-yellow-400">Decent</p>
              )}
              {pressureRating === 1 && (
                <p className="text-lg text-red-400">Poor</p>
              )}
            </div>

            <div className="h-px w-4/5 bg-gray-600 my-2" />

            {/* Cloud Cover */}
            <div className="flex items-center justify-between w-4/5">
              <div className="flex items-center gap-2">
                <Cloud className="w-10 h-10" />

                <div className="flex flex-col leading-tight">
                  <p className="text-lg">Cloud Cover</p>
                  {weather ? (
                    <p className="text-sm text-gray-400">{weather.cloud}%</p>
                  ) : (
                    <p className="text-sm text-gray-400">Loading...</p>
                  )}
                </div>
              </div>

              {cloudRating === 3 && (
                <p className="text-lg text-green-400">Good</p>
              )}
              {cloudRating === 2 && (
                <p className="text-lg text-yellow-400">Decent</p>
              )}
              {cloudRating === 1 && (
                <p className="text-lg text-red-400">Poor</p>
              )}
            </div>

            <div className="h-px w-4/5 bg-gray-600 my-2" />

            {/* Temp */}
            <div className="flex items-center justify-between w-4/5">
              <div className="flex items-center gap-2">
                <Thermometer className="w-10 h-10" />

                <div className="flex flex-col leading-tight">
                  <p className="text-lg">Temp</p>
                  {weather ? (
                    <p className="text-sm text-gray-400">
                      {Math.round(weather.temp_f)}°
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400">Loading...</p>
                  )}
                </div>
              </div>

              {tempRating === 3 && (
                <p className="text-lg text-green-400">Good</p>
              )}
              {tempRating === 2 && (
                <p className="text-lg text-yellow-400">Decent</p>
              )}
              {tempRating === 1 && <p className="text-lg text-red-400">Poor</p>}
            </div>
          </div>
        </div>

        {/* Score Graph */}

        <div className="w-200 h-50 bg-[#102738] rounded-lg border-2 border-[#162A39]">
          <ScoreGraph />
        </div>

        {/* Locations */}

        <LocationBar />
      </div>

      <div className="flex flex-col gap-2">
        {/* Weather */}

        {loading && <LoadingWeather />}

        {weather && (
          <div className="w-103 h-60 bg-[#102738] rounded-lg mt-3 ml-3 border-2 border-[#162A39]">
            <p className="mt-3 ml-3 font-bold">Current Conditions</p>
            <div className="flex flex-row">
              <img
                src="/images/cloud-sun.png"
                className="w-25 h-25 ml-12 mt-3"
              />

              <div className="w-px h-25 bg-gray-600 mt-2 mx-auto" />

              <div className="flex flex-col mr-10">
                <p className="text-[50px] mt-2 mr-5 ml-3">
                  {Math.round(weather.temp_f)}
                  <span className="text-xl">°F</span>
                </p>
                <p className="text-sm text-gray-400">Partly Cloudy</p>
              </div>
            </div>

            <div className="flex flex-row gap-5 mx-15 mt-5">
              <div>
                <p>Feels Like</p>
                <p>{Math.round(weather.feelslike_f)}°F</p>
              </div>
              <div className="w-px h-15 bg-gray-600" />
              <div>
                <p>Humidity</p>
                <p>{Math.round(weather.humidity)}%</p>
              </div>
              <div className="w-px h-15 bg-gray-600" />
              <div>
                <p>Wind</p>
                <p>{Math.round(weather.wind_mph)} mph</p>
              </div>
            </div>
          </div>
        )}

        {/* Best Times */}

        <div className="w-103 h-35 bg-[#102738] rounded-lg ml-3 border-2 border-[#162A39]">
          <p className="font-bold mt-3 ml-3">Best Times to Fish</p>
          <div className="flex flex-row gap-2  ml-3">
            <Crown className="text-yellow-600 fill-yellow-500 mt-2 w-8 h-8" />
            <p className="mt-3">Major:</p>
            <div className="ml-22">
              <p>5:23 AM - 7:23 AM</p>
              <p>5:45 PM - 7:45 PM</p>
            </div>
          </div>

          <div className="flex flex-row gap-2 mt-1 ml-3">
            <Waves className="text-blue-400 mt-2 w-8 h-8" />
            <p className="mt-3">Minor:</p>
            <div className="ml-22 mt-3">
              <p>11:12 AM - 1:12 PM</p>
            </div>
          </div>
        </div>

        {/* Upgrade to Premium */}

        <div className="w-103 h-62 bg-[#102738] rounded-lg ml-3 border-2 border-[#162A39] relative">
          <p className="text-2xl text-yellow-500 font-bold mt-2 ml-3">
            Upgrade to Premium
          </p>
          <div className="flex flex-row gap-1 ml-3 mt-1">
            <Check className="text-green-400" />
            <p>7 Day Forecast</p>
          </div>

          <div className="flex flex-row gap-1 ml-3 mt-2">
            <Check className="text-green-400" />
            <p>Advanced Maps</p>
          </div>

          <div className="flex flex-row gap-1 ml-3 mt-2">
            <Check className="text-green-400" />
            <p>Unlimited Access to AI Coach</p>
          </div>

          <div className="flex flex-row gap-1 ml-3 mt-2">
            <Check className="text-green-400" />
            <p>Ad-Free Experience</p>
          </div>
        </div>

        <div className="w-60 h-15 bg-[#0babb7] relative bottom-20 left-25 flex justify-center rounded-lg hover:bg-[#088a93] drop-shadow-[0_0_12px_rgba(21,238,237,0.35)]">
          <p className="font-bold mt-4 text-xl">Upgrade Now!</p>
        </div>
      </div>
    </main>
  );
}
