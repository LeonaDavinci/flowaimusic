import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TrackBridge } from "@/components/TrackBridge";
import { SITE_NAME, SITE_URL } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Flow AI Music — Official AI Music Creator & Music Studio",
  description:
    "Flow AI Music (Flow Music AI) is an AI music creator for making original music from text. Generate full songs, edit any section, split stems and make music videos.",
  applicationName: SITE_NAME,
  keywords: [
    "AI music generator",
    "AI music creator",
    "flow music ai",
    "make music with AI",
    "text to music",
    "AI music studio",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Flow AI Music — Official AI Music Creator & Music Studio",
    description:
      "Create music from a sentence. Flow Music AI is the AI music creator that keeps up with your ideas.",
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flow AI Music — Official AI Music Creator",
    description: "Create music from a sentence with Flow Music AI.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/logo.png", sizes: "128x128", type: "image/png" },
    ],
    apple: [{ url: "/logo.png", sizes: "128x128", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fffcf7",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <TrackBridge />
      </body>
    </html>
  );
}
