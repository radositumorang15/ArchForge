import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/shell/AppShell";
import { getTrackBySlugFromDb } from "@/lib/curriculum-service";
import { getCurrentUserProfile } from "@/lib/auth";
import { TRACKS } from "@/data/curriculum";
import { Play, CheckCircle2, BookOpen, ArrowRight, Award, Target, FolderGit2 } from "lucide-react";

interface TrackDetailPageProps {
  params: Promise<{ track: string }>;
}

export default async function TrackDetailPage({ params }: TrackDetailPageProps) {
  const { track: trackSlug } = await params;
  
  const [dbTrack, user] = await Promise.all([
    getTrackBySlugFromDb(trackSlug),
    getCurrentUserProfile(),
  ]);
  
  // Fallback if not found in DB
  const fallbackTrack = TRACKS.find((t) => t.slug === trackSlug || t.id === trackSlug) || TRACKS[0];

  const track = dbTrack || {
    id: fallbackTrack.id,
    slug: fallbackTrack.slug,
    title: fallbackTrack.title,
    subtitle: fallbackTrack.tagline,
    levelRange: fallbackTrack.level,
    category: fallbackTrack.category,
    emblem: fallbackTrack.emblem,
    color: fallbackTrack.color,
    progressPercent: fallbackTrack.progressPercent,
    modulesCount: fallbackTrack.modulesCount,
    lessonsCount: fallbackTrack.lessonsCount,
    modules: fallbackTrack.modules.map((m) => ({
      id: m.id,
      trackId: fallbackTrack.id,
      code: m.id.toUpperCase(),
      title: m.title,
      difficulty: "beginner",
      orderIndex: 0,
      learningGoals: ["Memahami konsep dasar", "Menerapkan latihan kode"],
      lessons: m.lessons.map((l) => ({
        id: l.id,
        moduleId: m.id,
        title: l.title,
        level: "beginner",
        estMinutes: 20,
        prereq: [],
        objectives: l.objectives,
        tags: [fallbackTrack.id],
        interactiveWidget: null,
        mdxBody: l.description,
        srsCardsAuto: true,
        orderIndex: 0,
      })),
    })),
    projects: fallbackTrack.projectBrief
      ? [
          {
            id: `proj-${fallbackTrack.id}`,
            trackId: fallbackTrack.id,
            tier: "project_2_intermediate",
            title: fallbackTrack.projectBrief.title,
            briefMarkdown: fallbackTrack.projectBrief.description,
            starterRepoTemplate: "https://github.com/archforge-starters/template",
            ciWorkflowPath: ".github/workflows/ci.yml",
            acceptanceCriteria: fallbackTrack.projectBrief.acceptanceCriteria,
            rubricChecklist: [],
          },
        ]
      : [],
  };

  return (
    <AppShell
      user={user}
      breadcrumbs={[
        { label: "ArchForge", href: "/dashboard" },
        { label: "Katalog Track", href: "/tracks" },
        { label: track.title },
      ]}
    >
      <div className="space-y-6">
        {/* Track Hero Banner */}
        <div className="p-6 rounded-card bg-surface-50 border border-line flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#1E1914] to-[#2E2720] flex items-center justify-center p-2.5 border border-white/10 shadow-lg flex-shrink-0">
              <Image
                src={track.emblem || "/assets/3d/emblem/emblem-rust@2x.webp"}
                alt={track.title}
                width={64}
                height={64}
                className="object-contain drop-shadow"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-600 text-xs font-bold uppercase tracking-wider">
                  {track.category}
                </span>
                <span className="text-xs text-ink-500">• Level {track.levelRange}</span>
              </div>
              <h1 className="text-2xl font-bold text-ink-900 mt-1">{track.title}</h1>
              <p className="text-xs text-ink-500 mt-1 max-w-2xl leading-relaxed">{track.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 self-end md:self-auto">
            <div className="text-right">
              <div className="text-xs text-ink-500">Progres Track</div>
              <div className="text-xl font-bold font-mono text-orange-600">
                {track.progressPercent}%
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Projects for this Track */}
        {track.projects && track.projects.length > 0 && (
          <div className="p-5 rounded-card bg-surface-50 border border-line space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-orange-500" />
                <h3 className="font-bold text-ink-900 text-sm">
                  Proyek Portofolio Terkait Track Ini
                </h3>
              </div>
              <span className="text-xs text-ink-500">{track.projects.length} Proyek Terdaftar</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {track.projects.map((proj: any) => (
                <div
                  key={proj.id}
                  className="p-4 rounded-xl bg-white border border-line hover:border-orange-500/50 transition space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-600 text-[11px] font-bold uppercase">
                      {proj.tier.replace(/_/g, " ")}
                    </span>
                  </div>
                  <h4 className="font-bold text-ink-900 text-xs sm:text-sm">{proj.title}</h4>
                  <p className="text-[11px] text-ink-500 line-clamp-2 leading-relaxed">
                    {proj.briefMarkdown}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modules Syllabus */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-ink-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-500" />
              <span>Silabus & Modul Pembelajaran ({track.modules?.length || 0} Modul)</span>
            </h2>
            <span className="text-xs text-ink-500">Live data dari Neon PostgreSQL</span>
          </div>

          <div className="space-y-3">
            {track.modules && track.modules.map((mod: any, modIdx: number) => (
              <div
                key={mod.id}
                className="p-4 rounded-xl bg-surface-50 border border-line space-y-3"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-surface-200 text-ink-700 text-xs font-mono font-bold">
                      {mod.code || `M${modIdx + 1}`}
                    </span>
                    <h3 className="font-bold text-sm text-ink-900">{mod.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-ink-500">
                    <span className="capitalize">{mod.difficulty}</span>
                    <span>•</span>
                    <span>{mod.lessons.length > 0 ? `${mod.lessons.length} Lesson` : "Kurikulum Inti"}</span>
                  </div>
                </div>

                {mod.learningGoals && mod.learningGoals.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {mod.learningGoals.map((goal: string, gIdx: number) => (
                      <span
                        key={gIdx}
                        className="px-2 py-0.5 rounded-full bg-surface-100 text-[11px] text-ink-600 border border-line/60 flex items-center gap-1"
                      >
                        <Target className="w-3 h-3 text-orange-500" />
                        {goal}
                      </span>
                    ))}
                  </div>
                )}

                <div className="space-y-2 pt-1">
                  {mod.lessons.length > 0 ? (
                    mod.lessons.map((lsn: any) => (
                      <Link
                        key={lsn.id}
                        href={`/learn/${track.slug}/${mod.code.toLowerCase()}/${lsn.id}`}
                        className="p-3 rounded-lg bg-white border border-line hover:border-orange-500/50 hover:shadow-sm flex items-center justify-between gap-3 transition group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-7 h-7 rounded-full bg-orange-500/10 text-orange-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                            <Play className="w-3 h-3 fill-current ml-0.5" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-ink-900 truncate group-hover:text-orange-600 transition">
                              {lsn.title}
                            </div>
                            <div className="text-[11px] text-ink-500">
                              {lsn.estMinutes}m • {lsn.level}
                            </div>
                          </div>
                        </div>

                        <ArrowRight className="w-4 h-4 text-ink-400 group-hover:text-orange-500 transition-transform group-hover:translate-x-0.5 flex-shrink-0" />
                      </Link>
                    ))
                  ) : (
                    <div className="p-3 rounded-lg bg-white/60 border border-dashed border-line text-xs text-ink-500 flex items-center justify-between">
                      <span>Materi interaktif & latihan kode untuk modul ini siap diakses</span>
                      <Link
                        href={`/learn/${track.slug}/${mod.code.toLowerCase()}/master`}
                        className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1"
                      >
                        Mulai Belajar <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
