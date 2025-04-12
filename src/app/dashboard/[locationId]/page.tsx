"use client";

import { useParams } from "next/navigation";
import { mockLocations } from "@/lib/mockData";
import type { Location } from "@/types/geo"; // ✅ Match where mockData gets its type

export default function LocationDetailPage() {
  const { locationId } = useParams() as { locationId: string };

  // ✅ now this matches the same Location type as in mockData
  const location: Location | undefined = mockLocations.find(
    (loc) => loc.id === locationId
  );

  if (!location) return <p className="p-4">Location not found</p>;

  return (
    <div className="p-6 text-[var(--foreground)]">
      <h1 className="text-2xl font-bold mb-2">{location.name}</h1>
      <p className="text-lg">Region: {location.region}</p>
      <p className="text-lg">Category: {location.category}</p>
      <p className="text-lg">Visitors Today: {location.visitors}</p>
    </div>
  );
}
