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
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web browser",
    url: SITE_URL,
    description:
      "FlowAI Music is a conversational AI music studio: describe a song, generate a full-length track, edit sections, split stems, create music videos and share playlists.",
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
        price: "9",
        priceCurrency: "USD",
      },
    ],
    featureList: [
      "Text to song generation",
      "Conversational editing",
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
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
  };
}
