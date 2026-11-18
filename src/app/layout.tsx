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
  title: "FlowAI Music — Official AI Music Studio | Make Songs with AI",
  description:
    "FlowAI Music is a conversational AI music studio. Describe a song in plain words, generate a full-length track, edit any section, split stems, make a music video and share it.",
  applicationName: SITE_NAME,
  keywords: [
    "AI music generator",
    "make a song with AI",
    "text to music",
    "AI song maker",
    "AI music studio",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "FlowAI Music — Official AI Music Studio",
    description:
      "Turn the song in your head into a real one. Describe it, shape it, see it, share it.",
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowAI Music — Official AI Music Studio",
    description: "Turn the song in your head into a real one.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
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
