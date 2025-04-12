"use client";

import { ExternalLocation } from "@/types/geo";
import { useEffect, useState } from "react";

type GeoNamesApiResult = {
  name: string;
  lat: string;
  lng: string;
  population?: number;
};

export function useExternalLocations(region: string) {
  const [locations, setLocations] = useState<ExternalLocation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const searchQuery = region === "all" ? "tokyo" : region;

        const res = await fetch(
          `https://secure.geonames.org/searchJSON?q=${searchQuery}&maxRows=10&username=kumarprashant768`
        );

        if (!res.ok) {
          throw new Error(`GeoNames API failed: ${res.status}`);
        }

        const data: { geonames?: GeoNamesApiResult[] } = await res.json();

        if (!data.geonames || !Array.isArray(data.geonames)) {
          console.warn("Unexpected GeoNames response:", data);
          setLocations([]);
          return;
        }

        const transformed: ExternalLocation[] = data.geonames.map(
          (item, index) => ({
            id: `${region}-${index}`,
            name: item.name,
            coords: [parseFloat(item.lng), parseFloat(item.lat)],
            visitors: item.population ?? Math.floor(Math.random() * 1000),
            region: region.toLowerCase(),
            category: ["retail", "transport", "events"][index % 3],
            visitsLast7Days: Array.from({ length: 7 }, () =>
              Math.floor(Math.random() * 300)
            ), // ✅ fake data for chart
          })
        );

        setLocations(transformed);
      } catch (err) {
        console.error("Error fetching GeoNames data:", err);
        setLocations([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [region]);

  return { locations, loading };
}
