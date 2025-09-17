import type { NextConfig } from "next";

const isCanary = process.env.NEXT_CANARY === "1";

const nextConfig: NextConfig = {

  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      }
    ],
  },
  ...(isCanary && {
    experimental: {
      ppr: "incremental",
    },
  }),
  devIndicators: {
    position: "bottom-right"
  }
};

export default nextConfig;
