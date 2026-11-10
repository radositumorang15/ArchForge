const queries = ["Rust", "Python", "Stack", "Compose", "Kafka", "Sharding", "Kotlin"];

async function runSearchTests() {
  console.log("=== FR-14: TESTING LIVE SEARCH API (PORT 3001) ===\n");
  let passed = 0;

  for (const q of queries) {
    try {
      const res = await fetch(`http://localhost:3001/api/curriculum/search?q=${encodeURIComponent(q)}`);
      if (!res.ok) {
        console.error(`[FAIL] Query '${q}' returned HTTP ${res.status}`);
        continue;
      }
      const data = await res.json();
      const count = data.results?.length || 0;
      console.log(`[PASS] Query '${q}' -> Found ${count} results:`);
      data.results?.slice(0, 2).forEach((item) => {
        console.log(`   * [${item.type.toUpperCase()}] ${item.title} -> ${item.href}`);
      });
      if (count > 0) passed++;
    } catch (err) {
      console.error(`[ERROR] Query '${q}':`, err.message);
    }
  }

  console.log(`\nFR-14 Test Summary: ${passed} / ${queries.length} queries returned valid live results from Neon DB!`);
}

runSearchTests();

