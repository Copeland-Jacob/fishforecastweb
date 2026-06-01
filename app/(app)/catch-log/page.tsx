import CatchCard from "@/components/CatchCard";
import { CirclePlus } from "lucide-react";

export default function Page() {
  return (
    <main className="w-full h-full bg-[#0C1F2D] flex flex-col overflow-hidden">
      <button className="group flex justify-center items-center w-12 rounded-3xl absolute lg:bottom-2 sm:bottom-2 bottom-18 right-2">
        <CirclePlus className="w-12 h-12 text-gray-300 group-hover:text-white" />
      </button>
      <CatchCard />
    </main>
  );
}
