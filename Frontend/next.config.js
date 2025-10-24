/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/login',
          permanent: true,
        },
      ];
    },
    // Configuración para Next.js 15
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
      suppressHydrationWarning: true,
    },
    // Forzar renderizado del cliente para rutas dinámicas
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
  
  module.exports = nextConfig;