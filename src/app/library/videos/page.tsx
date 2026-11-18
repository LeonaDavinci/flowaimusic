import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LibrarySectionView } from "@/components/LibrarySectionView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "My Music Videos | Flow AI Music",
  description: "Directed music videos created from your Flow AI Music tracks.",
  path: "/library/videos",
});

export default function VideosPage() {
  return (
    <LibrarySectionView
      name="Music videos"
      title="Visuals you directed yourself."
      description="Every video you built around a track, with its characters, palette and pacing saved together."
      examples={["Neon Cartography", "Paper Planes at Dawn", "Atlas Unfolding"]}
      tone="coral"
    />
  );
}
