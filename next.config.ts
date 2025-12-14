import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/newUI",
        permanent: false,
      },
      {
        source: "/pages/main",
        destination: "/newUI",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
