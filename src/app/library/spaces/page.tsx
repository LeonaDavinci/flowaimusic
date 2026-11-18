import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { LibrarySectionView } from "@/components/LibrarySectionView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "My Spaces — Playable Audio Tools | FlowAI Music",
  description: "Playable browser tools built from a prompt: keyboards, drum machines, games and effect racks.",
  path: "/library/spaces",
});

export default function SpacesPage() {
  return (
    <LibrarySectionView
      name="Spaces"
      title="Little tools you dreamed up."
      description="Keyboards, drum machines, music games and custom effect racks — each one a shareable URL."
      examples={["Mini Keyboard", "Tape Delay Lab", "Chord Roulette"]}
      tone="cyan"
    />
  );
}
