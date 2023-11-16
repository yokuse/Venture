/** @type {import('next').NextConfig} */
const securityHeaders = []

const ContentSecurityPolicy = `
  object-src 'none';
  base-uri 'self';
  connect-src 'self' https://*.stripe.com https://firebasestorage.googleapis.com;
  frame-src 'self' https://*.stripe.com;
  script-src 'self' https://*.stripe.com;
  img-src 'self' https://*.stripe.com https://firebasestorage.googleapis.com data:;
  require-trusted-types-for 'script';
`

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
          },
        ],
      },
    ]
  },

}
module.exports = nextConfig

