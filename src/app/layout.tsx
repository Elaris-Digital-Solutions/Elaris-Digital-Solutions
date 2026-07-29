import type { Metadata, Viewport } from "next";
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
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
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
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1294573795867367&ev=PageView&noscript=1"
            alt=""
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=868251342283921&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <div id="root">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
