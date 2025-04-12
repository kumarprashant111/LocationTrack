"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useBIData } from "@/hooks/useBIData";
import type { RefObject } from "react";

type MapProps = {
  selectedCoords?: [number, number] | null;
  scrollRef?: RefObject<HTMLDivElement | null>;
  filteredLocations: {
    id: string;
    name: string;
    coords: [number, number];
    visitors: number;
    region: string;
    category: string;
  }[];
};


export default function Map({ selectedCoords, scrollRef }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const { data: filteredLocations, loading } = useBIData();

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [139.6917, 35.6895],
      zoom: 9,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");
    mapRef.current = map;

    return () => map.remove();
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || loading) return;

    // Remove previous markers
    document.querySelectorAll(".maplibre-marker").forEach((el) => el.remove());

    filteredLocations.forEach((loc) => {
      const isSelected =
        !!selectedCoords &&
        loc.coords[0] === selectedCoords[0] &&
        loc.coords[1] === selectedCoords[1];

      if (isSelected) {
        // ✅ Custom pulsing marker for selected

       const wrapper = document.createElement("div");
       wrapper.className = "maplibre-marker";
       wrapper.style.position = "relative";
       wrapper.style.width = "40px";
       wrapper.style.height = "40px";
       wrapper.style.display = "flex";
       wrapper.style.alignItems = "center";
       wrapper.style.justifyContent = "center";
       wrapper.style.transform = "translate(-50%, -100%)";

       // 👇 Animated ring div
       const pulseRing = document.createElement("div");
       pulseRing.className = "selected-marker";
       pulseRing.style.position = "absolute";
       pulseRing.style.width = "40px";
       pulseRing.style.height = "40px";
       pulseRing.style.borderRadius = "50%";
       pulseRing.style.backgroundColor = "rgba(59,130,246,0.2)";
       pulseRing.style.animation = "pulse 1.5s ease-in-out infinite";

       // 👇 Marker image on top
      //  const icon = document.createElement("img");
      //  icon.src = "/marker-icon.png";
      //  icon.alt = "Selected Marker";
      //  icon.style.width = "30px";
      //  icon.style.height = "30px";
      //  icon.style.zIndex = "10";

       wrapper.appendChild(pulseRing);
      //  wrapper.appendChild(icon);


        new maplibregl.Marker({ element: wrapper, anchor: "bottom" })
          .setLngLat(loc.coords)
          .setPopup(
            new maplibregl.Popup().setHTML(
              `<strong>${loc.name}</strong><br/>📍 <b>${loc.category}</b><br/>👥 Visitors: ${loc.visitors}`
            )
          )
          .addTo(map);
      } else {
        // ✅ Default marker
        new maplibregl.Marker({ anchor: "bottom" })
          .setLngLat(loc.coords)
          .setPopup(
            new maplibregl.Popup().setHTML(
              `<strong>${loc.name}</strong><br/>📍 <b>${loc.category}</b><br/>👥 Visitors: ${loc.visitors}`
            )
          )
          .addTo(map);
      }
    });
  }, [filteredLocations, loading, selectedCoords]);

  useEffect(() => {
    const map = mapRef.current;
    if (!selectedCoords || !map) return;

    const exists = filteredLocations.some(
      (loc) =>
        loc.coords[0] === selectedCoords[0] &&
        loc.coords[1] === selectedCoords[1]
    );

    if (!exists) return;

    map.easeTo({
      center: selectedCoords,
      zoom: 12,
      duration: 800,
      easing: (t) => t,
      essential: true,
    });
  }, [selectedCoords, filteredLocations]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !filteredLocations.length || selectedCoords) return;

    const firstLoc = filteredLocations[0];

    map.flyTo({
      center: firstLoc.coords,
      zoom: 10,
      speed: 1.2,
      curve: 1.8,
      essential: true,
    });
  }, [filteredLocations, selectedCoords]);

  return (
    <div
      ref={scrollRef}
      className="relative w-full h-[400px] mb-4 rounded-xl border dark:border-zinc-700 overflow-hidden"
    >
      <div
        ref={mapContainerRef}
        className="absolute inset-0"
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}
