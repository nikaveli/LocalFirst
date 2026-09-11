import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{
      source: "/:path*",
      has: [{ type: "host", value: "www.localfirstonline.com" }],
      destination: "https://localfirstonline.com/:path*",
      permanent: true,
    }];
  },
};

export default nextConfig;
