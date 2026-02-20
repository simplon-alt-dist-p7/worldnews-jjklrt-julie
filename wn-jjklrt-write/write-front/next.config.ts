/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api/:path*",
          destination: "http://write-back:3002/api/:path*",
        },
      ],
    };
  },
};

module.exports = nextConfig;
