"use client";

import { ExternalLocation } from "@/types/geo";
import { useEffect, useState } from "react";

type FoursquarePlace = {
  fsq_id: string;
  name: string;
  location: {
    region?: string;
    locality?: string;
    formatted_address?: string;
  };
  geocodes: {
    main: {
      latitude: number;
      longitude: number;
    };
  };
  categories: {
    name: string;
    icon: {
      prefix: string;
      suffix: string;
    };
  }[];
  link?: string;
};

export type CategoryItem = {
  name: string;
  icon: string;
};

export const JAPAN_CITIES = [
  { value: "Tokyo", label: "Tokyo (東京)" },
  { value: "Osaka", label: "Osaka (大阪)" },
  { value: "Kyoto", label: "Kyoto (京都)" },
  { value: "Yokohama", label: "Yokohama (横浜)" },
  { value: "Nagoya", label: "Nagoya (名古屋)" },
  { value: "Sapporo", label: "Sapporo (札幌)" },
  { value: "Fukuoka", label: "Fukuoka (福岡)" },
  { value: "Kobe", label: "Kobe (神戸)" },
  { value: "Sendai", label: "Sendai (仙台)" },
  { value: "Hiroshima", label: "Hiroshima (広島)" },
];

export function useExternalLocations(region: string) {
  const [locations, setLocations] = useState<ExternalLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const queryCity = region === "all" ? "Tokyo" : region;
        const apiKey = process.env.NEXT_PUBLIC_FSQ_API_KEY ?? "";
        const response = await fetch(
          `https://api.foursquare.com/v3/places/search?near=${queryCity}&limit=50`,
          {
            headers: {
              Authorization: apiKey,
            },
          }
        );

        const json = await response.json();

        const categoryMap = new Map<string, string>();

        const transformed: ExternalLocation[] = json.results.map(
          (item: FoursquarePlace) => {
            const mainCategory = item.categories[0];
            const categoryName =
              mainCategory?.name.toLowerCase() || "uncategorized";

            // build category map
            if (mainCategory && !categoryMap.has(categoryName)) {
              categoryMap.set(
                categoryName,
                `${mainCategory.icon.prefix}64${mainCategory.icon.suffix}`
              );
            }

            return {
              id: item.fsq_id,
              name: item.name,
              coords: [
                item.geocodes.main.longitude,
                item.geocodes.main.latitude,
              ],
              visitors: Math.floor(Math.random() * 1000),
              region:
                item.location.locality?.toLowerCase() ||
                item.location.region?.toLowerCase() ||
                "unknown",
              category: categoryName,
              visitsLast7Days: Array.from({ length: 7 }, () =>
                Math.floor(Math.random() * 300)
              ),
              link: item.link
                ? `https://foursquare.com${item.link}`
                : `https://foursquare.com/v/${item.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}/${item.fsq_id}`,
            };
          }
        );

        setLocations(transformed);

        setCategories(
          Array.from(categoryMap.entries()).map(([name, icon]) => ({
            name,
            icon,
          }))
        );
      } catch (err) {
        console.error("Foursquare API error:", err);
        setLocations([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [region]);

  return {
    locations,
    loading,
    availableRegions: JAPAN_CITIES,
    availableCategories: categories,
  };
}
