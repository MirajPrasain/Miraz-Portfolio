/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // extra warnings in dev
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
