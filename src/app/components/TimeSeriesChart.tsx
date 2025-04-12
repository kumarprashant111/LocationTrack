"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useBIData } from "@/hooks/useBIData";

export default function TimeSeriesChart() {
  const { data } = useBIData();

  // Aggregate total visits per day across all filtered locations
  const visitsByDay = Array(7).fill(0);
  data.forEach((loc) => {
    loc.visitsLast7Days?.forEach((count, index) => {
      visitsByDay[index] += count;
    });
  });

  const chartData = visitsByDay.map((value, index) => ({
    day: `Day ${index + 1}`,
    visitors: value,
  }));

  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-xl border dark:border-zinc-700 p-4">
      <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
        Visitor Trends (Last 7 Days)
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="visitors"
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
