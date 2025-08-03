"use client";

import { Box, Typography, Checkbox, FormControlLabel } from "@mui/material";

type MapLegendProps = {
  selected: string[];
  onToggle: (category: string) => void;
  availableCategories: string[]; // ✅ comes from API
};

export default function MapLegend({
  selected,
  onToggle,
  availableCategories,
}: MapLegendProps) {
  const generateColor = (category: string) => {
    const colors = [
      "#22c55e", // green
      "#3b82f6", // blue
      "#ef4444", // red
      "#eab308", // yellow
      "#a855f7", // purple
      "#10b981", // teal
    ];
    const hash = [...category].reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );
    return colors[hash % colors.length];
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 16,
        right: 16,
        zIndex: 10,
        bgcolor: "background.paper",
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
        border: "1px solid",
        borderColor: "divider",
        width: 180,
      }}
    >
      <Typography variant="subtitle2" gutterBottom>
        Show Categories
      </Typography>
      {availableCategories.map((cat) => (
        <FormControlLabel
          key={cat}
          control={
            <Checkbox
              size="small"
              checked={selected.includes(cat)}
              onChange={() => onToggle(cat)}
              sx={{
                color: generateColor(cat),
                "&.Mui-checked": {
                  color: generateColor(cat),
                },
              }}
            />
          }
          label={cat.charAt(0).toUpperCase() + cat.slice(1)}
        />
      ))}
    </Box>
  );
}
