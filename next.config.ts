import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? "/portfolio" : "";

const nextConfig: NextConfig = {
  // Produces a static `out` directory for GitHub Pages.
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: isProduction ? "/portfolio/" : undefined,
  images: {
    // GitHub Pages cannot run Next.js' server-side image optimizer.
    unoptimized: true,
  },
};

export default nextConfig;
