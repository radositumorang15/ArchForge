import { pool } from "../lib/db.ts";

async function seedCards() {
  const client = await pool.connect();
  console.log("Seeding SRS review cards across all tracks...");

  try {
    const profileRes = await client.query(`SELECT id FROM public.profiles LIMIT 1;`);
    if (profileRes.rows.length === 0) {
      console.log("No profile found, skipping card seeding.");
      return;
    }
    const profileId = profileRes.rows[0].id;

    const cards = [
      {
        sourceId: "card-rust-ownership",
        track: "Rust",
        question: "Apa 3 aturan mutlak kepemilikan (ownership) di Rust?",
        answer: "1. Setiap nilai memiliki satu pemilik (owner).\n2. Hanya boleh ada satu pemilik dalam satu waktu.\n3. Ketika pemilik keluar dari scope, nilai otomatis dibersihkan (drop).",
      },
      {
        sourceId: "card-rust-borrowing",
        track: "Rust",
        question: "Berapa banyak referensi mutable (&mut) yang diizinkan pada data yang sama dalam satu scope?",
        answer: "Hanya satu referensi mutable (&mut) pada satu waktu, dan tidak boleh ada referensi immutable (&) lain yang aktif bersamanya (Aliasing XOR Mutability).",
      },
      {
        sourceId: "card-python-gil",
        track: "Python",
        question: "Apa itu Global Interpreter Lock (GIL) di CPython dan dampaknya?",
        answer: "Mutex yang mencegah thread Python mengeksekusi bytecode CPython secara paralel murni. Operasi CPU-bound butuh multiprocessing, sedangkan I/O-bound cukup dengan asyncio.",
      },
      {
        sourceId: "card-kotlin-null",
        track: "Kotlin",
        question: "Bagaimana cara kerja Elvis operator (?:) di Kotlin?",
        answer: "Mengevaluasi ekspresi di sisi kiri; jika bernilai null, maka ekspresi di sisi kanan dikembalikan sebagai nilai fallback.",
      },
      {
        sourceId: "card-flutter-layout",
        track: "Flutter",
        question: "Sebutkan 3 hukum tata letak (layout rule) di Flutter!",
        answer: "1. Constraints go down (parent mengirim batasan ukuran ke child).\n2. Sizes go up (child menentukan ukurannya).\n3. Parent sets position (parent menentukan posisi child).",
      },
      {
        sourceId: "card-dsa-twopointer",
        track: "DSA",
        question: "Kapan pola Two Pointers lebih unggul dibanding brute-force O(N^2)?",
        answer: "Ketika array sudah terurut (sorted) atau memiliki kondisi monotonik, memangkas pencarian menjadi waktu O(N) dan memori O(1).",
      },
      {
        sourceId: "card-sd-cap",
        track: "System Design",
        question: "Jelaskan Teorema CAP dalam kondisi pemisahan jaringan (Partition Tolerance)!",
        answer: "Ketika terjadi Network Partition (P), arsitektur harus memilih antara Konsistensi (CP: tolak request lama) atau Ketersediaan (AP: kembalikan data lokal yang mungkin stale).",
      },
      {
        sourceId: "card-sd-stampede",
        track: "System Design",
        question: "Apa itu Cache Stampede dan bagaimana cara memitigasinya?",
        answer: "Kondisi di mana key populer kadaluarsa dan ribuan request serentak menghantam database. Mitigasi: distributed lock (mutex) atau Probabilistic Early Expiration (XFetch).",
      },
      {
        sourceId: "card-arch-c4",
        track: "Arsitektur",
        question: "Sebutkan 4 tingkatan diagram dalam C4 Model!",
        answer: "1. Context (L1 - gambaran sistem & user)\n2. Container (L2 - server, db, app)\n3. Component (L3 - modul internal)\n4. Code (L4 - class/diagram kelas opsional).",
      },
      {
        sourceId: "card-ml-onnx",
        track: "ML & CV",
        question: "Mengapa format ONNX penting untuk arsitektur edge AI?",
        answer: "ONNX adalah format terbuka independen framework, memungkinkan model diekspor dari PyTorch/TensorFlow dan dijalankan langsung di browser via WebAssembly (ONNX Runtime Web).",
      },
      {
        sourceId: "card-uiux-tokens",
        track: "UI/UX",
        question: "Jelaskan perbedaan Primitive Token vs Semantic Token dalam Design System!",
        answer: "Primitive Token menyimpan nilai mentah (color-orange-500 = #EE833A), sedangkan Semantic Token memberi makna kontekstual (color-brand-primary = {color-orange-500}), memungkinkan dark mode instan.",
      },
    ];

    for (const c of cards) {
      await client.query(`
        INSERT INTO public.review_cards (
          user_id, source_id, question, answer, track, due, stability, difficulty, state, reps, lapses, last_review
        )
        VALUES ($1, $2, $3, $4, $5, NOW(), 2.5, 4.0, 0, 1, 0, NOW())
        ON CONFLICT DO NOTHING;
      `, [profileId, c.sourceId, c.question, c.answer, c.track]);
    }

    const totalCards = await client.query(`SELECT count(*) as count FROM public.review_cards WHERE user_id = $1;`, [profileId]);
    console.log(`✓ Total review cards for demo user: ${totalCards.rows[0].count}`);

  } finally {
    client.release();
    await pool.end();
  }
}

seedCards().catch(console.error);

