import React from "react";
import { AppShell } from "@/components/shell/AppShell";
import { LessonWorkspace } from "@/components/learn/LessonWorkspace";
import { getTrackBySlugFromDb, getLessonFromDb } from "@/lib/curriculum-service";
import { getCurrentUserProfile } from "@/lib/auth";
import { TRACKS } from "@/data/curriculum";

interface LessonPageProps {
  params: Promise<{
    track: string;
    module: string;
    lesson: string;
  }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { track: trackSlug, module: moduleSlug, lesson: lessonSlug } = await params;

  // 1. Fetch Track & User
  const [dbTrack, user] = await Promise.all([
    getTrackBySlugFromDb(trackSlug),
    getCurrentUserProfile(),
  ]);
  const fallbackTrack = TRACKS.find((t) => t.slug === trackSlug) || TRACKS[0];

  const track = {
    id: dbTrack?.id || fallbackTrack.id,
    slug: dbTrack?.slug || fallbackTrack.slug,
    title: dbTrack?.title || fallbackTrack.title,
    tagline: dbTrack?.subtitle || fallbackTrack.tagline,
    category: (dbTrack?.category || fallbackTrack.category) as any,
    level: (dbTrack?.levelRange || fallbackTrack.level) as any,
    emblem: dbTrack?.emblem || fallbackTrack.emblem,
    color: dbTrack?.color || fallbackTrack.color,
    progressPercent: dbTrack?.progressPercent || fallbackTrack.progressPercent,
    modulesCount: dbTrack?.modulesCount || fallbackTrack.modulesCount,
    lessonsCount: dbTrack?.lessonsCount || fallbackTrack.lessonsCount,
    modules: dbTrack?.modules
      ? dbTrack.modules.map((m) => ({
          id: m.id,
          slug: m.code.toLowerCase(),
          title: m.title,
          lessons: m.lessons.map((l) => ({
            id: l.id,
            slug: l.id,
            title: l.title,
            duration: `${l.estMinutes}m`,
            type: "code" as const,
            completed: false,
            description: l.mdxBody,
            objectives: l.objectives,
            hints: ["Review konsep kepemilikan dan borrowing di dokumentasi materi."],
          })),
        }))
      : fallbackTrack.modules,
  };

  // 2. Fetch Module
  const module =
    track.modules.find((m) => m.slug === moduleSlug || m.id === moduleSlug) ||
    track.modules[0] || {
      id: "m-default",
      slug: moduleSlug,
      title: "Modul Inti",
      lessons: [],
    };

  // 3. Fetch Lesson from DB
  const dbLesson = await getLessonFromDb(lessonSlug);

  // If found in DB, map DB lesson & exercises
  let lessonData;
  if (dbLesson) {
    const primaryExercise = dbLesson.exercises && dbLesson.exercises.length > 0 ? dbLesson.exercises[0] : null;
    const testList = primaryExercise?.tests?.visible
      ? primaryExercise.tests.visible.map((t: any) => ({
          name: t.name,
          input: t.input,
          expected: t.expected,
        }))
      : [
          { name: "Verifikasi eksekusi program", expected: "ArchForge" },
        ];

    lessonData = {
      id: dbLesson.id,
      slug: dbLesson.id,
      title: dbLesson.title,
      duration: `${dbLesson.estMinutes}m`,
      type: "code" as const,
      completed: false,
      description: dbLesson.mdxBody.slice(0, 300) + "...",
      objectives: dbLesson.objectives || [
        "Memahami prinsip inti",
        "Menulis dan menjalankan solusi kode",
      ],
      starterCode: primaryExercise?.starterCode || `// Latihan ArchForge\nfn main() {\n    println!("Halo dari ${dbLesson.title}!");\n}`,
      language: (primaryExercise?.language || "rust") as any,
      solution: primaryExercise?.solution,
      hints: Array.isArray(primaryExercise?.hints)
        ? (primaryExercise.hints as string[])
        : ["Gunakan konsep yang telah dipelajari pada modul ini."],
      testCases: testList,
    };
  } else {
    // Fallback from module
    lessonData =
      module.lessons.find((l) => l.slug === lessonSlug || l.id === lessonSlug) ||
      module.lessons[0] || {
        id: "lsn-default",
        slug: lessonSlug,
        title: "Ownership & Semantik Move di Rust",
        duration: "25m",
        type: "code" as const,
        description:
          "Aturan kepemilikan (ownership) adalah fitur inti yang menjamin keamanan memori Rust tanpa runtime garbage collector.",
        objectives: [
          "Menjelaskan 3 aturan kepemilikan",
          "Menganalisis kapan nilai di-Move vs di-Borrow",
          "Menghindari use-after-move compiler error",
        ],
        language: "rust" as const,
        hints: [
          "Gunakan tanda ampersand (&) untuk meminjam referensi tanpa memindahkan ownership.",
          "Variabel s1 tetap valid jika hanya dipinjam oleh &s1.",
        ],
        testCases: [
          { name: "Verifikasi referensi s1 dan s2", expected: "s1 masih valid: ArchForge" },
        ],
      };
  }

  return (
    <AppShell
      user={user}
      breadcrumbs={[
        { label: "ArchForge", href: "/dashboard" },
        { label: track.title, href: `/tracks/${track.slug}` },
        { label: module.title.split("—")[0].trim() },
        { label: lessonData.title },
      ]}
    >
      <LessonWorkspace track={track} module={module} lesson={lessonData} />
    </AppShell>
  );
}
