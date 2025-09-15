import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Optimize compilation speed
    optimizeCss: true,
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
    ],
  },
  webpack: (config, { isServer, dev }) => {
    // Optimize webpack for faster compilation
    if (dev) {
      config.cache = {
        type: 'filesystem',
        cacheDirectory: path.resolve(process.cwd(), '.next/cache/webpack'),
      };
      
      // Reduce bundle size by externalizing heavy packages
      config.externals = config.externals || [];
      if (isServer) {
        config.externals.push(
          '@langchain/community',
          '@langchain/core',
          '@langchain/openai', 
          'langchain',
          '@datastax/astra-db-ts',
          'openai'
        );
      }
    }
    
    return config;
  },
};

export default nextConfig;
