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
import {
  Card,
  CardContent,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";

export default function TimeSeriesChart() {
  const { data } = useBIData();
  const theme = useTheme();

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
    <Card
      variant="outlined"
      sx={{
        height: 360,
        borderRadius: 3,
        boxShadow: 2,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <CardContent sx={{ height: "100%" }}>
        <Typography variant="h6" gutterBottom>
          Visitor Trends (Last 7 Days)
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <ResponsiveContainer width="100%" height="80%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor:
                  theme.palette.mode === "dark" ? "#333" : "#fff",
                border: "1px solid #ccc",
                borderRadius: 4,
              }}
            />
            <Line
              type="monotone"
              dataKey="visitors"
              stroke={theme.palette.primary.main}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
