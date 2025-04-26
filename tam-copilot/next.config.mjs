/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL || "http://localhost:8000", // Default fallback
  },
}

export default nextConfig
