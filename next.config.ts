import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every page is authored content. Build it once instead of running the
  // Next server inside a CPU-limited Worker on every uncached navigation.
  output: "export",
  images: { unoptimized: true },
  // Canonical host/HTTPS redirects remain in worker.mjs, before asset serving.
};

export default nextConfig;
