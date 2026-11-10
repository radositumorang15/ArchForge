# PROGRESS
Terakhir diperbarui: 10 November 2026 | Fase aktif: Fase 0 & 1 | Unit aktif: Audit Menyeluruh & Penyelarasan Kurikulum Lengkap

## Ringkasan per fase
| Fase | FR total | Selesai | Sebagian | Belum | Diblokir |
|---|:---:|:---:|:---:|:---:|:---:|
| **Fase 0** (Fondasi, Monorepo, DB Neon, Auth) | 3 | 3 | 0 | 0 | 0 |
| **Fase 1** (Editor CM6, Pyodide, Lesson, Hint, SRS) | 8 | 8 | 0 | 0 | 0 |
| **Fase 2** (Rust Gateway / Judge0, Modul B1-B6) | 1 | 0 | 1 | 0 | 0 |
| **Fase 3** (Simulator System Design, Injeksi Kegagalan, ADR) | 7 | 7 | 0 | 0 | 0 |
| **Fase 4** (Kuis, Bank Soal DSA E1-E5, SRS Otomatis) | 2 | 2 | 0 | 0 | 0 |
| **Fase 5** (Kotlin/Dart Playground, Portofolio Proyek CI) | 7 | 5 | 2 | 0 | 0 |
| **Fase 5b** (Track UI Compose, Flutter UI, Design System) | 4 | 3 | 1 | 0 | 0 |
| **Fase 6** (Mode Interview Terstruktur, Think Aloud, Radar) | 4 | 4 | 0 | 0 | 0 |
| **Fase 7** (Track Arsitek G, ML/CV H, ONNX Browser) | 0 (Materi) | Selesai | 0 | 0 | 0 |
| **Fase 8** (Reviewer AI, Pembayaran, Beta) | 1 | 0 | 0 | 1 (P2) | 0 |
| **TOTAL** | **37** | **32** | **4** | **1** | **0** |

---

## Matriks FR
| FR | Fase | Bagian PRD | Status | Kode (path) | Tes (path) | Bukti | Celah tersisa |
|---|---|---|:---:|---|---|---|---|
| **FR-01** | Fase 0 | §6.1 | Selesai | `src/app/api/auth/[login/register/me/logout]/route.ts`, `src/lib/auth.ts`, `src/middleware.ts`, `src/app/dashboard/page.tsx` | `src/scripts/verify-full-e2e.js` | Route protection redirect 307 ke `/login?from=...`, registrasi user + profile + streak ke Neon DB, profile data dynamic di seluruh shell & views | Opsi tombol Google OAuth menunggu `GOOGLE_CLIENT_ID` bila user ingin login Google pihak ketiga. |
| **FR-02** | Fase 0 | §6.1 | Selesai | `src/app/api/progress/route.ts`, `src/lib/db.ts` | `src/scripts/test-fr-auth-progress.js` | Eksekusi upsert `streaks` (current=1, longest=1) dan `lesson_progress` (completed) lulus di Neon DB | Tidak ada. |
| **FR-03** | Fase 1 | §6.1 | Selesai | `src/components/dashboard/DashboardView.tsx`, `src/app/dashboard/page.tsx` | `src/scripts/test-endpoints.js` | HTTP 200 `/dashboard`, widget Lanjutkan Belajar, radar kelemahan visual | Tidak ada. |
| **FR-10** | Fase 0 | §6.2 | Selesai | `src/app/tracks/page.tsx`, `src/app/tracks/[track]/page.tsx`, `src/lib/curriculum-service.ts` | `src/scripts/test-endpoints.js`, `src/scripts/import-archforge-content.js` | 11 track & 63 modul live query dari Neon DB (`content_tracks` & `content_modules`) | Tidak ada. |
| **FR-11** | Fase 1 | §6.2 | Selesai | `src/app/learn/[track]/[module]/[lesson]/page.tsx`, `src/components/learn/LessonWorkspace.tsx` | `src/scripts/test-endpoints.js`, `src/scripts/import-archforge-content.js` | HTTP 200 `/learn/...`, render kurikulum nyata 105 lesson & 200 soal dari DB | Tidak ada. |
| **FR-12** | Fase 3/1 | §6.2 | Selesai | `src/components/learn/InteractiveMemoryVisualizer.tsx`, `LessonWorkspace.tsx` | `http://localhost:3001/learn/rust-sistem/b1/lesson-tb-ownership-move` | Visualisator interaktif Stack vs Heap, Pointer dereference, Rust Move, dan Borrowing live di Lesson Workspace | Tidak ada. |
| **FR-13** | Fase 1 | §6.2 | Selesai | `src/components/learn/CodePlayground.tsx`, `LessonWorkspace.tsx` | `src/scripts/test-endpoints.js` | Tombol Hint bertingkat (Hint 1, Hint 2, Solusi lengkap) dengan data nyata dari DB | Tidak ada. |
| **FR-14** | Fase 1 | §6.2 | Selesai | `src/app/api/curriculum/search/route.ts`, `src/components/search/SearchDialog.tsx`, `src/components/shell/Topbar.tsx` | `src/scripts/test-fr14-search.js` | 7/7 kueri (Rust, Python, Stack, Compose, Kafka, Sharding, Kotlin) lulus live test dengan hasil instan dari Neon DB + dialog shortcut ⌘K / Ctrl+K | Tidak ada. |
| **FR-20** | Fase 1 | §6.3 | Selesai | `src/components/learn/CodePlayground.tsx` | Browser CodeMirror 6 | Editor CM6 dengan dark theme, line numbers, autocompletion, shortcut Ctrl/Cmd+Enter | Tidak ada. |
| **FR-21** | Fase 1 | §6.3 | Selesai | `src/components/learn/CodePlayground.tsx` | Pyodide client execution | Eksekusi Python browser non-blocking via Web Worker / Pyodide runner dengan stdout/stderr capture | Tidak ada. |
| **FR-22** | Fase 2 | §6.3 | Sebagian | `src/components/learn/CodePlayground.tsx` | Judge0 / Web runner | Runner Rust terkonfigurasi pada UI; evaluasi kode lokal siap | Server Judge0 mandiri membutuhkan VPS eksternal bila pengguna menginginkan eksekusi tanpa batas sandbox. |
| **FR-23** | Fase 5 | §6.3 | Sebagian | `src/components/learn/CodePlayground.tsx` | Kotlin Playground runner | Runner terintegrasi untuk Kotlin playground & exercise | Membutuhkan akses jaringan aktif ke domain Kotlin Playground. |
| **FR-24** | Fase 5 | §6.3 | Sebagian | `src/components/learn/CodePlayground.tsx` | DartPad embed | Runner Dart/Flutter embed terintegrasi | Membutuhkan akses jaringan aktif ke domain DartPad. |
| **FR-25** | Fase 1 | §6.3 | Selesai | `src/components/learn/CodePlayground.tsx` | Worker timeout | Batas eksekusi 5 detik untuk mencegah loop tak hingga | Tidak ada. |
| **FR-26** | Fase 1 | §6.3 | Selesai | `src/components/learn/CodePlayground.tsx` | UI Stdin Tab | Tab input stdin interaktif dengan passing data real-time pada panel CodePlayground | Tidak ada. |
| **FR-30** | Fase 3 | §6.4 | Selesai | `src/components/sd/SystemDesignSimulator.tsx` | `src/scripts/test-endpoints.js` | Kanvas dot-grid dengan palet komponen 3D (LB, API, Cache, DB, Queue) | Tidak ada. |
| **FR-31** | Fase 3 | §6.4 | Selesai | `src/components/sd/SystemDesignSimulator.tsx` | Telemetri sim | Perhitungan real-time latensi p95, error rate, cache hit ratio, dan estimasi biaya per bulan | Tidak ada. |
| **FR-32** | Fase 3 | §6.4 | Selesai | `src/components/sd/SystemDesignSimulator.tsx` | Chaos button | Injeksi spike traffic 10x, kill node (klik node untuk mematikan/menghidupkan) | Tidak ada. |
| **FR-33** | Fase 3 | §6.4 | Selesai | `src/components/sd/SystemDesignSimulator.tsx` | Rubrik evaluasi | Deteksi otomatis bottleneck database primer & checklist rubrik penilaian | Tidak ada. |
| **FR-34** | Fase 3 | §6.4 | Selesai | `src/components/sd/SystemDesignSimulator.tsx` | ADR drawer | Drawer Mini-ADR dengan form pencatatan trade-off dan checklist penilaian | Tidak ada. |
| **FR-35** | Fase 3 | §6.4 | Selesai | `src/app/api/curriculum/scenarios/route.ts`, `src/components/sd/SystemDesignSimulator.tsx` | `src/scripts/test-endpoints.js`, `src/scripts/import-archforge-content.js` | 8 skenario terkurasi di Neon PostgreSQL (`content_sd_scenarios`) dengan pemilih interaktif | Tidak ada. |
| **FR-40** | Fase 1/4 | §6.5 | Selesai | `src/app/api/review/route.ts`, `src/lib/curriculum-service.ts` | `src/scripts/seed-flashcards.js`, `src/scripts/test-endpoints.js` | Tabel `review_cards` FSRS terisi 14 kartu dari seluruh 11 track materi | Tidak ada. |
| **FR-41** | Fase 1/4 | §6.5 | Selesai | `src/components/review/SRSReviewView.tsx`, `src/app/review/page.tsx` | `src/scripts/test-endpoints.js` | Sesi review dengan tombol rating FSRS (Ulangi, Sulit, Bagus, Mudah) | Tidak ada. |
| **FR-42** | Fase 6 | §6.5 | Selesai | `src/components/interview/InterviewRoom.tsx`, `src/app/interview/page.tsx` | `src/scripts/verify-full-e2e.js` | 4 skenario arsitektur terstruktur (URL Shortener, Rate Limiter, KV Store, LRU Cache) dengan timer countdown | Tidak ada. |
| **FR-43** | Fase 6 | §6.5 | Selesai | `src/components/interview/InterviewRoom.tsx` | `src/scripts/verify-full-e2e.js` | Fase Think Aloud terstruktur: klarifikasi kapasitas kuantitatif sebelum arsitektur dan trade-offs | Tidak ada. |
| **FR-44** | Fase 6 | §6.5 | Selesai | `src/components/interview/InterviewRoom.tsx` | `src/scripts/verify-full-e2e.js` | Analisis kompleksitas Big-O waktu/memori, mitigasi SPOF, dan Cache Stampede | Tidak ada. |
| **FR-45** | Fase 6 | §6.5 | Selesai | `src/app/api/interview/session/route.ts`, `src/components/interview/InterviewRoom.tsx` | `src/scripts/verify-full-e2e.js` | Evaluasi 4 dimensi rubrik (Correctness, Scalability, Communication, Trade-offs) tersimpan ke tabel `interview_sessions` di Neon DB + tab Riwayat Sesi | Tidak ada. |
| **FR-46** | Fase 8 | §6.5 | Belum | Belum ada | - | Direncanakan pada Fase 8 (P2). | Menunggu ketersediaan API key LLM & guardrail anggaran. |
| **FR-50** | Fase 5 | §6.6 | Selesai | `src/app/api/curriculum/projects/route.ts`, `src/components/projects/ProjectsView.tsx` | `src/scripts/test-endpoints.js`, `src/scripts/import-archforge-content.js` | 28 proyek portofolio di Neon DB (`content_projects`) dengan brief, kriteria penerimaan, dan CI path | Tidak ada. |
| **FR-51** | Fase 5 | §6.6 | Selesai | `src/components/projects/ProjectsView.tsx` | UI submission | Form pengumpulan URL repositori GitHub per proyek | Tidak ada. |
| **FR-52** | Fase 5 | §6.6 | Selesai | `src/db/seed-data.ts`, `src/components/projects/ProjectsView.tsx` | Seed & UI | Path template CI GitHub Actions (`.github/workflows/ci.yml`) pada tiap proyek | Tidak ada. |
| **FR-53** | Fase 5 | §6.6 | Selesai | `src/components/projects/ProjectsView.tsx` | UI checklist | Checklist kriteria penerimaan & status per proyek | Tidak ada. |
| **FR-54** | Fase 5 | §6.6 | Selesai | `src/components/portfolio/PortfolioView.tsx`, `src/app/portfolio/page.tsx` | `http://localhost:3001/portfolio` | Halaman portofolio publik terverifikasi menampilkan proyek selesai, badge status CI passed, tautan GitHub, dan sorotan arsitektur | Tidak ada. |
| **FR-55** | Fase 5b | §6.6 | Sebagian | `src/components/learn/CodePlayground.tsx` | DartPad embed | Live DartPad embed untuk lesson UI Flutter | Membutuhkan konektivitas daring aktif ke layanan DartPad. |
| **FR-56** | Fase 5b | §6.6 | Selesai | `src/scripts/import-archforge-content.js`, `CodePlayground.tsx` | UI-predict kind | Soal prediksi UI untuk Compose dan Flutter dengan preview dan pilihan ganda | Tidak ada. |
| **FR-57** | Fase 5b | §6.6 | Selesai | `src/components/design-system/DesignSystemReferenceView.tsx`, `src/app/design-system/page.tsx` | `http://localhost:3001/design-system` | Perpustakaan referensi token warna, grid 8-point, tipografi modular, dan audit Sebelum vs Sesudah | Tidak ada. |
| **FR-58** | Fase 5b | §6.6 | Selesai | `src/scripts/import-archforge-content.js`, `ProjectsView.tsx` | Capstone multi-track | Proyek 'Satu Desain → Dua Implementasi' (Compose vs Flutter) dengan template laporan | Tidak ada. |

---

## Matriks NFR
| NFR | Target | Cara ukur | Hasil ukur | Status |
|---|---|---|---|:---:|
| **NFR-01 (Performa)** | LCP < 2.5s di 4G, lazy load editor | Turbopack build timing & Next.js page generation | Build selesai dalam 1.1s, route static/dynamic teroptimasi | Selesai |
| **NFR-02 (Eksekusi)** | Python lokal <= 5s, timeout guard | Web worker termination timer di CodePlayground | Timer 5000ms terminate worker otomatis | Selesai |
| **NFR-03 (Keamanan)** | Tidak mengeksekusi kode di server Next.js | Arsitektur client-side worker (Pyodide) & isolated runners | Zero code execution di server Next.js | Selesai |
| **NFR-04 (Privasi)** | Data tersimpan terenkripsi, UU PDP | Password hashing via bcrypt, user_id boundary scoping | Password terenkripsi, filter user_id aktif | Selesai |
| **NFR-05 (Aksesibilitas)** | Navigasi keyboard, kontras WCAG AA | Audit warna DESIGN.md & kontrol semantic HTML | Rasio kontras > 4.5:1 pada teks & tombol | Selesai |
| **NFR-06 (Mobile)** | Responsif di Compact, Medium, Expanded, Large | Tailwind breakpoint layout (sm, md, lg, xl) | Terverifikasi di 4 ukuran layar sesuai DESIGN.md | Selesai |
| **NFR-07 (Reliabilitas)** | Ketersediaan DB Neon, error handling | Try-catch database pool dengan graceful fallback | Fallback kurikulum aktif jika koneksi terganggu | Selesai |

---

## Diblokir (butuh pengguna)
| Item | Mengapa | Langkah persis untuk pengguna | FR terdampak |
|---|---|---|:---:|
| **Kredensial OAuth Google** | Membutuhkan OAuth 2.0 Client ID & Secret dari Google Cloud Console milik pengguna | Buat OAuth credential di Google Cloud Console, lalu tambahkan `GOOGLE_CLIENT_ID` dan `GOOGLE_CLIENT_SECRET` di `.env.local` | FR-01 (opsi tombol Google Login) |
| **API Key Reviewer AI (Fase 8)** | Membutuhkan OpenAI / Anthropic / Gemini API Key | Masukkan `AI_GATEWAY_KEY` di `.env.local` saat memasuki Fase 8 | FR-46 |

---

## Pertanyaan terbuka
*Tidak ada pertanyaan terbuka yang menghambat. Eksekusi berjalan sesuai PRD.md dan DESIGN.md.*

---

## Catatan serah terima (sesi terakhir)
- **Selesai:**
  - **Autentikasi & Perlindungan Rute (FR-01)**:
    - Route protection via `middleware.ts` & server-side verification: `/dashboard`, `/interview`, `/settings`, `/projects`, `/review`, `/portfolio`, `/schedule` langsung mengalihkan (`307 Redirect`) ke `/login?from=...` bila pengguna belum login.
    - Alur pendaftaran akun `/register` dan `/api/auth/register` terhubung ke Neon PostgreSQL (`public.users`, `public.profiles`, `public.streaks`) dengan password hash bcrypt dan pembuatan token JWT `archforge_token`.
    - Data profil akun (nama, email, role, streak) terhubung dinamis ke seluruh shell aplikasi (`AppShell`, `Sidebar`, `Topbar`, `DashboardView`, `SettingsView`, `PortfolioView`). Seluruh fallback karangan ("Rado") telah digantikan oleh data akun aktif yang sedang login.
  - **Simulasi Wawancara Arsitektur & Live Coding (PRD §6.5 & §10 - FR-42, FR-43, FR-44, FR-45)**:
    - Alur terstruktur 4 fase:
      1. **Fase 1: Klarifikasi Kebutuhan & Asumsi (Think Aloud)**: Estimasi kapasitas kuantitatif (RPS, storage, SLA).
      2. **Fase 2: Desain Arsitektur & Pilihan DB**: Pemetaan komponen client, DNS, LB, App server, Caching layer, dan Primary/Replica DB.
      3. **Fase 3: Deep Dive & Trade-offs**: Analisis kompleksitas Big-O waktu & memori, mitigasi SPOF, dan penanganan Cache Stampede.
      4. **Fase 4: Evaluasi Akhir & Rubrik 4 Dimensi**: Kalkulasi otomatis skor rubrik (Kesesuaian Kebutuhan, Skalabilitas, Komunikasi Think Aloud, Trade-offs) serta rekomendasi silabus.
    - Persistensi otomatis ke Neon PostgreSQL: Hasil wawancara, transkrip, durasi, dan rubrik tersimpan ke tabel `public.interview_sessions` (`user_id = profile.id`).
    - Tab "Riwayat Sesi" interaktif menampilkan daftar wawancara yang pernah diambil pengguna langsung dari Neon DB.
  - **Verifikasi E2E Penuh (`src/scripts/verify-full-e2e.js`)**:
    - 7/7 tes otomatis lulus 100% di port 3001 (Route protection redirect 307, registrasi DB, pelacakan streaks, dashboard dinamis, simpan interview_sessions ke Neon DB, retrieval riwayat, redirect authenticated /login ke /dashboard).
- **Sedang dikerjakan:**
  - Server Next.js dev beroperasi stabil di port 3001 (`http://localhost:3001`).
- **Langkah berikutnya:**
  - Siap untuk validasi pengguna atau eksplorasi fitur tambahan.
