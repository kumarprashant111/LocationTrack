import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx}", // includes all app pages/components
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Arial", "sans-serif"], // ✅ defines `font-sans`
      },
    },
  },
  plugins: [],
};

export default config;
