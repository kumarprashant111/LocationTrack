"use client";

import { useBIData } from "@/hooks/useBIData";

type Props = {
  onLocationSelect?: (coords: [number, number]) => void;
};

export default function TopLocationsTable({ onLocationSelect }: Props) {
  const { data: locations } = useBIData();

  // Get top 5 by visitors
  const topLocations = [...locations]
    .sort((a, b) => b.visitors - a.visitors)
    .slice(0, 5);

  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-xl border dark:border-zinc-700 p-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
        Top 5 Locations
      </h2>
      <table className="w-full text-sm text-left">
        <thead className="text-gray-500 dark:text-gray-400 border-b dark:border-zinc-700">
          <tr>
            <th className="py-1">Name</th>
            <th className="py-1">Category</th>
            <th className="py-1 text-right">Visitors</th>
          </tr>
        </thead>
        <tbody>
          {topLocations.map((loc) => (
            <tr
              key={loc.id}
              className="border-b dark:border-zinc-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
              onClick={() => onLocationSelect?.(loc.coords)}
            >
              <td className="py-2 text-gray-800 dark:text-white">{loc.name}</td>
              <td className="py-2 text-gray-600 dark:text-gray-300 capitalize">
                {loc.category}
              </td>
              <td className="py-2 text-right text-gray-800 dark:text-white font-semibold">
                {loc.visitors.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
