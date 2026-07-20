import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
    qualities: [60, 70, 75, 80, 85, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/Kaveesha23dil/GTAVI_Landingpage/**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/Kaveesha23dil/Windows_Xp_Portfolio/**",
      },
    ],
  },
};

export default nextConfig;
