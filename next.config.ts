import path from 'path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Evita inferir a pasta pai (outro yarn.lock no monorepo) como raiz — corrigia PageNotFoundError em `next build`
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

export default nextConfig
