-- Skema konten ArchForge (opsional). PRD §10 menyimpan konten di repo (MDX); tabel ini dipakai
-- bila konten ingin diimpor ke Neon/Postgres. Kolom id bertipe text = lesson_id/exercise_id/source_id
-- yang sudah dipakai tabel lesson_progress, submissions, review_cards, project_submissions (PRD §10).
create table if not exists content_tracks (
  id text primary key, code text not null, ord int not null, data jsonb not null);
create table if not exists content_modules (
  id text primary key, track_id text not null references content_tracks(id), ord int not null, data jsonb not null);
create table if not exists content_lessons (
  id text primary key, track_id text not null references content_tracks(id),
  module_id text not null references content_modules(id), ord int not null,
  tier smallint not null check (tier between 1 and 4),
  level text not null check (level in ('beginner','intermediate','advanced')),
  data jsonb not null);
create table if not exists content_exercises (
  id text primary key, lesson_id text not null references content_lessons(id) on delete cascade,
  kind text not null check (kind in ('code','mcq','fill-blank','parsons','sd-scenario','ui-predict','project')),
  language text, runner text, tier smallint not null, difficulty smallint not null, points int not null,
  data jsonb not null);
create table if not exists content_sd_scenarios (
  id text primary key, ord int not null, tier smallint not null, data jsonb not null);
create table if not exists content_projects (
  id text primary key, track_id text references content_tracks(id), tier smallint not null, data jsonb not null);
create table if not exists content_dsa_problems (
  id text primary key, pattern text not null, tier smallint not null, data jsonb not null);
create table if not exists content_badges (id text primary key, data jsonb not null);
create index if not exists idx_content_lessons_track on content_lessons(track_id, ord);
create index if not exists idx_content_exercises_lesson on content_exercises(lesson_id);
create index if not exists idx_content_exercises_kind on content_exercises(kind, tier);
create index if not exists idx_content_dsa_pattern on content_dsa_problems(pattern);
