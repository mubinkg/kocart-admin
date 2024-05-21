/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://kocart.com/:path*',
          },
        ]
      },
  };

export default nextConfig;
