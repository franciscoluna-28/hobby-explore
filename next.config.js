/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pnfnkpwwfjrotsossegq.supabase.co",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**"
      }
    ],
  },
/*   experimental: {
    typedRoutes: true,
  }, */
};

module.exports = nextConfig;
