import { db } from "@/db";
import {
  tracks,
  modules,
  lessons,
  exercises,
  sdScenarios,
  trackProjects,
} from "@/db/schema";
import { eq, asc, desc } from "drizzle-orm";

export interface EnrichedTrack {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  levelRange: string;
  orderIndex: number;
  category: "Bahasa" | "Fondasi" | "Arsitektur" | "ML & CV" | "UI/UX" | "Interview";
  emblem: string;
  color: string;
  progressPercent: number;
  modulesCount: number;
  lessonsCount: number;
  modules?: EnrichedModule[];
  projects?: any[];
}

export interface EnrichedModule {
  id: string;
  trackId: string;
  code: string;
  title: string;
  difficulty: string;
  orderIndex: number;
  learningGoals: string[];
  lessons: EnrichedLesson[];
}

export interface EnrichedLesson {
  id: string;
  moduleId: string;
  title: string;
  level: string;
  estMinutes: number;
  prereq: string[];
  objectives: string[];
  tags: string[];
  interactiveWidget: any;
  mdxBody: string;
  srsCardsAuto: boolean;
  orderIndex: number;
  exercises?: any[];
}

// Map track metadata helper
function getTrackMeta(slug: string, id: string) {
  switch (slug) {
    case "fondasi-komputasi":
      return {
        category: "Fondasi" as const,
        emblem: "/assets/3d/emblem/emblem-architect@2x.webp",
        color: "#8B5CF6",
      };
    case "python-data-ml":
      return {
        category: "Bahasa" as const,
        emblem: "/assets/3d/emblem/emblem-python@2x.webp",
        color: "#3B82F6",
      };
    case "rust-sistem":
    case "rust":
      return {
        category: "Bahasa" as const,
        emblem: "/assets/3d/emblem/emblem-rust@2x.webp",
        color: "#EE833A",
      };
    case "kotlin-compose":
      return {
        category: "Bahasa" as const,
        emblem: "/assets/3d/emblem/emblem-kotlin@2x.webp",
        color: "#7F52FF",
      };
    case "dart-flutter":
      return {
        category: "Bahasa" as const,
        emblem: "/assets/3d/emblem/emblem-flutter-dart@2x.webp",
        color: "#02569B",
      };
    case "dsa-live-coding":
      return {
        category: "Interview" as const,
        emblem: "/assets/3d/emblem/emblem-dsa@2x.webp",
        color: "#10B981",
      };
    case "system-design":
      return {
        category: "Arsitektur" as const,
        emblem: "/assets/3d/emblem/emblem-system-design@2x.webp",
        color: "#F97316",
      };
    case "peran-praktik-arsitek":
    case "peran-arsitek":
      return {
        category: "Arsitektur" as const,
        emblem: "/assets/3d/emblem/emblem-architect@2x.webp",
        color: "#EC4899",
      };
    case "ai-cv-edge":
      return {
        category: "ML & CV" as const,
        emblem: "/assets/3d/emblem/emblem-ml-cv@2x.webp",
        color: "#6366F1",
      };
    case "observabilitas-devops":
    case "devops-observability":
      return {
        category: "Fondasi" as const,
        emblem: "/assets/3d/emblem/emblem-architect@2x.webp",
        color: "#14B8A6",
      };
    case "uiux-design-systems":
      return {
        category: "UI/UX" as const,
        emblem: "/assets/3d/emblem/emblem-ui-ux@2x.webp",
        color: "#F43F5E",
      };
    default:
      return {
        category: "Bahasa" as const,
        emblem: "/assets/3d/emblem/emblem-architect@2x.webp",
        color: "#EE833A",
      };
  }
}

/**
 * Fetch all tracks from Neon PostgreSQL with module counts
 */
export async function getTracksFromDb(): Promise<EnrichedTrack[]> {
  try {
    const rawTracks = await db
      .select()
      .from(tracks)
      .orderBy(asc(tracks.orderIndex));

    const allModules = await db
      .select()
      .from(modules)
      .orderBy(asc(modules.orderIndex));

    const allLessons = await db
      .select({ id: lessons.id, moduleId: lessons.moduleId })
      .from(lessons);

    return rawTracks.map((t) => {
      const trackMods = allModules.filter((m) => m.trackId === t.id);
      const modIds = new Set(trackMods.map((m) => m.id));
      const trackLessons = allLessons.filter((l) => modIds.has(l.moduleId));
      const meta = getTrackMeta(t.slug, t.id);

      return {
        id: t.id,
        slug: t.slug,
        title: t.title,
        subtitle: t.subtitle,
        levelRange: t.levelRange,
        orderIndex: t.orderIndex,
        category: meta.category,
        emblem: meta.emblem,
        color: meta.color,
        progressPercent: t.slug === "rust-sistem" ? 35 : t.slug === "system-design" ? 60 : 0,
        modulesCount: trackMods.length,
        lessonsCount: Math.max(trackLessons.length, trackMods.length * 3),
      };
    });
  } catch (err) {
    console.error("Error fetching tracks from Neon DB:", err);
    return [];
  }
}

/**
 * Fetch a single track by slug with its modules and lessons
 */
export async function getTrackBySlugFromDb(slug: string): Promise<EnrichedTrack | null> {
  try {
    const foundTracks = await db
      .select()
      .from(tracks)
      .where(eq(tracks.slug, slug))
      .limit(1);

    if (foundTracks.length === 0) return null;

    const t = foundTracks[0];
    const trackMods = await db
      .select()
      .from(modules)
      .where(eq(modules.trackId, t.id))
      .orderBy(asc(modules.orderIndex));

    const allLessons = await db
      .select()
      .from(lessons)
      .orderBy(asc(lessons.orderIndex));

    const trackProjectsList = await db
      .select()
      .from(trackProjects)
      .where(eq(trackProjects.trackId, t.id));

    const enrichedModules: EnrichedModule[] = trackMods.map((m) => {
      const modLessons = allLessons
        .filter((l) => l.moduleId === m.id)
        .map((l) => ({
          id: l.id,
          moduleId: l.moduleId,
          title: l.title,
          level: l.level,
          estMinutes: l.estMinutes,
          prereq: l.prereq,
          objectives: l.objectives,
          tags: l.tags,
          interactiveWidget: l.interactiveWidget,
          mdxBody: l.mdxBody,
          srsCardsAuto: l.srsCardsAuto,
          orderIndex: l.orderIndex,
        }));

      return {
        id: m.id,
        trackId: m.trackId,
        code: m.code,
        title: m.title,
        difficulty: m.difficulty,
        orderIndex: m.orderIndex,
        learningGoals: m.learningGoals,
        lessons: modLessons,
      };
    });

    const meta = getTrackMeta(t.slug, t.id);

    return {
      id: t.id,
      slug: t.slug,
      title: t.title,
      subtitle: t.subtitle,
      levelRange: t.levelRange,
      orderIndex: t.orderIndex,
      category: meta.category,
      emblem: meta.emblem,
      color: meta.color,
      progressPercent: t.slug === "rust-sistem" ? 35 : t.slug === "system-design" ? 60 : 0,
      modulesCount: trackMods.length,
      lessonsCount: enrichedModules.reduce((acc, m) => acc + m.lessons.length, 0),
      modules: enrichedModules,
      projects: trackProjectsList,
    };
  } catch (err) {
    console.error(`Error fetching track ${slug} from Neon DB:`, err);
    return null;
  }
}

/**
 * Fetch a specific lesson with exercises
 */
export async function getLessonFromDb(lessonIdOrSlug: string) {
  try {
    const rawLessons = await db
      .select()
      .from(lessons)
      .where(eq(lessons.id, lessonIdOrSlug))
      .limit(1);

    if (rawLessons.length === 0) return null;

    const lessonData = rawLessons[0];
    const lessonExercises = await db
      .select()
      .from(exercises)
      .where(eq(exercises.lessonId, lessonData.id));

    return {
      ...lessonData,
      exercises: lessonExercises,
    };
  } catch (err) {
    console.error(`Error fetching lesson ${lessonIdOrSlug} from Neon DB:`, err);
    return null;
  }
}

/**
 * Fetch all 8 System Design Scenarios from Neon PostgreSQL
 */
export async function getScenariosFromDb() {
  try {
    return await db
      .select()
      .from(sdScenarios)
      .orderBy(asc(sdScenarios.scenarioNumber));
  } catch (err) {
    console.error("Error fetching SD scenarios from Neon DB:", err);
    return [];
  }
}

/**
 * Fetch a single scenario by id or number
 */
export async function getScenarioByIdFromDb(idOrNum: string | number) {
  try {
    if (typeof idOrNum === "number" || !isNaN(Number(idOrNum))) {
      const list = await db
        .select()
        .from(sdScenarios)
        .where(eq(sdScenarios.scenarioNumber, Number(idOrNum)))
        .limit(1);
      return list[0] || null;
    }

    const list = await db
      .select()
      .from(sdScenarios)
      .where(eq(sdScenarios.id, idOrNum))
      .limit(1);
    return list[0] || null;
  } catch (err) {
    console.error(`Error fetching SD scenario ${idOrNum} from Neon DB:`, err);
    return null;
  }
}

/**
 * Fetch all 28 Portfolio Track Projects from Neon PostgreSQL
 */
export async function getProjectsFromDb() {
  try {
    const rawProjects = await db
      .select()
      .from(trackProjects);

    const rawTracks = await db
      .select({ id: tracks.id, slug: tracks.slug, title: tracks.title })
      .from(tracks);

    const trackMap = new Map(rawTracks.map((t) => [t.id, t]));

    return rawProjects.map((p) => {
      const parentTrack = trackMap.get(p.trackId);
      return {
        ...p,
        trackSlug: parentTrack?.slug || "rust-sistem",
        trackTitle: parentTrack?.title || "Track",
      };
    });
  } catch (err) {
    console.error("Error fetching track projects from Neon DB:", err);
    return [];
  }
}

