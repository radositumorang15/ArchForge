# 🛡️ ArchForge

> **Platform Pembelajaran Interaktif Rekayasa Sistem, Arsitektur Perangkat Lunak, dan Simulasi Wawancara Skala Besar.**

[![Next.js](https://img.shields.io/badge/Next.js-16.4.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Neon Database](https://img.shields.io/badge/Neon-PostgreSQL-00E599?style=for-the-badge&logo=postgresql)](https://neon.tech/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-orange?style=for-the-badge)](LICENSE)

---

## 📖 Tentang ArchForge

**ArchForge** adalah platform terpadu untuk pengembang perangkat lunak yang ingin menguasai rekayasa sistem dari level pemula hingga arsitek sistem senior. Berbeda dengan platform tutorial pasif, ArchForge mengintegrasikan **simulator beban nyata**, **visualisator memori interaktif**, **editor kode in-browser**, **pengulangan berjarak (FSRS)**, serta **ruang simulasi wawancara teknis terstruktur**.

---

## ✨ Fitur Utama

### 1. 🗺️ 11 Track Kurikulum Lengkap & Terkurasi
* **Track A**: Fondasi Pemrograman & Berpikir Komputasional (Python)
* **Track B**: Rekayasa Sistem Berkinerja Tinggi (Rust, Ownership & Semantik Move)
* **Track C**: Backend Modern & Concurrency (Kotlin & Coroutines)
* **Track D**: Rekayasa Antarmuka & Cross-Platform (Flutter & Dart)
* **Track E**: Struktur Data, Algoritma & Pola Masalah (15 DSA Patterns)
* **Track F**: System Design Skala Besar (100.000 RPS, Caching, Sharding, SPOF)
* **Track G**: Arsitektur Perangkat Lunak & Sistem Terdistribusi (Clean Architecture, DDD, Event-Driven, Saga, CQRS)
* **Track H**: Rekayasa AI/ML & Computer Vision Edge
* **Track J**: DevSecOps, Observabilitas & Keandalan (SRE, Telemetri, CI/CD)
* **Track K**: Basis Data Lanjut & Mesin Penyimpanan (LSM-Tree, B-Tree, Quorum)
* **Track L**: Proyek Portofolio Terbuka (28 Proyek Industri dengan CI/CD)

### 2. ⚡ Simulator System Design & Injeksi Kegagalan (PRD §7)
* Kanvas interaktif dot-grid dengan palet komponen 3D (Client, DNS, CDN, Load Balancer, API Gateway, Cache-Aside Redis, DB Primary & Replica, Message Queue, Worker).
* Telemetri real-time: perhitungan RPS, latensi p95 (ms), error rate, cache hit ratio, dan estimasi biaya infrastruktur.
* **Chaos Button**: Injeksi lonjakan traffic 10x dan simulasi node crash untuk menguji ketahanan arsitektur.
* **Mini-ADR Drawer**: Form pencatatan *Architecture Decision Records* langsung di samping diagram.

### 3. 🧠 Visualisator Memori & Editor Interaktif
* **Interactive Memory Visualizer**: Animasi interaktif membedah alokasi Stack vs Heap, Pointer dereferencing, Rust Move Semantics, dan Borrowing rules secara visual.
* **In-Browser Python Execution**: Menjalankan kode Python langsung di browser melalui Web Worker (Pyodide) tanpa mengeksekusi kode asing di server.
* **CodeMirror 6**: Dilengkapi pintasan keyboard (Cmd/Ctrl+Enter), penomoran baris, dan sistem petunjuk (*hint*) 3 tingkat.

### 4. 🎙️ Simulasi Wawancara Terstruktur (PRD §6.5 & §10)
* **Alur Terstruktur 4 Fase**:
  1. *Klarifikasi Kebutuhan & Asumsi (Think Aloud)*: Menghitung kapasitas kuantitatif storage dan throughput sebelum membuka desain.
  2. *Desain Arsitektur & Pilihan DB*: Komponen, alur data, skema database, dan strategi encoding ID.
  3. *Deep Dive, SPOF & Trade-offs*: Analisis kompleksitas Big-O waktu & memori, mitigasi Cache Stampede, dan failover.
  4. *Evaluasi Akhir & Rubrik 4 Dimensi*: Penilaian otomatis Kesesuaian Kebutuhan, Skalabilitas, Komunikasi, dan Trade-offs.
* **Sinkronisasi Otomatis ke Neon DB**: Seluruh riwayat sesi, transkrip, durasi, dan rubrik tersimpan permanen di tabel `interview_sessions`.

### 5. 🔁 Spaced Repetition System (FSRS)
* Penjadwalan review harian otomatis berdasarkan algoritma *Free Spaced Repetition Scheduler* (FSRS) dengan 4 tombol evaluasi (*Ulangi*, *Sulit*, *Bagus*, *Mudah*).

### 6. 🏆 Portofolio Rekayasa & Verifikasi Publik
* Halaman portofolio publik terverifikasi yang menampilkan riwayat penyelesaian proyek, verifikasi GitHub repo, dan badge status CI/CD Actions.

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Bahasa** | TypeScript, React 19 |
| **Styling** | Tailwind CSS, Lucide React, Glassmorphism UI |
| **Database** | Neon PostgreSQL (Serverless Pooler, `pg`, Drizzle ORM) |
| **Autentikasi** | Jose (JWT HTTP-Only Cookie Session), BcryptJS |
| **Editor & Runtime** | CodeMirror 6, Pyodide Web Worker |

---

## 🚀 Memulai (Quick Start)

### 1. Kloning Repositori
```bash
git clone https://github.com/radositumorang15/ArchForge.git
cd ArchForge
```

### 2. Pasang Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment Variables
Salin file `.env.example` ke `.env.local`:
```bash
cp .env.example .env.local
```

Isi variabel koneksi database Neon:
```env
DATABASE_URL=postgresql://neondb_owner:<PASSWORD>@<HOST>/neondb?sslmode=verify-full&channel_binding=require
NEXTAUTH_SECRET=your_jwt_secret_key_here
JWT_SECRET=your_jwt_secret_key_here
```

### 4. Migrasi & Seeding Database Neon
Jalankan skrip migrasi dan impor konten kurikulum:
```bash
# Migrasi skema tabel pengguna, profil, streak, dan wawancara
node src/scripts/migrate.js

# Impor 11 track, 63 modul, 105 lesson, 200 soal, dan 8 skenario system design
node src/scripts/import-archforge-content.js
```

### 5. Jalankan Server Pengembangan
Aplikasi berjalan secara default pada port **3001**:
```bash
npm run dev -- -p 3001
```

Buka [http://localhost:3001](http://localhost:3001) di browser Anda.

---

## 🧪 Pengujian & Verifikasi

Proyek ini dilengkapi dengan skrip verifikasi otomatis end-to-end:

```bash
# Verifikasi rute proteksi, pendaftaran Neon DB, dynamic profile, dan sesi interview
node src/scripts/verify-full-e2e.js

# Verifikasi 17 endpoint aplikasi
node src/scripts/test-endpoints.js

# Verifikasi pencarian kurikulum instan di Neon DB
node src/scripts/test-fr14-search.js
```

---

## 📁 Struktur Direktori

```
ArchForge/
├── docs/                     # Dokumentasi PRD, Desain Sistem, dan Pelacak Progres
│   ├── PRD.md
│   ├── DESIGN.md
│   └── PROGRESS.md
├── public/                   # Aset 3D, emblem track, ikon, dan berkas kurikulum
│   ├── archforge-content/    # Berkas SQL skema & seeder kurikulum resmi
│   └── assets/3d/            # Aset visual 3D (emblem, badge, logo, backdrop)
├── src/
│   ├── app/                  # Next.js App Router (Halaman & API Routes)
│   │   ├── api/              # API Auth, Kurikulum, Review FSRS, dan Wawancara
│   │   ├── dashboard/        # Beranda & Dasbor Progres
│   │   ├── interview/        # Ruang Wawancara Teknis Terstruktur
│   │   ├── learn/            # Workspace Pembelajaran & Runner Kode
│   │   ├── system-design/    # Simulator Beban Arsitektur Sistem
│   │   ├── review/           # Sesi Review Spaced Repetition (SRS)
│   │   ├── projects/         # Katalog & Pengumpulan Proyek
│   │   └── portfolio/        # Profil Publik Terverifikasi
│   ├── components/           # Komponen UI modular (shell, learn, sd, interview)
│   ├── db/                   # Skema Drizzle ORM
│   ├── lib/                  # Utilitas DB Pool Neon, Auth Session, Kurikulum
│   └── scripts/              # Skrip otomasi migrasi, seeder, dan verifikasi E2E
├── .env.example              # Template variabel lingkungan
├── package.json
└── tailwind.config.ts
```

---

## 👤 Pengembang & Kontribusi

Dibuat dan dikembangkan oleh **Rado Situmorang** ([@radositumorang15](https://github.com/radositumorang15)).

Kontribusi selalu terbuka! Silakan ajukan *Pull Request* atau laporkan *Issues*.

---

## 📄 Lisensi

Didistribusikan di bawah lisensi **MIT**. Lihat file `LICENSE` untuk informasi lebih lanjut.

