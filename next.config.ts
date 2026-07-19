import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
