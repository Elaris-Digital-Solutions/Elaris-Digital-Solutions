import { REDIRECTS } from "./src/seo/redirects.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The existing ESLint config is the legacy Vite flat-config; skip it during
  // production builds so it does not block deploys. Run `npm run lint` manually.
  //
  // NOTA: `typescript.ignoreBuildErrors` NO está activado a propósito. Los
  // errores de tipo sí tumban el build, y de eso depende la verificación de
  // enlaces internos (src/content/link-integrity.ts).
  eslint: { ignoreDuringBuilds: true },
  async redirects() {
    return REDIRECTS;
  },
};

export default nextConfig;
