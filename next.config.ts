import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Move serverComponentsExternalPackages to the correct location
  serverExternalPackages: [
    '@langchain/community',
    '@langchain/core', 
    '@langchain/openai',
    'langchain',
    '@datastax/astra-db-ts'
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },

    ],
  },
  // Optimize output for production
  output: 'standalone',
};

export default nextConfig;
