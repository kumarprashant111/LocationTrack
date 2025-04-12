"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useBIData } from "@/hooks/useBIData";

export default function BIChart() {
  const { data: locations } = useBIData();

  // Group locations by category
  const chartData = ["retail", "transport", "events"].map((category) => {
    const filtered = locations.filter(
      (loc) => loc.category.toLowerCase() === category
    );
    const total = filtered.reduce((sum, loc) => sum + loc.visitors, 0);

    return {
      category,
      visitors: total,
    };
  });

  return (
    <div className="w-full h-[300px] bg-white dark:bg-zinc-900 rounded-xl border dark:border-zinc-700 p-4">
      <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
        Visitors by Category
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="visitors" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
