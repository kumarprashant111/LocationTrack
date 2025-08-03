"use client";

import { useBIData } from "@/hooks/useBIData";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Skeleton,
  Tooltip,
  Box,
  // useTheme,
} from "@mui/material";
import CountUp from "react-countup";

export default function KPICards() {
  const { total, avgVisitors, loading } = useBIData();
  // const theme = useTheme();

  const cards = [
    {
      title: "Filtered Locations",
      value: total,
      icon: "📍",
      tooltip: "Total number of locations after applying filters",
      delta: "+12%",
      color: "#4ade80", // green
    },
    {
      title: "Avg Visitors / Location",
      value: avgVisitors,
      icon: "👥",
      tooltip: "Average number of visitors per filtered location",
      delta: "-3%",
      color: "#60a5fa", // blue
    },
    {
      title: "Live Mode",
      value: "Active",
      icon: "⚡",
      tooltip: "Current system status",
      delta: null,
      color: "#facc15", // yellow
    },
  ];

  if (loading) {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: 3 }).map((_, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card sx={{ borderRadius: 4, height: "100%" }}>
              <CardContent>
                <Skeleton width="60%" />
                <Skeleton width="40%" height={30} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      {cards.map((kpi) => (
        <Grid item xs={12} sm={6} md={4} key={kpi.title}>
          <Card
            sx={{
              height: "100%",
              borderRadius: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              bgcolor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(255,255,255,0.9)",
              color: "text.primary",
              backdropFilter: "blur(10px)",
              border: (theme) =>
                `1px solid ${
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.1)"
                    : theme.palette.divider
                }`,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: (theme) =>
                  theme.palette.mode === "dark"
                    ? `0 8px 20px rgba(0,0,0,0.6)`
                    : `0 8px 20px rgba(0,0,0,0.12)`,
              },
            }}
          >
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Tooltip title={kpi.tooltip} arrow>
                  <Typography variant="subtitle2" color="text.secondary">
                    {kpi.title}
                  </Typography>
                </Tooltip>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${kpi.color}, #ffffff22)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    boxShadow: `0 4px 10px ${kpi.color}55`,
                  }}
                >
                  {kpi.icon}
                </Box>
              </Box>

              <Box>
                <Typography variant="h4" fontWeight={600} lineHeight={1.2}>
                  {typeof kpi.value === "number" ? (
                    <CountUp end={kpi.value} duration={1.2} separator="," />
                  ) : (
                    kpi.value
                  )}
                </Typography>

                {kpi.delta && (
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    color={
                      kpi.delta.startsWith("-") ? "error.main" : "success.main"
                    }
                    mt={1}
                  >
                    {kpi.delta} from last week
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
