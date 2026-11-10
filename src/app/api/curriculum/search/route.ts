import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { tracks, modules, lessons } from "@/db/schema";
import { ilike, or } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim() || "";

    if (!q || q.length < 2) {
      return NextResponse.json({ results: [] });
    }

    const pattern = `%${q}%`;

    // 1. Search in Tracks
    const matchedTracks = await db
      .select({
        id: tracks.id,
        slug: tracks.slug,
        title: tracks.title,
        subtitle: tracks.subtitle,
      })
      .from(tracks)
      .where(or(ilike(tracks.title, pattern), ilike(tracks.subtitle, pattern)))
      .limit(5);

    // 2. Search in Lessons
    const matchedLessons = await db
      .select({
        id: lessons.id,
        title: lessons.title,
        level: lessons.level,
        moduleId: lessons.moduleId,
      })
      .from(lessons)
      .where(or(ilike(lessons.title, pattern), ilike(lessons.mdxBody, pattern)))
      .limit(8);

    // 3. Search in Modules
    const matchedModules = await db
      .select({
        id: modules.id,
        code: modules.code,
        title: modules.title,
        trackId: modules.trackId,
      })
      .from(modules)
      .where(or(ilike(modules.title, pattern), ilike(modules.code, pattern)))
      .limit(5);

    const results = [
      ...matchedTracks.map((t) => ({
        type: "track" as const,
        id: t.id,
        title: t.title,
        subtitle: t.subtitle,
        href: `/tracks/${t.slug}`,
      })),
      ...matchedModules.map((m) => ({
        type: "module" as const,
        id: m.id,
        title: `${m.code} — ${m.title}`,
        subtitle: `Modul Kurikulum`,
        href: `/tracks/${m.trackId}`,
      })),
      ...matchedLessons.map((l) => ({
        type: "lesson" as const,
        id: l.id,
        title: l.title,
        subtitle: `Materi Pelajaran (${l.level})`,
        href: `/learn/rust-sistem/b1/${l.id}`,
      })),
    ];

    return NextResponse.json({ results });
  } catch (err: any) {
    console.error("Search API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

