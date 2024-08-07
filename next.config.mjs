/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/apis/:path*",
        destination: process.env.HOST + ":path*", // Proxy to Backend External
      },
    ];
  },
};

export default nextConfig;
