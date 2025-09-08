import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["cumsa.ca", "www.cumsa.ca", "localhost:3000", "localhost:12345"],
    },
  },
};

export default nextConfig;
