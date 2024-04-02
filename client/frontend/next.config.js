/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.corunaenmarchacontraocancro.com/'],
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
