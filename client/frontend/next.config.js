/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "corunaenmarchacontraocancro.com/",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api.corunaenmarchacontraocancro.com",
        pathname: "/uploads/**",
      }
    ],
  },
};

module.exports = nextConfig;
