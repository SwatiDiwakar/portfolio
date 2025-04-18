import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === 'true';

console.log(`Building for GitHub Pages: ${isGithubPages ? 'YES' : 'NO'}`);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias.canvas = false
    return config
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  ...(isGithubPages ? { basePath: '/portfolio' } : {}),
  ...(isGithubPages ? { assetPrefix: '/portfolio' } : {}),
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "style-src 'self' 'unsafe-inline'",
              "frame-src 'self' https://www.youtube.com",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "worker-src 'self' blob:",
              "child-src blob:",
              "font-src 'self' data:",
              "img-src 'self' data: blob:",
              "connect-src 'self' blob:",
              "object-src 'self' blob:",
            ].join('; ')
          }
        ]
      }
    ]
  },
  env: {
    GITHUB_PAGES: isGithubPages ? 'true' : 'false',
  }
};

export default nextConfig;
