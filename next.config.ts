import type { NextConfig } from "next";

const UPLOAD_MAX_MB = Number(process.env.UPLOAD_MAX_MB ?? "10");

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: `${UPLOAD_MAX_MB}mb`,
      allowedOrigins: ["cumsa.ca", "www.cumsa.ca", "localhost:3000", "localhost:12345"],
    },
  },
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
