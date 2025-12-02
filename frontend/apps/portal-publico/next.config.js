/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui-kit"],
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
