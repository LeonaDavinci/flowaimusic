import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./content";

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
};

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
}: PageSeoInput): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type,
      siteName: SITE_NAME,
      title,
      description,
      url,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    alternateName: "Flow Music AI",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web browser",
    url: SITE_URL,
    keywords: "AI music creator, flow music ai, AI music generator, text to music, create music with AI",
    description:
      "Flow AI Music is an AI music creator and conversational music studio: describe the music you want, generate a full-length track, edit sections, split stems, create music videos and share playlists.",
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        price: "0",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "Creator",
        price: "6",
        priceCurrency: "USD",
      },
    ],
    featureList: [
      "Text to music generation",
      "Conversational music editing",
      "Stem split",
      "AI music videos",
      "Playlists and publishing",
    ],
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: "Flow Music AI",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
  };
}
