# ArchForge — Paket Konten (silabus + bank soal)

Dibuat dari PRD v0.2. **11 track · 63 modul · 105 lesson · 200 soal · 8 skenario System Design · 28 proyek · 15 soal pola DSA · 12 badge.**

## Cara impor
1. `schema_content.sql` (tabel `content_*`), lalu `seed_content.sql` (upsert, aman dijalankan ulang).
2. Atau pakai `*.json` langsung (`archforge_content_bundle.json` = semuanya).
3. `SYLLABUS.md` = ringkasan silabus yang enak dibaca.

> PRD §10 menaruh konten di repo (MDX), bukan di DB. Tabel `content_*` bersifat **opsional** dan memakai `id` teks yang sama dengan
> `lesson_id / exercise_id / source_id / project_id` di tabel progres PRD, jadi keduanya kompatibel.

## Tier (beginner → expert)
PRD hanya punya enum `level: beginner|intermediate|advanced`. Agar ada jenjang *expert/profesional*, ditambah field `tier` 1–4:
`1 beginner · 2 intermediate · 3 advanced · 4 expert`. Tier 4 dipetakan ke `level: advanced`.
Sebaran lesson: tier1 = 18, tier2 = 21, tier3 = 36, tier4 = 30.

## Format soal (`exercises.json`)
| kind | isi utama |
|---|---|
| `mcq` | `options[{id,text}]`, `answer` (id), `explanation` |
| `fill-blank` | `prompt` dengan `{{1}}`, `answers` (daftar jawaban diterima per blank) |
| `parsons` | `lines[{text,indent}]` (urutan benar; UI mengacak) |
| `code` | `language`, `runner`, `starter`, `solution`, `tests{visible,hidden}`, `limits`, `hints[3]` |
| `ui-predict` | `framework`, `code`, `options`, `answer` (`image` null: isi gambar render nanti) |
| `sd-scenario` | `scenarioId` → `sd_scenarios.json` |

**Format tes kode**
- Python / Kotlin / Dart: `{setup?, call, expect}`. Python: `setup` dieksekusi, lalu `call` di-`eval`; `expect` adalah literal Python
  (dibandingkan sebagai nilai); `"!IndexError"` = harus melempar exception itu. Kotlin/Dart: `expect` = teks hasil `println(call)`.
- Rust: `{stdin, expect}` (stdout dibandingkan setelah `trim`).

## Status verifikasi (field `verified` per soal)
- **31 soal Python + 15 soal DSA**: solusi dieksekusi dan lulus semua tes visible+hidden; starter dipastikan tidak lulus semua.
- **11 soal Rust**: solusi dikompilasi (rustc 1.75) dan dijalankan terhadap semua tes.
- **5 soal Kotlin/Dart: `unverified`** (butuh kotlin-playground/DartPad). Uji dulu sebelum rilis. Dart baru 1 soal kode; perlu ditambah.
- Soal MCQ/fill/parsons/UI-predict ditulis manual dan **belum direview pakar**; baca ulang terutama tier 4.

## Catatan penting
- Hidden test untuk runner `pyodide` tetap terlihat di klien (kompromi PRD §5). Untuk `judge0`, evaluasi di server.
- Soal DSA: `rustSignature` hanya tanda tangan fungsi; versi Rust belum ditulis (PRD E4 minta Python & Rust).
- Algoritma pola (two-sum, coin change, dll.) adalah teknik umum; cerita, nama, dan tes ditulis ulang. Tetap hindari menyalin soal platform lain.
- `ui-predict` dan proyek UI menyiapkan tempat gambar (`image`, `screenshots`); aset visualnya belum dibuat.
- Skenario SD memakai angka estimasi kasar untuk latihan, bukan benchmark.
