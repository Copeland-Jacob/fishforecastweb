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
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  dayIndexCount: number;
  setDayIndexCount: React.Dispatch<React.SetStateAction<number>>;
};

export default function ScoreGraph({ dayIndexCount, setDayIndexCount }: Props) {
  const location = useLocationStore((state) => state.location);
  const [dayOneData, setDayOneData] = useState<any>([]);
  const [dayTwoData, setDayTwoData] = useState<any>([]);
  const [dayThreeData, setDayThreeData] = useState<any>([]);
  const [dataType, setDataType] = useState<any>();

  useEffect(() => {
    const getForecast = async () => {
      if (!location) return;
      const res = await fetch(
        `/api/forecast/forecastFuture?lat=${location.lat}&lon=${location.lon}`,
      );
      const response = await res.json();
      console.log(response);
      setDayOneData(response.dayOneData);
      setDayTwoData(response.dayTwoData);
      setDayThreeData(response.dayThreeData);
    };
    getForecast();
    setDayIndexCount(0);
  }, [location]);

  useEffect(() => {
    if (dayIndexCount === 0) setDataType(dayOneData);
    if (dayIndexCount === 1) setDataType(dayTwoData);
    if (dayIndexCount === 2) setDataType(dayThreeData);
  }, [dayIndexCount, dayOneData, dayTwoData, dayThreeData]);

  return (
    <ResponsiveContainer className="absolute top-3">
      <AreaChart
        className="w-[95%] h-[95%]"
        data={dataType}
        margin={{
          top: 20,
          right: 15,
        }}
      >
        <defs>
          <linearGradient id="colorScore" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#EF5350" stopOpacity={1} />
            <stop offset="20%" stopColor="#FFCA28" stopOpacity={1} />
            <stop offset="40%" stopColor="#d1ff2b" stopOpacity={1} />
            <stop offset="60%" stopColor="#66BB6A" stopOpacity={1} />
            <stop offset="80%" stopColor="#05daff" stopOpacity={1} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#757575" strokeWidth={0.1} />

        <Area
          type="monotone"
          dataKey="score"
          strokeWidth={2}
          fill="url(#colorScore)"
          dot={{ r: 2 }}
        ></Area>
        <XAxis dataKey="time" fontSize={9} interval={0}></XAxis>
        <YAxis domain={[0, 100]} fontSize={12} />
        <Tooltip
          cursor={false}
          labelClassName="text-sm text-white font-bold"
          wrapperClassName="w-22 text-sm rounded-lg"
          contentStyle={{
            backgroundColor: "#284B5A",
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
