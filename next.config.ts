import type { NextConfig } from "next";

/*
 * Set NEXT_PUBLIC_BASE_PATH (e.g. "/ang-portfolio") when deploying to a GitHub
 * Pages project site. Leave it unset for Cloudflare Pages, Netlify, or a custom domain.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
