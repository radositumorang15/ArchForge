const endpoints = [
  "/api/curriculum/tracks",
  "/api/curriculum/search?q=Rust",
  "/api/curriculum/scenarios",
  "/api/curriculum/projects",
  "/tracks",
  "/tracks/rust-sistem",
  "/learn/rust-sistem/b1/lesson-tb-ownership-move",
  "/system-design",
  "/projects",
  "/portfolio",
  "/design-system",
  "/interview",
  "/dashboard",
  "/login",
  "/register",
  "/progress",
  "/review",
];

async function testAll() {
  console.log("=== COMPREHENSIVE ENDPOINT AUDIT (PORT 3001) ===\n");
  let passed = 0;
  for (const ep of endpoints) {
    try {
      const res = await fetch(`http://localhost:3001${ep}`);
      console.log(`[HTTP ${res.status}] ${ep}`);
      if (res.status === 200) passed++;
    } catch (err) {
      console.error(`[FAIL] ${ep}:`, err.message);
    }
  }
  console.log(`\nAudit Result: ${passed} / ${endpoints.length} routes responded with HTTP 200 OK!`);
}

testAll();
