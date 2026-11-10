import { pool } from "../lib/db.ts";

async function main() {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;");
    console.log("Existing tables in public schema:", res.rows.map(r => r.tablename));
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(console.error);

