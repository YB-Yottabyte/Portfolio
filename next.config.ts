import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Produces a static `out` directory for GitHub Pages.
  output: "export",
  trailingSlash: true,
  basePath,
  images: {
    // GitHub Pages cannot run Next.js' server-side image optimizer.
    unoptimized: true,
  },
};

export default nextConfig;
