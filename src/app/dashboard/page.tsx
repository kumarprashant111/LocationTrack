"use client";

import { useEffect, useRef, useState } from "react";
import Map from "@/app/components/Map";
import Sidebar from "@/app/components/Sidebar";
import BIChart from "@/app/components/BIChart";
import Header from "@/app/components/Header";
import KPICards from "@/app/components/KPICards";
import TopLocationsTable from "@/app/components/TopLocationsTable";
import { useBIData } from "@/hooks/useBIData";
import TimeSeriesChart from "../components/TimeSeriesChart";

export default function DashboardPage() {
  const [selectedCoords, setSelectedCoords] = useState<[number, number] | null>(
    null
  );
  const mapScrollRef = useRef<HTMLDivElement>(null);

  const { data: filteredLocations } = useBIData(); // ✅ get data here

  // ✅ Reset selectedCoords if not in filtered results
  useEffect(() => {
    if (
      selectedCoords &&
      !filteredLocations.some(
        (loc) =>
          loc.coords[0] === selectedCoords[0] &&
          loc.coords[1] === selectedCoords[1]
      )
    ) {
      setSelectedCoords(null);
    }
  }, [filteredLocations, selectedCoords]);

  const handleLocationSelect = (coords: [number, number]) => {
    setSelectedCoords(coords);
    setTimeout(() => {
      mapScrollRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
          <Map
            selectedCoords={selectedCoords}
            scrollRef={mapScrollRef}
            filteredLocations={filteredLocations} // ✅ pass as prop
          />
          <div className="flex flex-col gap-4">
            <KPICards />
            <BIChart />
            <TimeSeriesChart />
            <TopLocationsTable onLocationSelect={handleLocationSelect} />
          </div>
        </main>
      </div>
    </div>
  );
}
