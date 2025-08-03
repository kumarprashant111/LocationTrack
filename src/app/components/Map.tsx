"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Paper } from "@mui/material";
import type { RefObject } from "react";
// import type { FeatureCollection, Point } from "geojson";

// ...

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
  visibleCategories?: string[];
};

export default function Map({
  selectedCoords,
  scrollRef,
  filteredLocations,
  visibleCategories,
}: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const styleUrl = `https://api.maptiler.com/maps/streets-v2/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: styleUrl,
      center: [139.6917, 35.6895],
      zoom: 15,
      pitch: 60,
      bearing: -20,
      // @ts-expect-error: 'antialias' is valid at runtime but not typed
      antialias: true,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");
    mapRef.current = map;

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const locationsToRender = visibleCategories?.length
      ? filteredLocations.filter((loc) =>
          visibleCategories.includes(loc.category)
        )
      : filteredLocations;

    locationsToRender.forEach((loc) => {
      const isSelected =
        !!selectedCoords &&
        loc.coords[0] === selectedCoords[0] &&
        loc.coords[1] === selectedCoords[1];

      let marker: maplibregl.Marker;

      if (isSelected) {
        const wrapper = document.createElement("div");
        wrapper.className = "maplibre-marker";
        wrapper.style.position = "relative";
        wrapper.style.width = "40px";
        wrapper.style.height = "40px";
        wrapper.style.display = "flex";
        wrapper.style.alignItems = "center";
        wrapper.style.justifyContent = "center";
        wrapper.style.transform = "translate(-50%, -100%)";

        const pulseRing = document.createElement("div");
        pulseRing.className = "selected-marker";
        pulseRing.style.position = "absolute";
        pulseRing.style.width = "40px";
        pulseRing.style.height = "40px";
        pulseRing.style.borderRadius = "50%";
        pulseRing.style.backgroundColor = "rgba(59,130,246,0.2)";
        pulseRing.style.animation = "pulse 1.5s ease-in-out infinite";

        wrapper.appendChild(pulseRing);

        marker = new maplibregl.Marker({ element: wrapper, anchor: "bottom" })
          .setLngLat(loc.coords)
          .setPopup(
            new maplibregl.Popup().setHTML(
              `<strong>${loc.name}</strong><br/>📍 <b>${loc.category}</b><br/>👥 Visitors: ${loc.visitors}`
            )
          )
          .addTo(map);
      } else {
        marker = new maplibregl.Marker({ anchor: "bottom" })
          .setLngLat(loc.coords)
          .setPopup(
            new maplibregl.Popup().setHTML(
              `<strong>${loc.name}</strong><br/>📍 <b>${loc.category}</b><br/>👥 Visitors: ${loc.visitors}`
            )
          )
          .addTo(map);
      }

      markersRef.current.push(marker);
    });
  }, [filteredLocations, selectedCoords, visibleCategories]);

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

  // useEffect(() => {
  //   const map = mapRef.current;
  //   if (!map) return;

  //   const heatmapSourceId = "heatmap-source";
  //   const heatmapLayerId = "heatmap-layer";

  //   const geojson: FeatureCollection<Point> = {
  //     type: "FeatureCollection",
  //     features: filteredLocations.map((loc) => ({
  //       type: "Feature",
  //       properties: {
  //         visitors: loc.visitors,
  //       },
  //       geometry: {
  //         type: "Point",
  //         coordinates: loc.coords,
  //       },
  //     })),
  //   };

  //   const addHeatmapLayer = () => {
  //     if (map.getSource(heatmapSourceId)) {
  //       const existingSource = map.getSource(
  //         heatmapSourceId
  //       ) as maplibregl.GeoJSONSource;
  //       existingSource?.setData(geojson);

  //       return;
  //     }

  //     map.addSource(heatmapSourceId, {
  //       type: "geojson",
  //       data: geojson,
  //     });

  //     map.addLayer({
  //       id: heatmapLayerId,
  //       type: "heatmap",
  //       source: heatmapSourceId,
  //       maxzoom: 18,
  //       paint: {
  //         // Heatmap intensity based on zoom
  //         "heatmap-intensity": [
  //           "interpolate",
  //           ["linear"],
  //           ["zoom"],
  //           10,
  //           1,
  //           15,
  //           3,
  //         ],

  //         // Heatmap color ramp
  //         "heatmap-color": [
  //           "interpolate",
  //           ["linear"],
  //           ["heatmap-density"],
  //           0,
  //           "rgba(33,102,172,0)",
  //           0.2,
  //           "rgb(103,169,207)",
  //           0.4,
  //           "rgb(209,229,240)",
  //           0.6,
  //           "rgb(253,219,199)",
  //           0.8,
  //           "rgb(239,138,98)",
  //           1,
  //           "rgb(178,24,43)",
  //         ],

  //         // Increase radius
  //         "heatmap-radius": 30,

  //         // Opacity for visibility
  //         "heatmap-opacity": 0.9,
  //       },
  //     });
  //   };

  //   if (map.isStyleLoaded()) {
  //     addHeatmapLayer();
  //   } else {
  //     map.once("styledata", addHeatmapLayer);
  //   }
  // }, [filteredLocations]);

  return (
    <Paper
      ref={scrollRef}
      elevation={3}
      sx={{
        height: 400,
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "100%" }}
        className="map-container"
      />
    </Paper>
  );
}
