import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["ss3.4sqi.net"], // ✅ allow Foursquare icons
  },
  env: {
    NEXT_PUBLIC_FSQ_API_KEY: process.env.NEXT_PUBLIC_FSQ_API_KEY,
  },
};

export default nextConfig;
