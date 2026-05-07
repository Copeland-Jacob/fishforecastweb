import { useLocationStore } from "@/store/locationStore";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

export default function ScoreGraph() {
  const location = useLocationStore((state) => state.location);
  const [dayOneData, setDayOneData] = useState<any>([]);
  const [dayTwoData, setDayTwoData] = useState<any>([]);
  const [dayThreeData, setDayThreeData] = useState<any>([]);

  useEffect(() => {
    const getForecast = async () => {
      if (!location) return;
      const res = await fetch(
        `/api/forecast/forecastFuture?lat=${location.lat}&lon=${location.lon}`,
      );
      const response = await res.json();
      console.log(response);
      setDayOneData(response.dayOneData);
    };
    getForecast();
  }, [location]);

  return (
    <AreaChart
      className="w-full h-[98%]"
      responsive
      data={dayOneData}
      margin={{
        top: 30,
        left: 10,
      }}
    >
      <defs></defs>
      <CartesianGrid stroke="#757575" strokeWidth={0.1} />

      <Area type="natural" dataKey="score" strokeWidth={2}></Area>
      <XAxis dataKey="time" fontSize={9} interval={0}></XAxis>
      <YAxis domain={[0, 100]} fontSize={12} />
    </AreaChart>
  );
}
