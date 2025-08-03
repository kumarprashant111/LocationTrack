"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function Header() {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <AppBar
      position="static"
      color="default"
      sx={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        borderBottom: "1px solid",
        borderColor: "divider",
        boxShadow: 1,
        px: 2,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link href="/dashboard" passHref>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              textDecoration: "none",
              color: "inherit",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            🌐 Location Tracking
          </Typography>
        </Link>

        <Button
          variant="outlined"
          size="small"
          onClick={toggleTheme}
          sx={{
            borderColor: "gray.300",
            backgroundColor: themeMode === "light" ? "#f3f4f6" : "#1f2937",
            color: themeMode === "light" ? "#111827" : "#fff",
            "&:hover": {
              opacity: 0.85,
              backgroundColor: themeMode === "light" ? "#e5e7eb" : "#374151",
            },
          }}
        >
          {themeMode === "light" ? "🌙 Dark" : "☀️ Light"}
        </Button>
      </Toolbar>
    </AppBar>
  );
}
