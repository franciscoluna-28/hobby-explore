/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pnfnkpwwfjrotsossegq.supabase.co",
        pathname: "**",
      },
    ],
  },
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;
