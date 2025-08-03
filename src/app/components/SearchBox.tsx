"use client";

import { useState } from "react";
import {
  Autocomplete,
  TextField,
  Paper,
  useTheme,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ExternalLocation } from "@/types/geo";

type Props = {
  locations: ExternalLocation[];
  onSelect: (coords: [number, number]) => void;
};

export default function SearchBox({ locations, onSelect }: Props) {
  const theme = useTheme();
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<ExternalLocation | null>(null);

  return (
    <Paper
      elevation={3}
      sx={{
        width: 300,
        position: "absolute",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
        bgcolor: theme.palette.background.paper,
        p: 1,
      }}
    >
      <Autocomplete
        fullWidth
        options={locations}
        getOptionLabel={(loc) => loc.name}
        value={selected}
        onChange={(_, value) => {
          setSelected(value);
          if (value) {
            onSelect(value.coords);
          }
        }}
        inputValue={input}
        onInputChange={(_, val) => setInput(val)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search places..."
            size="small"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Paper>
  );
}
