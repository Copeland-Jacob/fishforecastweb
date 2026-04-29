import Image from "next/image";
import { Fish, Star, CloudSun, Wind, Gauge, Cloud, Thermometer, CirclePlus, Crown, Waves, Check} from "lucide-react";

export default function Home() {
  return (
    <main className="w-[calc(100vw-55px)] h-[calc(100vw-20px)] bg-[#0C1F2D] flex flex-row">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row w-200 h-90 bg-[#102738] rounded-lg mt-3 ml-3 border-2 border-[#162A39]">
          
          {/* Main Score */}

          <div className="w-1/2 h-90">
            <p className="mt-2 ml-2 font-bold">Grinnell, Iowa</p>
            <div className="relative ml-10">
              <img src="./images/ring.png" className="w-75 drop-shadow-[0_0_12px_rgba(21,238,237,0.35)]"/>
              <Fish className="absolute top-12 ml-32 w-12 h-12 text-[#15EEED] shadow-[0_10px_30px_rgba(0,0,0,.28)]"/>
              <p className="absolute top-20 text-[90px] font-semibold ml-25 drop-shadow-[0_4px_12px_rgba(0,0,0,.55)]">50</p>
              <p className="absolute top-48 text-[30px] text-green-400 ml-28 font-bold">Good</p>
            </div>

            <div className="flex flex-row gap-2 ml-27 mt-2">
              <Star className="w-7 h-7 fill-yellow-500 text-yellow-600"/>
              <Star className="w-7 h-7 fill-yellow-500 text-yellow-600"/>
              <Star className="w-7 h-7 fill-yellow-500 text-yellow-600"/>
              <Star className="w-7 h-7 fill-gray-500 text-gray-600"/>
              <Star className="w-7 h-7 fill-gray-500 text-gray-600"/>
            </div>

            <p className="mt-1 ml-20 text-xl text-gray-300">Fish are moderately active</p>
            <p className=" ml-25 text-gray-400">Good time to catch fish</p>

          </div>

          <div className="w-px h-75 bg-gray-600 my-auto"/>

          <div className="w-1/2 h-90">
            <p className="mt-3 text-gray-400 ml-7 text-lg pb-1">Key Factors</p>
            <div className="flex flex-row gap-2">
              <CloudSun className="ml-7 w-10 h-10 "/>
              <p className="mt-2 text-lg">Weather</p>
              <p className="mt-2 ml-43 text-lg text-green-400">Good</p>
            </div>
            <div className="h-px w-85 bg-gray-600 my-2 mx-auto" />

            <div className="flex flex-row gap-2">
              <Wind className="ml-7 mt-1 w-10 h-10"/>
              <div className="flex flex-col">
                <p className=" text-lg">Wind</p>
                <p className="text-sm text-gray-400">12 mph S</p>
              </div>
              <p className="mt-2 ml-45 text-lg text-green-400">Good</p>
            </div>
            <div className="h-px w-85 bg-gray-600 my-2 mx-auto" />

            <div className="flex flex-row gap-2">
              <Gauge className="ml-7 mt-1 w-10 h-10"/>
              <div className="flex flex-col">
                <p className="text-lg">Pressure</p>
                <p className="text-sm text-gray-400">30.12 inHg</p>
              </div>
              <p className="mt-2 ml-42 text-lg text-green-400">Good</p>
            </div>
            <div className="h-px w-85 bg-gray-600 my-2 mx-auto" />

            <div className="flex flex-row gap-2">
              <Cloud className="ml-7 mt-1 w-10 h-10"/>
              <div className="flex flex-col">
                <p className="mt-1 text-lg w-50">Cloud Cover</p>
                <p className="text-sm text-gray-400">89%</p>
              </div>
              <p className="mt-2 ml-10 text-lg text-green-400">Good</p>
            </div>
            <div className="h-px w-85 bg-gray-600 my-2 mx-auto" />

            <div className="flex flex-row gap-2">
              <Thermometer className="ml-7 w-10 h-10"/>
              <div>
                <p className="mt-0 text-lg">Temp</p>
                <p className="text-sm text-gray-400">72°</p>
              </div>
              <p className="mt-2 ml-49 text-lg text-green-400">Good</p>
            </div>
          </div>
        </div>

        {/* Score Graph */}

        <div className="w-200 h-50 bg-[#102738] rounded-lg ml-3 border-2 border-[#162A39]">
          <p className="text-center mt-20">Imagine a graph here</p>
        </div>

        {/* Locations */}

        <div className="w-200 h-17 bg-[#102738] rounded-lg ml-3 border-2 border-[#162A39] flex flex-row gap-.5">
          <div className="w-1/4 h-15 bg-[#284B5A] mt-px ml-1 rounded-xl relative">
            <p className="mt-2 ml-1">Grinnell, Iowa</p>
            <p className="ml-1 text-sm text-gray-400">Current Location</p>
            
            <p className="text-green-400 text-2xl font-bold absolute top-4 right-3">60</p>
          </div>

          <div className="w-1/4 h-15 bg-[#284B5A] mt-px ml-1 rounded-xl relative">
            <p className="mt-2 ml-1">Grinnell, Iowa</p>
            <p className="ml-1 text-sm text-gray-400">Current Location</p>
            
            <p className="text-green-400 text-2xl font-bold absolute top-4 right-3">60</p>
          </div>

          <div className="w-1/4 h-15 bg-[#284B5A] mt-px ml-1 rounded-xl relative">
            <p className="mt-2 ml-1">Grinnell, Iowa</p>
            <p className="ml-1 text-sm text-gray-400">Current Location</p>
            
            <p className="text-green-400 text-2xl font-bold absolute top-4 right-3">60</p>
          </div>

          <div className="w-1/4 h-15 bg-[#284B5A] mt-px ml-1 rounded-xl relative">
            <p className="mt-2 ml-1">Add Location</p>
            <p className="ml-1 text-sm text-gray-400">Track another Spot</p>
            
            <CirclePlus className="text-gray-400 absolute top-5 right-3" />
          </div>
        </div>
      </div>

      {/* Weather */}

      <div className="flex flex-col gap-2"> 
        <div className="w-103 h-60 bg-[#102738] rounded-lg mt-3 ml-3 border-2 border-[#162A39]">
          <p className="mt-3 ml-3 font-bold">Current Conditions</p>
          <div className="flex flex-row">
            <img src="/images/cloud-sun.png" className="w-25 h-25 ml-12 mt-3" />

            <div className="w-px h-25 bg-gray-600 mt-2 mx-auto"/>

            <div className="flex flex-col mr-10">
              <p className="text-[50px] mt-2 mr-5 ml-3">60<span className="text-xl">°F</span></p>
              <p className="text-sm text-gray-400">Partly Cloudy</p>
            </div>
          </div>

          <div className="flex flex-row gap-5 mx-15 mt-5">
            <div>
              <p>Feels Like</p>
              <p>58°F</p>
            </div>
            <div className="w-px h-15 bg-gray-600"/>
            <div>
              <p>Humidity</p>
              <p>64%</p>
            </div>
            <div className="w-px h-15 bg-gray-600"/>
            <div>
              <p>Wind</p>
              <p>12 mph S</p>
            </div>
          </div>
        </div>

        {/* Best Times */}

        <div className="w-103 h-35 bg-[#102738] rounded-lg ml-3 border-2 border-[#162A39]">
          <p className="font-bold mt-3 ml-3">Best Times to Fish</p>
          <div className="flex flex-row gap-2  ml-3">
            <Crown className="text-yellow-600 fill-yellow-500 mt-2 w-8 h-8"/>
            <p className="mt-3">Major:</p>
            <div className="ml-22">
              <p>5:23 AM - 7:23 AM</p>
              <p>5:45 PM - 7:45 PM</p>
            </div>
          </div>

          <div className="flex flex-row gap-2 mt-1 ml-3">
            <Waves className="text-blue-400 mt-2 w-8 h-8"/>
            <p className="mt-3">Minor:</p>
            <div className="ml-22 mt-3">
              <p>11:12 AM - 1:12 PM</p>
            </div>
          </div>
        </div>

        {/* Upgrade to Premium */}

        <div className="w-103 h-62 bg-[#102738] rounded-lg ml-3 border-2 border-[#162A39] relative">
          <p className="text-2xl text-yellow-500 font-bold mt-2 ml-3">Upgrade to Premium</p>
          <div className="flex flex-row gap-1 ml-3 mt-1">
            <Check className="text-green-400"/>
            <p>7 Day Forecast</p>
          </div>

          <div className="flex flex-row gap-1 ml-3 mt-2">
            <Check className="text-green-400"/>
            <p>Advanced Maps</p>
          </div>

          <div className="flex flex-row gap-1 ml-3 mt-2">
            <Check className="text-green-400"/>
            <p>Unlimited Access to AI Coach</p>
          </div>

          <div className="flex flex-row gap-1 ml-3 mt-2">
            <Check className="text-green-400"/>
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
