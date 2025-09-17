/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // extra warnings in dev
  swcMinify: true,       // faster builds with SWC compiler
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",  // allow remote images (e.g. project screenshots hosted online)
      },
    ],
  },
};

export default nextConfig;
