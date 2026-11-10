import pg from "pg";
const { Pool } = pg;

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://user:password@localhost:5432/archforge?sslmode=disable";

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

async function migrate() {
  const client = await pool.connect();
  console.log("Connected to Neon DB successfully!");

  try {
    await client.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

    await client.query(`
      CREATE TABLE IF NOT EXISTS public.users (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email text UNIQUE NOT NULL,
        password_hash text NOT NULL,
        name text,
        avatar_url text,
        role text DEFAULT 'student',
        created_at timestamptz DEFAULT now()
      );
    `);
    console.log("Created table public.users");

    await client.query(`
      CREATE TABLE IF NOT EXISTS public.profiles (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        auth_user_id text UNIQUE NOT NULL,
        display_name text,
        locale text DEFAULT 'id',
        bio text,
        created_at timestamptz DEFAULT now()
      );
    `);
    console.log("Created table public.profiles");

    await client.query(`
      CREATE TABLE IF NOT EXISTS public.user_sessions (
        id text PRIMARY KEY,
        user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
        expires_at timestamptz NOT NULL,
        created_at timestamptz DEFAULT now()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS public.lesson_progress (
        user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
        lesson_id text NOT NULL,
        status text CHECK (status IN ('started','completed')) NOT NULL,
        notes text,
        updated_at timestamptz DEFAULT now(),
        PRIMARY KEY (user_id, lesson_id)
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS public.submissions (
        id bigserial PRIMARY KEY,
        user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
        exercise_id text NOT NULL,
        language text NOT NULL,
        code text NOT NULL,
        passed boolean NOT NULL,
        result jsonb,
        created_at timestamptz DEFAULT now()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS public.review_cards (
        id bigserial PRIMARY KEY,
        user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
        source_id text NOT NULL,
        question text,
        answer text,
        track text,
        due timestamptz NOT NULL,
        stability real,
        difficulty real,
        state smallint NOT NULL DEFAULT 0,
        reps int DEFAULT 0,
        lapses int DEFAULT 0,
        last_review timestamptz
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS public.review_logs (
        id bigserial PRIMARY KEY,
        card_id bigint NOT NULL REFERENCES public.review_cards(id) ON DELETE CASCADE,
        rating smallint NOT NULL,
        reviewed_at timestamptz DEFAULT now()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS public.sd_attempts (
        id bigserial PRIMARY KEY,
        user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
        scenario_id text NOT NULL,
        graph jsonb NOT NULL,
        adr_notes text,
        sim_result jsonb,
        score int,
        rubric jsonb,
        created_at timestamptz DEFAULT now()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS public.interview_sessions (
        id bigserial PRIMARY KEY,
        user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
        kind text CHECK (kind IN ('coding','system_design')) NOT NULL,
        title text NOT NULL,
        started_at timestamptz DEFAULT now(),
        ended_at timestamptz,
        current_phase text DEFAULT 'clarification',
        phases jsonb,
        transcript jsonb,
        outcome jsonb
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS public.project_submissions (
        id bigserial PRIMARY KEY,
        user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
        project_id text NOT NULL,
        repo_url text NOT NULL,
        demo_url text,
        screenshots text[],
        rubric_self jsonb,
        status text CHECK (status IN ('in_progress','submitted','completed')) NOT NULL DEFAULT 'in_progress',
        created_at timestamptz DEFAULT now(),
        updated_at timestamptz DEFAULT now()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS public.streaks (
        user_id uuid PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
        current int DEFAULT 0,
        longest int DEFAULT 0,
        last_day date
      );
    `);

    console.log("All tables created successfully in cloud Neon DB!");
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch(console.error);

