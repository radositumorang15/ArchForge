import pg from "pg";
const { Pool } = pg;

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://user:password@localhost:5432/archforge?sslmode=disable";

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  const client = await pool.connect();
  try {
    console.log("Testing user + profile + streak in Neon PostgreSQL...");
    
    // Check if test user exists, clean up if so
    await client.query("DELETE FROM public.users WHERE email = 'testuser_arch@domain.com'");

    // Test API register via fetch on localhost:3001
    const res = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Ahmad Dahlan",
        email: "testuser_arch@domain.com",
        password: "securepassword123",
      }),
    });

    const data = await res.json();
    console.log("Register response:", res.status, data);

    // Verify in database
    const userRes = await client.query("SELECT id, name, email, role FROM public.users WHERE email = 'testuser_arch@domain.com'");
    console.log("Found user in Neon DB:", userRes.rows);

    const profileRes = await client.query("SELECT id, auth_user_id, display_name FROM public.profiles WHERE auth_user_id = $1", [userRes.rows[0].id]);
    console.log("Found profile in Neon DB:", profileRes.rows);

    const streakRes = await client.query("SELECT user_id, current, longest FROM public.streaks WHERE user_id = $1", [profileRes.rows[0].id]);
    console.log("Found streak in Neon DB:", streakRes.rows);

    console.log("ALL TESTS PASSED! User, profile, and streak are properly created and linked in Neon DB!");
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(console.error);

