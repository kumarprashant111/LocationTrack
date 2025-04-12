"use client";

import { useFilter } from "@/context/FilterContext";

export default function Sidebar() {
  const { filters, setFilters } = useFilter();

  const update = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ✅ Static list of regions and categories (expand as needed)
  const staticRegions = ["tokyo", "osaka", "kyoto", "fukuoka", "sapporo"];
  const staticCategories = ["retail", "transport", "events"];

  return (
    <aside className="w-64 p-4 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-sm">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Category Filter */}
      <label className="block mb-1">Category</label>
      <select
        value={filters.category}
        onChange={(e) => update("category", e.target.value)}
        className="w-full rounded bg-gray-100 dark:bg-gray-800 p-1"
      >
        <option value="all">All</option>
        {staticCategories.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>

      {/* Region Filter */}
      <label className="block mt-4 mb-1">Region</label>
      <select
        value={filters.region}
        onChange={(e) => update("region", e.target.value)}
        className="w-full rounded bg-gray-100 dark:bg-gray-800 p-1"
      >
        <option value="all">All</option>
        {staticRegions.map((region) => (
          <option key={region} value={region}>
            {region.charAt(0).toUpperCase() + region.slice(1)}
          </option>
        ))}
      </select>

      {/* Date Filters */}
      <label className="block mt-4 mb-1">Start Date</label>
      <input
        type="date"
        value={filters.startDate}
        onChange={(e) => update("startDate", e.target.value)}
        className="w-full bg-gray-100 dark:bg-gray-800 p-1 rounded"
      />

      <label className="block mt-4 mb-1">End Date</label>
      <input
        type="date"
        value={filters.endDate}
        onChange={(e) => update("endDate", e.target.value)}
        className="w-full bg-gray-100 dark:bg-gray-800 p-1 rounded"
      />
    </aside>
  );
}
