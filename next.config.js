const nextConfig = {
  images: {
    domains: ["upload.wikimedia.org", "hobby-explore.vercel.app"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "hobby-explore.vercel.app",
      },
    ],
  },
};
