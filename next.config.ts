// next.config.ts
import type { NextConfig } from 'next';

let withBundleAnalyzer = (config: NextConfig) => config;

try {
  // only require if installed
  withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  });
} catch (err) {
  console.warn('⚠️ Bundle analyzer not installed, skipping...');
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withBundleAnalyzer(nextConfig);
