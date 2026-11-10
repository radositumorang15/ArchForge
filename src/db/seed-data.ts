// ==========================================
// 1. DATA 11 TRACK UTAMA (§8 PRD)
// ==========================================
export const SEED_TRACKS = [
  {
    id: "track-0",
    slug: "fondasi-komputasi",
    title: "Track 0 — Fondasi Komputasi",
    subtitle: "Cara kerja CPU, memori Stack vs Heap, biner, debugging, terminal, Git, dan jaringan dasar",
    levelRange: "Beginner",
    orderIndex: 0,
    isPublished: true,
  },
  {
    id: "track-a",
    slug: "python-data-ml",
    title: "Track A — Python (Dari Nol → Data/ML)",
    subtitle: "Sintaks dasar, OOP, generator, async, pytest, hingga komputasi ilmiah dengan NumPy & Pandas di Pyodide",
    levelRange: "Beginner → Advanced",
    orderIndex: 1,
    isPublished: true,
  },
  {
    id: "track-b",
    slug: "rust-sistem",
    title: "Track B — Rust (Dari Nol → Sistem & WASM)",
    subtitle: "Ownership, borrowing, lifetimes, trait, Tokio async, Axum HTTP, hingga kompilasi Rust ke WebAssembly",
    levelRange: "Beginner → Professional",
    orderIndex: 2,
    isPublished: true,
  },
  {
    id: "track-c",
    slug: "kotlin-compose",
    title: "Track C — Kotlin & Jetpack Compose",
    subtitle: "Null-safety, Coroutines & Flow, Ktor backend, hingga deklaratif UI Android dengan Jetpack Compose & Material 3",
    levelRange: "Beginner → Professional",
    orderIndex: 3,
    isPublished: true,
  },
  {
    id: "track-d",
    slug: "dart-flutter",
    title: "Track D — Dart & Flutter UI Mendalam",
    subtitle: "Isolate, widget tree, Clean Architecture, Sliver, CustomPainter, FFI ke Rust, dan Design-to-Code",
    levelRange: "Beginner → Professional",
    orderIndex: 4,
    isPublished: true,
  },
  {
    id: "track-e",
    slug: "dsa-live-coding",
    title: "Track E — Struktur Data, Algoritma & Live Coding",
    subtitle: "Analisis Big-O, struktur data inti, 15 pola soal algoritma (Python & Rust), dan verbalisasi live coding",
    levelRange: "Intermediate → Professional",
    orderIndex: 5,
    isPublished: true,
  },
  {
    id: "track-f",
    slug: "system-design",
    title: "Track F — System Design & Arsitektur IT",
    subtitle: "Estimasi kapasitas, sharding, caching, CAP/PACELC, Kafka, resiliensi, keamanan STRIDE, dan 8 simulasi skenario",
    levelRange: "Intermediate → Professional",
    orderIndex: 6,
    isPublished: true,
  },
  {
    id: "track-g",
    slug: "peran-praktik-arsitek",
    title: "Track G — Peran & Praktik Arsitek Industri",
    subtitle: "Enterprise/Solution/System Architect, C4 Model, ADR, arc42, DDD, ATAM trade-off, FinOps, dan kepemimpinan teknis",
    levelRange: "Advanced → Professional",
    orderIndex: 7,
    isPublished: true,
  },
  {
    id: "track-h",
    slug: "ml-computer-vision",
    title: "Track H — Machine Learning & Computer Vision",
    subtitle: "Aljabar linier, ML klasik, CNN, OpenCV, deteksi objek YOLO, dan MLOps inferensi ONNX Runtime Web di browser",
    levelRange: "Intermediate → Professional",
    orderIndex: 8,
    isPublished: true,
  },
  {
    id: "track-i",
    slug: "persiapan-interview",
    title: "Track I — Persiapan Interview End-to-End",
    subtitle: "Rubrik penilaian industri, kerangka STAR behavioral, negosiasi, komunikasi trade-off, dan simulasi berwaktu 60 menit",
    levelRange: "Advanced → Professional",
    orderIndex: 9,
    isPublished: true,
  },
  {
    id: "track-j",
    slug: "desain-ui-ux",
    title: "Track J — Desain UI/UX & Sistem Desain Lintas Platform",
    subtitle: "Hierarki visual, grid 4/8pt, WCAG, microcopy, design tokens, Auto Layout Figma, Material 3 vs HIG, dan audit Nielsen",
    levelRange: "Beginner → Professional",
    orderIndex: 10,
    isPublished: true,
  },
];

// ==========================================
// 2. DATA 54 MODUL LENGKAP SEMUA TRACK (§8 PRD)
// ==========================================
export const SEED_MODULES = [
  // Track 0
  { id: "t0-m1", trackId: "track-0", code: "0.1", title: "Arsitektur Eksekusi: CPU, Stack vs Heap, Proses vs Thread", difficulty: "beginner", orderIndex: 1, learningGoals: ["Membedakan alokasi Stack dan Heap", "Memahami isolasi memori Proses vs berbagi memori pada Thread"] },
  { id: "t0-m2", trackId: "track-0", code: "0.2", title: "Representasi Data: Bit, Byte, Two's Complement, IEEE 754 Float, Unicode", difficulty: "beginner", orderIndex: 2, learningGoals: ["Menjelaskan mengapa 0.1 + 0.2 != 0.3 pada float", "Memahami encoding UTF-8 pada karakter dan emoji"] },
  { id: "t0-m3", trackId: "track-0", code: "0.3", title: "Logika & Pemecahan Masalah: Pseudocode, Alur Kontrol, Rubber Duck Debugging", difficulty: "beginner", orderIndex: 3, learningGoals: ["Menyusun dekomposisi masalah sebelum coding", "Mengisolasi bug dengan metode hipotesis dan rubber duck"] },
  { id: "t0-m4", trackId: "track-0", code: "0.4", title: "Perkakas Developer: Terminal POSIX, Git Terstruktur, Membaca Stack Trace", difficulty: "beginner", orderIndex: 4, learningGoals: ["Menguasai alur branch, commit, rebase, dan membaca baris error"] },
  { id: "t0-m5", trackId: "track-0", code: "0.5", title: "Jaringan Dasar: IP, DNS, TCP vs UDP, TLS/HTTPS, REST & WebSocket", difficulty: "beginner", orderIndex: 5, learningGoals: ["Melacak perjalanan paket dari ketik URL di browser hingga respons server"] },

  // Track A (Python)
  { id: "ta-a1", trackId: "track-a", code: "A1", title: "Python Dasar: Variabel, Tipe, Alur Kontrol, Fungsi, Koleksi (List/Dict/Set/Tuple)", difficulty: "beginner", orderIndex: 1, learningGoals: ["Memilih struktur data bawaan Python dengan kompleksitas pencarian tepat"] },
  { id: "ta-a2", trackId: "track-a", code: "A2", title: "Python Menengah: OOP, Exception, File I/O, Comprehension, Generator, Decorator, Type Hints", difficulty: "intermediate", orderIndex: 2, learningGoals: ["Membangun pipeline pemrosesan hemat memori dengan generator dan type annotations"] },
  { id: "ta-a3", trackId: "track-a", code: "A3", title: "Python Praktik: Testing Pytest, Pyproject/Virtualenv, Asyncio, Regex, JSON/HTTP", difficulty: "intermediate", orderIndex: 3, learningGoals: ["Menulis unit test terparametrisasi dan klien HTTP konkuren berbasis asyncio"] },
  { id: "ta-a4", trackId: "track-a", code: "A4", title: "Python Ilmiah di Browser: NumPy Vectorization, Broadcasting, Pandas & Matplotlib", difficulty: "advanced", orderIndex: 4, learningGoals: ["Mengganti loop lambat Python dengan operasi vektorisasi matriks NumPy di Pyodide"] },

  // Track B (Rust)
  { id: "tb-b1", trackId: "track-b", code: "B1", title: "Rust Dasar: Cargo, Immutability Default, Tipe Skalar/Komposit, Ekspresi & Alur", difficulty: "beginner", orderIndex: 1, learningGoals: ["Memahami perbedaan statement vs expression dan sistem tipe statis Rust"] },
  { id: "tb-b2", trackId: "track-b", code: "B2", title: "Inti Rust: Ownership, Borrowing, Lifetimes, Slice, Struct/Enum, Pattern Matching, Option/Result", difficulty: "intermediate", orderIndex: 2, learningGoals: ["Menaklukkan borrow checker tanpa clone berlebihan dan menangani ketiadaan nilai secara aman"] },
  { id: "tb-b3", trackId: "track-b", code: "B3", title: "Abstraksi Zero-Cost: Trait, Generics, Closure, Iterator, Koleksi & Sistem Crate", difficulty: "intermediate", orderIndex: 3, learningGoals: ["Merancang polimorfisme statis dengan Trait bounds dan rantai iterator fungsional"] },
  { id: "tb-b4", trackId: "track-b", code: "B4", title: "Keandalan Produksi: Error Handling (thiserror/anyhow), Testing Terintegrasi & Rustdoc", difficulty: "intermediate", orderIndex: 4, learningGoals: ["Membedakan error library vs aplikasi dan menulis dokumentasi yang dapat dieksekusi sebagai tes"] },
  { id: "tb-b5", trackId: "track-b", code: "B5", title: "Konkurensi Tanpa Takut: Thread, MPSC Channel, Arc/Mutex, Async Tokio & Marker Send/Sync", difficulty: "advanced", orderIndex: 5, learningGoals: ["Membangun worker konkuren bebas data-race menggunakan sistem kepemilikan Rust"] },
  { id: "tb-b6", trackId: "track-b", code: "B6", title: "Sistem, Web & WASM: Axum, Serde, SQLx, wasm-bindgen, FFI & Unsafe Bertanggung Jawab", difficulty: "professional", orderIndex: 6, learningGoals: ["Membangun gateway eksekusi HTTP dengan Axum dan mengompilasi engine simulasi ke WASM"] },

  // Track C (Kotlin & Compose)
  { id: "tc-c1", trackId: "track-c", code: "C1", title: "Kotlin Dasar: val/var, Tipe Inferensi, Null Safety, Smart Cast & Ekspresi", difficulty: "beginner", orderIndex: 1, learningGoals: ["Menghilangkan jebakan NullPointerException dengan operator safe-call dan Elvis"] },
  { id: "tc-c2", trackId: "track-c", code: "C2", title: "OOP & Fungsional Kotlin: Data Class, Sealed Hierarchy, Extension, Lambda & Sequence", difficulty: "intermediate", orderIndex: 2, learningGoals: ["Memodelkan state domain secara ekspresif dengan sealed class dan evaluasi malas Sequence"] },
  { id: "tc-c3", trackId: "track-c", code: "C3", title: "Kotlin Lanjut: Generics Variance, Delegation, Type-Safe DSL, Coroutines & Flow", difficulty: "advanced", orderIndex: 3, learningGoals: ["Mengelola konkurensi terstruktur dengan CoroutineScope, Dispatcher, StateFlow, dan SharedFlow"] },
  { id: "tc-c4", trackId: "track-c", code: "C4", title: "Praktik Ekosistem: JUnit, Gradle KTS, Server Ktor, Pengantar KMP & Platform Channel", difficulty: "advanced", orderIndex: 4, learningGoals: ["Menghubungkan kode bisnis Kotlin ke server Ktor dan jembatan native Android/Flutter"] },
  { id: "tc-c5", trackId: "track-c", code: "C5", title: "UI Deklaratif Jetpack Compose: State Hoisting, Recomposition, Material 3, Animasi & Semantics", difficulty: "professional", orderIndex: 5, learningGoals: ["Merancang UI Compose bebas recomposition berlebih, teruji dengan ComposeTestRule, dan ramah aksesibilitas"] },

  // Track D (Dart & Flutter)
  { id: "td-d1", trackId: "track-d", code: "D1", title: "Dart Inti: Sound Null Safety, Class/Mixin, Koleksi, Event Loop (Future/Stream) & Isolate", difficulty: "beginner", orderIndex: 1, learningGoals: ["Memahami eksekusi single-threaded event loop Dart dan paralelisme memori terpisah dengan Isolate"] },
  { id: "td-d2", trackId: "track-d", code: "D2", title: "Flutter Inti: Tiga Pohon (Widget/Element/RenderObject), Layout Dasar, State (Riverpod/Bloc) & Navigasi", difficulty: "intermediate", orderIndex: 2, learningGoals: ["Mengelola siklus hidup widget dan pemisahan state bisnis dari lapisan presentasi"] },
  { id: "td-d3", trackId: "track-d", code: "D3", title: "Flutter Praktik: REST/JSON Serialization, Penyimpanan Lokal, Testing Bertingkat & Profiling Build", difficulty: "intermediate", orderIndex: 3, learningGoals: ["Menulis unit, widget, dan integration test serta menjaga waktu build frame di bawah 16ms"] },
  { id: "td-d4", trackId: "track-d", code: "D4", title: "Arsitektur App Skala Besar: Clean Architecture, Repository Pattern, DI & FFI ke Pustaka Rust", difficulty: "advanced", orderIndex: 4, learningGoals: ["Memanggil fungsi komputasi berat Rust secara sinkron/asinkron dari Flutter melalui dart:ffi"] },
  { id: "td-d5", trackId: "track-d", code: "D5", title: "Flutter UI Mendalam: Hukum Constraints, Sliver, CustomPainter, Animasi Eksplisit, Golden Test & DevTools", difficulty: "professional", orderIndex: 5, learningGoals: ["Membangun kanvas kustom 60/120fps, efek scroll Sliver kompleks, dan validasi piksel dengan Golden Test"] },
  { id: "td-d6", trackId: "track-d", code: "D6", title: "Design-to-Code: Design Tokens, ThemeExtension, Konversi Figma Presisi, State UI & Micro-Interaction", difficulty: "professional", orderIndex: 6, learningGoals: ["Menerjemahkan spesifikasi Figma ke komponen reusable Flutter lengkap dengan state loading/empty/error"] },

  // Track E (DSA & Live Coding)
  { id: "te-e1", trackId: "track-e", code: "E1", title: "Dasar Kompleksitas: Analisis Asimtotik Big-O Waktu/Ruang, Best/Worst/Average & Amortized", difficulty: "intermediate", orderIndex: 1, learningGoals: ["Menghitung trade-off memori vs CPU dan membuktikan kompleksitas amortized dynamic array"] },
  { id: "te-e2", trackId: "track-e", code: "E2", title: "Struktur Data Inti: Array, Linked List, Stack/Queue/Deque, Hash Table, Heap, BST, Trie, Graph, Union-Find", difficulty: "intermediate", orderIndex: 2, learningGoals: ["Mengimplementasikan struktur data dari nol beserta invariants internalnya"] },
  { id: "te-e3", trackId: "track-e", code: "E3", title: "Teknik Algoritma: Two Pointers, Sliding Window, Binary Search, Backtracking, DP, Greedy, BFS/DFS, Dijkstra", difficulty: "advanced", orderIndex: 3, learningGoals: ["Mengenali karakteristik masalah untuk memilih antara Dynamic Programming, Greedy, atau pencarian graf"] },
  { id: "te-e4", trackId: "track-e", code: "E4", title: "Peta 15 Pola Soal Interview (Python & Rust): Dari Subarray Monotonik hingga Topological Sort", difficulty: "advanced", orderIndex: 4, learningGoals: ["Memetakan soal baru ke dalam 15 pola kanonik dalam waktu kurang dari 3 menit"] },
  { id: "te-e5", trackId: "track-e", code: "E5", title: "Seni Live Coding: Klarifikasi, Edge Case, Brute-Force ke Optimasi, Think-Aloud & Dry-Run Manual", difficulty: "professional", orderIndex: 5, learningGoals: ["Mengomunikasikan jalan pikiran secara terstruktur di bawah tekanan waktu interview"] },

  // Track F (System Design)
  { id: "tf-f1", trackId: "track-f", code: "F1", title: "Fondasi Skala: Vertikal vs Horizontal, Latensi vs Throughput, Back-of-Envelope & SLA/SLO/SLI", difficulty: "intermediate", orderIndex: 1, learningGoals: ["Menghitung kebutuhan QPS, bandwidth, dan storage 5 tahun dalam 2 menit"] },
  { id: "tf-f2", trackId: "track-f", code: "F2", title: "Blok Bangunan Edge: DNS, CDN, Load Balancer L4/L7, Reverse Proxy, API Gateway & Rate Limiting", difficulty: "intermediate", orderIndex: 2, learningGoals: ["Merancang lapisan ingress tahan lonjakan trafik dengan algoritma Token Bucket dan Consistent Hashing LB"] },
  { id: "tf-f3", trackId: "track-f", code: "F3", title: "Arsitektur Data: SQL vs NoSQL, B-Tree vs LSM-Tree, ACID, Replikasi, Sharding & Outbox Pattern", difficulty: "advanced", orderIndex: 3, learningGoals: ["Mengatasi hot-key pada partisi database dan menjamin pengiriman event dengan Transactional Outbox"] },
  { id: "tf-f4", trackId: "track-f", code: "F4", title: "Strategi Caching: Cache-Aside, Write-Through/Back, Eviction LRU/LFU & Mitigasi Cache Stampede", difficulty: "advanced", orderIndex: 4, learningGoals: ["Mencegah database runtuh saat key populer kedaluwarsa dengan singleflight/mutex lock dan jitter TTL"] },
  { id: "tf-f5", trackId: "track-f", code: "F5", title: "Sistem Terdistribusi: Teorema CAP & PACELC, Konsensus Raft, Idempotency & Logical Clock", difficulty: "advanced", orderIndex: 5, learningGoals: ["Merancang operasi mutasi idempoten di atas jaringan yang menjamin at-least-once delivery"] },
  { id: "tf-f6", trackId: "track-f", code: "F6", title: "Komunikasi Antar Layanan: REST vs gRPC vs GraphQL, WebSocket vs SSE, Message Queue & Event Streaming", difficulty: "advanced", orderIndex: 6, learningGoals: ["Memilih protokol sinkron atau broker asinkron sesuai profil latensi dan pola konsumsi"] },
  { id: "tf-f7", trackId: "track-f", code: "F7", title: "Rekayasa Keandalan: Circuit Breaker, Retry+Backoff+Jitter, Bulkhead, Graceful Degradation & Chaos Testing", difficulty: "professional", orderIndex: 7, learningGoals: ["Mengisolasi kegagalan komponen hilir agar tidak merembet menjadi pemadaman total (cascading failure)"] },
  { id: "tf-f8", trackId: "track-f", code: "F8", title: "Observability & Operasi: Structured Logging, Metrik Kardinalitas, Distributed Tracing & Error Budget SLO", difficulty: "professional", orderIndex: 8, learningGoals: ["Menentukan indikator SLI berbasis pengalaman pengguna dan kebijakan pembekuan rilis saat Error Budget habis"] },
  { id: "tf-f9", trackId: "track-f", code: "F9", title: "Keamanan Arsitektur: AuthN/AuthZ, OAuth2/OIDC, JWT vs Session, Enkripsi KMS, OWASP & Threat Modeling STRIDE", difficulty: "professional", orderIndex: 9, learningGoals: ["Melakukan analisis ancaman STRIDE dan merancang mekanisme pencabutan sesi instan"] },
  { id: "tf-f10", trackId: "track-f", code: "F10", title: "Laboratorium Simulasi 8 Kasus Lengkap System Design dengan Injeksi Kegagalan", difficulty: "professional", orderIndex: 10, learningGoals: ["Menyelesaikan 8 skenario industri di kanvas simulator dengan skor rubrik >= 80% dan mini-ADR tajam"] },

  // Track G (Arsitek Industri)
  { id: "tg-g1", trackId: "track-g", code: "G1", title: "Lanskap Peran Arsitek: Enterprise Architect, Solution Architect & System/Software Architect", difficulty: "advanced", orderIndex: 1, learningGoals: ["Memetakan tanggung jawab strategis bisnis-IT, evaluasi vendor/cloud, dan kualitas teknis kode"] },
  { id: "tg-g2", trackId: "track-g", code: "G2", title: "Pemodelan & Dokumentasi: C4 Model (Context/Container/Component), ADR, RFC & Standar arc42", difficulty: "advanced", orderIndex: 2, learningGoals: ["Menulis Architecture Decision Record (ADR) yang objektif dan menggambar diagram C4 yang bebas ambiguitas"] },
  { id: "tg-g3", trackId: "track-g", code: "G3", title: "Gaya Arsitektur: Modular Monolith vs Microservices, Event-Driven, CQRS/Event Sourcing & Hexagonal", difficulty: "professional", orderIndex: 3, learningGoals: ["Memilih Modular Monolith terlebih dahulu sebelum memecah ke Microservices berdasarkan batas domain"] },
  { id: "tg-g4", trackId: "track-g", code: "G4", title: "Desain Domain & Kontrak: Domain-Driven Design (Bounded Context, Aggregate) & Evolusi Kontrak OpenAPI", difficulty: "professional", orderIndex: 4, learningGoals: ["Menjaga integritas invarian bisnis di dalam Aggregate Root dan melakukan versioning API tanpa memutus klien"] },
  { id: "tg-g5", trackId: "track-g", code: "G5", title: "Atribut Kualitas (NFR) & Evaluasi Trade-off dengan Metode ATAM Ringkas", difficulty: "professional", orderIndex: 5, learningGoals: ["Membuat skenario atribut kualitas terukur dan matriks sensitivitas trade-off"] },
  { id: "tg-g6", trackId: "track-g", code: "G6", title: "Rekayasa Platform: CI/CD, IaC, Container/Kubernetes, 12-Factor App, Feature Flags, Blue/Green & Canary", difficulty: "professional", orderIndex: 6, learningGoals: ["Merancang pipeline rilis zero-downtime dengan rollback otomatis berbasis metrik"] },
  { id: "tg-g7", trackId: "track-g", code: "G7", title: "Arsitektur Cloud & FinOps: Shared Responsibility, Multi-AZ/Region & Optimasi Unit Economics Cloud", difficulty: "professional", orderIndex: 7, learningGoals: ["Menghitung biaya infrastruktur per 1.000 transaksi dan memangkas pemborosan egress/compute"] },
  { id: "tg-g8", trackId: "track-g", code: "G8", title: "Kepemimpinan Teknis: Komunikasi Eksekutif, Manajemen Utang Teknis, Estimasi & Design Review", difficulty: "professional", orderIndex: 8, learningGoals: ["Menerjemahkan risiko teknis menjadi dampak finansial/bisnis di hadapan pemangku kepentingan"] },

  // Track H (ML & CV)
  { id: "th-h1", trackId: "track-h", code: "H1", title: "Matematika Terapan ML: Vektor, Perkalian Matriks, Probabilitas Bayes, Distribusi & Gradien", difficulty: "intermediate", orderIndex: 1, learningGoals: ["Mengimplementasikan operasi dot product dan gradient descent dari nol dengan NumPy"] },
  { id: "th-h2", trackId: "track-h", code: "H2", title: "ML Klasik: Regresi, Klasifikasi, Tree Ensemble, Overfitting, Cross-Validation & Metrik ROC/F1", difficulty: "intermediate", orderIndex: 2, learningGoals: ["Mengevaluasi model pada dataset timpang (imbalanced) menggunakan Precision-Recall dan F1-Score"] },
  { id: "th-h3", trackId: "track-h", code: "H3", title: "Deep Learning Inti: Backpropagation, Arsitektur CNN, Transfer Learning & Augmentasi Data", difficulty: "advanced", orderIndex: 3, learningGoals: ["Memahami ekstraksi fitur spasial pada lapisan konvolusi dan strategi fine-tuning"] },
  { id: "th-h4", trackId: "track-h", code: "H4", title: "Computer Vision Terapan: Konvolusi Kernel, Canny Edge/Kontur OpenCV, Deteksi Objek YOLO & OCR", difficulty: "advanced", orderIndex: 4, learningGoals: ["Membangun pipeline pra-pemrosesan gambar dengan OpenCV.js dan Non-Maximum Suppression (NMS)"] },
  { id: "th-h5", trackId: "track-h", code: "H5", title: "MLOps & Edge Inference: Ekspor ONNX, Kuantisasi INT8, ONNX Runtime Web & Deteksi Data Drift", difficulty: "professional", orderIndex: 5, learningGoals: ["Menjalankan model computer vision terkuantisasi secara real-time di browser dengan WebAssembly/WebGL"] },

  // Track I (Persiapan Interview)
  { id: "ti-i1", trackId: "track-i", code: "I1", title: "Anatomi & Rubrik Interview: Coding & System Design dari Sudut Pandang Bar Raiser", difficulty: "advanced", orderIndex: 1, learningGoals: ["Memahami sinyal positif dan red flag yang dicatat pewawancara pada setiap menit sesi"] },
  { id: "ti-i2", trackId: "track-i", code: "I2", title: "Behavioral (STAR), Komunikasi Trade-Off & Strategi Negosiasi Kompensasi", difficulty: "advanced", orderIndex: 2, learningGoals: ["Menyusun matriks cerita STAR untuk konflik teknis, kegagalan produksi, dan kepemimpinan"] },
  { id: "ti-i3", trackId: "track-i", code: "I3", title: "Simulasi Penuh Berwaktu (45–60 Menit): Mode Interview Terkunci dengan Evaluasi Fase", difficulty: "professional", orderIndex: 3, learningGoals: ["Menyelesaikan sesi live coding dan system design utuh di bawah batas waktu nyata"] },

  // Track J (Desain UI/UX)
  { id: "tj-j1", trackId: "track-j", code: "J1", title: "Prinsip Visual: Hierarki, Grid Spasi 4/8pt, Skala Tipografi, Kontras WCAG & Elevasi", difficulty: "beginner", orderIndex: 1, learningGoals: ["Memperbaiki tata letak berantakan menggunakan ritme spasi 8pt dan rasio kontras minimal 4.5:1"] },
  { id: "tj-j2", trackId: "track-j", code: "J2", title: "Desain Interaksi: User Flow, Navigasi, State Kosong/Error/Loading/Skeleton & Microcopy", difficulty: "intermediate", orderIndex: 2, learningGoals: ["Merancang layar yang tetap informatif saat data kosong, jaringan lambat, atau terjadi kegagalan"] },
  { id: "tj-j3", trackId: "track-j", code: "J3", title: "Sistem Desain: Arsitektur Design Tokens (Primitive vs Semantic), Varian Komponen & Dokumentasi", difficulty: "advanced", orderIndex: 3, learningGoals: ["Menyusun skema JSON Design Tokens yang sinkron antara Figma, Jetpack Compose, dan Flutter"] },
  { id: "tj-j4", trackId: "track-j", code: "J4", title: "Rancang di Figma untuk Developer: Auto Layout Bersarang, Constraints, Variables & Handoff", difficulty: "advanced", orderIndex: 4, learningGoals: ["Membuat komponen Figma dengan Auto Layout yang langsung memetakan ke Row/Column/Flex di kode"] },
  { id: "tj-j5", trackId: "track-j", code: "J5", title: "Adaptasi Lintas Platform: Material 3 vs HIG iOS, Breakpoint Responsif, Dark Mode & Ekspansi Teks Lokal", difficulty: "professional", orderIndex: 5, learningGoals: ["Menangani perbedaan panjang string Bahasa Indonesia vs Inggris tanpa memotong teks UI (overflow)"] },
  { id: "tj-j6", trackId: "track-j", code: "J6", title: "Evaluasi & Audit Kualitas: Usability Testing 5 Pengguna, 10 Heuristik Nielsen & Audit Aksesibilitas", difficulty: "professional", orderIndex: 6, learningGoals: ["Melakukan audit heuristik terukur dan mengimplementasikan perbaikan di Compose serta Flutter"] },
];

// ==========================================
// 3. DATA 8 SKENARIO SIMULATOR SYSTEM DESIGN (§7 PRD)
// ==========================================
export const SEED_SD_SCENARIOS = [
  {
    id: "sd-01-url-shortener",
    lessonId: null,
    scenarioNumber: 1,
    title: "1. URL Shortener Skala Tinggi (Rasio Baca 100:1)",
    level: "intermediate",
    briefMarkdown: "Rancang layanan pemendek tautan yang menerima 1.000 pembuatan tautan/detik (Write) dan **100.000 pengalihan/detik (Read)** dengan latensi redirect p95 di bawah 25ms.",
    functionalReqs: [
      "POST /shorten menghasilkan kode pendek 7 karakter Base62 unik tanpa tabrakan",
      "GET /:code mengembalikan HTTP 301/302 Redirect ke URL asli dengan cepat",
    ],
    nonFunctionalReqs: { targetRps: 100000, maxP95Ms: 25, availability: "99.99%", maxCostUnits: 350 },
    availableNodes: ["Client", "DNS", "CDN", "LoadBalancer", "RateLimiter", "APIServer", "Cache", "DBPrimary", "DBReplica"],
    trafficProfile: { mode: "ramp_up" as const, baseRps: 10000, peakRps: 100000, durationTicks: 60, seed: 101 },
    chaosEvents: [
      { tick: 30, kind: "traffic_spike_10x" as const, targetNode: "Cache", detail: "Tautan kampanye viral meningkatkan beban baca menjadi 100.000 RPS!" },
    ],
    rubricRules: [
      { ruleId: "cache_aside_enabled", weight: 35, checkDescription: "Node Cache wajib dipasang dengan hit ratio >= 85% di depan DB", failFeedback: "Database Primary/Replica tumbang menerima 100.000 RPS baca tanpa Cache." },
      { ruleId: "no_spof_api", weight: 30, checkDescription: "Load Balancer + minimal 3 instans API Server", failFeedback: "API Server tunggal menjadi bottleneck dan Single Point of Failure." },
      { ruleId: "read_replica_split", weight: 20, checkDescription: "Pisahkan jalur tulis (DBPrimary) dan jalur baca cache-miss (DBReplica)", failFeedback: "Beban baca cache-miss mengganggu transaksi penulisan URL baru." },
      { ruleId: "adr_301_vs_302", weight: 15, checkDescription: "Menjelaskan trade-off HTTP 301 vs 302 untuk analitik vs beban server", failFeedback: "Jelaskan mengapa 301 meringankan server (cache browser) sedangkan 302 dibutuhkan untuk analitik klik." },
    ],
    adrPrompts: [
      "Mengapa Anda memilih Base62 + Range Counter/Snowflake ID dibanding memotong hash MD5 untuk menghasilkan kode 7 karakter?",
      "Kapan Anda menggunakan HTTP 301 (Permanent) vs HTTP 302 (Temporary) dan bagaimana pengaruhnya terhadap metrik analitik?",
    ],
    referenceSolution: {
      recommendedNodes: ["Client", "DNS", "CDN", "LoadBalancer", "RateLimiter", "APIServer", "Cache", "DBPrimary", "DBReplica"],
      edges: [["Client", "CDN"], ["CDN", "LoadBalancer"], ["LoadBalancer", "APIServer"], ["APIServer", "Cache"], ["APIServer", "DBPrimary"], ["DBPrimary", "DBReplica"], ["APIServer", "DBReplica"]] as Array<[string, string]>,
      architectureSummary: "CDN + Redis Cache-Aside menyerap >90% trafik redirect, sementara penulisan memakai ID generator terdistribusi ke DB Primary.",
      tradeoffAnalysis: "HTTP 301 menghemat biaya server karena di-cache browser, namun klik berulang dari browser yang sama tidak tercatat di server tanpa telemetri asinkron.",
    },
  },
  {
    id: "sd-02-rate-limiter",
    lessonId: null,
    scenarioNumber: 2,
    title: "2. Distributed Rate Limiter di Lapisan API Gateway",
    level: "intermediate",
    briefMarkdown: "Lindungi klaster pembayaran dari serangan brute-force dan lonjakan klien nakal dengan batas ketat per pengguna/IP pada **50.000 RPS** dan overhead latensi pengecekan < 5ms.",
    functionalReqs: [
      "Membatasi request berdasarkan aturan berjenjang (per detik dan per menit)",
      "Mengembalikan HTTP 429 Too Many Requests beserta header Retry-After",
    ],
    nonFunctionalReqs: { targetRps: 50000, maxP95Ms: 15, availability: "99.99%", maxCostUnits: 300 },
    availableNodes: ["Client", "LoadBalancer", "APIGateway", "RateLimiter", "Cache", "APIServer", "DBPrimary"],
    trafficProfile: { mode: "spike" as const, baseRps: 5000, peakRps: 50000, durationTicks: 60, seed: 202 },
    chaosEvents: [
      { tick: 25, kind: "kill_node" as const, targetNode: "Cache", detail: "Satu shard Redis penyimpan counter Rate Limiter mengalami gangguan jaringan!" },
    ],
    rubricRules: [
      { ruleId: "edge_placement", weight: 40, checkDescription: "RateLimiter terpasang di APIGateway sebelum mencapai APIServer", failFeedback: "Rate limiter di belakang API Server tetap membuang CPU aplikasi saat terjadi serangan DDoS." },
      { ruleId: "in_memory_atomic_store", weight: 35, checkDescription: "Menggunakan klaster Cache (Redis Lua Script) bukan Database disk untuk menyimpan counter", failFeedback: "Menyimpan counter rate limit di Database SQL menyebabkan latensi tinggi dan lock contention." },
      { ruleId: "fail_open_vs_closed_adr", weight: 25, checkDescription: "Menjelaskan kebijakan fail-open vs fail-closed saat Redis mati", failFeedback: "Wajib menentukan apakah trafik diizinkan lewat (fail-open) atau diblokir (fail-closed) saat cluster cache terputus." },
    ],
    adrPrompts: [
      "Bandingkan algoritma Token Bucket vs Sliding Window Counter untuk trafik berpola burst!",
      "Jika cluster Redis Rate Limiter mengalami timeout, apakah sistem Anda memilih Fail-Open atau Fail-Closed? Jelaskan alasannya!",
    ],
    referenceSolution: {
      recommendedNodes: ["Client", "LoadBalancer", "APIGateway", "RateLimiter", "Cache", "APIServer"],
      edges: [["Client", "LoadBalancer"], ["LoadBalancer", "APIGateway"], ["APIGateway", "RateLimiter"], ["RateLimiter", "Cache"], ["APIGateway", "APIServer"]] as Array<[string, string]>,
      architectureSummary: "API Gateway mengeksekusi script Lua atomik pada Redis untuk algoritma Token Bucket dengan fallback local memory limiter jika Redis timeout.",
      tradeoffAnalysis: "Fail-open dengan batas lokal per-node menjaga ketersediaan layanan bagi pengguna sah ketika Redis pusat terganggu.",
    },
  },
  {
    id: "sd-03-chat-1on1-websocket",
    lessonId: null,
    scenarioNumber: 3,
    title: "3. Chat Real-Time 1-ke-1 dengan Koneksi WebSocket Persisten",
    level: "intermediate",
    briefMarkdown: "Rancang sistem pesan instan untuk **200.000 pengguna online bersamaan** dengan pengiriman pesan < 100ms, urutan pesan terjaga, dan sinkronisasi riwayat multi-perangkat.",
    functionalReqs: [
      "Pengiriman pesan dua arah real-time melalui koneksi persisten WebSocket",
      "Penyimpanan riwayat pesan dan antrean offline jika penerima sedang tidak terkoneksi",
    ],
    nonFunctionalReqs: { targetRps: 40000, maxP95Ms: 100, availability: "99.95%", maxCostUnits: 500 },
    availableNodes: ["Client", "LoadBalancer", "APIGateway", "APIServer", "Cache", "Queue", "Worker", "DBPrimary", "DBReplica"],
    trafficProfile: { mode: "constant" as const, baseRps: 40000, peakRps: 40000, durationTicks: 60, seed: 303 },
    chaosEvents: [
      { tick: 35, kind: "kill_node" as const, targetNode: "APIServer", detail: "1 node Gateway WebSocket mati, 50.000 klien melakukan reconnect serentak!" },
    ],
    rubricRules: [
      { ruleId: "session_registry_pubsub", weight: 40, checkDescription: "Menggunakan Cache/PubSub untuk merutekan pesan antar node server WebSocket berbeda", failFeedback: "Pengguna A di Server 1 tidak bisa mengirim pesan ke Pengguna B di Server 2 tanpa Pub/Sub & Session Registry." },
      { ruleId: "exponential_backoff_reconnect", weight: 30, checkDescription: "Kapasitas Load Balancer dan Server mampu menahan reconnect storm", failFeedback: "Saat 1 node WebSocket mati, reconnect tanpa jitter menjatuhkan node yang tersisa." },
      { ruleId: "message_ordering_id", weight: 30, checkDescription: "Menjelaskan strategi pengurutan pesan di ADR", failFeedback: "Timestamp jam ponsel klien tidak sinkron; gunakan Sequence Generator per percakapan atau Snowflake ID." },
    ],
    adrPrompts: [
      "Mengapa kita tidak bisa mengandalkan timestamp dari ponsel pengirim untuk mengurutkan pesan chat?",
      "Bagaimana Server WebSocket tempat Pengirim terhubung mengetahui ke Server WebSocket mana Penerima sedang terhubung?",
    ],
    referenceSolution: {
      recommendedNodes: ["Client", "LoadBalancer", "APIServer", "Cache", "Queue", "DBPrimary"],
      edges: [["Client", "LoadBalancer"], ["LoadBalancer", "APIServer"], ["APIServer", "Cache"], ["APIServer", "Queue"], ["Queue", "DBPrimary"]] as Array<[string, string]>,
      architectureSummary: "Stateful WebSocket Server menyimpan pemetaan userId->serverId di Redis dan mempublikasikan pesan lintas node via Redis Pub/Sub serta menyimpan pesan ke DB.",
      tradeoffAnalysis: "Koneksi WebSocket bersifat stateful sehingga membutuhkan drain koneksi bertahap saat deployment.",
    },
  },
  {
    id: "sd-04-news-feed-fanout",
    lessonId: null,
    scenarioNumber: 4,
    title: "4. News Feed Sosial: Fan-Out on Write vs Fan-Out on Read (Masalah Selebritas)",
    level: "advanced",
    briefMarkdown: "Rancang linimasa beranda untuk aplikasi sosial dengan 50.000 pembacaan feed/detik. Terdapat akun reguler (200 pengikut) dan akun selebritas (**5 juta pengikut**).",
    functionalReqs: [
      "Pengguna melihat linimasa kronologis terurut dari akun yang diikuti dalam < 150ms",
      "Postingan baru dari akun selebritas tidak boleh memblokir antrean publikasi pengguna lain",
    ],
    nonFunctionalReqs: { targetRps: 50000, maxP95Ms: 150, availability: "99.9%", maxCostUnits: 650 },
    availableNodes: ["Client", "CDN", "LoadBalancer", "APIServer", "Cache", "Queue", "Worker", "DBPrimary", "DBReplica"],
    trafficProfile: { mode: "spike" as const, baseRps: 15000, peakRps: 50000, durationTicks: 60, seed: 404 },
    chaosEvents: [
      { tick: 15, kind: "inject_latency" as const, targetNode: "Worker", detail: "Selebritas dengan 5 juta pengikut memposting foto, memicu potensi write amplification masif!" },
    ],
    rubricRules: [
      { ruleId: "async_fanout_worker", weight: 35, checkDescription: "Publikasi feed dilakukan asinkron melalui Queue + Worker ke Inbox Cache", failFeedback: "Melakukan fan-out secara sinkron di API Server menyebabkan request post timeout." },
      { ruleId: "hybrid_fanout_adr", weight: 40, checkDescription: "Menjelaskan strategi Hybrid Fan-out (Push untuk user biasa, Pull untuk akun selebritas)", failFeedback: "Fan-out on write murni untuk akun 5 juta pengikut menyebabkan antrean Worker macet parah (hotkey write)." },
      { ruleId: "feed_cache_layer", weight: 25, checkDescription: "Pembacaan linimasa dilayani dari Cache dengan p95 < 150ms", failFeedback: "Query JOIN tabel follow dan post langsung ke Database pada 50.000 RPS melumpuhkan DB." },
    ],
    adrPrompts: [
      "Jelaskan bagaimana strategi Hybrid Fan-out menggabungkan Fan-out on Write (Push) dan Fan-out on Read (Pull) untuk menangani akun dengan jutaan pengikut!",
      "Data apa saja yang sebaiknya disimpan di dalam daftar Redis Feed Cache: seluruh objek postingan atau hanya daftar post_id?",
    ],
    referenceSolution: {
      recommendedNodes: ["Client", "CDN", "LoadBalancer", "APIServer", "Cache", "Queue", "Worker", "DBPrimary", "DBReplica"],
      edges: [["Client", "LoadBalancer"], ["LoadBalancer", "APIServer"], ["APIServer", "Cache"], ["APIServer", "Queue"], ["Queue", "Worker"], ["Worker", "Cache"], ["APIServer", "DBPrimary"], ["DBPrimary", "DBReplica"]] as Array<[string, string]>,
      architectureSummary: "Akun biasa menggunakan Fan-out on Write via Queue+Worker ke Redis list pengguna; postingan selebritas diambil saat baca (Fan-out on Read) dan digabungkan di memori.",
      tradeoffAnalysis: "Menyimpan hanya daftar post_id di Redis Inbox menghemat RAM secara signifikan dan mencegah inkonsistensi saat isi postingan diedit.",
    },
  },
  {
    id: "sd-05-file-storage-sync",
    lessonId: null,
    scenarioNumber: 5,
    title: "5. Cloud File Storage & Sinkronisasi Delta (Mirip Dropbox)",
    level: "advanced",
    briefMarkdown: "Rancang penyimpanan file awan yang menyinkronkan perubahan file berukuran 500 MB lintas perangkat tanpa mengunggah ulang keseluruhan file ketika hanya 1 paragraf yang berubah.",
    functionalReqs: [
      "Pemecahan file menjadi blok berukuran tetap/variabel (Chunking 4MB) dengan deduplikasi hash SHA-256",
      "Pemisahan penyimpanan Metadata (ACID) dan penyimpanan Blok Biner (Object Storage)",
    ],
    nonFunctionalReqs: { targetRps: 12000, maxP95Ms: 180, availability: "99.99%", maxCostUnits: 600 },
    availableNodes: ["Client", "CDN", "LoadBalancer", "APIGateway", "APIServer", "ObjectStorage", "Cache", "Queue", "Worker", "DBPrimary", "DBReplica"],
    trafficProfile: { mode: "ramp_up" as const, baseRps: 3000, peakRps: 12000, durationTicks: 60, seed: 505 },
    chaosEvents: [
      { tick: 20, kind: "traffic_spike_10x" as const, targetNode: "APIServer", detail: "Ribuan klien kantor menyinkronkan dokumen besar secara bersamaan pukul 09.00 pagi!" },
    ],
    rubricRules: [
      { ruleId: "direct_object_storage", weight: 40, checkDescription: "Chunk biner diunggah/diunduh langsung antara Client dan ObjectStorage (Presigned URL)", failFeedback: "Mengalirkan file ratusan MB melalui API Server menghabiskan bandwidth dan RAM aplikasi." },
      { ruleId: "metadata_db_separation", weight: 30, checkDescription: "API Server menyimpan metadata pohon direktori dan versi chunk di DBPrimary (ACID)", failFeedback: "Metadata versi file membutuhkan transaksi ACID agar tidak korup saat diedit dari 2 perangkat." },
      { ruleId: "chunk_dedup_adr", weight: 30, checkDescription: "Menjelaskan Content-Addressable Storage & sinkronisasi hanya chunk yang berubah", failFeedback: "Jelaskan bagaimana hash SHA-256 per chunk 4MB menghemat bandwidth dan ruang simpan." },
    ],
    adrPrompts: [
      "Mengapa file besar wajib dipecah menjadi blok (chunk 4MB) di sisi klien sebelum diunggah ke Object Storage?",
      "Bagaimana sistem Anda mendeteksi dan menangani konflik ketika pengguna mengedit file yang sama di laptop (offline) dan di ponsel?",
    ],
    referenceSolution: {
      recommendedNodes: ["Client", "CDN", "LoadBalancer", "APIServer", "ObjectStorage", "Cache", "Queue", "DBPrimary", "DBReplica"],
      edges: [["Client", "ObjectStorage"], ["Client", "LoadBalancer"], ["LoadBalancer", "APIServer"], ["APIServer", "Cache"], ["APIServer", "DBPrimary"], ["DBPrimary", "DBReplica"], ["APIServer", "Queue"]] as Array<[string, string]>,
      architectureSummary: "Klien memecah file menjadi chunk 4MB, memeriksa hash ke Metadata API, hanya mengunggah chunk baru ke Object Storage via Presigned URL, dan menerima notifikasi perubahan via SSE/Queue.",
      tradeoffAnalysis: "Content-defined chunking (Rabin fingerprinting) lebih tahan terhadap penyisipan byte di awal file dibandingkan fixed-size chunking, dengan kompromi komputasi klien sedikit lebih tinggi.",
    },
  },
  {
    id: "sd-06-concert-ticket-flashsale",
    lessonId: null,
    scenarioNumber: 6,
    title: "6. Tiket Konser Flash Sale: Konkurensi Tinggi & Pencegahan Double-Booking",
    level: "professional",
    briefMarkdown: "100.000 penggemar berebut 5.000 kursi bernomor pada detik yang sama (**25.000 RPS**). Sistem wajib mengunci kursi selama 5 menit saat checkout dan menjamin **nol double-booking**.",
    functionalReqs: [
      "Penguncian kursi sementara (Seat Hold TTL 300 detik) secara atomik",
      "Antrean ruang tunggu virtual (Virtual Waiting Room) dan pembatalan otomatis jika pembayaran kedaluwarsa",
    ],
    nonFunctionalReqs: { targetRps: 25000, maxP95Ms: 200, availability: "99.99%", maxCostUnits: 800 },
    availableNodes: ["Client", "CDN", "RateLimiter", "APIGateway", "LoadBalancer", "APIServer", "Cache", "Queue", "Worker", "DBPrimary", "DBReplica"],
    trafficProfile: { mode: "spike" as const, baseRps: 1000, peakRps: 25000, durationTicks: 60, seed: 606 },
    chaosEvents: [
      { tick: 20, kind: "cache_stampede" as const, targetNode: "Cache", detail: "Key peta ketersediaan kursi populer kedaluwarsa bersamaan di tengah lonjakan 25.000 RPS!" },
      { tick: 35, kind: "kill_node" as const, targetNode: "APIServer", detail: "1 instans API Server mati di tengah proses checkout!" },
    ],
    rubricRules: [
      { ruleId: "waiting_room_edge", weight: 25, checkDescription: "RateLimiter + Queue menahan lonjakan trafik di gerbang depan", failFeedback: "Tanpa pengendali laju di tepi (edge), lonjakan 25.000 RPS langsung menjatuhkan database transaksi." },
      { ruleId: "atomic_seat_hold", weight: 35, checkDescription: "Kombinasi Cache (Distributed Lock/Hold TTL) dan DBPrimary untuk isolasi pemesanan", failFeedback: "Membaca status kursi lalu menulis tanpa mekanisme kunci atomik menyebabkan dua orang mendapatkan kursi yang sama." },
      { ruleId: "no_spof_critical_path", weight: 20, checkDescription: "Seluruh node kritis memiliki >1 instans dan replika", failFeedback: "Ketika 1 node API Server dimatikan pada tick 35, layanan mengalami downtime karena tidak redundan." },
      { ruleId: "adr_locking_strategy", weight: 20, checkDescription: "Bandingkan Pessimistic Locking, Optimistic Locking, dan Redis Atomic Hold di ADR", failFeedback: "Berikan analisis kapan Optimistic Locking gagal (retry storm pada kontensi tinggi) dibanding Redis SETNX + DB Unique Constraint." },
    ],
    adrPrompts: [
      "Mengapa Optimistic Locking murni di Database menjadi buruk ketika 1.000 orang mengklik kursi VIP-A1 pada milidetik yang sama?",
      "Bagaimana alur pemulihan jika kursi sudah dikunci di Redis selama 5 menit, tetapi callback pembayaran baru tiba pada menit ke-5 lewat 2 detik?",
    ],
    referenceSolution: {
      recommendedNodes: ["Client", "CDN", "RateLimiter", "APIGateway", "LoadBalancer", "APIServer", "Cache", "Queue", "Worker", "DBPrimary", "DBReplica"],
      edges: [["Client", "CDN"], ["Client", "RateLimiter"], ["RateLimiter", "APIGateway"], ["APIGateway", "LoadBalancer"], ["LoadBalancer", "APIServer"], ["APIServer", "Cache"], ["APIServer", "Queue"], ["Queue", "Worker"], ["Worker", "DBPrimary"], ["DBPrimary", "DBReplica"]] as Array<[string, string]>,
      architectureSummary: "CDN melayani peta statis; RateLimiter + Queue mengatur antrean masuk; Redis mengeksekusi SETNX + TTL 300s untuk kunci kursi; DB Primary menegakkan constraint UNIQUE dan status transaksi.",
      tradeoffAnalysis: "Menambahkan grace period 30 detik pada validasi webhook dibanding TTL tampilan UI mencegah kegagalan bayar di detik terakhir.",
    },
  },
  {
    id: "sd-07-payment-ledger-system",
    lessonId: null,
    scenarioNumber: 7,
    title: "7. Sistem Pembayaran & Buku Besar Keuangan (Idempotensi & Konsistensi Kuat)",
    level: "professional",
    briefMarkdown: "Rancang mesin pemrosesan pembayaran dan buku besar (*double-entry ledger*) dengan **5.000 transaksi keuangan/detik** yang pantang menagih saldo pengguna dua kali saat jaringan retry.",
    functionalReqs: [
      "Setiap mutasi dana wajib menyertakan Idempotency-Key dan dicatat berpasangan (Debit/Kredit)",
      "Rekonsiliasi asinkron dan pengiriman event pembayaran yang andal (Transactional Outbox)",
    ],
    nonFunctionalReqs: { targetRps: 5000, maxP95Ms: 120, availability: "99.999%", maxCostUnits: 750 },
    availableNodes: ["Client", "APIGateway", "RateLimiter", "LoadBalancer", "APIServer", "Cache", "DBPrimary", "DBReplica", "Queue", "Worker"],
    trafficProfile: { mode: "constant" as const, baseRps: 5000, peakRps: 5000, durationTicks: 60, seed: 707 },
    chaosEvents: [
      { tick: 30, kind: "inject_latency" as const, targetNode: "DBPrimary", detail: "Jaringan mengalami packet loss sehingga klien mengirim ulang (retry) request pembayaran yang sama 3x!" },
    ],
    rubricRules: [
      { ruleId: "idempotency_store", weight: 35, checkDescription: "Pengecekan kunci idempotensi atomik di Cache/DBPrimary sebelum mengeksekusi mutasi", failFeedback: "Retry dari klien akibat timeout jaringan menyebabkan pemotongan saldo ganda!" },
      { ruleId: "sync_replication_db", weight: 35, checkDescription: "DBPrimary menggunakan replikasi sinkron ke DBReplica untuk RPO = 0", failFeedback: "Replikasi asinkron pada buku besar keuangan berisiko menghilangkan catatan transaksi yang sudah dikonfirmasi saat failover." },
      { ruleId: "outbox_pattern_queue", weight: 30, checkDescription: "Menggunakan Queue + Worker untuk pengiriman notifikasi/rekonsiliasi berbasis Outbox Pattern", failFeedback: "Mengirim pesan ke Queue di luar transaksi DB berisiko menimbulkan dual-write inconsistency." },
    ],
    adrPrompts: [
      "Jelaskan masalah Dual-Write ketika API Server menulis ke Database lalu mempublikasikan event ke Message Queue, serta bagaimana Transactional Outbox Pattern menyelesaikannya!",
      "Mengapa saldo akun sebaiknya diturunkan dari tabel mutasi buku besar (append-only immutable ledger) dan bagaimana cara menjaga performa baca saldo?",
    ],
    referenceSolution: {
      recommendedNodes: ["Client", "APIGateway", "RateLimiter", "LoadBalancer", "APIServer", "Cache", "DBPrimary", "DBReplica", "Queue", "Worker"],
      edges: [["Client", "APIGateway"], ["APIGateway", "RateLimiter"], ["RateLimiter", "LoadBalancer"], ["LoadBalancer", "APIServer"], ["APIServer", "Cache"], ["APIServer", "DBPrimary"], ["DBPrimary", "DBReplica"], ["DBPrimary", "Queue"], ["Queue", "Worker"]] as Array<[string, string]>,
      architectureSummary: "API Server memvalidasi Idempotency-Key, menulis entri debit/kredit immutable beserta tabel outbox dalam satu transaksi ACID di Postgres (replikasi sinkron), lalu Worker meneruskan event ke hilir.",
      tradeoffAnalysis: "Replikasi sinkron menambah latensi tulis beberapa milidetik, namun mutlak diperlukan pada sistem pembayaran demi menjamin nol kehilangan data (RPO=0).",
    },
  },
  {
    id: "sd-08-video-clipper-pipeline",
    lessonId: null,
    scenarioNumber: 8,
    title: "8. Pipeline Video Streaming & AI Auto-Clipper Terdistribusi",
    level: "professional",
    briefMarkdown: "Rancang arsitektur pemrosesan video di mana kreator mengunggah rekaman 1 jam untuk dipotong otomatis menjadi 10 klip vertikal (deteksi wajah CV + subtitle) dan disajikan via streaming adaptif.",
    functionalReqs: [
      "Unggah langsung ke Object Storage dan pemecahan segmen video (DAG Pipeline)",
      "Pemisahan antrean prioritas (video pendek vs panjang) dan progres real-time ke pengguna",
    ],
    nonFunctionalReqs: { targetRps: 8000, maxP95Ms: 120, availability: "99.9%", maxCostUnits: 900 },
    availableNodes: ["Client", "CDN", "APIGateway", "LoadBalancer", "APIServer", "ObjectStorage", "Queue", "Worker", "Cache", "DBPrimary", "DBReplica"],
    trafficProfile: { mode: "ramp_up" as const, baseRps: 1500, peakRps: 8000, durationTicks: 60, seed: 808 },
    chaosEvents: [
      { tick: 25, kind: "inject_latency" as const, targetNode: "Worker", detail: "Lonjakan antrean video 4K berdurasi 2 jam memperlambat Worker transcoding 3x lipat!" },
    ],
    rubricRules: [
      { ruleId: "presigned_upload_and_cdn", weight: 30, checkDescription: "Unggah langsung ke ObjectStorage dan distribusi hasil klip melalui CDN", failFeedback: "Melewatkan stream video mentah melalui API Server menyebabkan kehabisan memori dan biaya bandwidth tinggi." },
      { ruleId: "decoupled_dag_workers", weight: 35, checkDescription: "Pemisahan APIServer dan pool Worker menggunakan Queue", failFeedback: "Inferensi CV dan FFmpeg membutuhkan waktu puluhan detik dan wajib dijalankan secara asinkron di Worker." },
      { ruleId: "hol_blocking_adr", weight: 35, checkDescription: "Menjelaskan solusi Head-of-Line Blocking dan pemilihan SSE vs WebSocket di ADR", failFeedback: "Wajib menjelaskan bagaimana memisahkan antrean video pendek dan panjang serta mekanisme segmentasi paralel." },
    ],
    adrPrompts: [
      "Bagaimana Anda merancang DAG (Directed Acyclic Graph) pemrosesan video agar video berdurasi 60 menit dapat diproses secara paralel oleh banyak Worker sekaligus?",
      "Bagaimana cara mencegah 50 unggahan video 4K berdurasi 2 jam memblokir pengguna yang hanya mengunggah video 2 menit (Head-of-Line Blocking)?",
    ],
    referenceSolution: {
      recommendedNodes: ["Client", "CDN", "APIGateway", "LoadBalancer", "APIServer", "ObjectStorage", "Queue", "Worker", "Cache", "DBPrimary"],
      edges: [["Client", "ObjectStorage"], ["Client", "CDN"], ["CDN", "ObjectStorage"], ["Client", "APIGateway"], ["APIGateway", "LoadBalancer"], ["LoadBalancer", "APIServer"], ["APIServer", "DBPrimary"], ["APIServer", "Cache"], ["ObjectStorage", "Queue"], ["Queue", "Worker"], ["Worker", "ObjectStorage"], ["Worker", "Cache"]] as Array<[string, string]>,
      architectureSummary: "Video diunggah via Presigned Multipart URL ke Object Storage, dipecah per segmen GOP oleh splitter worker, diproses paralel (Audio STT + CV Face Tracking + Transcode HLS), lalu didistribusikan via CDN dengan update status melalui SSE.",
      tradeoffAnalysis: "Memecah antrean berdasarkan estimasi durasi/ukuran file serta memecah video menjadi chunk segmen 30 detik memungkinkan skalabilitas horizontal penuh pada pool GPU/CPU Worker.",
    },
  },
];

// ==========================================
// 4. DATA 28 PROYEK PORTOFOLIO (§8.1 PRD)
// ==========================================
export const SEED_TRACK_PROJECTS = [
  // Track A Python
  {
    id: "proj-a1-cli-todo-json",
    trackId: "track-a",
    tier: "project_1_basic",
    title: "CLI Todo Manager dengan Persistensi JSON & Argparse",
    briefMarkdown: "Bangun aplikasi baris perintah Python untuk mencatat, memfilter berdasarkan prioritas/tenggat, dan menyimpan tugas secara atomik ke file JSON.",
    starterRepoTemplate: "archforge-starters/python-p1-cli-todo",
    ciWorkflowPath: ".github/workflows/pytest-cli.yml",
    acceptanceCriteria: ["Mendukung sub-perintah add, list, done, delete", "Menulis file JSON secara aman menggunakan temporary file + os.replace", "Lolos 12 unit test pytest"],
    rubricChecklist: [
      { id: "pa1-1", category: "Kualitas Kode", item: "Seluruh fungsi publik memiliki anotasi tipe (Type Hints) dan lolos pengecekan mypy", points: 40 },
      { id: "pa1-2", category: "Keandalan", item: "Menangani file JSON korup atau belum ada tanpa crash (graceful fallback)", points: 60 },
    ],
  },
  {
    id: "proj-a2-scraper-pandas",
    trackId: "track-a",
    tier: "project_2_intermediate",
    title: "Data Collector & Analisis Statistik dengan Pandas + Visualisasi",
    briefMarkdown: "Ambil dataset publik melalui HTTP secara sopan (rate-limited + retry), bersihkan nilai kosong/outlier dengan Pandas, dan hasilkan laporan grafik Matplotlib.",
    starterRepoTemplate: "archforge-starters/python-p2-pandas-analyzer",
    ciWorkflowPath: ".github/workflows/pytest-pandas.yml",
    acceptanceCriteria: ["Pembersihan data tanpa mutasi tersembunyi (bebas SettingWithCopyWarning)", "Agregasi metrik persentil p50/p90/p99 akurat", "Menghasilkan grafik PNG resolusi tinggi"],
    rubricChecklist: [
      { id: "pa2-1", category: "Vektorisasi", item: "Tidak menggunakan iterrows() untuk transformasi kolom yang bisa divektorisasi", points: 50 },
      { id: "pa2-2", category: "Reproduksibilitas", item: "Dilengkapi pengujian menggunakan fixture HTML/JSON lokal tanpa bergantung internet saat CI jalan", points: 50 },
    ],
  },
  {
    id: "proj-a3-ml-pipeline-capstone",
    trackId: "track-a",
    tier: "project_3_capstone",
    title: "Capstone Python: End-to-End Tabular Data & Baseline ML Pipeline",
    briefMarkdown: "Rancang pipeline terotomatisasi mulai dari validasi skema data mentah, feature engineering, pelatihan model klasifikasi scikit-learn, hingga laporan evaluasi F1/ROC.",
    starterRepoTemplate: "archforge-starters/python-p3-ml-pipeline",
    ciWorkflowPath: ".github/workflows/pytest-ml-pipeline.yml",
    acceptanceCriteria: ["Bebas data leakage antara train dan test split (menggunakan Pipeline/ColumnTransformer)", "Mencapai skor F1 makro >= 0.82 pada dataset uji", "Menghasilkan artefak model dan laporan evaluasi Markdown otomatis"],
    rubricChecklist: [
      { id: "pa3-1", category: "Metodologi ML", item: "Transformasi fitur di-fit hanya pada data latih menggunakan objek Pipeline", points: 60 },
      { id: "pa3-2", category: "Rekayasa Perangkat Lunak", item: "Struktur paket modular dengan konfigurasi terpisah dan cakupan tes > 85%", points: 40 },
    ],
  },

  // Track B Rust
  {
    id: "proj-b1-minigrep-cli",
    trackId: "track-b",
    tier: "project_1_basic",
    title: "CLI Grep Mini Cepat dengan Pencarian Case-Insensitive & Regex Dasar",
    briefMarkdown: "Bangun pencari teks baris perintah di Rust yang membaca file besar secara streaming (`BufReader`), mendukung nomor baris, dan memisahkan output standar (`stdout`) dari pesan error (`stderr`).",
    starterRepoTemplate: "archforge-starters/rust-p1-minigrep",
    ciWorkflowPath: ".github/workflows/cargo-test.yml",
    acceptanceCriteria: ["Zero clippy warnings (`cargo clippy -- -D warnings`)", "Tidak memuat seluruh file multi-GB sekaligus ke RAM", "Mengembalikan exit code non-zero saat argumen tidak valid"],
    rubricChecklist: [
      { id: "pb1-1", category: "Memori & Ownership", item: "Menggunakan lifetime dan slice (&str) tanpa alokasi String yang tidak perlu pada jalur pencarian", points: 50 },
      { id: "pb1-2", category: "Error Handling", item: "Tidak menggunakan .unwrap() pada operasi I/O file pengguna", points: 50 },
    ],
  },
  {
    id: "proj-b2-kv-store-log",
    trackId: "track-b",
    tier: "project_2_intermediate",
    title: "Persistent Log-Structured Key-Value Store (Bitcask-Style)",
    briefMarkdown: "Implementasikan mesin penyimpanan key-value berbasis append-only log di disk dengan indeks offset di memori dan proses *compaction* otomatis.",
    starterRepoTemplate: "archforge-starters/rust-p2-kvstore",
    ciWorkflowPath: ".github/workflows/cargo-test.yml",
    acceptanceCriteria: ["Operasi set, get, dan remove tetap bertahan setelah proses di-restart", "Proses compaction memangkas entri usang tanpa menghentikan pembacaan", "Aman diakses oleh beberapa thread pembaca (`Arc<RwLock<...>>`)"],
    rubricChecklist: [
      { id: "pb2-1", category: "Sistem Penyimpanan", item: "Indeks in-memory hanya menyimpan offset byte dan panjang data, bukan nilai penuh", points: 60 },
      { id: "pb2-2", category: "Pengujian", item: "Menyertakan integration test pemulihan crash dan konkurensi multi-thread", points: 40 },
    ],
  },
  {
    id: "proj-b3-axum-or-sim-engine-capstone",
    trackId: "track-b",
    tier: "project_3_capstone",
    title: "Capstone Rust: Execution Gateway (Axum + Redis) ATAU Engine Simulasi WASM",
    briefMarkdown: "Pilih salah satu komponen inti ArchForge: (Opsi A) Gateway HTTP Axum dengan rate limiter, caching hash kode, dan antrean ke Judge0; atau (Opsi B) Engine simulasi antrean M/M/c System Design yang dikompilasi ke WebAssembly (`wasm-bindgen`).",
    starterRepoTemplate: "archforge-starters/rust-p3-archforge-core",
    ciWorkflowPath: ".github/workflows/cargo-wasm-axum.yml",
    acceptanceCriteria: ["Deterministik dan bebas panic pada input ekstrem", "Dokumentasi API lengkap beserta benchmark latensi eksekusi", "Lolos seluruh skenario tes integrasi"],
    rubricChecklist: [
      { id: "pb3-1", category: "Arsitektur Rust", item: "Pemisahan jelas antara domain murni dan adaptor I/O (HTTP/WASM boundary)", points: 50 },
      { id: "pb3-2", category: "Performa & Keamanan", item: "Penanganan batas waktu, batas memori, dan bebas blokade pada runtime async/worker", points: 50 },
    ],
  },

  // Track C Kotlin
  {
    id: "proj-c1-console-task-engine",
    trackId: "track-c",
    tier: "project_1_basic",
    title: "Mesin Manajemen Tugas & Penjadwalan Berbasis OOP & Koleksi Fungsional",
    briefMarkdown: "Bangun pustaka domain manajemen tugas di Kotlin menggunakan `sealed interface` untuk status, `data class` imutabel, dan agregasi analitik dengan `Sequence`.",
    starterRepoTemplate: "archforge-starters/kotlin-p1-task-domain",
    ciWorkflowPath: ".github/workflows/gradle-test.yml",
    acceptanceCriteria: ["Seluruh model bersifat immutable", "Mendukung filter komposit dan pengelompokan statistik", "100% lulus pengujian JUnit 5"],
    rubricChecklist: [
      { id: "pc1-1", category: "Idiom Kotlin", item: "Memanfaatkan sealed hierarchy dan exhaustive when tanpa cabang else liar", points: 50 },
      { id: "pc1-2", category: "Null Safety", item: "Nol penggunaan operator non-null assertion (!!)", points: 50 },
    ],
  },
  {
    id: "proj-c2-ktor-rest-api",
    trackId: "track-c",
    tier: "project_2_intermediate",
    title: "Layanan REST API Asinkron dengan Ktor, Coroutines & PostgreSQL",
    briefMarkdown: "Bangun backend Ktor dengan autentikasi Bearer token, validasi request, koneksi database ter-pool, dan penanganan error terpusat (`StatusPages`).",
    starterRepoTemplate: "archforge-starters/kotlin-p2-ktor-service",
    ciWorkflowPath: ".github/workflows/gradle-test.yml",
    acceptanceCriteria: ["Endpoint CRUD dan pencarian berpaginasi berjalan non-blocking dengan Coroutines", "Integration test menggunakan TestApplication Ktor", "Dokumentasi OpenAPI tersedia"],
    rubricChecklist: [
      { id: "pc2-1", category: "Structured Concurrency", item: "Tidak menggunakan GlobalScope; seluruh operasi I/O menghormati pembatalan coroutine", points: 60 },
      { id: "pc2-2", category: "Kontrak API", item: "Format respons error konsisten dengan kode status HTTP yang tepat", points: 40 },
    ],
  },
  {
    id: "proj-c3-compose-material3-capstone",
    trackId: "track-c",
    tier: "project_3_capstone",
    title: "Capstone Android: Aplikasi Belajar Interaktif dengan Jetpack Compose & Material 3",
    briefMarkdown: "Bangun aplikasi Android modern menggunakan Jetpack Compose: layar daftar track, detail materi, kuis interaktif dengan animasi transisi, tema dinamis Material 3 (Light/Dark), `ViewModel` + `StateFlow`, dan *state hoisting* murni.",
    starterRepoTemplate: "archforge-starters/kotlin-p3-compose-app",
    ciWorkflowPath: ".github/workflows/android-ci.yml",
    acceptanceCriteria: ["Seluruh layar utama memiliki versi Composable stateless yang diuji dengan ComposeTestRule", "Mendukung rotasi layar dan process death dengan rememberSaveable/SavedStateHandle", "Menyertakan screenshot Mode Terang, Mode Gelap, dan inspeksi Layout Inspector"],
    rubricChecklist: [
      { id: "pc3-1", category: "Arsitektur Compose", item: "Unidirectional Data Flow (UDF) dan State Hoisting diterapkan secara disiplin", points: 40 },
      { id: "pc3-2", category: "Performa Recomposition", item: "Menggunakan key pada LazyColumn dan kelas state stabil untuk mencegah recomposition tak perlu", points: 30 },
      { id: "pc3-3", category: "Aksesibilitas", item: "Menyertakan contentDescription/semantics dan ukuran target sentuh minimal 48dp", points: 30 },
    ],
  },

  // Track D Dart & Flutter
  {
    id: "proj-d1-offline-notes-app",
    trackId: "track-d",
    tier: "project_1_basic",
    title: "Aplikasi Catatan & Snippet Kode Offline-First",
    briefMarkdown: "Bangun aplikasi Flutter untuk menyimpan catatan teknis secara lokal dengan pencarian instan (debounced), kategori tag, dan manajemen state reaktif.",
    starterRepoTemplate: "archforge-starters/flutter-p1-offline-notes",
    ciWorkflowPath: ".github/workflows/flutter-ci.yml",
    acceptanceCriteria: ["Data tersimpan secara persisten di penyimpanan lokal", "Menampilkan state kosong (empty state) dan hasil pencarian secara mulus", "Lolos unit test dan widget test"],
    rubricChecklist: [
      { id: "pd1-1", category: "Manajemen State", item: "Logika bisnis dipisahkan dari Widget menggunakan Riverpod/Bloc/ChangeNotifier", points: 50 },
      { id: "pd1-2", category: "Kualitas Widget", item: "Menggunakan konstruktor const secara konsisten dan memecah widget besar menjadi komponen terfokus", points: 50 },
    ],
  },
  {
    id: "proj-d2-ui-component-toolkit",
    trackId: "track-d",
    tier: "project_2_intermediate",
    title: "Toolkit Komponen UI Kustom & Chart Kanvas dengan Animasi",
    briefMarkdown: "Bangun pustaka komponen UI reusable di Flutter: kartu progres interaktif, form bervalidasi, bottom sheet adaptif, dan grafik radar/bar menggunakan `CustomPainter` + animasi.",
    starterRepoTemplate: "archforge-starters/flutter-p2-ui-toolkit",
    ciWorkflowPath: ".github/workflows/flutter-ci.yml",
    acceptanceCriteria: ["Menerapkan ThemeExtension untuk design tokens kustom", "Grafik CustomPainter beranimasi pada 60fps tanpa memicu rebuild pohon widget", "Dilengkapi halaman katalog interaktif (Storybook/Widgetbook mini) dan Golden Test"],
    rubricChecklist: [
      { id: "pd2-1", category: "Rendering & Animasi", item: "CustomPainter mengimplementasikan shouldRepaint dengan benar dan dikendalikan oleh AnimationController/RepaintBoundary", points: 60 },
      { id: "pd2-2", category: "Golden Testing", item: "Komponen kunci tervalidasi dengan pengujian regresi visual (Golden Test)", points: 40 },
    ],
  },
  {
    id: "proj-d3-clean-arch-rust-ffi-capstone",
    trackId: "track-d",
    tier: "project_3_capstone",
    title: "Capstone Flutter: Aplikasi Responsif Multi-Platform + Jembatan FFI ke Rust",
    briefMarkdown: "Bangun aplikasi Flutter berarsitektur bersih (*Clean Architecture*) yang beradaptasi otomatis pada layar Ponsel, Tablet, dan Desktop/Web, serta memanggil pustaka Rust via `dart:ffi` untuk kalkulasi penjadwalan FSRS atau simulasi.",
    starterRepoTemplate: "archforge-starters/flutter-p3-clean-ffi",
    ciWorkflowPath: ".github/workflows/flutter-ffi-ci.yml",
    acceptanceCriteria: ["Navigasi adaptif (BottomNavigationBar di ponsel, NavigationRail/Sidebar di tablet & desktop)", "Integrasi FFI ke fungsi Rust berjalan cepat tanpa memblokir UI isolate", "Menyertakan screenshot di 3 ukuran viewport dan hasil profiling Flutter DevTools"],
    rubricChecklist: [
      { id: "pd3-1", category: "Arsitektur & FFI", item: "Batas lapisan Domain, Data, dan Presentation bersih dengan jembatan FFI yang aman memori", points: 50 },
      { id: "pd3-2", category: "Responsivitas & Aksesibilitas", item: "Tata letak bebas overflow pada skala font 200% dan mendukung navigasi keyboard penuh", points: 50 },
    ],
  },

  // Track E DSA
  {
    id: "proj-e1-ds-mini-library",
    trackId: "track-e",
    tier: "project_1_basic",
    title: "Pustaka Struktur Data dari Nol (RingBuffer Deque, HashMap Open-Addressing, MinHeap)",
    briefMarkdown: "Implementasikan tiga struktur data fundamental tanpa memakai koleksi tingkat tinggi bawaan, lengkap dengan pengujian properti dan analisis amortized.",
    starterRepoTemplate: "archforge-starters/dsa-p1-ds-library",
    ciWorkflowPath: ".github/workflows/dsa-ci.yml",
    acceptanceCriteria: ["Mengimplementasikan dynamic resizing ketika load factor > 0.75", "Menangani tabrakan hash (linear/quadratic probing atau Robin Hood hashing)", "Lolos uji beban 100.000 operasi"],
    rubricChecklist: [
      { id: "pe1-1", category: "Kebenaran Algoritmik", item: "Invarian struktur data terjaga pada operasi sisip, hapus, dan resize", points: 60 },
      { id: "pe1-2", category: "Analisis Kompleksitas", item: "Dokumentasi kompleksitas waktu/ruang per metode tercantum di kode", points: 40 },
    ],
  },
  {
    id: "proj-e2-algorithm-visualizer",
    trackId: "track-e",
    tier: "project_2_intermediate",
    title: "Visualizer Interaktif Algoritma Graf & Pencarian Jalur (Dijkstra, A*, Topological Sort)",
    briefMarkdown: "Bangun visualizer langkah-demi-langkah (*step-by-step*) yang memperlihatkan antrean prioritas, node yang dikunjungi, dan relaksasi bobot edge.",
    starterRepoTemplate: "archforge-starters/dsa-p2-visualizer",
    ciWorkflowPath: ".github/workflows/dsa-ci.yml",
    acceptanceCriteria: ["Mendukung kontrol Play, Pause, Step Forward, dan Step Backward", "Menampilkan perbandingan jumlah node yang dieksplorasi antara BFS, Dijkstra, dan A*", "Menyertakan deteksi siklus pada Topological Sort"],
    rubricChecklist: [
      { id: "pe2-1", category: "Mesin Stepper", item: "Algoritma menghasilkan snapshot/event log deterministik yang terpisah dari kode rendering UI", points: 60 },
      { id: "pe2-2", category: "Kejelasan Edukatif", item: "Menampilkan isi struktur data (Queue/Heap/Distance Table) secara real-time di setiap langkah", points: 40 },
    ],
  },
  {
    id: "proj-e3-30-patterns-portfolio",
    trackId: "track-e",
    tier: "project_3_capstone",
    title: "Capstone DSA: Portofolio 30 Soal Kanonik (Python & Rust) + Buku Catatan Pola",
    briefMarkdown: "Selesaikan 30 soal terkurasi yang mencakup seluruh 15 pola algoritma dalam dua bahasa (Python & Rust), dilengkapi bukti kompleksitas, daftar edge case, dan perbandingan pendekatan brute-force vs optimal.",
    starterRepoTemplate: "archforge-starters/dsa-p3-30-patterns",
    ciWorkflowPath: ".github/workflows/dsa-polyglot-ci.yml",
    acceptanceCriteria: ["Seluruh 30 solusi berjalan di bawah batas waktu dan memori pada runner Python & Rust", "Setiap soal memiliki dokumen ringkas pola pemicu (trigger signal) dan invariant utama", "Nol penyalinan dari solusi pihak ketiga"],
    rubricChecklist: [
      { id: "pe3-1", category: "Optimalitas", item: "Seluruh solusi mencapai kompleksitas waktu dan ruang optimal yang ditargetkan", points: 50 },
      { id: "pe3-2", category: "Komunikasi Live Coding", item: "Penjelasan trade-off dan dry-run tertulis jelas layaknya di sesi interview", points: 50 },
    ],
  },

  // Track F System Design
  {
    id: "proj-f1-three-design-docs",
    trackId: "track-f",
    tier: "project_1_basic",
    title: "Tiga Dokumen Desain Sistem Fondasi: URL Shortener, Rate Limiter, dan Chat Real-Time",
    briefMarkdown: "Susun 3 RFC desain sistem lengkap dengan perhitungan kapasitas (*back-of-envelope*), skema database/cache, kontrak API, dan topologi komponen.",
    starterRepoTemplate: "archforge-starters/sd-p1-three-rfcs",
    ciWorkflowPath: ".github/workflows/docs-lint.yml",
    acceptanceCriteria: ["Mencantumkan perhitungan QPS, bandwidth, RAM cache, dan storage 5 tahun yang konsisten", "Menyertakan diagram alur baca dan tulis", "Lulus simulasi skenario 1, 2, dan 3 di kanvas ArchForge dengan skor >= 80"],
    rubricChecklist: [
      { id: "pf1-1", category: "Kuantifikasi", item: "Angka estimasi kapasitas dihitung dengan rumus eksplisit, bukan tebakan tanpa dasar", points: 50 },
      { id: "pf1-2", category: "Ketepatan Komponen", item: "Pemilihan SQL/NoSQL dan pola caching sesuai dengan profil rasio baca:tulis", points: 50 },
    ],
  },
  {
    id: "proj-f2-bottleneck-chaos-report",
    trackId: "track-f",
    tier: "project_2_intermediate",
    title: "Eksperimen Simulasi Beban, Injeksi Kegagalan & Laporan Mitigasi Bottleneck",
    briefMarkdown: "Uji skenario News Feed, File Sync, dan Tiket Konser pada simulator ArchForge di bawah lonjakan trafik 10x dan kegagalan node, lalu tulis laporan forensik sebelum dan sesudah optimasi.",
    starterRepoTemplate: "archforge-starters/sd-p2-chaos-analysis",
    ciWorkflowPath: ".github/workflows/docs-lint.yml",
    acceptanceCriteria: ["Menyertakan perbandingan metrik latensi p50/p95 dan error rate sebelum vs sesudah mitigasi", "Menghilangkan seluruh Single Point of Failure (SPOF) pada jalur kritis", "Menyusun strategi mitigasi Cache Stampede dan Hot Shard"],
    rubricChecklist: [
      { id: "pf2-1", category: "Resiliensi", item: "Arsitektur tetap menjaga error rate < 0.1% saat 1 node aplikasi atau cache dimatikan", points: 60 },
      { id: "pf2-2", category: "Efisiensi Biaya", item: "Memenuhi target SLA tanpa melakukan over-provisioning melebihi batas anggaran skenario", points: 40 },
    ],
  },
  {
    id: "proj-f3-full-system-design-capstone",
    trackId: "track-f",
    tier: "project_3_capstone",
    title: "Capstone System Design: Arsitektur Sistem Skala Besar End-to-End (C4 + ADR + Estimasi + Deck 15 Menit)",
    briefMarkdown: "Rancang arsitektur produksi utuh untuk sistem pilihan (misal: Platform Belajar Interaktif & Sandbox Eksekusi Kode atau Pipeline AI Video Clipper) lengkap dengan C4 Model, 4 ADR, ancaman STRIDE, SLO budget, dan naskah presentasi design review 15 menit.",
    starterRepoTemplate: "archforge-starters/sd-p3-capstone",
    ciWorkflowPath: ".github/workflows/docs-lint.yml",
    acceptanceCriteria: ["Mencakup diagram C4 Level 1, 2, dan 3", "Menyertakan rencana Disaster Recovery (RPO/RTO) dan keamanan sandbox/data", "Menyelesaikan seluruh 8 skenario simulator ArchForge dengan skor >= 85"],
    rubricChecklist: [
      { id: "pf3-1", category: "Kedalaman Teknis", item: "Menjawab skenario kegagalan jaringan, konsistensi data, dan keamanan secara konkret", points: 60 },
      { id: "pf3-2", category: "Kejelasan Komunikasi", item: "Struktur presentasi 15 menit siap diuji pada sesi System Design Interview level Senior/Staff", points: 40 },
    ],
  },

  // Track G Arsitek Industri
  {
    id: "proj-g1-five-adrs-real-project",
    trackId: "track-g",
    tier: "project_1_basic",
    title: "5 Dokumen Architecture Decision Record (ADR) untuk Proyek Nyata",
    briefMarkdown: "Tulis 5 ADR berformat industri (Context, Considered Options, Decision, Consequences Positif/Negatif, Compliance) untuk keputusan krusial pada proyek nyata Anda.",
    starterRepoTemplate: "archforge-starters/arch-p1-adr-pack",
    ciWorkflowPath: ".github/workflows/docs-lint.yml",
    acceptanceCriteria: ["Setiap ADR membandingkan minimal 3 opsi yang layak beserta metrik penentu", "Mencantumkan konsekuensi negatif/risiko dan rencana mitigasinya secara jujur", "Menentukan kondisi pemicu kapan keputusan tersebut harus ditinjau ulang"],
    rubricChecklist: [
      { id: "pg1-1", category: "Objektivitas Trade-off", item: "Tidak menggunakan argumen sepihak; opsi yang ditolak dijelaskan kelebihan dan kekurangannya secara adil", points: 60 },
      { id: "pg1-2", category: "Ketertelusuran Bisnis", item: "Keputusan teknis dikaitkan langsung dengan batasan biaya, waktu, atau kompetensi tim", points: 40 },
    ],
  },
  {
    id: "proj-g2-c4-and-quality-scenarios",
    trackId: "track-g",
    tier: "project_2_intermediate",
    title: "Pemodelan C4 Lengkap + Pohon Utilitas Atribut Kualitas (ATAM Ringkas)",
    briefMarkdown: "Petakan arsitektur sistem ke dalam diagram C4 (System Context, Container, Component) menggunakan kode (Structurizr DSL / Mermaid) dan susun 8 skenario atribut kualitas terukur (Stimulus -> Environment -> Response -> Response Measure).",
    starterRepoTemplate: "archforge-starters/arch-p2-c4-atam",
    ciWorkflowPath: ".github/workflows/docs-lint.yml",
    acceptanceCriteria: ["Setiap panah relasi pada diagram C4 memiliki label aksi dan protokol eksplisit (mis. HTTPS/JSON, gRPC)", "Skenario kualitas memiliki metrik ambang batas numerik (bukan sekadar 'harus cepat')", "Menyertakan matriks titik sensitivitas dan trade-off"],
    rubricChecklist: [
      { id: "pg2-1", category: "Disiplin Notasi C4", item: "Tidak mencampur abstraksi (mis. tidak menaruh kelas internal di dalam diagram Container)", points: 50 },
      { id: "pg2-2", category: "Ketajaman NFR", item: "Seluruh atribut kualitas dapat diuji secara otomatis di pipeline atau simulator", points: 50 },
    ],
  },
  {
    id: "proj-g3-arc42-architecture-blueprint",
    trackId: "track-g",
    tier: "project_3_capstone",
    title: "Capstone Arsitek: Dokumen Arsitektur Standar arc42 & Kalkulasi FinOps",
    briefMarkdown: "Susun blueprint arsitektur produksi menggunakan template 12 bagian **arc42** (Goals, Constraints, Context, Solution Strategy, Building Blocks, Runtime View, Deployment View, Cross-Cutting Concepts, ADRs, Quality, Risks/Tech Debt, Glossary) lengkap dengan proyeksi biaya FinOps.",
    starterRepoTemplate: "archforge-starters/arch-p3-arc42-blueprint",
    ciWorkflowPath: ".github/workflows/docs-lint.yml",
    acceptanceCriteria: ["Lengkap seluruh 12 bagian arc42 secara ringkas, padat, dan bebas kontradiksi", "Menyertakan tabel Unit Economics FinOps pada skala 1.000, 10.000, dan 100.000 pengguna aktif", "Menyertakan peta jalan pelunasan utang teknis bertahap"],
    rubricChecklist: [
      { id: "pg3-1", category: "Kelengkapan arc42", item: "Konsistensi penuh antara Building Block View, Runtime View, dan Deployment View", points: 60 },
      { id: "pg3-2", category: "Kelayakan Finansial & Operasional", item: "Analisis FinOps dan strategi operasional realistis untuk dijalankan tim nyata", points: 40 },
    ],
  },

  // Track H ML & Computer Vision
  {
    id: "proj-h1-image-classifier-baseline",
    trackId: "track-h",
    tier: "project_1_basic",
    title: "Pipeline Klasifikasi Gambar & Evaluasi Confusion Matrix",
    briefMarkdown: "Bangun pipeline ekstraksi fitur dan klasifikasi gambar menggunakan augmentasi terukur, validasi silang, dan analisis kesalahan prediksi per kelas.",
    starterRepoTemplate: "archforge-starters/mlcv-p1-classifier",
    ciWorkflowPath: ".github/workflows/mlcv-ci.yml",
    acceptanceCriteria: ["Menyertakan notebook pelatihan yang dapat direproduksi dengan random seed tetap", "Menghasilkan laporan Precision, Recall, F1, dan visualisasi sampel salah prediksi", "Ukuran model akhir < 25 MB"],
    rubricChecklist: [
      { id: "ph1-1", category: "Evaluasi Model", item: "Menganalisis pola kegagalan model (pencahayaan, oklusi, kemiripan kelas) beserta solusinya", points: 60 },
      { id: "ph1-2", category: "Kualitas Pipeline", item: "Kode pra-pemrosesan gambar konsisten antara tahap pelatihan dan inferensi", points: 40 },
    ],
  },
  {
    id: "proj-h2-object-detection-onnx-export",
    trackId: "track-h",
    tier: "project_2_intermediate",
    title: "Deteksi Objek Kustom → Ekspor ONNX & Kuantisasi INT8",
    briefMarkdown: "Latih/fine-tune model deteksi objek ringan (YOLO-nano/small) di GPU lokal atau Colab, ekspor ke grafik ONNX dengan `dynamic_axes`, lakukan kuantisasi dinamis/statis, dan bandingkan akurasi mAP serta kecepatan inferensi.",
    starterRepoTemplate: "archforge-starters/mlcv-p2-onnx-quant",
    ciWorkflowPath: ".github/workflows/mlcv-ci.yml",
    acceptanceCriteria: ["Model .onnx lolos pemeriksaan onnx.checker.check_model", "Kuantisasi memangkas ukuran file minimal 50% dengan penurunan mAP < 2%", "Skrip pasca-pemrosesan Non-Maximum Suppression (NMS) teruji unit test"],
    rubricChecklist: [
      { id: "ph2-1", category: "Optimasi Model", item: "Menyajikan tabel benchmark terukur: ukuran file (MB), latensi inferensi (ms), dan mAP50-95 (FP32 vs INT8)", points: 60 },
      { id: "ph2-2", category: "Portabilitas ONNX", item: "Grafik ONNX bebas operator kustom yang tidak didukung oleh onnxruntime-web", points: 40 },
    ],
  },
  {
    id: "proj-h3-browser-cv-onnx-capstone",
    trackId: "track-h",
    tier: "project_3_capstone",
    title: "Capstone ML/CV: Aplikasi Computer Vision Real-Time di Browser (ONNX Runtime Web + OpenCV.js)",
    briefMarkdown: "Bangun aplikasi web interaktif di Next.js 16 yang memuat model ONNX Anda di Web Worker, memproses frame gambar/webcam dengan OpenCV.js, dan menggambar *bounding box* serta skor kepercayaan di atas elemen `<canvas>` secara real-time tanpa mengirim gambar ke server.",
    starterRepoTemplate: "archforge-starters/mlcv-p3-browser-ort",
    ciWorkflowPath: ".github/workflows/mlcv-web-ci.yml",
    acceptanceCriteria: ["Inferensi berjalan di dalam Web Worker atau backend WebGL/WASM tanpa membekukan thread UI utama", "Menampilkan indikator FPS dan waktu pra-proses vs inferensi vs pasca-proses", "Privasi terjaga 100%: seluruh pemrosesan gambar terjadi di perangkat klien"],
    rubricChecklist: [
      { id: "ph3-1", category: "Integrasi Web & MLOps", item: "Model dimuat secara lazy-load dengan caching IndexedDB/Cache API dan penanganan memori tensor yang bersih (dispose)", points: 60 },
      { id: "ph3-2", category: "Akurasi Visual", item: "Transformasi koordinat letterbox dan NMS presisi pada berbagai rasio aspek layar", points: 40 },
    ],
  },

  // Track J UI/UX
  {
    id: "proj-j1-ui-critique-and-redesign",
    trackId: "track-j",
    tier: "project_1_basic",
    title: "Audit Heuristik & Rancang Ulang Satu Layar Aplikasi Nyata",
    briefMarkdown: "Pilih satu layar aplikasi publik yang padat/membingungkan, lakukan bedah masalah menggunakan grid 8pt, hierarki tipografi, kontras WCAG, dan 10 heuristik Nielsen, lalu buat desain sebelum/sesudah.",
    starterRepoTemplate: "archforge-starters/uiux-p1-redesign-case",
    ciWorkflowPath: ".github/workflows/docs-lint.yml",
    acceptanceCriteria: ["Mencantumkan minimal 6 temuan masalah terukur beserta tingkat keparahannya", "Desain baru memenuhi rasio kontras teks >= 4.5:1 dan ritme spasi 4/8pt", "Menyertakan desain untuk 4 state: Loading, Empty, Error, dan Success"],
    rubricChecklist: [
      { id: "pj1-1", category: "Ketajaman Evaluasi", item: "Setiap perubahan visual memiliki alasan fungsional/ergonomis, bukan sekadar selera estetika", points: 50 },
      { id: "pj1-2", category: "Kelengkapan State", item: "Tidak hanya mendesain happy-path; state error dan teks panjang Bahasa Indonesia tertangani rapi", points: 50 },
    ],
  },
  {
    id: "proj-j2-mini-design-system-figma",
    trackId: "track-j",
    tier: "project_2_intermediate",
    title: "Mini Design System: Token Semantik + 8 Komponen Inti di Figma",
    briefMarkdown: "Bangun sistem desain terstruktur yang berisi token warna/tipografi/spasi/radius (Mode Terang & Gelap) serta 8 komponen dengan Auto Layout dan varian status (Button, Input, Card, Badge, Modal, Tabs, Toast, EmptyState).",
    starterRepoTemplate: "archforge-starters/uiux-p2-design-tokens",
    ciWorkflowPath: ".github/workflows/tokens-validate.yml",
    acceptanceCriteria: ["File JSON Design Tokens valid dan memisahkan Primitive Tokens dari Semantic Tokens", "Seluruh 8 komponen mendukung Auto Layout responsif dan pergantian tema Light/Dark instan", "Dilengkapi panduan Do & Don't penggunaan komponen"],
    rubricChecklist: [
      { id: "pj2-1", category: "Arsitektur Token", item: "Penamaan token menggunakan peran semantik (mis. surface.elevated, text.muted) bukan nama warna mentah", points: 50 },
      { id: "pj2-2", category: "Kesiapan Handoff", item: "Properti komponen di Figma memetakan langsung ke parameter API di Jetpack Compose dan Flutter", points: 50 },
    ],
  },
  {
    id: "proj-j3-one-design-two-frameworks",
    trackId: "track-j",
    tier: "project_3_capstone",
    title: "Capstone UI: Satu Desain → Dua Implementasi (Jetpack Compose vs Flutter)",
    briefMarkdown: "Implementasikan desain antarmuka dan token dari Proyek 2 secara presisi di **Jetpack Compose (Track C5)** dan **Flutter (Track D5/D6)**, lalu tulis laporan teknis yang membandingkan ergonomi layout, manajemen state, animasi, dan performa rendering keduanya.",
    starterRepoTemplate: "archforge-starters/uiux-p3-compose-vs-flutter",
    ciWorkflowPath: ".github/workflows/ui-dual-ci.yml",
    acceptanceCriteria: ["Kemiripan visual kedua implementasi terhadap spesifikasi desain >= 95% pada Mode Terang dan Gelap", "Mengimplementasikan micro-interaction dan transisi layar di kedua framework", "Laporan perbandingan menyertakan tangkapan layar berdampingan dan matriks trade-off developer experience"],
    rubricChecklist: [
      { id: "pj3-1", category: "Konsistensi Lintas Framework", item: "Design tokens terkonversi konsisten antara MaterialTheme Compose dan ThemeExtension Flutter", points: 50 },
      { id: "pj3-2", category: "Kedalaman Analisis", item: "Membandingkan mekanisme Recomposition Compose vs Widget/Element/RenderObject Flutter secara objektif", points: 50 },
    ],
  },

  // Proyek ke-28: Capstone Gabungan Lintas Bahasa (§8.1 PRD)
  {
    id: "proj-cross-track-polyglot-capstone",
    trackId: "track-g",
    tier: "cross_track_capstone",
    title: "Grand Capstone Lintas Bahasa: Backend Rust (Axum) + Klien Android Compose + Klien Flutter + Desain Figma",
    briefMarkdown: "Bangun produk utuh aplikasi pencatat & flashcard spaced-repetition: **Backend HTTP di Rust (Track B)** dengan kontrak OpenAPI ketat, **Desain Sistem di Figma (Track J)**, **Klien Native Android di Jetpack Compose (Track C5)**, dan **Klien Multi-Platform di Flutter (Track D)**.",
    starterRepoTemplate: "archforge-starters/grand-capstone-polyglot",
    ciWorkflowPath: ".github/workflows/polyglot-grand-ci.yml",
    acceptanceCriteria: ["Satu kontrak OpenAPI menjadi sumber kebenaran antara server Axum, klien Kotlin, dan klien Dart", "Sinkronisasi offline-first idempoten berjalan mulus dari kedua klien ke backend Rust", "Dilengkapi diagram C4, 3 ADR, dan bukti demo seluruh platform"],
    rubricChecklist: [
      { id: "px-1", category: "Integrasi Kontrak", item: "Konsistensi penuh serialisasi JSON, penanganan error, dan autentikasi antara Rust, Kotlin, dan Dart", points: 50 },
      { id: "px-2", category: "Kualitas Produk Utuh", item: "Aplikasi siap masuk halaman Portofolio Publik ArchForge dengan CI hijau di seluruh repositori", points: 50 },
    ],
  },
];

// ==========================================
// 5. DATA LESSON INTERAKTIF & BANK SOAL
// ==========================================
export const SEED_LESSONS = [
  // LEVEL BEGINNER — Track 0 & Track A1
  {
    id: "lesson-t0-memory-stack-heap",
    moduleId: "t0-m1",
    title: "Stack vs Heap: Meja Kerja Cepat vs Gudang Dinamis",
    level: "beginner",
    estMinutes: 15,
    prereq: [],
    objectives: [
      "Membedakan alokasi ukuran tetap di Stack dan alokasi dinamis di Heap",
      "Menjelaskan peran pointer pada Stack yang menunjuk ke buffer di Heap",
    ],
    tags: ["memory", "stack", "heap", "computer-science"],
    interactiveWidget: {
      component: "MemoryVisualizer",
      props: { mode: "stack-vs-heap", initialVars: [{ name: "skor", val: 100, region: "stack" }, { name: "judul", val: "ArchForge", region: "heap" }] },
      taskInstruction: "Ubah panjang teks 'judul' pada simulator untuk melihat realokasi buffer di Heap sementara pointer di Stack tetap berukuran 24 byte.",
    },
    mdxBody: "# Stack vs Heap\nSetiap variabel dalam programmu membutuhkan tempat tinggal di RAM. **Stack** bekerja secara LIFO (*Last-In, First-Out*) untuk tipe berukuran pasti saat kompilasi, sedangkan **Heap** menangani data yang ukurannya bisa tumbuh saat program berjalan.\n\n<MemoryVisualizer />\n\n<Exercise id=\"ex-t0-parsons-stack\" />\n<Exercise id=\"ex-t0-mcq-pointer\" />",
    srsCardsAuto: true,
    orderIndex: 1,
  },
  {
    id: "lesson-ta-python-collections",
    moduleId: "ta-a1",
    title: "Struktur Data Bawaan Python: List, Dict, Set & Tuple",
    level: "beginner",
    estMinutes: 20,
    prereq: ["lesson-t0-memory-stack-heap"],
    objectives: [
      "Memilih antara list (urutan) dan set/dict (pencarian O(1) berbasis hash)",
      "Menyelesaikan pembersihan data transaksi menggunakan list/dict comprehension",
    ],
    tags: ["python", "collections", "hash-table"],
    interactiveWidget: {
      component: "HashLookupCompare",
      props: { itemCount: 10000 },
      taskInstruction: "Bandingkan jumlah langkah pencarian elemen ke-9.999 antara List (scan linier) dan Set/Dict (lompatan hash O(1)).",
    },
    mdxBody: "# Memilih Koleksi Python yang Tepat\nBanyak pemula menggunakan `list` untuk segalanya. Ketika kamu memeriksa `if user_id in daftar_user` pada 100.000 data, `list` harus memeriksa satu per satu ($O(n)$), sedangkan `set` atau `dict` langsung melompat ke alamat hash dalam $O(1)$.\n\n<CodeExercise id=\"ex-py-a1-dedup-audit\" />",
    srsCardsAuto: true,
    orderIndex: 1,
  },

  // LEVEL INTERMEDIATE — Track B2 (Rust Ownership) & Track C5 (Compose UI Predict) & Track D2 (Flutter)
  {
    id: "lesson-tb-rust-ownership-borrow",
    moduleId: "tb-b2",
    title: "Ownership, Move Semantics & Hukum Peminjaman (Borrowing)",
    level: "intermediate",
    estMinutes: 25,
    prereq: ["lesson-t0-memory-stack-heap"],
    objectives: [
      "Menjelaskan 3 aturan Ownership Rust dan mengapa double-free mustahil terjadi di safe Rust",
      "Memperbaiki error borrow checker dengan referensi immutable (&T) dan mutable (&mut T)",
    ],
    tags: ["rust", "ownership", "borrowing", "memory-safety"],
    interactiveWidget: {
      component: "RustOwnershipTimeline",
      props: { codeSnippet: "let s1 = String::from(\"halo\"); let s2 = s1;" },
      taskInstruction: "Geser kursor baris demi baris untuk melihat kapan kepemilikan berpindah (move) dan kapan peminjaman (&mut) berakhir (Non-Lexical Lifetimes).",
    },
    mdxBody: "# Hukum Besi Ownership Rust\nRust tidak memakai *Garbage Collector*, namun juga tidak membiarkanmu lupa memanggil `free()`. Rahasianya ada pada tiga aturan yang diperiksa saat kompilasi:\n1. Setiap nilai memiliki tepat satu *owner*.\n2. Hanya boleh ada satu *owner* pada satu waktu.\n3. Saat *owner* keluar dari cakupan (*scope*), nilai langsung dibersihkan (`drop`).\n\n<RustOwnershipTimeline />\n\n<CodeExercise id=\"ex-rust-b2-zero-clone-log\" />",
    srsCardsAuto: true,
    orderIndex: 1,
  },
  {
    id: "lesson-tc-compose-state-modifier",
    moduleId: "tc-c5",
    title: "Jetpack Compose: Urutan Modifier, State Hoisting & Jebakan Recomposition",
    level: "intermediate",
    estMinutes: 25,
    prereq: [],
    objectives: [
      "Memprediksi hasil render visual berdasarkan urutan rantai Modifier",
      "Menerapkan pola State Hoisting (nilai state turun, event naik)",
    ],
    tags: ["kotlin", "jetpack-compose", "android-ui", "state-hoisting"],
    interactiveWidget: {
      component: "ComposeModifierInspector",
      props: { layers: ["padding(16.dp)", "background(Indigo)", "padding(12.dp)", "clickable()"] },
      taskInstruction: "Tukar urutan blok Modifier.background dan Modifier.padding untuk melihat perubahan batas kotak warna dan area klik.",
    },
    mdxBody: "# Deklaratif UI: $UI = f(State)$\nDi Jetpack Compose, urutan pemanggilan `Modifier` dieksekusi dari luar ke dalam (*outer-to-inner*). Kesalahan meletakkan `.padding()` sebelum `.clickable()` atau `.background()` akan mengubah tampilan dan area sentuh secara drastis.\n\n<ComposeModifierInspector />\n\n<Exercise id=\"ex-kotlin-c5-ui-predict-modifier\" />\n<CodeExercise id=\"ex-kotlin-c3-flow-debounce\" />",
    srsCardsAuto: true,
    orderIndex: 1,
  },
  {
    id: "lesson-td-flutter-constraints-box",
    moduleId: "td-d5",
    title: "Hukum Tata Letak Flutter: Constraints Go Down, Sizes Go Up, Parent Sets Position",
    level: "intermediate",
    estMinutes: 20,
    prereq: [],
    objectives: [
      "Mendiagnosis dan memperbaiki error RenderFlex overflowed dan unbounded height di dalam Column/ListView",
      "Membuat komponen responsif menggunakan LayoutBuilder dan Expanded/Flexible",
    ],
    tags: ["dart", "flutter", "layout-constraints", "ui"],
    interactiveWidget: {
      component: "FlutterConstraintPlayground",
      props: { parentMinW: 0, parentMaxW: 360, parentMinH: 0, parentMaxH: "Infinity" },
      taskInstruction: "Ubah maxH parent menjadi Infinity (seperti di dalam Column) saat child meminta tinggi maksimum untuk melihat pemicu Unbounded Height Error.",
    },
    mdxBody: "# Mengapa Widget Flutter Tidak Bisa Menentukan Ukurannya Sendiri Secara Bebas?\nTata letak Flutter berjalan dalam satu lintasan (*single-pass*): Parent mengirim batasan (`BoxConstraints`) ke bawah, Child memilih ukuran di dalam batasan tersebut dan melaporkannya ke atas, lalu Parent meletakkan koordinat $(x, y)$ Child.\n\n<CodeExercise id=\"ex-dart-d5-responsive-card\" />",
    srsCardsAuto: true,
    orderIndex: 1,
  },

  // LEVEL ADVANCED / COMPLEX — Track E4 (DSA Live Coding), Track F4 (Caching Stampede), Track H4/H5 (CV & ONNX)
  {
    id: "lesson-te-dsa-sliding-window-monotonic",
    moduleId: "te-e4",
    title: "Pola Sliding Window & Monotonic Deque untuk Analisis Stream Real-Time",
    level: "advanced",
    estMinutes: 30,
    prereq: ["lesson-ta-python-collections", "lesson-tb-rust-ownership-borrow"],
    objectives: [
      "Menurunkan kompleksitas pencarian subarray optimum dari O(n^2) menjadi O(n)",
      "Menyelesaikan sesi Live Coding dengan tahapan Think Aloud dan analisis Big-O",
    ],
    tags: ["dsa", "sliding-window", "live-coding", "interview"],
    interactiveWidget: {
      component: "SlidingWindowVisualizer",
      props: { array: [40, 20, 10, 30, 50, 10], budget: 70 },
      taskInstruction: "Jalankan pointer Kanan dan amati kapan pointer Kiri menyusutkan jendela saat jumlah elemen melampaui batas anggaran.",
    },
    mdxBody: "# Pola Sliding Window pada Telemetri Sistem\nSaat menganalisis jendela waktu metrik server (misalnya mencari rentang trafik stabil terpanjang atau nilai maksimum per 10 detik), menghitung ulang dari awal di setiap indeks membuang waktu $O(n \\cdot k)$. Dengan *Sliding Window*, setiap elemen hanya masuk dan keluar jendela maksimal satu kali ($O(n)$).\n\n<SlidingWindowVisualizer />\n\n<CodeExercise id=\"ex-dsa-e4-longest-stable-window-rust\" />\n<CodeExercise id=\"ex-dsa-e4-longest-stable-window-py\" />",
    srsCardsAuto: true,
    orderIndex: 1,
  },
  {
    id: "lesson-th-cv-onnx-browser-pipeline",
    moduleId: "th-h5",
    title: "Inferensi Computer Vision di Browser: OpenCV.js Pre-processing + ONNX Runtime Web",
    level: "advanced",
    estMinutes: 30,
    prereq: ["lesson-ta-python-collections"],
    objectives: [
      "Melakukan normalisasi tensor NCHW dan letterbox resize untuk input model deteksi objek",
      "Mengeksekusi Non-Maximum Suppression (NMS) untuk menyaring kotak deteksi yang tumpang tindih",
    ],
    tags: ["computer-vision", "onnx", "yolo", "mlops"],
    interactiveWidget: {
      component: "OnnxNmsPlayground",
      props: { iouThreshold: 0.45, scoreThreshold: 0.25 },
      taskInstruction: "Geser nilai IoU Threshold dari 0.1 ke 0.9 untuk melihat bagaimana Non-Maximum Suppression menggabungkan kotak deteksi wajah yang bertumpuk.",
    },
    mdxBody: "# Menjalankan Model Visi Komputer Tanpa Server\nDengan mengekspor model ke format **ONNX** dan menjalankannya via `onnxruntime-web` (WASM/WebGL), aplikasi web dapat mendeteksi objek langsung di browser pengguna tanpa biaya GPU server.\n\n<OnnxNmsPlayground />\n\n<CodeExercise id=\"ex-ml-h4-iou-nms-python\" />\n<Exercise id=\"ex-ml-h5-onnx-export-blank\" />",
    srsCardsAuto: true,
    orderIndex: 1,
  },

  // LEVEL PROFESSIONAL / ARCHITECT — Track F10, Track G2/G5, Track J3/J6
  {
    id: "lesson-tg-adr-c4-tradeoffs",
    moduleId: "tg-g2",
    title: "Keputusan Arsitektur Terukur: Menulis ADR, C4 Model & Evaluasi Trade-off ATAM",
    level: "professional",
    estMinutes: 30,
    prereq: [],
    objectives: [
      "Mengevaluasi titik sensitivitas antara konsistensi, latensi, dan biaya operasional",
      "Menulis dokumen ADR yang tahan uji di hadapan Architecture Review Board",
    ],
    tags: ["architecture", "adr", "c4-model", "atam", "system-design"],
    interactiveWidget: {
      component: "AtamTradeoffMatrix",
      props: { scenario: "Sandbox Eksekusi Kode Multi-Bahasa" },
      taskInstruction: "Ubah bobot prioritas antara Keamanan Isolasi, Biaya Bulanan VPS, dan Latensi Cold-Start untuk melihat skor perbandingan Pyodide vs Judge0 vs MicroVM.",
    },
    mdxBody: "# Tidak Ada Arsitektur Sempurna, Hanya Ada Trade-Off yang Disengaja\nSeorang *Solution/System Architect* dinilai bukan dari seberapa rumit diagram yang ia buat, melainkan dari ketajaman **Architecture Decision Record (ADR)** dalam mendokumentasikan mengapa sebuah opsi dipilih beserta konsekuensi negatif yang siap ditanggung.\n\n<AtamTradeoffMatrix />\n\n<Exercise id=\"ex-arch-g5-mcq-atam-sandbox\" />\n<Exercise id=\"ex-uiux-j3-design-token-predict\" />",
    srsCardsAuto: true,
    orderIndex: 1,
  },
];

export const SEED_EXERCISES = [
  // 1. BEGINNER — PARSONS (Track 0)
  {
    id: "ex-t0-parsons-stack",
    lessonId: "lesson-t0-memory-stack-heap",
    level: "beginner",
    kind: "parsons",
    language: null,
    runner: null,
    promptMarkdown: "**Urutkan Siklus Hidup Eksekusi Memori:** Susun 4 peristiwa di bawah ini sesuai urutan yang terjadi di CPU dan RAM saat fungsi `buat_profil()` dipanggil hingga selesai!",
    starterCode: null,
    options: {
      blocks: [
        { id: "step-1", text: "Program memanggil fungsi `buat_profil(id=7)` dari dalam `main()`." },
        { id: "step-2", text: "Stack frame baru di-push untuk menyimpan parameter `id=7` dan pointer lokal `nama_ptr`." },
        { id: "step-3", text: "String dinamis dialokasikan di Heap, dan alamat memorinya disimpan ke `nama_ptr` di Stack." },
        { id: "step-4", text: "Fungsi selesai: buffer di Heap dibebaskan (drop) dan stack frame `buat_profil` di-pop dari Stack." },
      ],
      correctOrder: ["step-1", "step-2", "step-3", "step-4"],
    },
    tests: null,
    limits: null,
    interviewMeta: null,
    hints: [
      "Pemanggilan fungsi selalu menjadi pemicu pertama sebelum alokasi stack frame.",
      "Pointer di Stack harus disiapkan bersama stack frame untuk menyimpan alamat alokasi Heap.",
      "Saat keluar dari scope fungsi, pembersihan memori dan pop stack frame terjadi paling akhir.",
    ] as [string, string?, string?],
    solution: "step-1 -> step-2 -> step-3 -> step-4",
    explanation: "Stack frame dibuat saat fungsi dipanggil, memegang pointer ke data dinamis di Heap, dan dibersihkan secara deterministik begitu eksekusi fungsi berakhir.",
  },

  // 2. BEGINNER — MCQ (Track 0)
  {
    id: "ex-t0-mcq-pointer",
    lessonId: "lesson-t0-memory-stack-heap",
    level: "beginner",
    kind: "mcq",
    language: null,
    runner: null,
    promptMarkdown: "Mengapa membaca data berurutan di dalam array berdekatan (*contiguous memory*) jauh lebih cepat dibandingkan menelusuri *Linked List* yang node-nya tersebar acak di Heap?",
    starterCode: null,
    options: {
      choices: [
        { id: "a", text: "Karena CPU mengambil memori dalam blok Cache Line (mis. 64 byte sekaligus), sehingga elemen array berikutnya sudah tersedia di L1/L2 Cache." },
        { id: "b", text: "Karena Linked List tidak bisa disimpan di RAM dan harus selalu dibaca dari SSD." },
        { id: "c", text: "Karena variabel di dalam Linked List menggunakan bilangan float yang lambat dihitung." },
      ],
      correctChoiceId: "a",
    },
    tests: null,
    limits: null,
    interviewMeta: null,
    hints: [
      "Ingat konsep Spatial Locality pada hierarki cache CPU (L1/L2/L3).",
      "Saat CPU membaca 1 alamat memori, ia ikut memuat alamat di sebelahnya ke dalam Cache Line.",
    ] as [string, string?, string?],
    solution: "a",
    explanation: "Memori yang bersebelahan memanfaatkan *spatial locality* pada CPU Cache Line. Sebaliknya, melompat antar pointer di Linked List (*pointer chasing*) sering memicu *CPU Cache Miss*.",
  },

  // 3. BEGINNER — CODE PYTHON (Track A1 via Pyodide)
  {
    id: "ex-py-a1-dedup-audit",
    lessonId: "lesson-ta-python-collections",
    level: "beginner",
    kind: "code",
    language: "python",
    runner: "pyodide",
    promptMarkdown: "**Deduplikasi Log Event dengan Tetap Menjaga Urutan Kemunculan Pertama:**\nBuat fungsi `bersihkan_event(daftar_event: list[str]) -> list[str]` yang menghapus duplikat string maupun string kosong/spasi saja, tetapi **mempertahankan urutan kemunculan pertamanya** dalam kompleksitas waktu rata-rata $O(n)$.",
    starterCode: "def bersihkan_event(daftar_event: list[str]) -> list[str]:\n    # Gunakan set untuk melacak item yang sudah pernah dilihat dalam O(1)\n    pass\n",
    options: null,
    tests: {
      visible: [
        { name: "urutan_terjaga", input: "bersihkan_event(['login', 'klik', 'login', '  ', 'bayar', 'klik'])", expected: "['login', 'klik', 'bayar']" },
        { name: "kosong_semua", input: "bersihkan_event(['', '   '])", expected: "[]" },
      ],
      hidden: [
        { name: "data_10k", input: "len(bersihkan_event(['a', 'b'] * 5000))", expected: "2" },
      ],
    },
    limits: { timeMs: 2000, memoryMb: 64 },
    interviewMeta: null,
    hints: [
      "Bersihkan spasi dengan `.strip()` dan abaikan jika hasilnya string kosong `''`.",
      "Gunakan `sudah_ada = set()` karena pengecekan `item in sudah_ada` di set hanya memakan waktu O(1).",
      "Trik Python 3.7+: `dict.fromkeys()` juga menjaga urutan penyisipan kunci!",
    ] as [string, string?, string?],
    solution: "def bersihkan_event(daftar_event: list[str]) -> list[str]:\n    sudah_ada = set()\n    hasil = []\n    for ev in daftar_event:\n        bersih = ev.strip()\n        if bersih and bersih not in sudah_ada:\n            sudah_ada.add(bersih)\n            hasil.append(bersih)\n    return hasil",
    explanation: "Menggunakan `set` pendamping membuat pemeriksaan duplikat berjalan dalam $O(1)$ per elemen sehingga total waktu eksekusi menjadi $O(n)$, jauh lebih cepat daripada `if bersih not in hasil` pada `list` yang memakan $O(n^2)$.",
  },

  // 4. INTERMEDIATE — CODE RUST (Track B2 via Judge0)
  {
    id: "ex-rust-b2-zero-clone-log",
    lessonId: "lesson-tb-rust-ownership-borrow",
    level: "intermediate",
    kind: "code",
    language: "rust",
    runner: "judge0",
    promptMarkdown: "**Ekstraksi Kata Kunci Error Tanpa Alokasi Heap Baru (Zero-Allocation Slice):**\nPerbaiki fungsi `ambil_kode_error` agar meminjam slice string `&str` dan mengembalikan slice `&str` yang berisi teks di antara tanda kurung siku `[` dan `]` pertama, atau `None` jika tidak ditemukan. **Dilarang menggunakan `String` atau `.to_string()`!**",
    starterCode: "pub fn ambil_kode_error(baris_log: &str) -> Option<&str> {\n    // Cari posisi '[' dan ']' lalu kembalikan slice &baris_log[awal..akhir]\n    None\n}\n",
    options: null,
    tests: {
      visible: [
        { name: "log_valid", code: "assert_eq!(ambil_kode_error(\"2026-11-10 [ERR_DB_TIMEOUT] Koneksi putus\"), Some(\"ERR_DB_TIMEOUT\"));" },
        { name: "tanpa_kurung", code: "assert_eq!(ambil_kode_error(\"Info biasa tanpa kode\"), None);" },
      ],
      hidden: [
        { name: "kurung_terbalik", code: "assert_eq!(ambil_kode_error(\"]salah_urut[\"), None);" },
        { name: "kurung_kosong", code: "assert_eq!(ambil_kode_error(\"[]\"), Some(\"\"));" },
      ],
    },
    limits: { timeMs: 2500, memoryMb: 128 },
    interviewMeta: null,
    hints: [
      "Gunakan `baris_log.find('[')?` untuk mendapatkan indeks byte tanda kurung buka.",
      "Cari tanda `']'` pada sisa string setelah kurung buka agar tidak tertukar jika ada `']'` di depan.",
      "Kembalikan `Some(&baris_log[buka + 1 .. buka + 1 + tutup_relatif])`.",
    ] as [string, string?, string?],
    solution: "pub fn ambil_kode_error(baris_log: &str) -> Option<&str> {\n    let buka = baris_log.find('[')?;\n    let sisa = &baris_log[buka + 1..];\n    let tutup = sisa.find(']')?;\n    Some(&sisa[..tutup])\n}",
    explanation: "Dengan mengembalikan slice `&str` yang menunjuk langsung ke bagian memori `baris_log` asli (lifetime elision mengikat masa hidup output ke input `baris_log`), kita mencapai kecepatan tinggi dengan nol alokasi memori baru di Heap.",
  },

  // 5. INTERMEDIATE — UI-PREDICT JETPACK COMPOSE (Track C5)
  {
    id: "ex-kotlin-c5-ui-predict-modifier",
    lessonId: "lesson-tc-compose-state-modifier",
    level: "intermediate",
    kind: "ui-predict",
    language: "kotlin",
    runner: null,
    promptMarkdown: "**Prediksi Hasil Render & Perilaku Recomposition Jetpack Compose:**\nPerhatikan kode Composable berikut:\n```kotlin\n@Composable\nfun KartuKuota(terpakai: Int, batas: Int, onUpgradeClick: () -> Unit) {\n    Row(\n        modifier = Modifier\n            .fillMaxWidth()\n            .padding(16.dp)\n            .background(Color(0xFF1E293B), RoundedCornerShape(12.dp))\n            .clickable(onClick = onUpgradeClick)\n            .padding(16.dp)\n    ) {\n        Text(text = \"$terpakai / $batas eksekusi\", color = Color.White)\n    }\n}\n```\nManakah pernyataan yang **paling tepat** mengenai hasil render dan interaksi komponen di atas?",
    starterCode: null,
    options: {
      choices: [
        {
          id: "ui-opt-1",
          label: "Kartu memiliki jarak luar (margin) 16dp dari tepi layar, latar gelap ber-evolusi sudut 12dp, jarak dalam (padding) 16dp di sekeliling teks, dan seluruh area kotak gelap merespons klik.",
        },
        {
          id: "ui-opt-2",
          label: "Seluruh layar dari tepi ke tepi berwarna gelap karena fillMaxWidth() dipanggil paling awal.",
        },
        {
          id: "ui-opt-3",
          label: "Hanya teks di tengah yang bisa diklik karena terdapat padding(16.dp) setelah clickable().",
        },
      ],
      correctChoiceId: "ui-opt-1",
    },
    tests: null,
    limits: null,
    interviewMeta: null,
    hints: [
      "Perhatikan posisi `.clickable()` terhadap `.background()` dan `.padding()` kedua.",
      "`.padding(16.dp)` pertama menyusutkan ruang sebelum `.background()` digambar (menghasilkan margin luar).",
      "`.clickable()` dipasang sebelum `.padding(16.dp)` kedua, sehingga area sentuh mencakup seluruh kotak gelap termasuk padding dalamnya!",
    ] as [string, string?, string?],
    solution: "ui-opt-1",
    explanation: "Urutan `padding(luar) -> background -> clickable -> padding(dalam)` adalah pola idiomatik di Jetpack Compose agar kartu memiliki jarak luar, kotak latar penuh yang dapat diklik seluruhnya, serta ruang napas di dalam sekitar teks.",
  },

  // 6. INTERMEDIATE — CODE KOTLIN COROUTINES / KOANS (Track C3 via kotlin-playground)
  {
    id: "ex-kotlin-c3-flow-debounce",
    lessonId: "lesson-tc-compose-state-modifier",
    level: "intermediate",
    kind: "code",
    language: "kotlin",
    runner: "kotlin-playground",
    promptMarkdown: "**Transformasi State UI Pencarian Materi:**\nLengkapi fungsi murni `hitungStatusUi(query: String, hasil: List<String>, sedangMemuat: Boolean): String` menggunakan ekspresi `when` Kotlin yang mengembalikan:\n- `\"IDLE\"` jika `query.isBlank()`\n- `\"LOADING\"` jika `sedangMemuat` bernilai `true`\n- `\"EMPTY\"` jika `hasil.isEmpty()`\n- `\"FOUND:<jumlah>\"` jika terdapat hasil (misal `\"FOUND:3\"`)",
    starterCode: "fun hitungStatusUi(query: String, hasil: List<String>, sedangMemuat: Boolean): String = when {\n    // Lengkapi cabang kondisi di sini\n    else -> \"IDLE\"\n}\n",
    options: null,
    tests: {
      visible: [
        { name: "testIdle", code: "check(hitungStatusUi(\"   \", listOf(\"a\"), true) == \"IDLE\")" },
        { name: "testFound", code: "check(hitungStatusUi(\"rust\", listOf(\"B1\", \"B2\"), false) == \"FOUND:2\")" },
      ],
      hidden: [
        { name: "testEmpty", code: "check(hitungStatusUi(\"zig\", emptyList(), false) == \"EMPTY\")" },
      ],
    },
    limits: { timeMs: 3000, memoryMb: 128 },
    interviewMeta: null,
    hints: [
      "Periksa `query.isBlank()` pada urutan pertama agar spasi kosong langsung menghasilkan IDLE.",
      "Gunakan string template `\"FOUND:${hasil.size}\"` pada cabang terakhir.",
    ] as [string, string?, string?],
    solution: "fun hitungStatusUi(query: String, hasil: List<String>, sedangMemuat: Boolean): String = when {\n    query.isBlank() -> \"IDLE\"\n    sedangMemuat -> \"LOADING\"\n    hasil.isEmpty() -> \"EMPTY\"\n    else -> \"FOUND:${hasil.size}\"\n}",
    explanation: "Memodelkan resolusi state UI sebagai fungsi deterministik mempermudah pengujian unit tanpa harus menyalakan emulator Android.",
  },

  // 7. INTERMEDIATE — CODE DART / FLUTTER (Track D5 via DartPad)
  {
    id: "ex-dart-d5-responsive-card",
    lessonId: "lesson-td-flutter-constraints-box",
    level: "intermediate",
    kind: "code",
    language: "dart",
    runner: "dartpad",
    promptMarkdown: "**Kalkulator Kolom Grid Adaptif (Ponsel vs Tablet vs Desktop):**\nBuat fungsi `hitungJumlahKolom(double lebarLayar)` di Dart untuk menentukan jumlah kolom katalog track ArchForge:\n- Lebar `< 600`: kembalikan `1` kolom (Ponsel)\n- Lebar `>= 600` dan `< 1024`: kembalikan `2` kolom (Tablet)\n- Lebar `>= 1024`: kembalikan `(lebarLayar ~/ 340).clamp(3, 4)` (Desktop, antara 3 sampai 4 kolom)",
    starterCode: "int hitungJumlahKolom(double lebarLayar) {\n  // Implementasikan logika breakpoint responsif\n  return 1;\n}\n",
    options: null,
    tests: {
      visible: [
        { name: "ponsel_390px", code: "assert(hitungJumlahKolom(390) == 1);" },
        { name: "tablet_768px", code: "assert(hitungJumlahKolom(768) == 2);" },
        { name: "desktop_1440px", code: "assert(hitungJumlahKolom(1440) == 4);" },
      ],
      hidden: [
        { name: "desktop_kecil_1024px", code: "assert(hitungJumlahKolom(1024) == 3);" },
        { name: "ultrawide_2560px", code: "assert(hitungJumlahKolom(2560) == 4);" },
      ],
    },
    limits: { timeMs: 2500, memoryMb: 128 },
    interviewMeta: null,
    hints: [
      "Gunakan operator pembagian bilangan bulat `~/` di Dart dan metode `.clamp(3, 4)`.",
      "Pastikan batas `lebarLayar < 600` dan `lebarLayar < 1024` diperiksa berurutan.",
    ] as [string, string?, string?],
    solution: "int hitungJumlahKolom(double lebarLayar) {\n  if (lebarLayar < 600) return 1;\n  if (lebarLayar < 1024) return 2;\n  return (lebarLayar ~/ 340).clamp(3, 4);\n}",
    explanation: "Mengombinasikan *breakpoint* semantik (600dp dan 1024dp) dengan pembagian lebar kartu minimum (`~/ 340`) serta `.clamp(3, 4)` menjaga baris teks tetap nyaman dibaca pada monitor ultra-lebar.",
  },

  // 8. ADVANCED — LIVE CODING DSA RUST (Track E4 via Judge0 + Interview Mode)
  {
    id: "ex-dsa-e4-longest-stable-window-rust",
    lessonId: "lesson-te-dsa-sliding-window-monotonic",
    level: "advanced",
    kind: "code",
    language: "rust",
    runner: "judge0",
    promptMarkdown: "**Mode Live Coding — Rentang Trafik Stabil Terpanjang (Rust):**\nDiberikan slice `latensi_ms: &[u32]` dan `batas_anggaran: u64`, kembalikan panjang sub-slice beruntun terpanjang yang jumlah elemennya `<= batas_anggaran` dalam waktu $O(n)$ dan memori ekstra $O(1)$.",
    starterCode: "pub fn rentang_stabil_terpanjang(latensi_ms: &[u32], batas_anggaran: u64) -> usize {\n    0\n}\n",
    options: null,
    tests: {
      visible: [
        { name: "contoh_1", code: "assert_eq!(rentang_stabil_terpanjang(&[40, 20, 10, 30, 50, 10], 70), 3);" },
      ],
      hidden: [
        { name: "kosong", code: "assert_eq!(rentang_stabil_terpanjang(&[], 100), 0);" },
        { name: "skala_100k", code: "let v = vec![2u32; 100_000]; assert_eq!(rentang_stabil_terpanjang(&v, 10_000), 5_000);" },
      ],
    },
    limits: { timeMs: 1500, memoryMb: 64 },
    interviewMeta: {
      timeLimitMinutes: 25,
      clarificationPrompts: [
        "Apakah elemen di dalam `latensi_ms` dijamin non-negatif? (Ya, bertipe u32)",
        "Apakah total penjumlahan bisa melampaui batas `u32::MAX`? (Ya, gunakan akumulator `u64`)",
      ],
      thinkAloudPrompt: "Tuliskan pendekatan Two Pointers / Sliding Window Anda dan mengapa sifat non-negatif membuat kita tidak perlu memundurkan pointer kanan.",
      expectedBigO: {
        time: "O(n)",
        space: "O(1)",
        explanation: "Pointer kiri dan kanan masing-masing hanya bergerak maju paling banyak N langkah.",
      },
    },
    hints: [
      "Gunakan akumulator `let mut total: u64 = 0;` agar tidak mengalami integer overflow.",
      "Saat `total > batas_anggaran`, kurangi `latensi_ms[kiri]` dan geser `kiri += 1`.",
    ] as [string, string?, string?],
    solution: "pub fn rentang_stabil_terpanjang(latensi_ms: &[u32], batas_anggaran: u64) -> usize {\n    let mut kiri = 0usize;\n    let mut total = 0u64;\n    let mut terbaik = 0usize;\n    for kanan in 0..latensi_ms.len() {\n        total += latensi_ms[kanan] as u64;\n        while total > batas_anggaran {\n            total -= latensi_ms[kiri] as u64;\n            kiri += 1;\n        }\n        terbaik = terbaik.max(kanan - kiri + 1);\n    }\n    terbaik\n}",
    explanation: "Jendela ekspansi-kontraksi bekerja dalam waktu amortisasi konstan per elemen karena sifat monotonik dari bilangan non-negatif.",
  },

  // 9. ADVANCED — LIVE CODING DSA PYTHON (Track E4 via Pyodide)
  {
    id: "ex-dsa-e4-longest-stable-window-py",
    lessonId: "lesson-te-dsa-sliding-window-monotonic",
    level: "advanced",
    kind: "code",
    language: "python",
    runner: "pyodide",
    promptMarkdown: "**Mode Live Coding — Rentang Trafik Stabil Terpanjang (Python):**\nImplementasikan algoritma yang sama di Python: `rentang_stabil_terpanjang(latensi_ms: list[int], batas_anggaran: int) -> int` dalam $O(n)$ waktu dan $O(1)$ ruang.",
    starterCode: "def rentang_stabil_terpanjang(latensi_ms: list[int], batas_anggaran: int) -> int:\n    pass\n",
    options: null,
    tests: {
      visible: [
        { name: "contoh_1", input: "rentang_stabil_terpanjang([40, 20, 10, 30, 50, 10], 70)", expected: "3" },
      ],
      hidden: [
        { name: "melebihi_semua", input: "rentang_stabil_terpanjang([90, 80], 50)", expected: "0" },
      ],
    },
    limits: { timeMs: 2000, memoryMb: 64 },
    interviewMeta: {
      timeLimitMinutes: 20,
      clarificationPrompts: ["Bagaimana jika list kosong? Kembalikan 0."],
      thinkAloudPrompt: "Jelaskan invariant dari jendela `[kiri..kanan]` pada akhir setiap iterasi loop.",
      expectedBigO: {
        time: "O(n)",
        space: "O(1)",
        explanation: "Hanya menyimpan 3 variabel integer skalar.",
      },
    },
    hints: [
      "Siapkan `kiri = 0`, `total = 0`, dan `terbaik = 0`.",
      "Gunakan `for kanan, nilai in enumerate(latensi_ms):`.",
    ] as [string, string?, string?],
    solution: "def rentang_stabil_terpanjang(latensi_ms: list[int], batas_anggaran: int) -> int:\n    kiri = 0\n    total = 0\n    terbaik = 0\n    for kanan, nilai in enumerate(latensi_ms):\n        total += nilai\n        while total > batas_anggaran:\n            total -= latensi_ms[kiri]\n            kiri += 1\n        if kanan - kiri + 1 > terbaik:\n            terbaik = kanan - kiri + 1\n    return terbaik",
    explanation: "Menguasai pola soal yang sama di Python dan Rust melatih kemampuan menerjemahkan logika algoritmik melintasi bahasa bertipe dinamis dan statis.",
  },

  // 10. ADVANCED — COMPUTER VISION IoU & NMS (Track H4 via Pyodide)
  {
    id: "ex-ml-h4-iou-nms-python",
    lessonId: "lesson-th-cv-onnx-browser-pipeline",
    level: "advanced",
    kind: "code",
    language: "python",
    runner: "pyodide",
    promptMarkdown: "**Kalkulasi Intersection over Union (IoU) untuk Deteksi Objek YOLO:**\nBuat fungsi `hitung_iou(kotak_a: list[float], kotak_b: list[float]) -> float` di mana setiap kotak berformat `[x1, y1, x2, y2]`. Kembalikan rasio luas irisan dibagi luas gabungan, dibulatkan 4 angka di belakang koma.",
    starterCode: "def hitung_iou(kotak_a: list[float], kotak_b: list[float]) -> float:\n    # Format kotak: [x1, y1, x2, y2]\n    pass\n",
    options: null,
    tests: {
      visible: [
        { name: "identik", input: "hitung_iou([0, 0, 10, 10], [0, 0, 10, 10])", expected: "1.0" },
        { name: "tumpang_tindih_sebagian", input: "hitung_iou([0, 0, 10, 10], [5, 5, 15, 15])", expected: "0.1429" },
      ],
      hidden: [
        { name: "tidak_bersentuhan", input: "hitung_iou([0, 0, 5, 5], [10, 10, 20, 20])", expected: "0.0" },
      ],
    },
    limits: { timeMs: 2000, memoryMb: 64 },
    interviewMeta: null,
    hints: [
      "Koordinat irisan: `ix1 = max(a[0], b[0])`, `iy1 = max(a[1], b[1])`, `ix2 = min(a[2], b[2])`, `iy2 = min(a[3], b[3])`.",
      "Lebar dan tinggi irisan harus dibatasi minimal 0: `max(0.0, ix2 - ix1)`.",
      "Luas gabungan = `luas_a + luas_b - luas_irisan`.",
    ] as [string, string?, string?],
    solution: "def hitung_iou(kotak_a: list[float], kotak_b: list[float]) -> float:\n    ix1 = max(kotak_a[0], kotak_b[0])\n    iy1 = max(kotak_a[1], kotak_b[1])\n    ix2 = min(kotak_a[2], kotak_b[2])\n    iy2 = min(kotak_a[3], kotak_b[3])\n    irisan = max(0.0, ix2 - ix1) * max(0.0, iy2 - iy1)\n    luas_a = (kotak_a[2] - kotak_a[0]) * (kotak_a[3] - kotak_a[1])\n    luas_b = (kotak_b[2] - kotak_b[0]) * (kotak_b[3] - kotak_b[1])\n    gabungan = luas_a + luas_b - irisan\n    return round(irisan / gabungan, 4) if gabungan > 0 else 0.0",
    explanation: "IoU adalah fondasi utama algoritma Non-Maximum Suppression (NMS) saat memfilter ratusan kotak mentah hasil inferensi model YOLO di ONNX Runtime Web.",
  },

  // 11. ADVANCED — FILL-BLANK ONNX EXPORT (Track H5)
  {
    id: "ex-ml-h5-onnx-export-blank",
    lessonId: "lesson-th-cv-onnx-browser-pipeline",
    level: "advanced",
    kind: "fill-blank",
    language: "python",
    runner: null,
    promptMarkdown: "Lengkapi parameter ekspor PyTorch ke ONNX agar dimensi *batch* bersifat dinamis dan menggunakan versi operator 17:",
    starterCode: "torch.onnx.export(model, sample, 'model.onnx', ___BLANK_1___={'input': {0: 'batch'}}, ___BLANK_2___=17)",
    options: {
      blanks: [
        { id: "BLANK_1", accepted: ["dynamic_axes"] },
        { id: "BLANK_2", accepted: ["opset_version"] },
      ],
    },
    tests: null,
    limits: null,
    interviewMeta: null,
    hints: [
      "Parameter pertama mengatur sumbu tensor yang ukurannya bisa berubah saat runtime.",
      "Parameter kedua menentukan versi standar operator ONNX.",
    ] as [string, string?, string?],
    solution: "dynamic_axes, opset_version",
    explanation: "Menetapkan `dynamic_axes` dan `opset_version=17` memastikan model kompatibel dengan eksekutor WASM dan WebGL pada `onnxruntime-web`.",
  },

  // 12. PROFESSIONAL — ARCHITECT ATAM MCQ (Track G5)
  {
    id: "ex-arch-g5-mcq-atam-sandbox",
    lessonId: "lesson-tg-adr-c4-tradeoffs",
    level: "professional",
    kind: "mcq",
    language: null,
    runner: null,
    promptMarkdown: "**Studi Kasus Architecture Review Board (ARB):**\nAnda merancang fitur eksekusi kode Python & Rust untuk ArchForge. Mengaktifkan header `Cross-Origin-Opener-Policy: same-origin` dan `Cross-Origin-Embedder-Policy: require-corp` (COOP/COEP) memungkinkan penggunaan `SharedArrayBuffer` untuk menginterupsi loop tak hingga di Pyodide secara halus, **TETAPI** memblokir pemuatan iframe pihak ketiga (DartPad & Kotlin Playground) yang tidak mengirim header CORP.\n\nKeputusan arsitektur manakah yang paling tepat untuk rilis v1 sesuai prinsip mitigasi risiko?",
    starterCode: null,
    options: {
      choices: [
        {
          id: "atam-a",
          text: "Jangan aktifkan COOP/COEP secara global di v1 agar iframe DartPad dan Kotlin Playground tetap berjalan; tangani loop tak hingga Python di Pyodide dengan batas waktu 5 detik lalu panggil worker.terminate() dan buat Web Worker baru.",
        },
        {
          id: "atam-b",
          text: "Hapus seluruh track Flutter dan Kotlin dari aplikasi demi bisa memakai SharedArrayBuffer di Python.",
        },
        {
          id: "atam-c",
          text: "Jalankan kode Python pengguna langsung di proses utama Server Actions Next.js tanpa sandbox agar tidak butuh Web Worker.",
        },
      ],
      correctChoiceId: "atam-a",
    },
    tests: null,
    limits: null,
    interviewMeta: null,
    hints: [
      "Mengeksekusi kode pengguna di server Next.js melanggar aturan keamanan mutlak.",
      "Bandingkan dampak mematikan worker.terminate() vs merusak kompatibilitas seluruh iframe lintas-origin.",
    ] as [string, string?, string?],
    solution: "atam-a",
    explanation: "Sesuai keputusan di PRD §4.3 dan §4.6, menonaktifkan COOP/COEP dan menggunakan `worker.terminate()` setelah 5 detik adalah kompromi arsitektur terbaik yang menjaga keamanan sandbox sekaligus kompatibilitas iframe DartPad/Kotlin Playground.",
  },

  // 13. PROFESSIONAL — DESIGN SYSTEM TOKENS UI-PREDICT (Track J3)
  {
    id: "ex-uiux-j3-design-token-predict",
    lessonId: "lesson-tg-adr-c4-tradeoffs",
    level: "professional",
    kind: "ui-predict",
    language: null,
    runner: null,
    promptMarkdown: "**Audit Lokalisasi & Design Tokens Lintas Platform (Bahasa Indonesia vs Inggris):**\nSebuah tombol aksi utama bertuliskan `'Save'` (4 karakter) dirancang di Figma dengan lebar tetap (*fixed width*) `64px` dan tinggi `36px`. Ketika aplikasi dilokalisasi ke Bahasa Indonesia menjadi `'Simpan Perubahan'` (16 karakter) dan pengguna mengatur skala font aksesibilitas perangkat ke `130%`, apa yang terjadi di **Jetpack Compose** dan **Flutter**?",
    starterCode: null,
    options: {
      choices: [
        {
          id: "j3-opt-a",
          label: "Di Compose teks terpotong/melipat menjadi beberapa baris sempit, sedangkan di Flutter (jika di dalam Row tanpa Flexible) memicu kuning-hitam RenderFlex overflowed; solusinya ganti fixed width menjadi minWidth + horizontal padding serta tinggi minimum sentuh 48dp.",
        },
        {
          id: "j3-opt-b",
          label: "Kedua framework secara otomatis mengecilkan ukuran huruf hingga 6px agar muat di dalam 64px.",
        },
        {
          id: "j3-opt-c",
          label: "Bahasa Indonesia selalu lebih pendek daripada Bahasa Inggris sehingga tidak pernah terjadi overflow.",
        },
      ],
      correctChoiceId: "j3-opt-a",
    },
    tests: null,
    limits: null,
    interviewMeta: null,
    hints: [
      "Teks Bahasa Indonesia rata-rata 20%–35% lebih panjang dibandingkan teks UI Bahasa Inggris.",
      "Ingat standar aksesibilitas ukuran area sentuh minimum (48x48dp di Material 3 / 44x44pt di iOS HIG).",
    ] as [string, string?, string?],
    solution: "j3-opt-a",
    explanation: "Menggunakan lebar tetap (*fixed width*) pada tombol adalah anti-pattern utama dalam lokalisasi. Gunakan `Modifier.defaultMinSize(minWidth = 88.dp, minHeight = 48.dp).padding(horizontal = 16.dp)` di Compose atau `ConstrainedBox(constraints: BoxConstraints(minWidth: 88, minHeight: 48))` di Flutter.",
  },
];

