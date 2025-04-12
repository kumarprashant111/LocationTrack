import { useFilter } from "@/context/FilterContext";
import { useExternalLocations } from "@/hooks/useExternalLocations";

export function useBIData() {
  const { filters } = useFilter();
  const { locations, loading } = useExternalLocations(filters.region);

  const filtered = locations.filter((loc) => {
    const matchCategory =
      filters.category === "all" ||
      loc.category.toLowerCase() === filters.category.toLowerCase();

    return matchCategory;
  });

  const total = filtered.length;
  const avgVisitors =
    total > 0
      ? Math.round(filtered.reduce((sum, l) => sum + l.visitors, 0) / total)
      : 0;

  return { data: filtered, total, avgVisitors, loading };
}
