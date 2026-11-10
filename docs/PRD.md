# PRD — ArchForge (nama kerja)

Platform belajar interaktif: **coding dari nol → live coding & interview → system design → ML/Computer Vision**, dengan simulator arsitektur dan editor kode di browser.

| | |
|---|---|
| Versi | 0.2 (draft) |
| Tanggal | 10 Nov 2026 |
| Pemilik | Rado |
| Tahap | Belajar dulu (internal), dijual setelah MVP matang |
| Stack utama | Next.js 16, React 19.2, Tailwind CSS, TypeScript, **PostgreSQL di Neon** |
| Bahasa yang diajarkan | Python, Rust, Kotlin, Dart (+ Flutter) |

---

## 1. Visi & masalah

**Masalah.** Kursus coding dan system design kebanyakan berupa teks/video pasif. Latihan interview (live coding, system design) terpisah dari belajar dasar, sehingga pelajar tidak tahu jalur dari "nol" sampai "siap interview".

**Visi.** Satu app, satu jalur: konsep → latihan langsung di browser → simulasi → mode interview, dengan pengulangan terjadwal (spaced repetition) supaya tidak lupa.

**Tujuan ganda (penting untuk Rado):**
1. Produk: bisa dijual (langganan) setelah matang.
2. Pembelajaran: membangun app ini memaksa mendalami Rust, Kotlin, Python, Flutter/Dart, dan system design itu sendiri (dogfooding).

### Pembeda
1. **Simulator system design** (kanvas + simulasi beban + injeksi kegagalan), bukan diagram statis.
2. **Satu jalur** dari dasar sampai interview, bukan kumpulan kursus terpisah.
3. **Mode interview** dengan fase nyata (klarifikasi → rancang → kode → analisis).
4. **Bahasa Indonesia** sebagai bahasa utama (Inggris menyusul), istilah teknis tetap Inggris.

### Non-goals (v1)
- Bukan marketplace kursus pihak ketiga.
- Tidak membuat sandbox eksekusi kode sendiri (pakai Judge0/Pyodide).
- Tidak ada pelatihan model deep learning di browser (lihat §4.8).
- Tidak ada fitur sosial/komunitas penuh (forum, DM).
- Belum ada pembayaran (belajar dulu).

---

## 2. Pengguna

| Persona | Kebutuhan | Prioritas |
|---|---|---|
| **P1: Rado (pelajar mandiri, developer)** | Memperdalam Rust/Kotlin/Python/Flutter, naik ke level arsitek | Utama (v1) |
| P2: Mahasiswa/fresh graduate | Belajar dari nol, siap live coding & interview | Utama (setelah rilis) |
| P3: Developer junior-mid | Latihan system design dan interview | Sekunder |
| P4: Pengajar/bootcamp | Memakai jalur & soal untuk kelas | Nanti |

---

## 3. Ruang lingkup per tahap

| Tahap | Isi |
|---|---|
| **MVP (internal)** | Auth, katalog track, lesson MDX, editor + eksekusi Python (Pyodide) dan Rust (Judge0), progres, 1 track Python dasar + 1 track Rust dasar, SRS sederhana |
| **v0.5** | Simulator system design (1 skenario: URL shortener), kuis, bank soal DSA |
| **v1.0** | Kotlin & Dart/Flutter, **track UI (Compose, Flutter UI, desain UI/UX)**, **proyek per track + portofolio**, mode interview, 6+ skenario system design, track ML/CV dasar |
| **v1.5+** | Pembayaran, kelas/organisasi, AI reviewer, bahasa Inggris |

---

## 4. Hasil riset: keputusan teknologi

### 4.1 Next.js 16 (relevan untuk proyek ini)
- **Turbopack** stabil dan jadi bundler default untuk dev dan build.
- **Cache Components** + direktif `"use cache"`: caching eksplisit (opt-in). Dipakai untuk halaman katalog/lesson yang jarang berubah; data progres tetap dinamis.
- **`proxy.ts` menggantikan `middleware.ts`**: tempat gerbang auth/redirect.
- **React 19.2** (View Transitions, `useEffectEvent`, `<Activity/>`) dan **React Compiler** stabil (opsional, aktifkan setelah MVP stabil).
- **Next.js DevTools MCP**: berguna jika memakai AI coding assistant saat membangun.
- Catatan: tutorial pihak ketiga memakai Next 15 + OpenCV.js/ONNX Web dan melaporkan masalah kompatibilitas dengan React 19. **Uji paket CV di Next 16 sejak awal** (spike), jangan asumsikan jalan.

### 4.2 Editor kode

| Opsi | Kelebihan | Kekurangan | Keputusan |
|---|---|---|---|
| **CodeMirror 6** | Ringan, modular, ramah mobile, mudah dikustom | IntelliSense bawaan minim | **Default** |
| Monaco | Fitur setara VS Code, diff editor | Bundle berat (±2–5 MB), buruk di mobile, harus `dynamic import` dengan `ssr: false` | Opsional untuk "mode IDE" desktop |
| Sandpack | Playground JS/React siap pakai (berbasis CM6) | Hanya ekosistem JS | Tidak dipakai (bahasa kita bukan JS) |

Alasan: banyak pengguna Indonesia mengakses dari ponsel; CM6 lebih aman di mobile. Pasang bahasa via paket `@codemirror/lang-*` (python, rust) dan/atau `@codemirror/legacy-modes` untuk Kotlin/Dart; **verifikasi dukungan highlight Kotlin & Dart** saat implementasi.

### 4.3 Eksekusi kode per bahasa

| Bahasa | Strategi utama | Fallback / catatan |
|---|---|---|
| **Python** | **Pyodide** (CPython→WASM) di **Web Worker**. Tanpa server, aman karena sandbox browser. Unduhan awal ±12 MB (lazy load, cache). Paket lewat `loadPackage`/`micropip` | Satu interpreter per worker; hentikan loop tak hingga dengan `worker.terminate()` + buat worker baru. Interupsi halus lewat `SharedArrayBuffer` butuh header COOP/COEP (konflik dengan iframe pihak ketiga, lihat §4.6) |
| **Rust** | **Judge0 CE self-hosted** (server). Rust termasuk bahasa yang didukung | Opsi pembelajaran: kompilasi Rust→WASM di server, jalankan WASM di browser (pola yang dipakai Qvault). Playground publik `play.rust-lang.org` **tidak dijadikan dependensi produksi** (syarat penggunaan belum diverifikasi) |
| **Kotlin** | **`kotlin-playground`** (komponen resmi JetBrains; target java/js/canvas/junit, ada event `onTestPassed`) | Bisa mengarah ke server playground milik sendiri (`data-server`). Alternatif: Judge0 jika Kotlin tersedia di daftar bahasanya (cek) |
| **Dart / Flutter** | **DartPad embed** (iframe `embed-flutter.html`), konten dari gist/repo GitHub berisi `main.dart`, `solution.dart`, `test.dart`, `hint.txt`, `dartpad_metadata.yaml` | Dependensi layanan eksternal; untuk latihan murni Dart non-UI bisa lewat Judge0 jika didukung (cek) |
| **Jetpack Compose (UI)** | **Tidak dieksekusi inline di v1.** Lesson memakai potongan kode + pratinjau/tangkapan layar, kuis "prediksi UI", dan proyek lokal di Android Studio | Opsi lanjutan: Compose Multiplatform untuk Web (dilaporkan masuk **beta** pada rilis 1.9.0, Sep 2025; **status terkini belum diverifikasi**). Artikel praktisi menyebut membangun playground Compose web itu sulit dan lambat, jadi jangan dijanjikan di v1 |
| JS/TS (opsional) | Web Worker + sandboxed iframe | Tidak masuk v1 |

**Ditolak: WebContainers (StackBlitz).** Hanya runtime Node.js, dan penggunaan produksi komersial (for-profit) membutuhkan lisensi komersial berbayar.

### 4.4 Judge0 vs Piston (server eksekusi)
- **Judge0 CE**: 60+ bahasa, memakai `isolate` (namespace + cgroups), antrean (Redis) + worker. Harus berjalan di **Docker privileged**, sehingga **tidak bisa** di Vercel/serverless: butuh VPS terpisah. Perkiraan biaya self-host dari sumber: ±$15–20/bulan (4 vCPU/8 GB). Judge0 Cloud: mulai €27/bulan untuk 2.000 submission/hari.
- **Piston**: lebih sederhana (satu panggilan API), tapi dilaporkan lebih tipis di kedalaman keamanan dan bahasa.
- **Keputusan:** Judge0 CE untuk Rust (+ Kotlin/Dart jika ada), dibungkus **gateway Rust (Axum)** milik kita (auth, rate limit, antrean, cache hasil, log). Ini sekaligus latihan Rust yang nyata.
- ⚠️ **Verifikasi lisensi Judge0 CE** di repositori resmi: sumber riset saling bertentangan (GPL-3.0 vs MIT).
- ⚠️ Judge0 pernah punya kerentanan sandbox (sudah ditambal). Wajib: update rutin, jaringan keluar dimatikan, batas CPU/memori/waktu, VPS terisolasi dari database utama.

### 4.5 Konten (silabus & materi)
- **MDX** di repo (Git sebagai sumber kebenaran): `@next/mdx` atau **Velite** (validasi frontmatter bertipe) / **Fumadocs** (kerangka docs untuk Next.js, RSC).
- **Shiki** (via `rehype-pretty-code`) untuk highlight saat build, tanpa JS klien.
- Komponen MDX khusus: `<Quiz/>`, `<CodeExercise/>`, `<Playground/>`, `<Diagram/>`, `<SDScenario/>`, `<Callout/>`.
- Rekomendasi: **Velite + rehype-pretty-code** (ringan, kontrol penuh). Fumadocs dipertimbangkan jika ingin navigasi docs jadi.
- **Hak cipta:** referensi resmi (Rust Book, Rustlings, Rust by Example, Kotlin Koans, Dart language tour, Flutter docs) dipakai sebagai **acuan urutan topik**. Tulis materi dan soal sendiri; jika mengadaptasi, **cek lisensi tiap sumber** dan cantumkan atribusi.

### 4.6 Kanvas system design
- **React Flow (`@xyflow/react`, MIT)**: node/edge kustom, drag-connect, minimap, pan/zoom. Cocok untuk komponen (LB, cache, DB, queue).
- **Engine simulasi** ditulis di **Rust → WASM** (`wasm-pack` + `wasm-bindgen`), dijalankan di **Web Worker**, dipanggil dari TS. Hasil: metrik per node dan per detik untuk grafik.
- Peringatan header: jika mengaktifkan COOP/COEP (untuk `SharedArrayBuffer`), iframe lintas-origin (DartPad, Kotlin Playground) perlu mendukung CORP/COEP atau akan diblokir. **Keputusan v1: jangan aktifkan COOP/COEP**; pakai `terminate()` untuk Python.

### 4.7 Spaced repetition
- **ts-fsrs** (MIT): implementasi FSRS (v6) dalam TypeScript, ada contoh Next.js + Prisma. Jadwalkan kartu dari konsep/soal yang sering salah. FSRS dilaporkan jauh lebih akurat daripada SM-2 pada dataset publik.

### 4.8 ML & Computer Vision di browser
- **ONNX Runtime Web** (WASM, WebGL) untuk inferensi model; **OpenCV.js** untuk pra-pemrosesan gambar; TensorFlow.js sebagai alternatif.
- Pola yang terbukti: latih di Python → ekspor ONNX → jalankan di browser (contoh YOLO).
- **Pyodide** untuk lesson Python ilmiah (numpy/pandas/matplotlib/scikit-learn): **verifikasi daftar paket Pyodide versi terbaru** saat implementasi; PyTorch/TensorFlow penuh **tidak** diharapkan jalan di Pyodide.
- Batasan jujur: pelatihan deep learning tidak dilakukan di app. Lesson menyediakan notebook (.ipynb) untuk dijalankan lokal (GPU GTX 1650 Ti milik Rado cukup untuk model kecil) atau Colab, lalu hasil modelnya (ONNX) di-load ke app untuk demo.

### 4.9 Database: Neon (PostgreSQL serverless)
- **Keputusan:** database memakai **Neon** (Postgres serverless terkelola). Skema di §10 adalah Postgres standar, jadi tetap portabel jika nanti pindah penyedia.
- **Alasan:** Postgres murni; compute dipisah dari storage dan bisa *scale-to-zero* (hemat saat belajar); cocok dengan Next.js di Vercel; **branching database** untuk preview/PR dan uji migrasi; tersedia tier gratis untuk fase belajar (**verifikasi batas terkini**).
- **Konsekuensi: Neon hanya database.** Tidak ada Auth, Storage, atau Realtime bawaan seperti Supabase. Dampaknya:
  - **Auth:** pakai **Better Auth** (berjalan di Next.js, data pengguna disimpan di Neon lewat adapter Drizzle). Alternatif: **Neon Auth** (berbasis Better Auth, dilaporkan masih beta; **cek statusnya**). Login email + Google tetap didukung (FR-01).
  - **Otorisasi:** tidak ada `auth.uid()` bawaan untuk RLS. Akses data dijaga **di server** (setiap query difilter `user_id` dari sesi). RLS Postgres opsional, bukan syarat v1.
  - **File (tangkapan layar proyek UI, FR-51):** kolom `screenshots` hanya menyimpan URL. Di MVP cukup tautan eksternal; jika perlu unggah, tambahkan object storage terpisah (mis. Cloudflare R2 / Vercel Blob).
- **Koneksi:** `@neondatabase/serverless` (HTTP) untuk query sederhana di serverless/edge; untuk transaksi interaktif pakai driver WebSocket/Pool atau node-postgres dengan *pooled connection string*. Migrasi `drizzle-kit` memakai koneksi langsung (non-pooled). **Verifikasi** pola ini di dokumentasi Neon saat setup.
- **Cold start:** setelah idle, query pertama bisa lebih lambat karena compute bangun dari tidur. Dapat diterima di fase belajar; saat produksi pertimbangkan menonaktifkan *scale-to-zero*.
- **Keamanan:** `DATABASE_URL` hanya ada di server Next.js (env var), tidak di klien dan **tidak di VPS sandbox/gateway**. Gateway Rust tidak butuh akses DB; hasil eksekusi disimpan oleh server Next.js.

---

## 5. Arsitektur sistem

```
┌────────────────────────── Browser ───────────────────────────┐
│ Next.js 16 (App Router, RSC) + Tailwind + shadcn/ui          │
│  ├─ Lesson (MDX)   ├─ Editor (CodeMirror 6)                  │
│  ├─ Web Worker: Pyodide (Python)                             │
│  ├─ Web Worker: sim-engine (Rust→WASM)  ← kanvas React Flow  │
│  ├─ iframe: DartPad / Kotlin Playground                      │
│  └─ ONNX Runtime Web + OpenCV.js (lesson CV)                 │
└───────────────┬──────────────────────────────────────────────┘
                │ HTTPS (Route Handlers / Server Actions)
┌───────────────▼──────────────┐      ┌──────────────────────────┐
│ Next.js server (Vercel/VPS)  │      │ VPS terpisah (sandbox)   │
│ auth, progres, SRS, konten   │─────▶│ Gateway Rust (Axum)      │
│ proxy.ts (gerbang auth)      │      │  └─ Judge0 CE (Docker)   │
└───────────────┬──────────────┘      └──────────────────────────┘
                │
        PostgreSQL (Neon)
```

### Stack yang direkomendasikan

| Lapisan | Pilihan | Catatan |
|---|---|---|
| UI | Next.js 16, React 19.2, TypeScript, Tailwind CSS, shadcn/ui (Radix) | |
| State | Zustand (klien), TanStack Query (data server) | |
| Validasi | Zod | skema soal, API |
| Database | **Neon** (PostgreSQL serverless) | §4.9 |
| Auth | Better Auth (alternatif: Neon Auth, beta) | menggantikan Supabase Auth |
| ORM / driver | Drizzle + `@neondatabase/serverless` | migrasi dengan `drizzle-kit` |
| Konten | MDX + Velite + Shiki | di repo |
| Editor | CodeMirror 6 | |
| Kanvas | `@xyflow/react` | |
| Eksekusi | Pyodide, Judge0 CE, kotlin-playground, DartPad | §4.3 |
| Engine simulasi | Rust (`wasm-pack`, `wasm-bindgen`) | |
| Gateway eksekusi | Rust (Axum), Redis (rate limit/antrean) | |
| SRS | `ts-fsrs` | |
| CV/ML | `onnxruntime-web`, `opencv.js` | uji di Next 16 |
| Test | Vitest, Playwright | |
| Observability | Sentry + log terstruktur | |

### Struktur repo (monorepo, pnpm + Turborepo)

```
archforge/
├─ apps/
│  ├─ web/                  # Next.js 16
│  └─ exec-gateway/         # Rust (Axum) → Judge0
├─ packages/
│  ├─ sim-engine/           # Rust → WASM
│  ├─ content/              # MDX: tracks/modules/lessons
│  ├─ ui/                   # komponen bersama
│  └─ schemas/              # Zod: exercise, scenario
└─ infra/                   # docker-compose Judge0, IaC
```

### Alur eksekusi kode
1. Klien membaca `exercise.runner` (`pyodide` | `judge0` | `kotlin-playground` | `dartpad`).
2. **Pyodide:** kirim kode + tes ke worker → hasil `{passed, results[], stdout, stderr, timeMs}` → batas waktu 5 dtk, lewat itu worker di-`terminate()`.
3. **Judge0:** `POST /api/run` (Next) → verifikasi sesi + rate limit → gateway Rust → Judge0 → hasil di-cache per hash(kode+tes).
4. Tes tersembunyi dievaluasi **di server** untuk jalur Judge0 (agar tidak bocor ke klien); untuk Pyodide, tes tersembunyi tetap terlihat di klien (kompromi; cukup untuk belajar, bukan untuk ujian bernilai tinggi).
5. Pemindaian pola terlarang sebelum eksekusi (defense in depth, bukan satu-satunya pertahanan).

---

## 6. Kebutuhan fungsional

Prioritas: **P0** = MVP, **P1** = v0.5–v1.0, **P2** = nanti.

### 6.1 Akun & progres
| ID | Kebutuhan | P |
|---|---|---|
| FR-01 | Daftar/masuk (email + Google) via Better Auth (data di Neon) | P0 |
| FR-02 | Progres per lesson/modul/track, streak harian | P0 |
| FR-03 | Dashboard: lanjutkan belajar, kelemahan per topik | P1 |

### 6.2 Belajar
| ID | Kebutuhan | P |
|---|---|---|
| FR-10 | Katalog track → modul → lesson (MDX) | P0 |
| FR-11 | Lesson memuat teks, visual interaktif, kuis, latihan kode | P0 |
| FR-12 | Visualisasi interaktif (mis. memori/stack-heap, pointer, ownership Rust, array/hash) | P1 |
| FR-13 | Hint bertingkat (3 level) + tampilkan solusi setelah N percobaan | P0 |
| FR-14 | Pencarian materi | P1 |

### 6.3 Editor & eksekusi
| ID | Kebutuhan | P |
|---|---|---|
| FR-20 | Editor CM6: highlight, auto-indent, Ctrl/Cmd+Enter untuk run | P0 |
| FR-21 | Python via Pyodide di worker (stdout/stderr, tes visible+hidden) | P0 |
| FR-22 | Rust via gateway+Judge0 (compile error ditampilkan rapi) | P0 |
| FR-23 | Kotlin via kotlin-playground | P1 |
| FR-24 | Dart/Flutter via DartPad embed | P1 |
| FR-25 | Batas waktu & memori, pesan error ramah pemula | P0 |
| FR-26 | Input stdin untuk latihan | P1 |

### 6.4 System design
| ID | Kebutuhan | P |
|---|---|---|
| FR-30 | Kanvas drag-and-drop komponen (§7) | P1 |
| FR-31 | Simulasi beban (RPS) + metrik: latensi p50/p95, error rate, utilisasi, biaya relatif | P1 |
| FR-32 | Injeksi kegagalan: matikan node, naikkan latensi, lonjakan traffic ×10 | P1 |
| FR-33 | Penilaian otomatis berbasis aturan + rubrik (SPOF, caching, sharding, trade-off) | P1 |
| FR-34 | Catatan keputusan (mini-ADR) wajib per skenario: pengguna menulis alasan | P1 |
| FR-35 | Skenario terkurasi (≥6 pada v1.0) | P1 |

### 6.5 Interview & SRS
| ID | Kebutuhan | P |
|---|---|---|
| FR-40 | Kartu SRS otomatis dari kuis/soal yang salah (FSRS) | P0 |
| FR-41 | Sesi review harian | P0 |
| FR-42 | Mode interview: timer, soal acak per level, fase terstruktur | P1 |
| FR-43 | Fase "think aloud": pengguna menulis pendekatan sebelum editor terbuka | P1 |
| FR-44 | Analisis kompleksitas (pilih Big-O + justifikasi) | P1 |
| FR-45 | Riwayat sesi + radar kelemahan | P1 |
| FR-46 | Reviewer AI opsional untuk esai/desain (butuh anggaran & guardrail) | P2 |

### 6.6 Proyek & UI
| ID | Kebutuhan | P |
|---|---|---|
| FR-50 | Halaman proyek per track: brief, acceptance criteria, starter repo, tes otomatis, rubrik | P0 (untuk track Python & Rust), P1 (lainnya) |
| FR-51 | Pengumpulan proyek via tautan repo GitHub + tangkapan layar/demo untuk proyek UI | P1 |
| FR-52 | Template CI (GitHub Actions) per proyek untuk menjalankan tes | P1 |
| FR-53 | Checklist rubrik mandiri + status (belum/berjalan/selesai) | P1 |
| FR-54 | Halaman portofolio pengguna dari proyek yang selesai | P1 |
| FR-55 | Lesson UI Flutter dengan DartPad (kode + UI hidup berdampingan) | P1 |
| FR-56 | Tantangan "baca & prediksi UI" untuk Compose (kuis dengan gambar hasil render) | P1 |
| FR-57 | Perpustakaan referensi desain: token, pola layout, contoh sebelum/sesudah | P1 |
| FR-58 | Proyek "satu desain → dua implementasi" (Compose vs Flutter) dengan template laporan perbandingan | P2 |

---

## 7. Spesifikasi simulator system design

**Komponen (node):** Client, DNS, CDN, Load Balancer, API Server, Cache (hit ratio, TTL), DB Primary, DB Replica, Queue, Worker, Object Storage, Rate Limiter, API Gateway.

**Parameter node:** kapasitas (RPS), latensi dasar (ms), peluang gagal, jumlah instans, biaya relatif.

**Model simulasi (v1, sengaja sederhana):**
- Waktu diskrit per tick (1 dtk simulasi). Trafik masuk dari profil (konstan, naik bertahap, lonjakan).
- Setiap node: antrean M/M/c disederhanakan; jika beban > kapasitas, latensi naik dan request ditolak (error rate).
- Cache: hit ratio mengurangi beban ke hilir; *cold start* dan *stampede* disimulasikan pada skenario tertentu.
- Replikasi: model konsistensi sederhana (sinkron/asinkron) memengaruhi latensi tulis dan data basi.
- Output deterministik dengan seed (reproduksibel, mudah dites).

**Penilaian (rubrik):** kebutuhan fungsional terpenuhi, skalabilitas pada target RPS, tidak ada SPOF di jalur kritis, strategi caching/partisi tepat, penanganan kegagalan, biaya wajar, kualitas alasan di mini-ADR.

**Skenario terkurasi (urutan kesulitan):**
1. URL shortener
2. Rate limiter
3. Chat 1-ke-1 (WebSocket)
4. News feed (fan-out on write vs read)
5. File storage/sinkronisasi (mirip Dropbox)
6. Tiket konser (konkurensi, antrean, *double booking*)
7. Sistem pembayaran (idempotensi, konsistensi)
8. Video streaming / pipeline clip (relevan dengan proyek clipper Rado)

---

## 8. Silabus (kurikulum)

Format tiap modul: **tujuan → konsep → latihan → mini-proyek → kuis (masuk SRS)**. Estimasi per lesson 15–30 menit.

### Track 0 — Fondasi komputasi (semua pengguna)
1. Cara komputer menjalankan program: CPU, memori, stack vs heap, proses vs thread
2. Representasi data: bit/byte, integer, float, Unicode
3. Logika & pemecahan masalah: pseudocode, alur kontrol, debugging dengan *rubber duck*
4. Terminal, Git, struktur file, membaca error
5. Jaringan dasar: IP, DNS, TCP/UDP, HTTP/HTTPS, REST, WebSocket

### Track A — Python (dari nol → data/ML)
- **A1 Dasar:** variabel, tipe, kondisi, loop, fungsi, struktur data bawaan (list/dict/set/tuple)
- **A2 Menengah:** OOP, modul/paket, exception, file I/O, comprehension, generator, decorator, *type hints*
- **A3 Praktik:** testing (`pytest` konsep), virtualenv/pyproject, async dasar, regex, JSON/HTTP
- **A4 Ilmiah:** numpy (array, broadcasting), pandas, matplotlib (di Pyodide)
- Mini-proyek: CLI todo, scraper sederhana, analisis dataset kecil

### Track B — Rust (dari nol → sistem)
Urutan mengacu ke alur Rust Book/Rustlings/Rust by Example (materi ditulis sendiri):
- **B1 Dasar:** Cargo, variabel & mutabilitas, tipe, fungsi, kontrol alur
- **B2 Inti Rust:** **ownership, borrowing, lifetimes**, slice, struct/enum, pattern matching, `Option`/`Result`
- **B3 Abstraksi:** trait, generics, closure, iterator, koleksi, modul/crate
- **B4 Keandalan:** error handling (`thiserror`/`anyhow` konsep), testing, dokumentasi
- **B5 Konkurensi:** thread, channel, `Arc/Mutex`, `async/await` (Tokio), *Send/Sync*
- **B6 Sistem & web:** Axum, serde, sqlx, WASM (`wasm-bindgen`), FFI dasar, `unsafe` secara bertanggung jawab
- Mini-proyek: CLI `grep` mini, key-value store, HTTP server, **modul engine simulasi app ini**

### Track C — Kotlin
- **C1 Dasar:** `val/var`, tipe, null safety, fungsi, kontrol alur
- **C2 OOP & fungsional:** class, data class, sealed class, interface, extension, lambda, koleksi & sequence
- **C3 Lanjut:** generics, delegation, DSL, **coroutines & Flow**, structured concurrency
- **C4 Praktik:** testing (JUnit), Gradle dasar, Ktor (server), Kotlin Multiplatform (pengantar), jembatan ke Android/Flutter (platform channel)
- **C5 UI dengan Jetpack Compose:** pola deklaratif (UI = fungsi dari state), composable & modifier, layout (Row/Column/Box/LazyColumn), **state & state hoisting**, `remember`/`rememberSaveable`, ViewModel + `StateFlow`, Material 3 (theming, color scheme, typography), navigasi, animasi, **recomposition & performa**, testing UI Compose, aksesibilitas (semantics, ukuran sentuh)
- Proyek: lihat §8.1 (Ktor API, app Compose, modul native untuk Flutter)
- Catatan eksekusi: Compose **tidak** berjalan di `kotlin-playground`. Lesson C5 memakai potongan kode + tangkapan layar/pratinjau, tantangan "baca & prediksi UI", dan proyek yang dikerjakan lokal di Android Studio (lihat §4.3 dan §15)

### Track D — Dart & Flutter
- **D1 Dart:** sintaks, null safety, class/mixin, koleksi, async (`Future`, `Stream`), isolate
- **D2 Flutter inti:** widget tree, layout, state (setState, Provider/Riverpod/Bloc), navigasi
- **D3 Praktik:** HTTP/JSON, penyimpanan lokal, testing (unit/widget/integration), performa (build/render)
- **D4 Arsitektur app:** *clean architecture*, repository pattern, DI, *platform channel* (Kotlin/Rust via FFI)
- **D5 Flutter UI mendalam:** sistem layout (constraints go down, sizes go up), `Row/Column/Stack/Flex`, **Sliver & scroll efek**, `CustomPainter`/Canvas, **animasi** (implicit, explicit, Hero, `AnimationController`), tema Material 3 & `ThemeExtension`, **UI responsif/adaptif** (ponsel, tablet, desktop, web), aksesibilitas (`Semantics`, skala teks), *golden test*, profiling jank (DevTools)
- **D6 Rancang UI (design-to-code):** komponen reusable & *design tokens* di Flutter, rakit ulang desain Figma menjadi layar nyata, state UI (loading/empty/error), *micro-interaction*
- Proyek: lihat §8.1 (app catatan offline-first, toolkit komponen UI, FFI ke Rust)
- Eksekusi: lesson UI Flutter berjalan langsung di **DartPad embed** (kode di kiri, UI hidup di kanan)

### Track E — Struktur data, algoritma & live coding
- **E1 Dasar kompleksitas:** Big-O (waktu/ruang), amortized
- **E2 Struktur data:** array, linked list, stack/queue/deque, hash table, heap, tree/BST, trie, graph, union-find
- **E3 Teknik:** two pointers, sliding window, binary search, rekursi/backtracking, DP, greedy, BFS/DFS, topological sort, Dijkstra
- **E4 Pola soal:** peta ±15 pola umum → soal terkurasi per pola, tiap soal tersedia di Python & Rust (Kotlin menyusul)
- **E5 Teknik live coding:** klarifikasi soal, contoh & edge case, brute force → optimasi, verbalisasi, uji manual, analisis kompleksitas
- Soal ditulis sendiri/original; **bukan menyalin** soal platform lain.

### Track F — System design & arsitektur IT
- **F1 Fondasi:** skala vertikal/horizontal, latensi vs throughput, *back-of-envelope estimation*, SLA/SLO/SLI
- **F2 Blok bangunan:** DNS, CDN, load balancer (algoritma, health check), reverse proxy, API gateway, rate limiting
- **F3 Data:** SQL vs NoSQL, indexing, ACID, **replikasi, sharding/partisi, consistent hashing**, transaksi, *outbox pattern*
- **F4 Caching:** pola (cache-aside, write-through/back), invalidasi, eviction, *cache stampede*
- **F5 Sistem terdistribusi:** **CAP & PACELC**, model konsistensi, konsensus (Paxos/Raft secara konsep), *idempotency*, *exactly-once vs at-least-once*, jam & urutan (logical clock)
- **F6 Komunikasi:** REST vs gRPC vs GraphQL, long-polling/WebSocket/SSE, message queue & event streaming (Kafka-style), *pub/sub*
- **F7 Keandalan:** circuit breaker, retry+backoff+jitter, bulkhead, *graceful degradation*, DR (RPO/RTO), chaos testing
- **F8 Observability & operasi:** log/metrik/trace, alerting, on-call, SLO budget
- **F9 Keamanan:** authN/authZ, OAuth2/OIDC, JWT vs sesi, enkripsi, OWASP Top 10, *threat modeling* (STRIDE)
- **F10 Kasus lengkap:** 8 skenario di §7, masing-masing dengan alur wawancara

### Track G — Peran & praktik arsitek (konsep industri)
- **G1 Peran:** *Enterprise Architect* (strategi bisnis-IT, portofolio), *Solution Architect* (solusi per proyek, vendor/cloud), *System/Software Architect* (struktur teknis & kualitas); jalur karier & kompetensi
- **G2 Pemodelan & dokumentasi:** **C4 model**, UML ringkas, **ADR (Architecture Decision Record)**, RFC/design doc, arc42
- **G3 Gaya arsitektur:** monolit modular vs microservices, *event-driven*, CQRS/Event Sourcing, hexagonal/clean architecture, serverless, *data mesh* (pengantar)
- **G4 Desain domain:** **DDD** (bounded context, aggregate), API design & versioning, kontrak (OpenAPI)
- **G5 Atribut kualitas (NFR):** performa, skalabilitas, ketersediaan, keamanan, *maintainability*, biaya; analisis *trade-off* (mis. ATAM secara ringkas)
- **G6 Rekayasa platform:** CI/CD, *infrastructure as code*, container & Kubernetes (pengantar), 12-factor, *feature flags*, strategi rilis (blue/green, canary)
- **G7 Cloud:** model tanggung jawab bersama, region/AZ, FinOps dasar
- **G8 Kepemimpinan teknis:** komunikasi dengan pemangku kepentingan, utang teknis, estimasi, review desain
- Latihan: menulis ADR, menggambar C4 untuk proyek nyata (mis. Mari Ban)

### Track H — Machine Learning & Computer Vision
- **H1 Matematika terapan:** vektor/matriks, probabilitas, statistik dasar, gradien
- **H2 ML klasik:** regresi, klasifikasi, pohon/ensemble, *overfitting*, validasi silang, metrik (precision/recall/F1/ROC)
- **H3 Deep learning:** neuron & backprop (konsep), CNN, transfer learning, augmentasi
- **H4 Computer Vision:** representasi gambar, filter/kernel, tepi/kontur (OpenCV), klasifikasi, deteksi objek (YOLO), segmentasi, OCR
- **H5 MLOps:** ekspor **ONNX**, kuantisasi, inferensi di browser/mobile, versi model, pemantauan *drift*
- Interaktif di browser: lesson numpy (Pyodide), demo CV (OpenCV.js + ONNX Runtime Web); pelatihan lewat notebook lokal/Colab

### Track I — Persiapan interview
- Alur interview coding & system design, rubrik penilaian umum
- Behavioral (STAR), negosiasi, komunikasi trade-off
- Simulasi penuh berwaktu (45–60 menit) dengan umpan balik terstruktur

### Track J — Desain UI/UX & rancang antarmuka (lintas bahasa)
- **J1 Prinsip visual:** hierarki, spasi & grid 4/8 pt, tipografi, warna & kontras (WCAG), ikon, elevasi
- **J2 Desain interaksi:** alur pengguna, navigasi, umpan balik, state kosong/error/loading, *microcopy*
- **J3 Sistem desain:** *design tokens*, komponen & varian, dokumentasi komponen, konsistensi lintas platform
- **J4 Rancang di Figma:** *auto layout*, komponen, prototipe, *handoff* ke developer
- **J5 Platform:** Material 3 vs HIG iOS, adaptif ponsel/tablet/desktop, mode gelap, lokalisasi (mis. panjang teks Indonesia vs Inggris)
- **J6 Evaluasi:** uji kegunaan sederhana (5 pengguna), heuristik Nielsen, audit aksesibilitas
- Latihan: kritik UI app nyata, rancang ulang satu layar, lalu implementasi di **Compose (C5)** dan **Flutter (D5/D6)** dari desain yang sama untuk membandingkan pendekatan

### 8.1 Proyek per track (portofolio)

Setiap track punya **3 proyek bertingkat** dan satu **capstone**. Proyek dikerjakan lokal/di repo pengguna; app menyediakan **brief, kriteria penerimaan (acceptance criteria), starter repo, tes otomatis, dan rubrik**. Hasil dikumpulkan lewat tautan repo GitHub (+ tangkapan layar/demo untuk UI).

| Track | Proyek 1 (dasar) | Proyek 2 (menengah) | Proyek 3 / Capstone |
|---|---|---|---|
| **A Python** | CLI todo + penyimpanan JSON | Scraper + analisis data (pandas) dengan grafik | Mini-pipeline data/ML: bersihkan data → latih model sederhana → laporan |
| **B Rust** | CLI `grep` mini | Key-value store (persistensi, testing) | HTTP service (Axum + DB) **atau** engine simulasi untuk simulator app ini |
| **C Kotlin** | Aplikasi konsol: manajer tugas (OOP, koleksi) | REST API Ktor + database | **App Android Compose**: daftar + detail + tema Material 3 + state hoisting + ViewModel |
| **D Dart/Flutter** | App catatan offline-first (state + penyimpanan lokal) | **Toolkit komponen UI** (kartu, form, bottom sheet, chart kustom) + animasi | App lengkap: arsitektur bersih, responsif ponsel/tablet/web, FFI ke pustaka Rust |
| **E DSA** | Mini-library struktur data (stack/queue/hash map) | Visualizer algoritma (sort/graf) | 30 soal pola + catatan kompleksitas (portofolio) |
| **F System design** | 3 dokumen desain (URL shortener, rate limiter, chat) | Simulasi + analisis bottleneck | Desain lengkap sistem pilihan: C4 + ADR + estimasi kapasitas + presentasi 15 menit |
| **G Arsitek** | 5 ADR untuk proyek nyata (mis. Mari Ban) | Diagram C4 + atribut kualitas | Dokumen arsitektur (arc42 ringkas) untuk satu proyek nyata |
| **H ML/CV** | Klasifikasi gambar sederhana | Deteksi objek → ekspor ONNX | Demo CV berjalan di browser (ONNX Runtime Web + OpenCV.js) |
| **J UI/UX** | Kritik + rancang ulang satu layar | Design system kecil (token + 8 komponen) di Figma | **Satu desain → dua implementasi** (Compose + Flutter), lalu laporan perbandingan |

**Proyek lintas bahasa (capstone gabungan):** satu produk kecil (mis. app pencatat/belajar) dengan **backend Rust** (B), **klien Android Compose** (C5), **klien Flutter** (D), dan desain di Figma (J). Tujuannya melatih konsistensi kontrak API dan perbandingan UI antar framework.

**Alur proyek di app:** brief → starter repo → kerjakan lokal → jalankan tes otomatis (CI contoh, GitHub Actions template) → kirim tautan → checklist rubrik mandiri → (opsional, P2) review AI/rekan. Proyek yang selesai masuk **halaman portofolio** pengguna.

### Jalur belajar (contoh)
| Tujuan | Urutan |
|---|---|
| Pemula total → interview coding | 0 → A → E → I |
| Developer → arsitek | F → G → (B/C/D sesuai kebutuhan) |
| Developer → mobile/UI | D1–D2 → J1–J3 → D5–D6 → C1–C3 → C5 → J4 |
| Rado (jalur pribadi) | B → F → H4/H5 → C (+C5) → D5/D6 + J → G |

---

## 9. Format konten

**Lesson (MDX) — frontmatter:**
```yaml
---
id: rust-ownership-01
track: rust
module: b2-inti-rust
title: Ownership
level: beginner          # beginner | intermediate | advanced
estMinutes: 20
prereq: [rust-variables-01]
objectives:
  - Menjelaskan aturan ownership
  - Memprediksi kapan nilai di-move vs di-copy
tags: [rust, memory]
srsCards: auto           # kartu dibuat dari kuis yang salah
---
```

**Exercise (skema Zod, ringkas):**
```ts
type Exercise = {
  id: string;
  kind: 'code' | 'mcq' | 'fill-blank' | 'parsons' | 'sd-scenario'
      | 'ui-predict'   // lihat kode Compose/Flutter, pilih hasil render yang benar
      | 'project';     // brief + acceptance criteria + starter repo + rubrik
  language?: 'python' | 'rust' | 'kotlin' | 'dart';
  runner?: 'pyodide' | 'judge0' | 'kotlin-playground' | 'dartpad';
  starter?: string;
  tests?: { visible: Test[]; hidden: Test[] };   // hidden: server-side untuk judge0
  limits?: { timeMs: number; memoryMb: number };
  hints: [string, string?, string?];
  solution?: string;
  explanation: string;
};
```

**Skenario system design:** JSON berisi kebutuhan fungsional/non-fungsional, profil trafik, komponen yang tersedia, aturan penilaian, dan solusi referensi + penjelasan trade-off.

---

## 10. Skema database (PostgreSQL)

```sql
create table profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id text unique not null,  -- id pengguna dari Better Auth (tabel auth dikelola library)
  display_name text,
  locale text default 'id',
  created_at timestamptz default now()
);

create table lesson_progress (
  user_id uuid references profiles(id) on delete cascade,
  lesson_id text not null,
  status text check (status in ('started','completed')) not null,
  updated_at timestamptz default now(),
  primary key (user_id, lesson_id)
);

create table submissions (
  id bigserial primary key,
  user_id uuid references profiles(id) on delete cascade,
  exercise_id text not null,
  language text not null,
  code text not null,
  passed boolean not null,
  result jsonb,               -- hasil per tes, stdout/stderr, waktu
  created_at timestamptz default now()
);
create index on submissions (user_id, exercise_id, created_at desc);

create table review_cards (     -- FSRS
  id bigserial primary key,
  user_id uuid references profiles(id) on delete cascade,
  source_id text not null,      -- id soal/konsep
  due timestamptz not null,
  stability real, difficulty real,
  state smallint not null default 0,
  reps int default 0, lapses int default 0,
  last_review timestamptz
);
create index on review_cards (user_id, due);

create table review_logs (
  id bigserial primary key,
  card_id bigint references review_cards(id) on delete cascade,
  rating smallint not null,     -- 1..4
  reviewed_at timestamptz default now()
);

create table sd_attempts (
  id bigserial primary key,
  user_id uuid references profiles(id) on delete cascade,
  scenario_id text not null,
  graph jsonb not null,         -- node & edge + parameter
  adr_notes text,
  sim_result jsonb,
  score int,
  rubric jsonb,
  created_at timestamptz default now()
);

create table interview_sessions (
  id bigserial primary key,
  user_id uuid references profiles(id) on delete cascade,
  kind text check (kind in ('coding','system_design')) not null,
  started_at timestamptz default now(),
  ended_at timestamptz,
  phases jsonb,                 -- waktu & catatan per fase
  outcome jsonb
);

create table project_submissions (
  id bigserial primary key,
  user_id uuid references profiles(id) on delete cascade,
  project_id text not null,       -- id proyek di konten, mis. 'kotlin-compose-capstone'
  repo_url text not null,
  demo_url text,
  screenshots text[],             -- URL gambar (proyek UI)
  rubric_self jsonb,              -- checklist mandiri
  status text check (status in ('in_progress','submitted','completed')) not null default 'in_progress',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index on project_submissions (user_id, project_id);

create table streaks (
  user_id uuid primary key references profiles(id) on delete cascade,
  current int default 0, longest int default 0, last_day date
);
```
**Otorisasi:** karena memakai Neon (tanpa `auth.uid()` bawaan), pengguna hanya boleh mengakses barisnya sendiri lewat **filter `user_id` di server** pada setiap query; RLS Postgres bersifat opsional (lihat §4.9). `profiles` dibuat saat pendaftaran dan dipetakan ke pengguna Better Auth lewat `auth_user_id`. Konten (track/modul/lesson) hidup di repo, bukan di DB, sehingga DB hanya menyimpan data pengguna.

---

## 11. Kebutuhan non-fungsional

| Area | Target |
|---|---|
| Performa | LCP < 2,5 dtk di 4G; Pyodide & editor dimuat malas (hanya di lesson yang butuh); worker di-cache |
| Eksekusi | Python lokal ≤ 5 dtk batas; Rust via server p95 < 3 dtk (tanpa antrean panjang) |
| Keamanan | Tidak pernah mengeksekusi kode pengguna di server Next.js; Judge0 di VPS terpisah, jaringan keluar mati, batas sumber daya, rate limit per pengguna, kunci API tidak di klien, CSP ketat |
| Privasi | Kode pengguna disimpan hanya untuk riwayat; opsi hapus data; patuhi UU PDP |
| Aksesibilitas | Navigasi keyboard, kontras, `prefers-reduced-motion`, editor bisa dipakai pembaca layar semampunya |
| Mobile | Responsif; editor CM6 diuji di perangkat nyata; kanvas SD punya mode sentuh |
| i18n | ID default, struktur siap EN (`next-intl` atau setara) |
| Offline | PWA ringan: lesson yang sudah dibuka dan Pyodide ter-cache (P2) |
| Reliabilitas | Backup/pemulihan DB lewat fitur Neon (point-in-time restore/branching; **cek retensi sesuai paket**); pemantauan uptime gateway; degradasi anggun jika Judge0 mati (pesan jelas, Python tetap jalan) |

---

## 12. Metrik keberhasilan

**Fase belajar (internal):** jumlah modul selesai per minggu, jam konsisten belajar, jumlah skenario SD yang diselesaikan dengan skor ≥ 80%.
**Setelah rilis:** aktivasi (menyelesaikan lesson pertama), retensi D7/D30, kartu SRS yang ditinjau/hari, rasio penyelesaian skenario SD, konversi gratis→berbayar.

---

## 13. Roadmap (selaras tujuan belajar)

| Fase | Minggu | Hasil | Skill yang dilatih |
|---|---|---|---|
| 0 | 1 | Repo monorepo, Next 16 + Tailwind, pipeline MDX (Velite), database Neon + auth Better Auth | Next.js 16, Postgres, arsitektur repo |
| 1 | 2–4 | Editor CM6 + Pyodide worker + 1 modul Python (A1) + progres + SRS dasar | Web Worker, TS, FSRS |
| 2 | 5–7 | Gateway Rust (Axum) + Judge0 di VPS + modul Rust (B1–B2) | **Rust**, Docker, keamanan sandbox |
| 3 | 8–10 | Engine simulasi Rust→WASM + kanvas React Flow + skenario URL shortener | **Rust/WASM**, system design |
| 4 | 11–13 | Kuis/Parsons, bank soal DSA (E1–E3), kartu SRS otomatis | Algoritma, desain konten |
| 5 | 14–16 | Kotlin Playground + DartPad (track C, D) + infrastruktur proyek (brief, starter repo, CI, portofolio) | **Kotlin, Dart/Flutter**, GitHub Actions |
| 5b | 17–19 | **Track UI:** C5 (Compose), D5/D6 (Flutter UI), J (desain UI/UX) + proyek UI (satu desain → dua implementasi) | **Jetpack Compose, Flutter UI, desain antarmuka** |
| 6 | 20–22 | Mode interview + 5 skenario SD tambahan | Interview, trade-off |
| 7 | 23–26 | Track G (arsitek) + H (ML/CV) + demo ONNX/OpenCV.js | **ML/CV**, MLOps |
| 8 | 27+ | Beta tertutup, perbaikan, baru pertimbangkan pembayaran | Produk & distribusi |

Aturan: **satu fase selesai dan dipakai sendiri** sebelum lanjut. Konten adalah pekerjaan terbesar; sisihkan ±50% waktu untuk menulis materi.

---

## 14. Risiko & mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Konten terlalu luas | Tidak selesai | Rilis per track; mulai Python+Rust saja |
| Penyalahgunaan sandbox (crypto-mining, DoS) | Biaya/keamanan | Rate limit, batas CPU/waktu, jaringan mati, VPS terpisah, monitoring |
| Lisensi (WebContainers, Judge0, materi pihak ketiga) | Hukum | Hindari WebContainers; verifikasi lisensi Judge0; tulis materi sendiri |
| Ketergantungan layanan eksternal (DartPad, Kotlin Playground) | Fitur mati | Pertimbangkan self-host server Kotlin; sediakan pesan degradasi |
| Paket CV tidak kompatibel Next 16/React 19 | Lesson CV tertunda | Spike teknis di fase 0–1; fallback ke halaman terisolasi/iframe |
| Pyodide berat di perangkat lemah | UX buruk | Lazy load, indikator progres, fallback ke Judge0 untuk Python |
| *Cold start* Neon (scale-to-zero) & batas tier gratis | Query pertama lambat; kuota habis | Terima di fase belajar; pantau penggunaan; matikan scale-to-zero / naik paket saat produksi |
| Beban kerja solo | Burnout | Roadmap bertahap, otomasi (CI, test), batasi lingkup |
| Proyek tidak bisa dinilai otomatis (terutama UI) | Umpan balik lemah | Acceptance criteria jelas + tes otomatis untuk logika; UI dinilai rubrik mandiri + tangkapan layar; review AI/rekan sebagai P2 |
| Compose tidak bisa jalan inline di browser | Pengalaman belajar UI Android kurang interaktif | Kuis prediksi UI, pratinjau gambar, proyek lokal; evaluasi Compose Multiplatform Web nanti |

---

## 15. Hal yang harus diverifikasi saat implementasi
1. Lisensi Judge0 CE (GPL-3.0 vs MIT: sumber bertentangan) dan daftar bahasa terkini (Kotlin, Dart).
2. Syarat penggunaan server `kotlin-playground` bawaan JetBrains untuk produksi; jika ragu, self-host.
3. Dukungan highlight Kotlin/Dart di CodeMirror 6.
4. Daftar paket Pyodide terkini (numpy, pandas, scikit-learn, matplotlib, opencv).
5. Kompatibilitas `onnxruntime-web` dan `opencv.js` dengan Next 16 + Turbopack (konfigurasi worker/WASM asset).
6. Lisensi tiap materi pihak ketiga jika diadaptasi.
7. Versi paket terbaru (`ts-fsrs`, `@xyflow/react`, `codemirror`) saat `npm install`.
8. Status terkini Compose Multiplatform untuk Web (beta pada 1.9.0, Sep 2025) dan kelayakan pratinjau Compose di browser.
9. Batas DartPad untuk paket Flutter pihak ketiga (tidak semua paket tersedia di DartPad).
10. Neon: batas tier gratis, retensi backup/restore, perilaku *scale-to-zero*, serta pola koneksi (pooled vs direct, driver HTTP vs WebSocket) dengan Drizzle di Next 16.
11. Status Neon Auth (beta) vs Better Auth mandiri; pilih satu sebelum fase 0 selesai.

---

## 16. Pertanyaan terbuka untuk Rado
1. Target awal: murni belajar pribadi, atau ada tenggat rilis publik?
2. Bahasa konten awal: Indonesia saja, atau langsung bilingual?
3. Hosting: Vercel untuk web + 1 VPS (Hetzner/Biznet Gio/Niagahoster) untuk Judge0?
4. Apakah track Kotlin/Dart perlu dilepas dari v1 agar fokus ke Python+Rust+System Design dulu?

---

## Sumber riset
- Next.js 16 — https://nextjs.org/blog/next-16
- Pyodide di web worker — https://pyodide.readthedocs.io/en/latest/usage/webworker.html
- Contoh Python trainer (Next.js + Monaco + Pyodide) — https://github.com/J0YY/drilly
- WebContainers & lisensi komersial — https://deepwiki.com/stackblitz/webcontainer-docs/6.1-enterprise-features-and-licensing
- Judge0 CE (biaya, isolate, Docker privileged) — https://unsubbed.pages.dev/tools/judge0-ce/
- CodeMirror 6 vs Monaco (Replit) — https://blog.repl.it/codemirror
- Perbandingan editor 2026 — https://www.pkgpulse.com/guides/monaco-editor-vs-codemirror-6-vs-sandpack-in-browser-2026
- Rust → WASM di browser (pola Qvault) — https://dev.to/wagslane/running-rust-in-the-browser-with-web-assembly-3dil
- Kotlin Playground — https://github.com/jetbrains/kotlin-playground
- DartPad embed — https://flutter.dev/blog/how-to-embed-a-flutter-application-in-a-website-using-dartpad
- Neon + Next.js + Drizzle + Neon Auth — https://neon.com/docs/get-started/full-backend-quickstart
- React Flow / xyflow — https://github.com/DavidAlphaFox/react-flow
- ts-fsrs — https://github.com/open-spaced-repetition/ts-fsrs
- ONNX Runtime Web — https://opensource.microsoft.com/blog/2021/09/02/onnx-runtime-web-running-your-machine-learning-model-in-browser/
- Inferensi YOLO di browser (OpenCV.js + ORT Web) — https://pyimagesearch.com/?p=50302
- Topik system design — https://www.designgurus.io/blog/system-design-interview-fundamentals , https://www.educative.io/blog/system-design-school
- Kerangka konten MDX (Fumadocs, Velite) — https://www.fumadocs.dev , https://github.com/brijr/mdx
- Jalur belajar Rust — https://www.classcentral.com/report/?p=81388
- Compose Multiplatform 1.9.0 (web beta) — https://blog.jetbrains.com/kotlin/2025/09/compose-multiplatform-1-9-0-compose-for-web-beta/
- Tantangan playground Compose web — https://proandroiddev.com/building-a-kotlin-compose-web-playground-why-its-harder-than-you-think-and-how-to-make-it-fast-f90d3396a3b8
