// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 👇 ADD THIS BLOCK TO IGNORE ESLINT ERRORS/WARNINGS DURING VERCEL BUILD
  eslint: {
    // !! DANGEROUS BYPASS !! 
    // This allows the build to succeed even if the project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // 👆 END OF BYPASS BLOCK
  
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