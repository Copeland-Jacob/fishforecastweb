export default function LoadingWeather() {
  return (
    <div className="w-103 h-60 bg-[#102738] rounded-lg mt-3 ml-3 border-2 border-[#162A39]">
      <p className="mt-3 ml-3 font-bold">Current Conditions</p>
      <div className="flex flex-row ">
        <img src="/images/cloud-sun.png" className="w-25 h-25 ml-12 mt-3" />

        <div className="w-px h-25 bg-gray-600 mt-2 mx-auto" />

        <div className="flex flex-col mr-10">
          <p className="text-[20px] mt-2 mr-5 ml-3">
            Loading...<span className="text-xl">°F</span>
          </p>
          <p className="text-sm text-gray-400">Loading...</p>
        </div>
      </div>

      <div className="flex flex-row gap-5 mx-15 mt-5">
        <div>
          <p>Feels Like</p>
          <p>Loading...</p>
        </div>
        <div className="w-px h-15 bg-gray-600" />
        <div>
          <p>Humidity</p>
          <p>Loading...</p>
        </div>
        <div className="w-px h-15 bg-gray-600" />
        <div>
          <p>Wind</p>
          <p>Loading...</p>
        </div>
      </div>
    </div>
  );
}
