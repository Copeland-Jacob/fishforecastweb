import { useEffect, useState } from "react";
import LocationCard from "./LocationCard";

export default function LocationBar() {
  const [locations, setLocations] = useState<any[]>([]);
  const fetchLocations = async () => {
    const res = await fetch("/api/location/get");
    const data = await res.json();
    setLocations(data);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/location/delete?id=${id}`, {
      method: "DELETE",
    });

    setLocations((prev) => prev.filter((l) => l.id !== id));
  };

  useEffect(() => {
    fetchLocations();

    const handleUpdate = () => {
      fetchLocations();
    };

    window.addEventListener("locationAdded", handleUpdate);

    return () => {
      window.removeEventListener("locationAdded", handleUpdate);
    };
  }, []);

  return (
    <div className="w-full lg:h-1/8 h-1/11 min-w-0 overflow-x-scroll flex-nowrap bg-[#102738] rounded-lg ml-1.5 lg:ml-3 border-2 border-[#162A39] flex flex-row gap-2 items-center">
      {locations.map((loc) => (
        <LocationCard key={loc.id} location={loc} onDelete={handleDelete} />
      ))}
      {!locations && <p>Add a location!</p>}
    </div>
  );
}
