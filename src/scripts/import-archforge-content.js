import fs from "fs";
import path from "path";
import { pool } from "../lib/db.ts";

async function main() {
  console.log("=== IMPORTING ARCHFORGE CONTENT PACKAGE INTO NEON POSTGRESQL ===");
  const schemaPath = path.resolve(process.cwd(), "public/archforge-content/schema_content.sql");
  const seedPath = path.resolve(process.cwd(), "public/archforge-content/seed_content.sql");

  const schemaSql = fs.readFileSync(schemaPath, "utf-8");
  const seedSql = fs.readFileSync(seedPath, "utf-8");

  const client = await pool.connect();
  try {
    console.log("1. Executing schema_content.sql...");
    await client.query(schemaSql);
    console.log("✓ Schema content tables created successfully.");

    console.log("2. Executing seed_content.sql...");
    await client.query(seedSql);
    console.log("✓ Content data seeded successfully.");

    // Query counts of all content tables
    const tables = [
      "content_tracks",
      "content_modules",
      "content_lessons",
      "content_exercises",
      "content_sd_scenarios",
      "content_projects",
      "content_dsa_problems",
      "content_badges",
    ];

    console.log("\n3. Verifying imported row counts:");
    for (const tbl of tables) {
      const res = await client.query(`SELECT count(*)::int AS count FROM ${tbl}`);
      console.log(`- ${tbl}: ${res.rows[0].count} rows`);
    }

  } catch (err) {
    console.error("Error during content import:", err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

