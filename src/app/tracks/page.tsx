import React from "react";
import { AppShell } from "@/components/shell/AppShell";
import { TracksCatalogueView } from "@/components/tracks/TracksCatalogueView";
import { getTracksFromDb } from "@/lib/curriculum-service";
import { getCurrentUserProfile } from "@/lib/auth";

export default async function TracksPage() {
  const [tracksFromDb, user] = await Promise.all([
    getTracksFromDb(),
    getCurrentUserProfile(),
  ]);

  const mapped = tracksFromDb.map((t) => ({
    id: t.id,
    slug: t.slug,
    title: t.title,
    tagline: t.subtitle,
    category: t.category,
    level: t.levelRange,
    emblem: t.emblem,
    color: t.color,
    progressPercent: t.progressPercent,
    modulesCount: t.modulesCount,
    lessonsCount: t.lessonsCount,
  }));

  return (
    <AppShell
      user={user}
      breadcrumbs={[{ label: "ArchForge", href: "/dashboard" }, { label: "Katalog Track" }]}
    >
      <TracksCatalogueView initialTracks={mapped} />
    </AppShell>
  );
}
