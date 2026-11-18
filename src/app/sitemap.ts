import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

const LAST_MOD = new Date("2026-11-18T00:00:00.000Z");

const ROUTES: { path: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/studio", priority: 0.9, changeFrequency: "weekly" },
  { path: "/explore", priority: 0.9, changeFrequency: "daily" },
  { path: "/features", priority: 0.8, changeFrequency: "weekly" },
  { path: "/pricing", priority: 0.8, changeFrequency: "weekly" },
  { path: "/guides/ai-music-generator", priority: 0.7, changeFrequency: "monthly" },
  { path: "/library", priority: 0.4, changeFrequency: "weekly" },
  { path: "/library/playlists", priority: 0.3, changeFrequency: "weekly" },
  { path: "/library/videos", priority: 0.3, changeFrequency: "weekly" },
  { path: "/library/spaces", priority: 0.3, changeFrequency: "weekly" },
  { path: "/terms", priority: 0.2, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: LAST_MOD,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
