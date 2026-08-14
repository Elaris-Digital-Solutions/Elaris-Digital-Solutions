import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import JsonLd from "@/components/JsonLd";
import {
  SITE_URL,
  HOME_TITLE,
  HOME_DESCRIPTION,
  OG_IMAGE,
  LOCALE,
  buildOrganizationSchema,
  buildWebsiteSchema,
} from "@/seo/site";

/**
 * Inter autoalojada.
 *
 * Antes se pedía con `@import url(fonts.googleapis.com)` en la primera línea de
 * globals.css, que es la forma más lenta posible: el navegador tenía que bajar
 * nuestro CSS, parsearlo, descubrir el import, pedir el CSS de Google y solo
 * entonces pedir los woff2 — cuatro pasos en serie, todos bloqueando el
 * pintado, con un tercero en el camino crítico.
 *
 * `next/font` descarga la fuente en tiempo de build y la sirve desde nuestro
 * propio dominio con el `@font-face` ya inyectado. Misma familia, así que el
 * texto se ve exactamente igual.
 *
 * Sin `weight`: Inter es una fuente variable, y pedirla así entrega un único
 * archivo que cubre todos los pesos del 100 al 900. Enumerar los siete pesos
 * que usa el sitio generaba siete archivos estáticos por cada rango Unicode.
 */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: "%s | Elaris Digital Solutions",
  },
  description: HOME_DESCRIPTION,
  applicationName: "Elaris Digital Solutions",
  authors: [{ name: "Elaris Digital Solutions" }],
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Elaris Digital Solutions",
    locale: LOCALE,
    url: SITE_URL,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [
      { url: OG_IMAGE, width: 1200, height: 630, alt: "Logotipo de Elaris Digital Solutions" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ElarisSolutions",
    creator: "@ElarisSolutions",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [OG_IMAGE],
  },
  other: {
    "facebook-domain-verification": "p3x4ho9g4i1jx19d03kuke2sbn9qvq",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1d3f",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        {/* Sin preconnect a Google Fonts: la fuente ya se sirve desde este
            mismo dominio, así que abrir esa conexión sería trabajo inútil. */}
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <JsonLd data={[buildOrganizationSchema(), buildWebsiteSchema()]} />
      </head>
      <body>
        {/* Degradado de marca referenciable por los iconos SVG
            (`.icon-brand-gradient { stroke: url(#brand-gradient) }`).
            No usa display:none — algunos navegadores dejan de resolver la
            referencia si el <svg> que la contiene está oculto así. */}
        <svg
          aria-hidden="true"
          focusable="false"
          width="0"
          height="0"
          style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
        >
          <defs>
            <linearGradient id="brand-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0855FD" />
              <stop offset="100%" stopColor="#752CFC" />
            </linearGradient>
            <linearGradient id="brand-gradient-full" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00C0FD" />
              <stop offset="45%" stopColor="#0855FD" />
              <stop offset="100%" stopColor="#752CFC" />
            </linearGradient>
          </defs>
        </svg>
        {/* Los pixeles de respaldo del Pixel de Meta van como HTML crudo y no
            como JSX a propósito: React detecta cualquier <img> del árbol y le
            genera un <link rel="preload" as="image"> en la cabecera. Eso hacía
            que TODO visitante —también los que sí ejecutan JavaScript, que son
            casi todos— abriera dos conexiones a facebook.com para descargar
            dos pixeles de 1×1 que nunca iba a usar. Con
            `dangerouslySetInnerHTML` React no los ve, y el respaldo sigue
            funcionando para quien tenga el JavaScript desactivado. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=1294573795867367&ev=PageView&noscript=1" /><img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=868251342283921&ev=PageView&noscript=1" />`,
          }}
        />
        <div id="root">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
