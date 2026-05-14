"use client";

import { useLocationStore } from "@/store/locationStore";
import { Trash2 } from "lucide-react";

type Props = {
  location: {
    name: string;
    id: string;
    city: string;
    state: string;
    lat: number;
    lon: number;
  };
  onDelete?: (id: string) => void;
};

export default function LocationCard({ location, onDelete }: Props) {
  const setLocation = useLocationStore((state) => state.setLocation);

  return (
    <button
      className="w-1/4 shrink-0 h-15 mt-px ml-1 bg-[#284B5A] hover:bg-[#22404d] rounded-xl relative text-left font-bold transition duration-200"
      onClick={() => setLocation(location)}
    >
      <div className="flex flex-row justify-between">
        <div>
          <p className="ml-2">{location.city}</p>
        </div>
        <Trash2
          className="w-7 h-7 mr-1 my-auto text-gray-400 hover:text-red-500 transition duration-200"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(location.id);
          }}
        />
      </div>
    </button>
  );
}
