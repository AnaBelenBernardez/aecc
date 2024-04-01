/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.aecc.labs.hackaboss.dev'],
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
