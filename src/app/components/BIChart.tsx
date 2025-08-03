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
import {
  Card,
  CardContent,
  Typography,
  Divider,
  useTheme,
  Box,
} from "@mui/material";

export default function BIChart() {
  const { data: locations } = useBIData();
  const theme = useTheme();

  // Dynamically group by category
  const categoryMap: Record<string, number> = {};

  locations.forEach((loc) => {
    const cat = loc.category;
    categoryMap[cat] = (categoryMap[cat] || 0) + loc.visitors;
  });

  const chartData = Object.entries(categoryMap).map(([category, visitors]) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    visitors,
  }));

  const hasData = chartData.length > 0;

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
        <Typography
          variant="h6"
          fontWeight={600}
          color="text.primary"
          gutterBottom
        >
          Visitors by Category
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {hasData ? (
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={chartData} barCategoryGap={30}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
              <XAxis dataKey="category" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                cursor={{ fill: theme.palette.action.hover }}
                contentStyle={{
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#333" : "#fff",
                  border: "1px solid #ccc",
                  borderRadius: 4,
                }}
              />
              <Bar
                dataKey="visitors"
                fill={theme.palette.primary.main}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Box
            height="80%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="text.secondary"
            fontSize={14}
          >
            No data available for selected filters
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
