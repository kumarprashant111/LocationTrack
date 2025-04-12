"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center shadow-sm">
      <Link
        href="/dashboard"
        className="text-xl font-bold text-gray-800 dark:text-white"
      >
        🌐 GeoBI Dashboard
      </Link>

      <button
        onClick={toggleTheme}
        className="px-4 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-sm text-gray-800 dark:text-white hover:opacity-80"
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </header>
  );
}
