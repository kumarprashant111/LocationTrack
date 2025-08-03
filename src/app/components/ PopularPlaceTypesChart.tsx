"use client";

import { useBIData } from "@/hooks/useBIData";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  useTheme,
  Box,
} from "@mui/material";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#facc15",
  "#ef4444",
  "#6366f1",
  "#ec4899",
  "#14b8a6",
  "#f97316",
  "#8b5cf6",
  "#22c55e",
  "#94a3b8",
  "#eab308",
];

export default function PopularPlaceTypesChart() {
  const { data: filteredLocations } = useBIData();
  const theme = useTheme();

  const categoryMap = new Map<string, number>();
  filteredLocations.forEach((loc) => {
    const key = loc.category;
    categoryMap.set(key, (categoryMap.get(key) || 0) + loc.visitors);
  });

  const allCategories = Array.from(categoryMap.entries())
    .map(([name, visitors]) => ({ name, visitors }))
    .sort((a, b) => b.visitors - a.visitors);

  const topCategories = allCategories.slice(0, 10);
  const otherTotal = allCategories
    .slice(10)
    .reduce((sum, c) => sum + c.visitors, 0);

  const data =
    otherTotal > 0
      ? [...topCategories, { name: "Others", visitors: otherTotal }]
      : topCategories;

  const totalVisitors = data.reduce((sum, c) => sum + c.visitors, 0);

  const renderCustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length > 0) {
      const { name, visitors } = payload[0].payload;
      const percentage = ((visitors / totalVisitors) * 100).toFixed(1);
      return (
        <Box
          sx={{
            background: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            p: 1,
            fontSize: 13,
          }}
        >
          <strong>{name}</strong>
          <br />
          👥 {visitors.toLocaleString()} visitors
          <br />
          📊 {percentage}% of total
        </Box>
      );
    }
    return null;
  };

  return (
    <Card
      variant="outlined"
      sx={{
        height: 360,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Popular Place Types
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <ResponsiveContainer width="100%" height="85%">
          <PieChart>
            <Pie
              data={data}
              dataKey="visitors"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={2}
              isAnimationActive={false}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
              {/* Center label */}
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill={theme.palette.text.primary}
                fontSize="14px"
              >
                {totalVisitors.toLocaleString()} Visitors
              </text>
            </Pie>
            <Tooltip content={renderCustomTooltip} />
            <Legend
              verticalAlign="bottom"
              height={50}
              wrapperStyle={{
                fontSize: 12,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                paddingTop: 8,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
