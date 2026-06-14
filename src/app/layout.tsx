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
      { url: "/favicon.ico" },
    ],
    apple: { url: "/favicon.png", sizes: "180x180" },
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
