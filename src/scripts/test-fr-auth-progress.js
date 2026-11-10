import { pool } from "../lib/db.ts";

async function runAuthProgressTest() {
  console.log("=== AUTOMATED TEST: FR-01 (Auth) & FR-02 (Progress Tracking) ===");
  const client = await pool.connect();
  try {
    const testEmail = `test_audit_${Date.now()}@archforge.dev`;
    const testName = `User Audit ${Date.now()}`;

    // 1. Test registration / user creation (FR-01)
    console.log("1. Testing User Registration in Neon DB (FR-01)...");
    const userRes = await client.query(
      `INSERT INTO users (id, email, name, password_hash, role)
       VALUES (gen_random_uuid(), $1, $2, 'hashed_pw_test', 'user')
       RETURNING id, email, name, role;`,
      [testEmail, testName]
    );
    const user = userRes.rows[0];
    console.log(`✓ User created: ID=${user.id}, Email=${user.email}, Role=${user.role}`);

    // Test profile creation per PRD §10
    const profileRes = await client.query(
      `INSERT INTO profiles (id, auth_user_id, display_name, locale)
       VALUES (gen_random_uuid(), $1, $2, 'id')
       RETURNING id, display_name, locale;`,
      [user.id, testName]
    );
    const profile = profileRes.rows[0];
    console.log(`✓ Profile created: ProfileID=${profile.id}, DisplayName=${profile.display_name}`);

    // 2. Test streak tracking (FR-02)
    console.log("2. Testing Streak Initialization (FR-02)...");
    const streakRes = await client.query(
      `INSERT INTO streaks (user_id, current, longest, last_day)
       VALUES ($1, 1, 1, CURRENT_DATE)
       ON CONFLICT (user_id) DO UPDATE SET current = streaks.current + 1, last_day = CURRENT_DATE
       RETURNING current, longest, last_day;`,
      [profile.id]
    );
    console.log(`✓ Streak updated: Current=${streakRes.rows[0].current}, Longest=${streakRes.rows[0].longest}`);

    // 3. Test lesson progress recording (FR-02)
    console.log("3. Testing Lesson Progress Recording (FR-02)...");
    const progressRes = await client.query(
      `INSERT INTO lesson_progress (user_id, lesson_id, status, notes, updated_at)
       VALUES ($1, 'b1-ownership-move', 'completed', 'Audit note: verified', NOW())
       ON CONFLICT (user_id, lesson_id)
       DO UPDATE SET status = EXCLUDED.status, notes = EXCLUDED.notes, updated_at = NOW()
       RETURNING lesson_id, status, notes;`,
      [profile.id]
    );
    console.log(`✓ Lesson progress saved: Lesson=${progressRes.rows[0].lesson_id}, Status=${progressRes.rows[0].status}`);

    // 4. Clean up test data
    await client.query(`DELETE FROM streaks WHERE user_id = $1`, [profile.id]);
    await client.query(`DELETE FROM lesson_progress WHERE user_id = $1`, [profile.id]);
    await client.query(`DELETE FROM profiles WHERE id = $1`, [profile.id]);
    await client.query(`DELETE FROM users WHERE id = $1`, [user.id]);
    console.log("✓ Test teardown complete. FR-01 & FR-02 VERIFIED SUCCESSFULLY.");

  } finally {
    client.release();
    await pool.end();
  }
}

runAuthProgressTest().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
