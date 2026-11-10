import { pool } from "../lib/db.ts";
import {
  SEED_TRACKS,
  SEED_MODULES,
  SEED_SD_SCENARIOS,
  SEED_TRACK_PROJECTS,
  SEED_LESSONS,
  SEED_EXERCISES,
} from "../db/seed-data.ts";

async function runSeed() {
  const client = await pool.connect();
  console.log("Connected to Neon DB for curriculum seeding...");

  try {
    // 1. Create Catalog Tables
    console.log("Step 1: Creating catalog tables if not exist...");

    await client.query(`
      CREATE TABLE IF NOT EXISTS public.tracks (
        id text PRIMARY KEY,
        slug text UNIQUE NOT NULL,
        title text NOT NULL,
        subtitle text NOT NULL,
        level_range text NOT NULL,
        order_index smallint NOT NULL,
        is_published boolean DEFAULT true NOT NULL,
        created_at timestamptz DEFAULT now()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS public.modules (
        id text PRIMARY KEY,
        track_id text NOT NULL REFERENCES public.tracks(id) ON DELETE CASCADE,
        code text NOT NULL,
        title text NOT NULL,
        difficulty text NOT NULL,
        order_index smallint NOT NULL,
        learning_goals jsonb NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS public.lessons (
        id text PRIMARY KEY,
        module_id text NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
        title text NOT NULL,
        level text NOT NULL,
        est_minutes smallint DEFAULT 20 NOT NULL,
        prereq text[] DEFAULT '{}'::text[] NOT NULL,
        objectives text[] NOT NULL,
        tags text[] NOT NULL,
        interactive_widget jsonb,
        mdx_body text NOT NULL,
        srs_cards_auto boolean DEFAULT true NOT NULL,
        order_index smallint NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS public.exercises (
        id text PRIMARY KEY,
        lesson_id text NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
        level text NOT NULL,
        kind text NOT NULL,
        language text,
        runner text,
        prompt_markdown text NOT NULL,
        starter_code text,
        options jsonb,
        tests jsonb,
        limits jsonb,
        interview_meta jsonb,
        hints jsonb NOT NULL,
        solution text NOT NULL,
        explanation text NOT NULL,
        created_at timestamptz DEFAULT now()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS public.sd_scenarios (
        id text PRIMARY KEY,
        lesson_id text REFERENCES public.lessons(id) ON DELETE SET NULL,
        scenario_number smallint NOT NULL,
        title text NOT NULL,
        level text NOT NULL,
        brief_markdown text NOT NULL,
        functional_reqs text[] NOT NULL,
        non_functional_reqs jsonb NOT NULL,
        available_nodes text[] NOT NULL,
        traffic_profile jsonb NOT NULL,
        chaos_events jsonb NOT NULL,
        rubric_rules jsonb NOT NULL,
        adr_prompts text[] NOT NULL,
        reference_solution jsonb NOT NULL
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS public.track_projects (
        id text PRIMARY KEY,
        track_id text NOT NULL REFERENCES public.tracks(id) ON DELETE CASCADE,
        tier text NOT NULL,
        title text NOT NULL,
        brief_markdown text NOT NULL,
        starter_repo_template text NOT NULL,
        ci_workflow_path text NOT NULL,
        acceptance_criteria text[] NOT NULL,
        rubric_checklist jsonb NOT NULL
      );
    `);

    console.log("Catalog tables are ready in public schema!");

    // 2. Upsert TRACKS
    console.log(`Step 2: Upserting ${SEED_TRACKS.length} tracks...`);
    for (const t of SEED_TRACKS) {
      await client.query(
        `
        INSERT INTO public.tracks (id, slug, title, subtitle, level_range, order_index, is_published)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (id) DO UPDATE SET
          slug = EXCLUDED.slug,
          title = EXCLUDED.title,
          subtitle = EXCLUDED.subtitle,
          level_range = EXCLUDED.level_range,
          order_index = EXCLUDED.order_index,
          is_published = EXCLUDED.is_published;
      `,
        [t.id, t.slug, t.title, t.subtitle, t.levelRange, t.orderIndex, t.isPublished]
      );
    }
    console.log(`✓ ${SEED_TRACKS.length} tracks seeded.`);

    // 3. Upsert MODULES
    console.log(`Step 3: Upserting ${SEED_MODULES.length} modules...`);
    for (const m of SEED_MODULES) {
      await client.query(
        `
        INSERT INTO public.modules (id, track_id, code, title, difficulty, order_index, learning_goals)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (id) DO UPDATE SET
          track_id = EXCLUDED.track_id,
          code = EXCLUDED.code,
          title = EXCLUDED.title,
          difficulty = EXCLUDED.difficulty,
          order_index = EXCLUDED.order_index,
          learning_goals = EXCLUDED.learning_goals;
      `,
        [
          m.id,
          m.trackId,
          m.code,
          m.title,
          m.difficulty,
          m.orderIndex,
          JSON.stringify(m.learningGoals),
        ]
      );
    }
    console.log(`✓ ${SEED_MODULES.length} modules seeded.`);

    // 4. Upsert LESSONS
    console.log(`Step 4: Upserting ${SEED_LESSONS.length} master interactive lessons...`);
    for (const l of SEED_LESSONS) {
      await client.query(
        `
        INSERT INTO public.lessons (id, module_id, title, level, est_minutes, prereq, objectives, tags, interactive_widget, mdx_body, srs_cards_auto, order_index)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        ON CONFLICT (id) DO UPDATE SET
          module_id = EXCLUDED.module_id,
          title = EXCLUDED.title,
          level = EXCLUDED.level,
          est_minutes = EXCLUDED.est_minutes,
          prereq = EXCLUDED.prereq,
          objectives = EXCLUDED.objectives,
          tags = EXCLUDED.tags,
          interactive_widget = EXCLUDED.interactive_widget,
          mdx_body = EXCLUDED.mdx_body,
          srs_cards_auto = EXCLUDED.srs_cards_auto,
          order_index = EXCLUDED.order_index;
      `,
        [
          l.id,
          l.moduleId,
          l.title,
          l.level,
          l.estMinutes,
          l.prereq,
          l.objectives,
          l.tags,
          l.interactiveWidget ? JSON.stringify(l.interactiveWidget) : null,
          l.mdxBody,
          l.srsCardsAuto,
          l.orderIndex,
        ]
      );
    }
    console.log(`✓ ${SEED_LESSONS.length} lessons seeded.`);

    // 5. Upsert EXERCISES
    console.log(`Step 5: Upserting ${SEED_EXERCISES.length} exercises...`);
    for (const ex of SEED_EXERCISES) {
      await client.query(
        `
        INSERT INTO public.exercises (id, lesson_id, level, kind, language, runner, prompt_markdown, starter_code, options, tests, limits, interview_meta, hints, solution, explanation)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        ON CONFLICT (id) DO UPDATE SET
          lesson_id = EXCLUDED.lesson_id,
          level = EXCLUDED.level,
          kind = EXCLUDED.kind,
          language = EXCLUDED.language,
          runner = EXCLUDED.runner,
          prompt_markdown = EXCLUDED.prompt_markdown,
          starter_code = EXCLUDED.starter_code,
          options = EXCLUDED.options,
          tests = EXCLUDED.tests,
          limits = EXCLUDED.limits,
          interview_meta = EXCLUDED.interview_meta,
          hints = EXCLUDED.hints,
          solution = EXCLUDED.solution,
          explanation = EXCLUDED.explanation;
      `,
        [
          ex.id,
          ex.lessonId,
          ex.level,
          ex.kind,
          ex.language,
          ex.runner,
          ex.promptMarkdown,
          ex.starterCode,
          ex.options ? JSON.stringify(ex.options) : null,
          ex.tests ? JSON.stringify(ex.tests) : null,
          ex.limits ? JSON.stringify(ex.limits) : null,
          ex.interviewMeta ? JSON.stringify(ex.interviewMeta) : null,
          JSON.stringify(ex.hints),
          ex.solution,
          ex.explanation,
        ]
      );
    }
    console.log(`✓ ${SEED_EXERCISES.length} exercises seeded.`);

    // 6. Upsert SD SCENARIOS
    console.log(`Step 6: Upserting ${SEED_SD_SCENARIOS.length} system design scenarios...`);
    for (const s of SEED_SD_SCENARIOS) {
      await client.query(
        `
        INSERT INTO public.sd_scenarios (id, lesson_id, scenario_number, title, level, brief_markdown, functional_reqs, non_functional_reqs, available_nodes, traffic_profile, chaos_events, rubric_rules, adr_prompts, reference_solution)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        ON CONFLICT (id) DO UPDATE SET
          lesson_id = EXCLUDED.lesson_id,
          scenario_number = EXCLUDED.scenario_number,
          title = EXCLUDED.title,
          level = EXCLUDED.level,
          brief_markdown = EXCLUDED.brief_markdown,
          functional_reqs = EXCLUDED.functional_reqs,
          non_functional_reqs = EXCLUDED.non_functional_reqs,
          available_nodes = EXCLUDED.available_nodes,
          traffic_profile = EXCLUDED.traffic_profile,
          chaos_events = EXCLUDED.chaos_events,
          rubric_rules = EXCLUDED.rubric_rules,
          adr_prompts = EXCLUDED.adr_prompts,
          reference_solution = EXCLUDED.reference_solution;
      `,
        [
          s.id,
          s.lessonId || null,
          s.scenarioNumber,
          s.title,
          s.level,
          s.briefMarkdown,
          s.functionalReqs,
          JSON.stringify(s.nonFunctionalReqs),
          s.availableNodes,
          JSON.stringify(s.trafficProfile),
          JSON.stringify(s.chaosEvents),
          JSON.stringify(s.rubricRules),
          s.adrPrompts,
          JSON.stringify(s.referenceSolution),
        ]
      );
    }
    console.log(`✓ ${SEED_SD_SCENARIOS.length} scenarios seeded.`);

    // 7. Upsert TRACK PROJECTS
    console.log(`Step 7: Upserting ${SEED_TRACK_PROJECTS.length} portfolio track projects...`);
    for (const p of SEED_TRACK_PROJECTS) {
      await client.query(
        `
        INSERT INTO public.track_projects (id, track_id, tier, title, brief_markdown, starter_repo_template, ci_workflow_path, acceptance_criteria, rubric_checklist)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        ON CONFLICT (id) DO UPDATE SET
          track_id = EXCLUDED.track_id,
          tier = EXCLUDED.tier,
          title = EXCLUDED.title,
          brief_markdown = EXCLUDED.brief_markdown,
          starter_repo_template = EXCLUDED.starter_repo_template,
          ci_workflow_path = EXCLUDED.ci_workflow_path,
          acceptance_criteria = EXCLUDED.acceptance_criteria,
          rubric_checklist = EXCLUDED.rubric_checklist;
      `,
        [
          p.id,
          p.trackId,
          p.tier,
          p.title,
          p.briefMarkdown,
          p.starterRepoTemplate,
          p.ciWorkflowPath,
          p.acceptanceCriteria,
          JSON.stringify(p.rubricChecklist),
        ]
      );
    }
    console.log(`✓ ${SEED_TRACK_PROJECTS.length} track projects seeded.`);

    console.log("==========================================");
    console.log("ALL CURRICULUM SEEDED SUCCESSFULLY TO NEON DB!");
    console.log("==========================================");
  } finally {
    client.release();
    await pool.end();
  }
}

runSeed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});

