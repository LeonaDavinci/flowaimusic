import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LibrarySectionView } from "@/components/LibrarySectionView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "My Playlists | FlowAI Music",
  description: "Collect and share the songs you made with FlowAI Music in playlists.",
  path: "/library/playlists",
});

export default function PlaylistsPage() {
  return (
    <LibrarySectionView
      name="Playlists"
      title="Playlists you put together."
      description="Group tracks into a mood, a project, or a set you want to share with one link."
      examples={["Fog Harbor", "Golden Afternoon", "Crystal Sky"]}
      tone="violet"
    />
  );
}
