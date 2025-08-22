import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  output: 'export',
  distDir: 'out',
  trailingSlash: false,
  poweredByHeader: false,
  compress: true,
  
  // Cloudflare Pages optimization
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Asset optimization
  experimental: {
    optimizePackageImports: ['@/components', '@/lib'],
  },
  
  // MDX support
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  
  // Webpack optimization for Cloudflare Pages
  webpack: (config, { dev, isServer }) => {
    // Optimize for production builds
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            // Common chunk
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      }
    }
    
    // Optimize font loading
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/fonts/',
          outputPath: 'static/fonts/',
        },
      },
    })
    
    return config
  },
  
  // Headers are configured via public/_headers for Cloudflare Pages
  
  // Generate sitemap and robots.txt
  generateBuildId: async () => {
    return `build-${Date.now()}`
  },
});

export default nextConfig
