import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Force Next.js to treat this repo directory as root (avoids picking /Users/avi due to an unrelated lockfile).
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
