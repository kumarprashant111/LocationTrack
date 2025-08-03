"use client";

import { useFilter } from "@/context/FilterContext";
import {
  useExternalLocations,
  JAPAN_CITIES,
} from "@/hooks/useExternalLocations";
import Image from "next/image";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  useTheme,
  Autocomplete,
  Avatar,
  Box,
} from "@mui/material";
import { CategoryItem } from "@/hooks/useExternalLocations";

export default function Sidebar() {
  const theme = useTheme();
  const { filters, setFilters } = useFilter();

  const { availableCategories } = useExternalLocations("all");

  const update = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Paper
      elevation={4}
      sx={{
        width: 280,
        minHeight: "100vh",
        p: 3,
        borderRight: `1px solid ${theme.palette.divider}`,
        bgcolor: theme.palette.background.default,
      }}
    >
      <Typography variant="h6" fontWeight={700} gutterBottom>
        Filters
      </Typography>

      {/* Category Autocomplete with icon */}
      <Autocomplete
        fullWidth
        size="small"
        options={availableCategories}
        getOptionLabel={(option: CategoryItem) =>
          option.name.charAt(0).toUpperCase() + option.name.slice(1)
        }
        value={
          filters.category === "all"
            ? null
            : availableCategories.find((c) => c.name === filters.category) ||
              null
        }
        onChange={(e, value) => update("category", value?.name || "all")}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        renderOption={({ key, ...rest }, option) => (
          <Box
            key={key}
            component="li"
            {...rest}
            display="flex"
            alignItems="center"
            sx={{
              "&:hover": {
                bgcolor: theme.palette.action.hover,
              },
            }}
          >
            <Avatar
              sx={{
                width: 28,
                height: 28,
                mr: 1,

                p: 0.5, // padding for spacing
              }}
            >
              <Image
                src={option.icon}
                alt={option.name}
                width={24}
                height={24}
                style={{
                  objectFit: "contain",
                  filter: "drop-shadow(0 0 1px rgba(0,0,0,0.2))", // subtle visibility boost
                }}
              />
            </Avatar>
            {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Category"
            placeholder="Select category"
          />
        )}
      />

      {/* Region Filter */}
      <FormControl fullWidth size="small" margin="normal">
        <InputLabel>Region</InputLabel>
        <Select
          label="Region"
          value={filters.region}
          onChange={(e) => update("region", e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          {JAPAN_CITIES.map((city) => (
            <MenuItem key={city.value} value={city.value}>
              {city.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider sx={{ my: 2 }} />

      {/* Date Inputs */}
      <TextField
        fullWidth
        type="date"
        size="small"
        label="Start Date"
        value={filters.startDate}
        onChange={(e) => update("startDate", e.target.value)}
        InputLabelProps={{ shrink: true }}
        margin="dense"
      />
      <TextField
        fullWidth
        type="date"
        size="small"
        label="End Date"
        value={filters.endDate}
        onChange={(e) => update("endDate", e.target.value)}
        InputLabelProps={{ shrink: true }}
        margin="dense"
      />
    </Paper>
  );
}
