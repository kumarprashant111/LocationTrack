"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Divider,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { ExternalLocation } from "@/types/geo";

type Props = {
  open: boolean;
  onClose: () => void;
  location: ExternalLocation | null;
};

export default function LocationDetailDialog({
  open,
  onClose,
  location,
}: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!location || !mapContainerRef.current || !open) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: location.coords,
      zoom: 13,
    });

    new maplibregl.Marker().setLngLat(location.coords).addTo(map);
    mapInstanceRef.current = map;

    const resizeTimeout = setTimeout(() => {
      map.resize();
    }, 300); // Delay ensures Dialog is visible

    return () => {
      clearTimeout(resizeTimeout);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [location, open]);

  if (!location) return null;

  const chartData = location.visitsLast7Days.map((v, i) => ({
    day: `Day ${i + 1}`,
    visitors: v,
  }));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {location.name}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box mb={2}>
          <Typography variant="body2" color="text.secondary">
            Category: <strong>{location.category}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Region: <strong>{location.region}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Coordinates:{" "}
            <strong>
              {location.coords[1].toFixed(4)}, {location.coords[0].toFixed(4)}
            </strong>
          </Typography>
        </Box>

        <Box
          ref={mapContainerRef}
          sx={{
            height: 240,
            width: "100%",
            borderRadius: 2,
            overflow: "hidden",
            mb: 2,
            border: "1px solid #ccc",
            backgroundColor: "#f5f5f5",
          }}
        />

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Visitors (Last 7 Days)
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
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

        {location.name && (
          <Box mt={3} textAlign="right">
            <Button
              href={`https://foursquare.com/search?q=${encodeURIComponent(
                location.name
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              size="small"
              endIcon={<OpenInNewIcon />}
            >
              Search on Foursquare
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
