import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/main",
        permanent: false,
      },
      {
        source: "/pages/main",
        destination: "/main",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
