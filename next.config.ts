import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",         // required by OpenNext on Cloudflare Workers
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;

// Initialise OpenNext bindings (env, R2, KV, etc.) for `next dev`
// so they behave the same locally as on Cloudflare Workers.
// Runs only in dev — no-op in production builds.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
