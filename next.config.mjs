/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The existing ESLint config is the legacy Vite flat-config; skip it during
  // production builds so it does not block deploys. Run `npm run lint` manually.
  eslint: { ignoreDuringBuilds: true },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/es", destination: "/", permanent: true },
      { source: "/en", destination: "/", permanent: true },
      { source: "/es/terminos-condiciones", destination: "/terminos-condiciones", permanent: true },
      { source: "/es/politicas-de-datos", destination: "/politicas-de-datos", permanent: true },
    ];
  },
};

export default nextConfig;
