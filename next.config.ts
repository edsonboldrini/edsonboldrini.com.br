import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emits .next/standalone with a minimal server + only the needed node_modules,
  // which is what the Docker runtime stage copies. Keeps the final image small.
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  // Trailing-slash off keeps one canonical URL per page (see research/ia.md).
  trailingSlash: false,
};

export default nextConfig;
