import {
  pgTable,
  uuid,
  text,
  smallint,
  integer,
  bigint,
  real,
  boolean,
  timestamp,
  date,
  jsonb,
  primaryKey,
  index,
} from "drizzle-orm/pg-core";

// ==========================================
// A. TABEL KATALOG SILABUS, MATERI & SOAL
// ==========================================

export const tracks = pgTable("tracks", {
  id: text("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  levelRange: text("level_range").notNull(),
  orderIndex: smallint("order_index").notNull(),
  isPublished: boolean("is_published").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const modules = pgTable("modules", {
  id: text("id").primaryKey(),
  trackId: text("track_id")
    .references(() => tracks.id, { onDelete: "cascade" })
    .notNull(),
  code: text("code").notNull(),
  title: text("title").notNull(),
  difficulty: text("difficulty").notNull(), // 'beginner' | 'intermediate' | 'advanced' | 'professional'
  orderIndex: smallint("order_index").notNull(),
  learningGoals: jsonb("learning_goals").$type<string[]>().notNull(),
});

export const lessons = pgTable("lessons", {
  id: text("id").primaryKey(),
  moduleId: text("module_id")
    .references(() => modules.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  level: text("level").notNull(), // 'beginner' | 'intermediate' | 'advanced' | 'professional'
  estMinutes: smallint("est_minutes").default(20).notNull(),
  prereq: text("prereq").array().default([]).notNull(),
  objectives: text("objectives").array().notNull(),
  tags: text("tags").array().notNull(),
  interactiveWidget: jsonb("interactive_widget").$type<{
    component: string;
    props: Record<string, unknown>;
    taskInstruction: string;
  } | null>(),
  mdxBody: text("mdx_body").notNull(),
  srsCardsAuto: boolean("srs_cards_auto").default(true).notNull(),
  orderIndex: smallint("order_index").notNull(),
});

export const exercises = pgTable("exercises", {
  id: text("id").primaryKey(),
  lessonId: text("lesson_id")
    .references(() => lessons.id, { onDelete: "cascade" })
    .notNull(),
  level: text("level").notNull(), // 'beginner' | 'intermediate' | 'advanced' | 'professional'
  kind: text("kind").notNull(), // 'code' | 'mcq' | 'fill-blank' | 'parsons' | 'sd-scenario' | 'ui-predict' | 'project'
  language: text("language"), // 'python' | 'rust' | 'kotlin' | 'dart' | null
  runner: text("runner"), // 'pyodide' | 'judge0' | 'kotlin-playground' | 'dartpad' | null
  promptMarkdown: text("prompt_markdown").notNull(),
  starterCode: text("starter_code"),
  options: jsonb("options"),
  tests: jsonb("tests").$type<{
    visible: Array<{ name: string; input?: string; expected?: string; code?: string }>;
    hidden: Array<{ name: string; input?: string; expected?: string; code?: string }>;
  } | null>(),
  limits: jsonb("limits").$type<{ timeMs: number; memoryMb: number } | null>(),
  interviewMeta: jsonb("interview_meta").$type<{
    timeLimitMinutes: number;
    clarificationPrompts: string[];
    thinkAloudPrompt: string;
    expectedBigO: { time: string; space: string; explanation: string };
  } | null>(),
  hints: jsonb("hints").$type<[string, string?, string?]>().notNull(),
  solution: text("solution").notNull(),
  explanation: text("explanation").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const sdScenarios = pgTable("sd_scenarios", {
  id: text("id").primaryKey(),
  lessonId: text("lesson_id").references(() => lessons.id, { onDelete: "set null" }),
  scenarioNumber: smallint("scenario_number").notNull(),
  title: text("title").notNull(),
  level: text("level").notNull(), // 'intermediate' | 'advanced' | 'professional'
  briefMarkdown: text("brief_markdown").notNull(),
  functionalReqs: text("functional_reqs").array().notNull(),
  nonFunctionalReqs: jsonb("non_functional_reqs").$type<{
    targetRps: number;
    maxP95Ms: number;
    availability: string;
    maxCostUnits: number;
  }>().notNull(),
  availableNodes: text("available_nodes").array().notNull(),
  trafficProfile: jsonb("traffic_profile").$type<{
    mode: "constant" | "ramp_up" | "spike";
    baseRps: number;
    peakRps: number;
    durationTicks: number;
    seed: number;
  }>().notNull(),
  chaosEvents: jsonb("chaos_events").$type<
    Array<{
      tick: number;
      kind: "kill_node" | "inject_latency" | "traffic_spike_10x" | "cache_stampede";
      targetNode: string;
      detail: string;
    }>
  >().notNull(),
  rubricRules: jsonb("rubric_rules").$type<
    Array<{ ruleId: string; weight: number; checkDescription: string; failFeedback: string }>
  >().notNull(),
  adrPrompts: text("adr_prompts").array().notNull(),
  referenceSolution: jsonb("reference_solution").$type<{
    recommendedNodes: string[];
    edges: Array<[string, string]>;
    architectureSummary: string;
    tradeoffAnalysis: string;
  }>().notNull(),
});

export const trackProjects = pgTable("track_projects", {
  id: text("id").primaryKey(),
  trackId: text("track_id")
    .references(() => tracks.id, { onDelete: "cascade" })
    .notNull(),
  tier: text("tier").notNull(), // 'project_1_basic' | 'project_2_intermediate' | 'project_3_capstone' | 'cross_track_capstone'
  title: text("title").notNull(),
  briefMarkdown: text("brief_markdown").notNull(),
  starterRepoTemplate: text("starter_repo_template").notNull(),
  ciWorkflowPath: text("ci_workflow_path").notNull(),
  acceptanceCriteria: text("acceptance_criteria").array().notNull(),
  rubricChecklist: jsonb("rubric_checklist").$type<
    Array<{ id: string; category: string; item: string; points: number }>
  >().notNull(),
});

// ==========================================
// B. TABEL PENGGUNA & AUTH
// ==========================================

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").unique().notNull(),
  passwordHash: text("password_hash").notNull(),
  name: text("name"),
  avatarUrl: text("avatar_url"),
  role: text("role").default("student"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const userSessions = pgTable("user_sessions", {
  id: text("id").primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  authUserId: text("auth_user_id").unique().notNull(),
  displayName: text("display_name"),
  locale: text("locale").default("id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const lessonProgress = pgTable(
  "lesson_progress",
  {
    userId: uuid("user_id")
      .references(() => profiles.id, { onDelete: "cascade" })
      .notNull(),
    lessonId: text("lesson_id")
      .references(() => lessons.id, { onDelete: "cascade" })
      .notNull(),
    status: text("status").notNull(), // 'started' | 'completed'
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.lessonId] })]
);

export const submissions = pgTable(
  "submissions",
  {
    id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    userId: uuid("user_id")
      .references(() => profiles.id, { onDelete: "cascade" })
      .notNull(),
    exerciseId: text("exercise_id")
      .references(() => exercises.id, { onDelete: "cascade" })
      .notNull(),
    language: text("language").notNull(),
    code: text("code").notNull(),
    passed: boolean("passed").notNull(),
    result: jsonb("result"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [index("idx_submissions_user_ex").on(t.userId, t.exerciseId, t.createdAt)]
);

export const reviewCards = pgTable(
  "review_cards",
  {
    id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    userId: uuid("user_id")
      .references(() => profiles.id, { onDelete: "cascade" })
      .notNull(),
    sourceId: text("source_id").notNull(),
    due: timestamp("due", { withTimezone: true }).notNull(),
    stability: real("stability"),
    difficulty: real("difficulty"),
    state: smallint("state").default(0).notNull(),
    reps: integer("reps").default(0),
    lapses: integer("lapses").default(0),
    lastReview: timestamp("last_review", { withTimezone: true }),
  },
  (t) => [index("idx_review_cards_due").on(t.userId, t.due)]
);

export const reviewLogs = pgTable("review_logs", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  cardId: bigint("card_id", { mode: "number" }).references(() => reviewCards.id, {
    onDelete: "cascade",
  }),
  rating: smallint("rating").notNull(), // 1..4
  reviewedAt: timestamp("reviewed_at", { withTimezone: true }).defaultNow(),
});

export const sdAttempts = pgTable("sd_attempts", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  userId: uuid("user_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
  scenarioId: text("scenario_id")
    .references(() => sdScenarios.id, { onDelete: "cascade" })
    .notNull(),
  graph: jsonb("graph").notNull(),
  adrNotes: text("adr_notes"),
  simResult: jsonb("sim_result"),
  score: integer("score"),
  rubric: jsonb("rubric"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const interviewSessions = pgTable("interview_sessions", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  userId: uuid("user_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
  kind: text("kind").notNull(), // 'coding' | 'system_design'
  startedAt: timestamp("started_at", { withTimezone: true }).defaultNow(),
  endedAt: timestamp("ended_at", { withTimezone: true }),
  phases: jsonb("phases"),
  outcome: jsonb("outcome"),
});

export const projectSubmissions = pgTable(
  "project_submissions",
  {
    id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    userId: uuid("user_id")
      .references(() => profiles.id, { onDelete: "cascade" })
      .notNull(),
    projectId: text("project_id")
      .references(() => trackProjects.id, { onDelete: "cascade" })
      .notNull(),
    repoUrl: text("repo_url").notNull(),
    demoUrl: text("demo_url"),
    screenshots: text("screenshots").array(),
    rubricSelf: jsonb("rubric_self"),
    status: text("status").default("in_progress").notNull(), // 'in_progress' | 'submitted' | 'completed'
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [index("idx_proj_sub_user").on(t.userId, t.projectId)]
);

export const streaks = pgTable("streaks", {
  userId: uuid("user_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .primaryKey(),
  current: integer("current").default(0),
  longest: integer("longest").default(0),
  lastDay: date("last_day"),
});

