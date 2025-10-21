// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://10.205.183.253:4000/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
