"use client";

import { useBIData } from "@/hooks/useBIData";

export default function KPICards() {
  const { total, avgVisitors, loading } = useBIData();

  if (loading) {
    return (
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 p-4 rounded-xl shadow-md h-[100px]"
          >
            <div className="h-4 bg-gray-300 dark:bg-gray-700 w-2/3 mb-2 rounded"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 w-1/2 rounded"></div>
          </div>
        ))}
      </section>
    );
  }

  const cards = [
    {
      title: "Filtered Locations",
      value: total,
      icon: "📍",
    },
    {
      title: "Avg Visitors / Location",
      value: avgVisitors,
      icon: "👥",
    },
    {
      title: "Live Mode",
      value: "Active",
      icon: "⚡",
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((kpi) => (
        <div
          key={kpi.title}
          className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 p-4 rounded-xl shadow-md transition hover:scale-[1.01]"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-gray-500 dark:text-zinc-400">
              {kpi.title}
            </h3>
            <span className="text-xl">{kpi.icon}</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {kpi.value}
          </p>
        </div>
      ))}
    </section>
  );
}
