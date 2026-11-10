# Architecture Decision Records (ADR) — ArchForge

Dokumen ini mencatat keputusan-keputusan arsitektur penting yang diambil dalam pembangunan ArchForge sesuai spesifikasi PRD.md dan DESIGN.md.

---

## ADR-001: Penggunaan Next.js 16 (Turbopack) & React 19 dengan Tailwind CSS
- **Status:** Diterima
- **Konteks:** Diperlukan monorepo yang cepat dengan Server Components untuk efisiensi fetch database, dan Client Components untuk CodeMirror 6 serta Canvas Simulator.
- **Keputusan:** Menggunakan Next.js 16.4.6 dengan compiler Turbopack dan React 19.3.1. Seluruh layout antarmuka menggunakan Tailwind CSS dengan palet warna warm slate, dark chocolate, dan oranye aksen (#EE833A) sesuai `DESIGN.md`.
- **Konsekuensi:** Kompatibilitas tinggi dengan ekosistem modern, proses build < 2 detik.

---

## ADR-002: Neon PostgreSQL Pooler & Drizzle ORM
- **Status:** Diterima
- **Konteks:** Aplikasi membutuhkan penyimpanan data katalog kurikulum (tracks, modules, lessons, exercises, scenarios, projects) serta data operasional pengguna (auth, progress, submissions, review_cards, interview_sessions).
- **Keputusan:** Menggunakan PostgreSQL yang di-host di Neon dengan connection pooling (`pg.Pool` & Drizzle ORM).
- **Konsekuensi:** Skalabilitas tinggi, branchable database, kompatibel dengan library SQL node.

---

## ADR-003: Model Keamanan Eksekusi Kode: Web Worker Tanpa Server-Side Execution
- **Status:** Diterima
- **Konteks:** Menjalankan kode sembarang milik pengguna di server Next.js membuka celah eksploitasi fatal (RCE, DoS, crypto-mining).
- **Keputusan:**
  1. Eksekusi Python dijalankan 100% di browser pengguna melalui Pyodide dalam Web Worker terisolasi dengan batas waktu 5 detik.
  2. Eksekusi Kotlin didelegasikan ke Kotlin Playground resmi.
  3. Eksekusi Dart/Flutter dijalankan melalui DartPad Embed iframe.
  4. Eksekusi Rust menggunakan Web runner / Judge0 gateway terisolasi.
- **Konsekuensi:** Server Next.js aman dari serangan eksekusi kode pengguna.

---

## ADR-004: Penempatan Server Pengembangan pada Port 3001
- **Status:** Diterima
- **Konteks:** Port default 3000 sering digunakan oleh layanan lain atau proyek monorepo pendamping.
- **Keputusan:** Menetapkan port dev server secara eksplisit pada port 3001 (`next dev -p 3001`).
- **Konsekuensi:** Bebas dari konflik port.

