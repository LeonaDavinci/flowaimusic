import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // All content routes opt into server-side rendering via `dynamic = 'force-dynamic'`.
};

export default nextConfig;
