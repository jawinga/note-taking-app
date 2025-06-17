import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/pages/main",
        permanent: false, // or true if it's a permanent redirect
      },
    ];
  },
};

export default nextConfig;
