# DESIGN.md — ArchForge Design System

Design system untuk web ArchForge (lihat `PRD.md`). Bahasa visual mengikuti dua screenshot referensi: **shell kaca gelap di atas latar 3D oranye-merah, dengan panel konten putih yang bersih dan aksen oranye tunggal.**

| | |
|---|---|
| Versi | 0.1 (draft) |
| Tanggal | 10 Nov 2026 |
| Stack | Next.js 16, React 19.2, Tailwind CSS, shadcn/ui (Radix), `lucide-react` |
| Dokumen terkait | `PRD.md` (fitur FR-xx, silabus, simulator) |

**Catatan asal nilai.** Ada tiga tingkat kepastian, ditandai di tabel:
- **[M]** diukur dari piksel screenshot (sampling di titik yang bersih dari teks).
- **[T]** turunan/hitungan dari nilai terukur (mis. opasitas kaca).
- **[E]** estimasi visual, karena titik sampling terganggu antialiasing teks/ikon (mis. merah badge, hijau "1 New Message"). Kalibrasi dengan color picker di file desain aslinya jika ada.

**Yang sengaja TIDAK disalin:** nama/logo "Symposium", foto orang, teks, dan aset ilustrasi di screenshot. Yang ditiru adalah bahasa visualnya (tata letak, warna, bentuk, gerak). Logo, ikon track, dan seluruh aset 3D ArchForge dibuat sendiri (§12).

---

## 1. Arah visual

**Mood:** hangat, premium, fokus. Kontras tinggi antara *shell* gelap berkaca dan *panel* putih tempat belajar berlangsung.

**Lima prinsip**
1. **Satu aksen.** Oranye (`--orange-500`) adalah satu-satunya warna merek. Warna lain hanya untuk status dan grafik.
2. **Gelap membingkai, putih bekerja.** Navigasi dan latar gelap; semua baca/tulis/kode terjadi di panel putih.
3. **Kaca, bukan kartu tebal.** Sidebar dan topbar tembus pandang (blur), bukan blok solid.
4. **Bulat dan lapang.** Radius besar, spasi lega, kapsul (pill) untuk tag/tab/tombol.
5. **3D hanya sebagai latar dan emblem,** tidak pernah di belakang teks panjang atau editor.

**Do:** satu CTA oranye per layar; badge merah hanya untuk hitungan yang perlu tindakan; teks di panel putih selalu hitam-netral.
**Don't:** gradien oranye di atas teks kecil; lebih dari dua tingkat kaca bertumpuk; efek blur pada panel editor (menganggu keterbacaan kode dan memberatkan perangkat lemah).

---

## 2. Pemetaan referensi → ArchForge

Screenshot memuat LMS dengan video kuliah dan pesan antar pengguna. PRD kita tidak punya video dan **tidak punya DM/forum (non-goal v1)**, jadi polanya dipetakan ulang:

| Elemen di screenshot | Dipakai untuk di ArchForge | Catatan |
|---|---|---|
| Sidebar: Home | **Home** (dashboard) | |
| Timetable | **Jadwal** (review SRS harian + rencana belajar) | FR-41 |
| Task (badge 3) | **Proyek & Tugas** (badge = jumlah yang jatuh tempo) | FR-50..54 |
| Course + submenu | **Track** + submenu daftar track | FR-10 |
| Performance | **Progres** (statistik, radar kelemahan) | FR-03, FR-45 |
| Finance | **Dihapus** (diganti **Langganan** pada v1.5+) | belum ada pembayaran |
| Help, Settings | **Bantuan**, **Pengaturan** | |
| Recent Messages | **Terakhir dibuka** (3 lesson/sesi terakhir, badge = kartu SRS jatuh tempo) | bukan pesan |
| Video player + kontrol | **Panel Playground** (editor + output) dengan *run bar* bergaya kontrol video | FR-20..26 |
| Playlist di kolom tengah | **Daftar lesson dalam modul** | FR-10 |
| Kartu "Symposium AI" (gradien oranye) | **Kartu Hint** (3 tingkat + solusi); AI reviewer menyusul (P2) | FR-13, FR-46 |
| Komentar | **Catatan pribadi** dan **Riwayat percobaan** | tanpa interaksi sosial |
| Halaman Messages | **Interview Room** (transkrip gaya chat) | FR-42..45 |
| Bubble oranye (kita) / abu-putih (lawan) | Jawaban pengguna / pertanyaan pewawancara | |
| Kartu file (PDF) | **Lampiran diagram / solusi** | |
| Typing… | "Pewawancara menilai…" | |

---

## 3. Token

### 3.1 Warna

**Aksen (oranye)**

| Token | Hex | Sumber / peran |
|---|---|---|
| `--orange-50` | `#FFF6EF` | latar tipis |
| `--orange-100` | `#FDEBDD` | hover ringan, latar chip aktif |
| `--orange-200` | `#FBDCC4` | |
| `--orange-300` | `#F7C19A` | |
| `--orange-400` | `#F0A56B` | **[M]** ujung terang gradien kartu AI (`#EEA66A`) |
| **`--orange-500`** | **`#EE833A`** | **[M]** warna merek: pill "Inbox", bubble, tombol kirim, ikon aktif |
| `--orange-600` | `#E3691A` | [T] hover/pressed |
| `--orange-700` | `#BF530F` | [T] **teks/isian beraksen yang lolos kontras** (§11) |
| `--orange-800` | `#8F3D0B` | |
| `--orange-900` | `#5E2808` | |

**Latar 3D (warna benda di background)**

| Token | Hex | Sumber |
|---|---|---|
| `--bg-0` | `#0A0804` | **[M]** hitam hangat (terukur ≈ `#0A0900`; digeser sedikit agar tidak kehijauan) |
| `--bg-coral` | `#F67455` | **[M]** tepi pita glossy kiri-atas |
| `--bg-red` | `#C54E34` | **[M]** badan pita |
| `--bg-red-deep` | `#7B230F` | **[M]** bayangan merah tua kanan-bawah |
| `--bg-brown` | `#743811` | **[M]** cokelat tembaga |
| `--bg-brown-deep` | `#613A13` | **[M]** |

**Kaca & permukaan gelap**

| Token | Nilai | Sumber |
|---|---|---|
| `--glass-fill` | `rgba(255,255,255,0.09)` | **[T]** menghasilkan `#1F1E19` di atas `#0A0900`, cocok dengan sidebar terukur (`#1E1F18`) |
| `--glass-fill-strong` | `rgba(255,255,255,0.14)` | **[T]** kartu pengguna di dasar sidebar (`#3F403B`) |
| `--glass-stroke` | `rgba(255,255,255,0.12)` | [E] garis tepi shell |
| `--glass-active` | `rgba(238,131,58,0.30)` | [E] pill menu aktif; plus stroke `rgba(238,131,58,0.35)` |
| `--on-glass` | `#FFFDF5` | **[M]** teks menu (`#FFFFF1`) |
| `--on-glass-muted` | `rgba(255,255,255,0.60)` | [T] submenu (`#DEC5B6` di atas tint oranye) |

**Permukaan terang (panel konten)**

| Token | Hex | Sumber |
|---|---|---|
| `--surface-0` | `#FFFFFF` | **[M]** panel, kartu |
| `--surface-50` | `#F7F7F7` | **[M]** baris aktif di daftar |
| `--surface-100` | `#F3F3F3` | [E] input, segmented control |
| `--surface-200` | `#E9E9E7` | [E] chip tidak aktif |
| `--line` | `#EEEEEC` | **[M]** border kartu |
| `--line-strong` | `#D4D4D4` | **[M]** chip tanggal, border tombol |

**Teks**

| Token | Hex | Sumber |
|---|---|---|
| `--ink-900` | `#0A0A0A` | **[M]** judul (terukur `#000`) |
| `--ink-700` | `#3D3D3D` | [E] isi |
| `--ink-600` | `#5F5F5F` | **[M]** deskripsi |
| `--ink-500` | `#848484` | **[M]** teks sekunder (preview pesan) |
| `--ink-400` | `#A8A8A8` | [E] placeholder, ikon redup |
| `--accent-ink` | `#BF530F` | [T] teks oranye di atas putih (tautan "Read more") |

**Status** (semua [E]; wajib disertai ikon + label)

| Token | Hex | Pemakaian |
|---|---|---|
| `--danger` | `#E0262F` | badge hitungan, error |
| `--success` | `#2F9E4F` | isian/ikon (putih di atasnya hanya 3.43:1, jangan dipakai untuk teks kecil) |
| `--success-ink` | `#217A3C` | [T] **teks** hijau ("1 pesan baru", "5/6 lulus"): 5.37:1 di putih, 4.84:1 di `#F3F3F3` |
| `--warning` | `#F5A524` | batas waktu hampir habis |
| `--info` | `#2F6BD8` | informasi netral |

### 3.2 Gradien

```css
:root {
  /* Latar utama: hitam hangat + pita 3D (dipakai bila aset gambar belum dimuat) */
  --grad-bg:
    radial-gradient(60% 45% at 0% 35%,  #F67455 0%, #C54E34 35%, transparent 70%),
    radial-gradient(55% 50% at 100% 100%, #7B230F 0%, rgba(123,35,15,.55) 40%, transparent 75%),
    radial-gradient(35% 30% at 0% 0%,   #613A13 0%, transparent 70%),
    radial-gradient(30% 25% at 55% 0%,  rgba(255,255,255,.14) 0%, transparent 70%), /* garis cahaya putih atas */
    #0A0804;

  /* Kartu Hint/AI (terukur kiri→kanan #E7803D → #EEA66A) */
  --grad-accent: linear-gradient(100deg, #E7803D 0%, #EEA66A 100%);

  /* Tombol utama */
  --grad-accent-btn: linear-gradient(135deg, #F28A3E 0%, #E3691A 100%);

  /* Tepi kaca: terang di atas, memudar ke bawah (pakai mask border) */
  --grad-glass-stroke: linear-gradient(180deg, rgba(255,255,255,.28), rgba(255,255,255,.04) 60%);

  /* Glow peach di latar chat/interview (terukur #FCEEE3 di sisi bawah-kanan) */
  --grad-chat-glow:
    radial-gradient(70% 60% at 70% 100%, #FCEEE3 0%, rgba(252,238,227,0) 70%),
    #FFFFFF;

  /* Scrim kontrol di bawah panel playground */
  --grad-scrim: linear-gradient(180deg, rgba(10,8,4,0) 0%, rgba(10,8,4,.55) 100%);

  /* Fade teks "Read more" */
  --grad-fade-white: linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 85%);

  /* Progres belajar */
  --grad-progress: linear-gradient(90deg, #EE833A 0%, #F67455 100%);
}
```

Garis vertikal halus di glow chat (efek "striations" pada screenshot):
```css
.chat-glow::after {
  content: ""; position: absolute; inset: auto 0 0 0; height: 55%;
  background: repeating-linear-gradient(90deg, rgba(238,131,58,.10) 0 1px, transparent 1px 6px);
  -webkit-mask-image: linear-gradient(180deg, transparent, #000 90%);
          mask-image: linear-gradient(180deg, transparent, #000 90%);
  pointer-events: none;
}
```

### 3.3 Kaca (glassmorphism)

```css
.glass {
  background: var(--glass-fill);
  -webkit-backdrop-filter: blur(24px) saturate(140%);
          backdrop-filter: blur(24px) saturate(140%);
  border: 1px solid var(--glass-stroke);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 40px 120px -24px rgba(0,0,0,.6);
}
@supports not (backdrop-filter: blur(1px)) {
  .glass { background: #1B1915; }   /* fallback solid */
}
```
Aturan: blur hanya pada shell, sidebar, topbar, dan kartu pengguna. Perangkat lemah (`prefers-reduced-transparency` atau `navigator.hardwareConcurrency <= 4`): turunkan blur ke 8px atau ganti solid.

### 3.4 Bentuk, jarak, bayangan

| Token | Nilai | Dipakai |
|---|---|---|
| `--r-shell` | 24px | cangkang aplikasi |
| `--r-panel` | 20px | panel konten putih |
| `--r-card` | 16px | kartu, bubble |
| `--r-media` | 12px | panel playground, thumbnail besar |
| `--r-thumb` | 10px | thumbnail daftar |
| `--r-pill` | 999px | tombol, tag, tab, input |
| `--shadow-card` | `0 1px 2px rgba(10,10,10,.04), 0 8px 24px -12px rgba(10,10,10,.12)` | kartu putih |
| `--shadow-bubble` | `0 1px 3px rgba(10,10,10,.08)` | bubble masuk |
| `--shadow-pop` | `0 12px 40px -8px rgba(10,10,10,.25)` | popover, modal |

Skala jarak 4 pt: `4 8 12 16 20 24 32 40 48 64`. Gutter antar kolom 16, padding panel 12 (bingkai putih tipis di sekeliling isi), padding kartu 16.

---

## 4. Tipografi

**Keluarga**
- **UI & judul:** **DM Sans** (variabel, 400–700). Bentuk huruf di screenshot paling mirip DM Sans; **verifikasi** dengan membandingkan huruf `g`, `y`, `a` di file desain asli.
- **Kode:** **JetBrains Mono** (400/500) dengan ligatur opsional.
- Keduanya berlisensi terbuka (SIL OFL), muat lewat `next/font/google` (subset `latin`, `display: swap`). Cek ulang lisensi saat instalasi.

**Skala (basis 1440 px)**

| Peran | Ukuran / tinggi baris | Berat | Tracking | Contoh |
|---|---|---|---|---|
| Display | 40 / 48 | 600 | -0.02em | hero landing |
| H1 halaman | 24 / 32 | 600 | -0.01em | judul lesson ("The Evolution of…") |
| H2 | 18 / 26 | 600 | -0.005em | judul kartu |
| H3 | 15 / 22 | 600 | 0 | nama di daftar |
| Body | 14 / 22 | 400 | 0 | deskripsi |
| Small | 12 / 18 | 400/500 | 0 | meta, waktu, caption |
| Micro | 11 / 16 | 500 | 0.02em | label "Menu", badge |
| Code | 13 / 20 | 400 | 0 | editor, output |

Aturan: panjang baris isi 60–75 karakter; judul panel maksimum 2 baris (potong dengan elipsis); angka tabel `font-variant-numeric: tabular-nums`; teks di atas aksen oranye hanya berat ≥ 600 (lihat §11).

---

## 5. Layout & grid

### 5.1 Anatomi shell (desktop ≥ 1280)

```
┌────────────────────── latar 3D (--grad-bg / aset) ──────────────────────┐
│  ┌───────────────────── SHELL kaca (r=24) ────────────────────────────┐ │
│  │ SIDEBAR 248   │ TOPBAR 64: ‹ › breadcrumb        [ cari ] (💬)(🔔) │ │
│  │ ┌───────────┐ │ ┌─────────── PANEL KONTEN putih (r=20) ──────────┐ │ │
│  │ │ logo      │ │ │  (isi halaman, padding 12, gutter 16)          │ │ │
│  │ │ Menu      │ │ │                                                │ │ │
│  │ │ …         │ │ │                                                │ │ │
│  │ │ Terakhir  │ │ └────────────────────────────────────────────────┘ │ │
│  │ │ [user]    │ │                                                    │ │
│  │ └───────────┘ │                                                    │ │
│  └───────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```
- Margin bingkai di luar shell: `clamp(16px, 4vw, 56px)`; tinggi shell = `100dvh - 2×margin`.
- Sidebar: 248 px (screenshot ≈ 16% lebar shell). Scroll internal hanya pada area menu.
- Topbar: 64 px, transparan (bagian dari kaca); breadcrumb kiri, pencarian + 2 tombol bulat kanan.
- Panel konten: scroll internal; sudut membulat tetap terlihat (overflow hidden).

### 5.2 Breakpoint

| Rentang | Perilaku |
|---|---|
| ≥ 1280 | Layout penuh seperti screenshot (sidebar 248, 3 kolom pada halaman lesson) |
| 1024–1279 | Sidebar ikon saja (72 px), tooltip label; lesson 2 kolom (playlist pindah ke tab) |
| 768–1023 | Sidebar jadi drawer; topbar menampilkan tombol menu; lesson 1 kolom dengan tab |
| < 768 | Bingkai 0 (full-bleed), **bottom tab bar** 5 item (Home, Track, Latihan, Jadwal, Menu); panel konten putih mengisi layar; blur diturunkan; hint tampil sebagai bottom sheet |

### 5.3 Grid konten
12 kolom di dalam panel, gutter 16. Halaman lesson memakai tiga kolom `minmax(0,1.25fr) minmax(0,1fr) minmax(0,0.95fr)` di bawah panel media (sama dengan proporsi screenshot).

---

## 6. Ikon, avatar, logo

- **Ikon:** `lucide-react`, stroke 1.5, ukuran 16/20/24, ujung membulat. Di sidebar 20 px, warna `--on-glass-muted`, aktif `--orange-500`.
- **Avatar:** lingkaran 24/32/40; cincin 2 px putih pada kaca; bila tanpa foto, inisial di atas gradien oranye lembut. Foto pengguna opsional.
- **Logo ArchForge** (buatan sendiri): hexagon bergradien oranye berisi lengkung (arch) putih, wordmark "ArchForge" DM Sans 600, putih di atas kaca. Sketsa SVG mark:

```svg
<svg viewBox="0 0 32 32" width="28" height="28" fill="none" aria-hidden="true">
  <defs><linearGradient id="af" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#F0A56B"/><stop offset="1" stop-color="#E3691A"/>
  </linearGradient></defs>
  <path d="M16 2.5 28 9.25v13.5L16 29.5 4 22.75V9.25z" stroke="url(#af)" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M10.5 21.5v-5a5.5 5.5 0 0 1 11 0v5" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
</svg>
```
(Sketsa awal; rapikan di Figma sebelum rilis publik.)

---

## 7. Komponen

Semua dibangun di atas shadcn/ui (Radix) dan di-*theme* lewat token di atas.

### 7.1 Navigasi

| Komponen | Spesifikasi |
|---|---|
| **Sidebar item** | tinggi 44, radius 12, ikon 20, gap 12, padding-x 12. Normal: `--on-glass-muted`. Hover: bg `rgba(255,255,255,.06)`. **Aktif:** bg `--glass-active`, stroke oranye 35%, ikon `--orange-500`, teks `--on-glass`, chevron naik bila terbuka |
| **Submenu** | indentasi 28 + garis vertikal 1 px `rgba(255,255,255,.15)` di kiri; tinggi 36; item aktif teks `--orange-500` |
| **Badge hitungan** | lingkaran 18, bg `--danger`, teks putih 11/600, di kanan item |
| **Label seksi** | Micro, `--on-glass-muted`, huruf kapital biasa ("Menu", "Terakhir dibuka") |
| **Terakhir dibuka** | avatar/emblem 24 + nama + badge SRS; baris aktif punya bg kaca |
| **Kartu pengguna** | dasar sidebar, tinggi 64, radius 16, `--glass-fill-strong`, avatar 36, nama 14/600, peran/level 12 muted, ikon ⋮ |
| **Breadcrumb** | `‹ ›` tombol 28; segmen muted; segmen terakhir putih 600, elipsis bila panjang |
| **Search pill** | tinggi 40, lebar 260, `rgba(255,255,255,.14)`, ikon kanan, placeholder muted; **⌘K / Ctrl+K** membuka palet pencarian (FR-14) |
| **Tombol ikon bulat** | 40, `rgba(255,255,255,.14)`; ada titik oranye 8 px untuk status baru |

### 7.2 Tombol

| Varian | Spesifikasi |
|---|---|
| **Primary** | pill, tinggi 40 (36 kecil, 44 besar), `--grad-accent-btn`, teks putih 14/600. Hover: naik 1 px + bayangan oranye `0 8px 20px -8px rgba(238,131,58,.6)`. Disabled: 40% opasitas |
| **Secondary** | pill, bg `--surface-100`, teks `--ink-900`, ikon 16 di kiri ("Download", "Share", "Report") |
| **Dark pill** | bg `--ink-900`, teks putih (tag kategori aktif) |
| **Outline** | border `--line-strong`, bg putih |
| **Icon button** | 36–40, bulat, border `--line`, ikon `--ink-600`; varian oranye terisi untuk aksi utama (kirim, pesan baru) |
| **Link** | `--accent-ink`, 600, garis bawah saat hover ("Read More…") |

Fokus: ring 2 px `--orange-500` + offset 2 px putih (di atas kaca: ring putih 2 px).

### 7.3 Tag, tab, input

| Komponen | Spesifikasi |
|---|---|
| **Tag** | pill tinggi 28, padding-x 12, 12/500. Terisi gelap (`--ink-900`/putih) untuk kategori utama; outline (`--line-strong`) untuk sekunder |
| **Chip meta** | tinggi 20, 10–11 px, bg `--surface-100` ("30m", "Rust", "Level 2") |
| **Segmented tabs** | wadah pill `--surface-100` tinggi 40; tab aktif pill **oranye terisi**, teks putih 600; tab lain teks `--ink-600`; hitungan dalam kurung ("Belum dibaca (3)") |
| **Input** | pill tinggi 44, bg `--surface-100`, ikon di kiri, placeholder `--ink-400`; fokus: border oranye + glow `0 0 0 4px rgba(238,131,58,.16)` |
| **Textarea / komentar** | radius 16, bar bawah berisi ikon emoji + kirim (oranye) |

### 7.4 Kartu & daftar

| Komponen | Spesifikasi |
|---|---|
| **Kartu putih** | radius 16, border `--line`, `--shadow-card`, padding 16 |
| **Item playlist (lesson)** | tinggi 76, thumbnail 72×48 (radius 10, emblem 3D di atas gradien), judul 14/600 (maks 2 baris), chip meta di bawah. **Item aktif:** border 1.5 px `--orange-500` + footer oranye "Sedang dipelajari" dengan ikon (seperti screenshot). Selesai: ceklis hijau di thumbnail |
| **Baris percakapan/sesi** | tinggi 64; avatar 36; nama 14/600; preview 12 `--ink-500`; waktu kanan; status berwarna (`--success` untuk "baru"); baris aktif `--surface-50` |
| **Kartu catatan (pengganti komentar)** | radius 12, border `--line`; header (avatar kecil, judul, waktu, ⋮), isi 13/20, aksi ikon + hitung (suka → "tandai penting", balas → "tautkan ke lesson") |
| **Kartu Hint (pengganti kartu AI)** | radius 16, `--grad-accent`, label putih 12/600 "Hint"; lima tombol bulat 28 `rgba(255,255,255,.22)`: Hint 1, Hint 2, Hint 3, Solusi, Catatan |
| **Kartu metrik** | angka besar 28/600, label 12 muted, sparkline opsional |
| **Kartu 3D emblem** | gambar emblem 3D ± 96 px, judul track, progres cincin/linier |

### 7.5 Progres & status

- **Progress bar:** tinggi 4 (video-style) atau 8 (kartu); track `rgba(255,255,255,.3)` di atas gelap / `--surface-200` di atas putih; isi `--grad-progress`; titik geser 10 px putih pada kontrol seperti video.
- **Cincin progres:** stroke 8, isi `--grad-progress`.
- **Toast:** kapsul kaca gelap di kanan-bawah (mobile: atas), ikon status + teks, 4 detik.
- **Skeleton:** `--surface-100` dengan shimmer 1.2 s; hormati `prefers-reduced-motion`.
- **Badge SRS:** angka kartu jatuh tempo, pill oranye kecil.

### 7.6 Chat / Interview

| Komponen | Spesifikasi |
|---|---|
| **Bubble keluar (jawaban pengguna)** | rata kanan, bg `--orange-500`, teks putih 14/22, radius 16 dengan sudut kanan-bawah 6, padding 12×14; header kecil "09:24 · Anda" + avatar 20 di atasnya |
| **Bubble masuk (pewawancara)** | rata kiri, bg putih, `--shadow-bubble`, teks `--ink-900`, radius 16 sudut kiri-bawah 6 |
| **Kartu lampiran** | di dalam bubble oranye: kotak `rgba(255,255,255,.2)`, ikon file, nama + ukuran, tombol unduh |
| **Chip tanggal / pemisah** | pill `--surface-200` 11 px, tengah ("Hari ini, 21 Jun", "1 pesan baru") |
| **Indikator mengetik** | teks miring `--ink-500`, titik beranimasi (dimatikan saat reduced-motion) |
| **Input bar** | pill 44 `--surface-100`, ikon emoji kiri, tombol lampiran bulat, kirim bulat oranye 40 |
| **Latar** | `--grad-chat-glow` + `.chat-glow::after` |

---

## 8. Pola khusus ArchForge (tidak ada di screenshot)

| Pola | Spesifikasi |
|---|---|
| **Panel Playground** | radius `--r-media`, **terang** secara default (latar editor `#FFFFFF`, gutter `#F7F7F7`); varian gelap `#17120F` untuk editor (opsi pengguna). Tanpa blur atau gambar di belakang kode |
| **Run bar** (pengganti kontrol video) | di bawah editor, tinggi 48: ▶ **Jalankan** (tombol oranye pill), ⟲ Reset, 💡 Hint, penghitung `00:03 / 05:00` (batas waktu, FR-25), dropdown bahasa, ⚙ pengaturan editor. Shortcut ⌘/Ctrl+Enter |
| **Panel output** | tab **Output / Tes / Waktu**; stdout JetBrains Mono 13; stderr `--danger` dengan ikon + baris error yang bisa diklik; tes lulus `--success`, gagal `--danger`, tersembunyi "🔒 tes tersembunyi" |
| **Hasil tes** | daftar baris `[ikon] nama tes · 12 ms`; ringkasan "5/6 lulus" |
| **Kartu SRS (review)** | kartu putih besar tengah, tombol penilaian 4 (Lagi / Sulit / Bagus / Mudah) warna netral + angka interval di bawah tiap tombol; progres sesi di atas |
| **Panel kanvas System Design** | latar panel putih dengan **grid titik** 16 px `#E5E5E3`; node = kartu putih 160×72 dengan sprite 3D 40 px di kiri, nama, kapasitas (RPS); edge 1.5 px `--ink-400`, aktif `--orange-500` bergerak (dash) sesuai beban; node bermasalah: cincin `--danger` + ikon |
| **Palet komponen** | rail kiri 64 px berisi sprite node (drag ke kanvas) |
| **Panel metrik** | kanan, kartu metrik: p50/p95, error rate, utilisasi, biaya relatif; grafik garis; tombol "Lonjakan ×10", "Matikan node" |
| **Mini-ADR drawer** | laci dari kanan 360 px, textarea + checklist rubrik |
| **Tahap interview** | stepper horizontal 4 langkah: Klarifikasi → Rancang → Kode → Analisis; langkah aktif oranye; timer di kanan |
| **Heatmap kebiasaan** | kotak 12 px radius 3, skala `--orange-100 → --orange-700`, dengan label hari |
| **Radar kelemahan** | poligon isi oranye 20% + garis 2 px oranye, sumbu abu |

### 8.1 Tema editor (syntax)

| Token | Terang | Gelap |
|---|---|---|
| Latar | `#FFFFFF` | `#17120F` |
| Teks | `#0A0A0A` | `#F2EEE9` |
| Keyword | `#BF530F` | `#F0A56B` |
| Fungsi/method | `#1F5FBF` | `#7FB0F5` |
| String | `#2A8A4A` | `#7FD39A` |
| Angka/konstanta | `#8A3FB8` | `#C39BEA` |
| Tipe/kelas | `#0F7C8C` | `#6AD0DE` |
| Komentar | `#8A8A8A` | `#8C857E` |
| Baris aktif | `#FFF6EF` | `rgba(255,255,255,.05)` |
| Seleksi | `rgba(238,131,58,.22)` | `rgba(238,131,58,.30)` |
| Error squiggle | `#E0262F` | `#FF6B72` |

(Nilai ini tidak dari screenshot; **cek kontras tiap token** terhadap latar sebelum dikunci.)

### 8.2 Grafik

- **Satu seri / aksen:** `--orange-500`; **magnitudo (heatmap, ringkasan):** ramp oranye `--orange-100 → --orange-900` (satu hue, terang→gelap).
- **Kategorikal (≥ 2 seri):** pakai palet referensi tervalidasi (urutan tetap, jangan diputar):
  Terang `#2a78d6 · #eb6834 · #1baf7a · #eda100 · #e87ba4 · #008300 · #6250d6 · #e34948`;
  Gelap `#3987e5 · #d95926 · #199e70 · #c98500 · #d55181 · #008300 · #9085e9 · #e66767`.
- Saya mencoba palet kategorikal yang berpusat pada oranye merek; **gagal validator** (chroma abu-abu pada slot netral dan separasi CVD rendah), jadi tidak dipakai. Oranye merek tetap dipakai untuk satu seri dan seri pertama yang menjadi fokus.
- Status (lulus/gagal/peringatan) memakai token status **plus ikon dan label**, tidak pernah warna saja.
- Aturan lain: garis 2 px, grid redup, legenda selalu ada untuk ≥ 2 seri, tooltip saat hover, tampilan tabel tersedia.

---

## 9. Gerak & interaksi

| Aksi | Durasi / easing |
|---|---|
| Hover tombol, baris | 150 ms `ease-out` |
| Buka submenu / accordion | 200 ms `cubic-bezier(.2,.8,.2,1)` |
| Pergantian halaman | View Transitions (React 19.2), 220 ms fade + geser 8 px |
| Popover/modal | 180 ms scale 0.98→1 + fade |
| Bubble baru | 160 ms naik 6 px + fade || Edge simulasi aktif | dash bergerak 1.2 s linear (loop) |
| Hasil tes lulus | ceklis menggambar 250 ms |

`prefers-reduced-motion`: matikan geser, dash, shimmer; pertahankan fade 100 ms.
Latar 3D bergerak (landing/login saja) berhenti saat reduced-motion, tab tidak aktif, atau baterai hemat.

---

## 10. Halaman

### 10.1 Peta situs

| Rute | Halaman | Ref. screenshot | PRD |
|---|---|---|---|
| `/` | Landing | — (latar 3D penuh) | — |
| `/login` `/register` `/forgot` | Autentikasi | kartu kaca di atas latar 3D | FR-01 |
| `/onboarding` | Pilih tujuan & jalur belajar, tes level singkat, target harian | kartu putih bertahap | Jalur belajar (§8 PRD) |
| `/dashboard` | **Home** | panel putih + kartu | FR-02, FR-03 |
| `/schedule` | **Jadwal** (Timetable) | kalender + daftar | FR-41 |
| `/projects` `/projects/[id]` | **Proyek & Tugas** | daftar + detail | FR-50..54 |
| `/tracks` | Katalog track | grid kartu emblem 3D | FR-10 |
| `/tracks/[track]` | Detail track (modul, proyek, progres) | | FR-10 |
| `/learn/[track]/[module]/[lesson]` | **Workspace lesson** | **halaman video** | FR-11..13, 20..26 |
| `/practice` `/practice/[id]` | Bank soal DSA | daftar + workspace | Track E |
| `/review` | Sesi SRS | kartu tengah | FR-40, 41 |
| `/system-design` | Daftar skenario | grid | FR-35 |
| `/system-design/[scenario]` | **Simulator** | panel kanvas | FR-30..34 |
| `/interview` | Daftar sesi + mulai baru | daftar kiri halaman Messages | FR-42 |
| `/interview/[session]` | **Interview Room** | **halaman Messages** | FR-42..45 |
| `/progress` | **Progres** (Performance) | kartu metrik + radar | FR-03, FR-45 |
| `/portfolio` | Portofolio proyek | grid | FR-54 |
| `/settings` | Profil, tampilan (tema editor, kontras), bahasa, data & privasi (hapus data) | | |
| `/help` | Bantuan, pintasan keyboard | | |
| overlay | Palet pencarian ⌘K, panel notifikasi | search pill + bel | FR-14 |
| sistem | 404, 500, offline, "Judge0 tidak tersedia" (Python tetap jalan) | | NFR keandalan |
| nanti | `/billing` (v1.5+), `/classes` (P4), `/ai-review` (P2) | Finance | |

### 10.2 Menu sidebar final

```
Menu
  Home
  Jadwal                       (badge: kartu SRS jatuh tempo)
  Proyek & Tugas               (badge: tenggat/aktif)
  Track  ⌄
     Python · Rust · Kotlin · Dart & Flutter
     DSA · System Design · Arsitek · ML & CV · UI/UX
  Latihan
  System Design
  Interview
  Progres
  ─────────
  Bantuan
  Pengaturan
Terakhir dibuka
  [emblem] Ownership (Rust)      ②
  [emblem] URL Shortener         
  [emblem] Sliding Window
[Rado · Hari ke-12 🔥]  ⋮
```
(Emoji api hanya contoh; ganti dengan ikon `flame` lucide.)

### 10.3 Wireframe halaman kunci

**A. Workspace lesson** (diturunkan dari halaman video)

```
┌ breadcrumb: Track › Rust › Inti Rust › Ownership ───────────────────────┐
│ ┌──────────── PANEL PLAYGROUND (r=12, terang) ───────────────────────┐ │
│ │  ┌ Instruksi singkat ─┐ ┌ Editor (CodeMirror 6) ───────────────┐   │ │
│ │  │ tujuan, contoh     │ │ fn main() { … }                      │   │ │
│ │  └────────────────────┘ └──────────────────────────────────────┘   │ │
│ │  [▶ Jalankan] ⟲  💡   00:03 / 05:00        Rust ▾   ⚙              │ │
│ │  Output | Tes | Waktu   → ✓ 5/6 lulus                              │ │
│ └───────────────────────────────────────────────────────────────────┘ │
│ ┌ Info lesson ───────────┐ ┌ Modul ───────────┐ ┌ Hint / Catatan ───┐ │
│ │ [Rust][Level 2]        │ │ [kartu Hint grad]│ │ Catatan pribadi   │ │
│ │ Ownership — judul H1   │ │ ● Variabel   ✓   │ │ Riwayat percobaan │ │
│ │ Tujuan belajar (3)     │ │ ▣ Ownership ← aktif                  │ │
│ │ Deskripsi… Read More…  │ │ ○ Borrowing      │ │ [+ tambah catatan]│ │
│ │ [Salin kode][Bagikan]  │ │ ○ Lifetimes      │ │                   │ │
│ │ [Laporkan masalah]     │ └──────────────────┘ └───────────────────┘ │
└──┴────────────────────────┴──────────────────────────────────────────┘
```
Konten teks panjang lesson (MDX) tampil di tab **Materi** pada panel kiri atas; mode **fokus** menyembunyikan tiga kolom bawah.
Python berjalan lokal di worker (indikator "Memuat Python… 12 MB" saat pertama); Rust lewat server (state antre/kompilasi). Dart memakai iframe DartPad; Kotlin memakai `kotlin-playground`; lesson Compose memakai gambar pratinjau + kuis prediksi UI (lihat PRD §4.3).

**B. Dashboard (Home)** — grid bento 12 kolom

```
┌ Halo, Rado ───────────────────────────────  [Mulai review (12)] ───────┐
│ ┌ Lanjutkan belajar (8) ─────────────────┐ ┌ Streak & target (4) ────┐ │
│ │ emblem 3D  Rust · Ownership  ▓▓▓░ 60%  │ │ 🔥 12 hari  heatmap 7×5 │ │
│ │ [Lanjutkan ▶]                          │ └─────────────────────────┘ │
│ └────────────────────────────────────────┘ ┌ Jadwal hari ini (4) ────┐ │
│ ┌ Track saya (8) — cincin progres ───────┐ │ review 12 · proyek 1    │ │
│ │ Python 45% · Rust 20% · SD 10% …       │ └─────────────────────────┘ │
│ └────────────────────────────────────────┘ ┌ Kelemahan (4) radar ────┐ │
│ ┌ Proyek aktif (6) ┐ ┌ Rekomendasi (6) ─┐ └─────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────┘
```

**C. System Design simulator**

```
┌ breadcrumb: System Design › URL Shortener ───────────────────────────┐
│ ┌ Brief (kiri, 280) ┐ ┌ Kanvas (grid titik) ──────────┐ ┌ Metrik ─┐ │
│ │ kebutuhan, trafik │ │ [palet 64]  ▣client → ▣LB →…   │ │ p95 120ms│ │
│ │ checklist rubrik  │ │                                │ │ err 0.3% │ │
│ └───────────────────┘ └────────────────────────────────┘ │ grafik   │ │
│ [▶ Simulasikan] [Lonjakan ×10] [Matikan node] [Mini-ADR]  └─────────┘ │
└──────────────────────────────────────────────────────────────────────┘
```
Mobile: kanvas penuh, palet dan metrik menjadi bottom sheet; mode sentuh dengan *long-press* untuk menyambung.

**D. Interview Room** (diturunkan dari Messages)

```
┌ Daftar sesi (360) ─────────────┐ ┌ Transkrip ───────────────────────────┐
│ [Aktif][Selesai (14)][Arsip]   │ │ Header: judul · stepper 4 tahap · ⏱  │
│ ▸ Disematkan                   │ │        ┌ pertanyaan pewawancara ┐    │
│ ▸ Semua sesi                   │ │ ┌ jawaban saya (oranye) ┐            │
│  ● Desain URL Shortener  baru  │ │ [lampiran diagram.png]               │
│  ○ Two Sum (coding) selesai    │ │ Pewawancara menilai…                 │
│ 🔒 Catatan sesi tersimpan privat│ │ [😊 Tulis pendekatanmu…] [📎] [➤]   │
└────────────────────────────────┘ └──────────────────────────────────────┘
```
Fase "think aloud" (FR-43): editor/kanvas terkunci sampai pendekatan ditulis. Pewawancara v1 adalah skrip/rubrik; peninjau AI = P2 (FR-46). **Tidak ada DM antar pengguna.**

**E. Katalog track** — grid kartu (3 kolom): emblem 3D 120 px, nama, jumlah modul, progres, tag level; filter segmented (Semua / Bahasa / Fondasi / Arsitektur / ML & CV / UI).

**F. Halaman lain (ringkas)**
- **Jadwal:** kiri kalender minggu (pill oranye pada hari ini), kanan daftar review dan proyek; tombol "Mulai review" besar.
- **Proyek & Tugas:** tab (Aktif / Dikirim / Selesai), kartu proyek dengan acceptance criteria berprogres; detail memuat brief, starter repo, status CI, rubrik mandiri, input tautan repo (FR-50..53).
- **Progres:** kartu metrik (modul/minggu, jam belajar, skor SD), radar kelemahan, heatmap kebiasaan, riwayat sesi interview.
- **Portofolio:** grid kartu proyek selesai (tangkapan layar atau emblem), tombol bagikan.
- **Auth:** kartu kaca 420 px di tengah di atas latar 3D penuh, tombol Google dan email, tautan "Lupa sandi".
- **Pengaturan:** tab Profil · Tampilan (tema editor, kontras `faithful|aa`, ukuran font) · Bahasa · Pintasan · Data & Privasi (ekspor/hapus data).

### 10.4 State wajib per halaman
Memuat (skeleton), kosong (ilustrasi 3D + CTA), galat (pesan ramah + coba lagi), offline, tidak punya akses. Pesan galat eksekusi: bahasa sederhana untuk pemula + detail teknis yang bisa dibuka.

---

## 11. Aksesibilitas

**Temuan penting dari referensi.** Pasangan **putih di atas oranye merek** tidak lolos WCAG. Hasil hitungan dari warna terukur:

| Pasangan | Rasio | Hasil |
|---|---|---|
| Putih di `#E9833D` (kartu AI) | 2.70 : 1 | gagal (butuh 4.5 teks kecil, 3.0 teks besar) |
| Putih di `#F2822E` | 2.62 : 1 | gagal |
| Putih di `#D9660F` | 3.58 : 1 | hanya teks besar ≥ 24 px (atau ≥ 18.66 px tebal) |
| **Putih di `#BF530F`** | **4.71 : 1** | **lolos** |
| `#1A0F08` di `#F2822E` | 7.18 : 1 | lolos |

Karena itu dua mode (variabel CSS, ditukar lewat `data-contrast`):

- **`faithful` (default sementara, untuk pemakaian pribadi):** persis seperti screenshot; putih di atas `--orange-500`.
- **`aa` (wajib aktif sebelum rilis publik):** teks pada isian oranye memakai `--orange-700` (putih di atasnya) atau teks gelap `#1A0F08` di atas `--orange-500`; teks oranye di atas putih memakai `--accent-ink`.

```css
:root[data-contrast="aa"] {
  --btn-bg: linear-gradient(135deg, #D9560F 0%, #BF530F 100%);
  --bubble-out-bg: #BF530F;
  --link: var(--accent-ink);
}
```

**Aturan lain**
- Fokus selalu terlihat (ring 2 px); urutan tab logis; semua tombol ikon punya `aria-label`.
- Status tidak hanya warna: ikon + label (lulus ✓, gagal ✕, peringatan ⚠).
- Target sentuh ≥ 40×40 px.
- Kontras teks panel putih (dihitung): `--ink-700` 10.9:1 ✔; `--ink-600` (`#5F5F5F`) 6.39:1 ✔ (5.75:1 di `#F3F3F3`); `--ink-500` (`#848484`) 3.74:1 (3.37:1 di `#F3F3F3`) **gagal untuk teks kecil**, jadi hanya untuk meta non-esensial ≥ 14 px; `--ink-400` (`#A8A8A8`) 2.38:1 hanya untuk ikon dekoratif.
- **Placeholder dan teks sekunder penting di mode `aa`:** pakai `#6F6F6F` (5.02:1 di putih, 4.53:1 di `#F3F3F3`), bukan `--ink-500`.
- **Teks oranye (`--accent-ink` `#BF530F`):** 4.71:1 di putih tetapi hanya 4.24:1 di `#F3F3F3`; di atas permukaan abu gunakan `#A84A0D` (5.18:1).
- **Teks status:** merah `--danger` 4.68:1 di putih (lolos); hijau pakai `--success-ink`, bukan `--success`. Badge merah dengan angka putih: 4.68:1 (lolos); badge hijau dengan teks putih tidak lolos, pakai `--success-ink` sebagai latar.
- Teks di atas kaca gelap: `--on-glass-muted` (60% putih) harus ≥ 4.5:1 terhadap area terterang latar; uji dengan latar paling terang (pita koral).
- Editor: dukung ukuran font 12–20, kontras tinggi, dan pembaca layar semampunya (PRD §11).
- `prefers-reduced-motion`, `prefers-reduced-transparency`, `prefers-color-scheme` (varian gelap panel, lihat §13.3).

---

## 12. Aset 3D

### 12.1 Prinsip
- 3D adalah **bahan dekoratif**: latar, emblem track, ikon node simulator, medali, ilustrasi state kosong.
- **Pra-render sebagai gambar (AVIF/WebP/PNG transparan) adalah jalur utama.** WebGL interaktif hanya di Landing dan Auth (opsional, lazy). Halaman aplikasi (lesson, simulator, interview) **tidak memuat WebGL** agar tidak berebut CPU/GPU dengan Pyodide dan engine simulasi.
- Satu gaya: **kaca oranye tembus cahaya + logam tembaga gelap, tepi pantulan putih, latar hitam hangat.**

### 12.2 Inventaris aset (disesuaikan dengan PRD)

| ID | Aset | Dipakai di | Ukuran | Jumlah |
|---|---|---|---|---|
| `bg/shell` | Latar utama: pita glossy koral→merah, garis cahaya putih kiri-atas, bayangan merah kanan-bawah | semua halaman app | 2560×1600 (AVIF + WebP) | 1 + varian `bg/shell-alt` |
| `bg/auth` | Latar login (komposisi lebih tenang, ruang kosong di tengah) | `/login` `/register` | 2560×1600 | 1 |
| `bg/landing` | Hero (objek utama di kanan, ruang teks kiri) | `/` | 2560×1600 + `@2x` | 1 |
| `emblem/*` | Emblem 3D per track (lihat 12.3) | katalog, dashboard, playlist, sidebar "Terakhir dibuka" | 512×512 PNG/AVIF transparan | 10 |
| `node/*` | Sprite 3D isometrik komponen simulator | kanvas SD, palet | 256×256 transparan | 13 (sesuai PRD §7) |
| `badge/*` | Medali pencapaian | Progres, Portofolio | 384×384 | 8 |
| `empty/*` | Ilustrasi state kosong/error | semua halaman | 640×480 | 6 |
| `logo/mark-3d` | Logo hexagon-arch 3D | Landing, splash | 512×512 | 1 |

### 12.3 Emblem track (metafora, **bukan logo resmi bahasa**)

| Track | Objek 3D |
|---|---|
| Python | dua pita kaca saling melingkar membentuk simpul tak hingga |
| Rust | roda gigi dari logam tembaga dengan retakan emas di tepi |
| Kotlin | prisma kristal bersisi tajam bergradasi oranye ke ungu gelap |
| Dart & Flutter | anak panah/dart kaca menembus lapisan kartu bertumpuk |
| DSA | gugus simpul bola kaca terhubung batang tipis (pohon/graf) |
| System Design | blok isometrik bertumpuk dengan tautan bercahaya |
| Arsitek | jangka dan piramida cetak biru di atas lempeng |
| ML & CV | bola lensa/mata kaca dengan cincin pemindai |
| UI/UX | tiga kartu kaca berlapis dengan kursor di atasnya |
| Interview | dua gelembung ucapan kaca yang saling tumpang |

**Penting:** jangan memasukkan logo resmi Python, Rust, Kotlin, Dart, Flutter ke prompt/aset. Itu merek dagang dengan pedoman penggunaan; jika kelak dipakai, cek aturan masing-masing.

### 12.4 Node simulator (sesuai PRD §7)

Client (laptop/ponsel kaca), DNS (buku alamat/globus kecil), CDN (globus dengan titik tepi), Load Balancer (percabangan jalur), API Server (rak server), Cache (kubus bercahaya cepat), DB Primary (silinder kaca), DB Replica (silinder + salinan transparan), Queue (rel dengan kotak), Worker (roda gigi kecil), Object Storage (lemari arsip/bucket), Rate Limiter (gerbang bertuas), API Gateway (gerbang lengkung).
Konvensi: pandangan isometrik 30°, satu objek, bayangan kontak lembut, warna mengikuti token (§3.1), **status** ditunjukkan dengan cincin UI (bukan di dalam gambar) sehingga satu sprite dipakai ulang.

### 12.5 Medali & ilustrasi

- **Badge:** Hari ke-7 (api kaca), Hari ke-30, Proyek pertama, 10 soal pola, Skenario SD pertama, Skor SD ≥ 80%, Review 100 kartu, Sesi interview selesai.
- **Empty:** belum ada lesson, tidak ada review hari ini, belum ada proyek, hasil pencarian kosong, offline, layanan eksekusi tidak tersedia.

### 12.6 Panduan gaya (untuk semua pembuatan aset)

| Parameter | Nilai |
|---|---|
| Material | kaca tembus cahaya warna oranye (transmission ≈ 0.8, IOR ≈ 1.45, roughness 0.1–0.15) dan logam tembaga gelap (metalness 1, roughness 0.3) |
| Palet | `#EE833A` utama, `#F0A56B` terang, `#C54E34` / `#7B230F` merah tua, dasar `#0A0804` |
| Cahaya | key hangat dari kanan-atas, rim putih tipis di tepi kiri, bounce oranye dari bawah; HDRI studio redup |
| Kamera | lensa 35 mm, elevasi 15°, sudut 3/4; latar transparan (emblem/node/badge) |
| Komposisi | objek utama 70% bingkai, tepi aman 12%; latar `bg/*` menyisakan area teks kosong |
| Pasca-proses | bloom halus, vinyet ringan hanya di `bg/*`, tanpa teks/logo di dalam gambar |
| Konsistensi | seluruh emblem dirender dengan kamera dan rig cahaya yang sama |

### 12.7 Cara membuat (alat-netral)

Pilih sesuai kenyamanan; spesifikasi di atas berlaku untuk semuanya.

1. **Generator gambar/3D berbasis AI (tercepat).** Hasilkan gambar 2D transparan atau model 3D dari prompt (12.8), lalu rapikan di editor gambar/Blender. Cek ketentuan lisensi komersial alat yang dipakai sebelum rilis publik.
2. **Blender (kontrol penuh, konsisten).** Satu *scene template* (kamera, lampu, HDRI, material kaca/tembaga) lalu ganti objek per aset; render batch ke PNG transparan 16-bit → kompres ke AVIF/WebP. Cocok untuk emblem, node, dan medali yang butuh konsistensi.
3. **Procedural / kode (untuk latar bergerak).** Komponen React Three Fiber di Landing/Auth. Sketsa (belum diuji, **verifikasi versi `three`, `@react-three/fiber`, `@react-three/drei` yang cocok dengan React 19.2**):

```tsx
'use client';
import { Canvas } from '@react-three/fiber';
import { Float, Environment, MeshTransmissionMaterial } from '@react-three/drei';

export function HeroRibbon() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 35 }} dpr={[1, 1.5]}>
      <Environment preset="studio" />
      <Float speed={1} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh>
          <torusKnotGeometry args={[1.1, 0.32, 220, 32]} />
          <MeshTransmissionMaterial
            color="#EE833A" thickness={0.6} roughness={0.12}
            transmission={1} ior={1.45} chromaticAberration={0.03}
          />
        </mesh>
      </Float>
    </Canvas>
  );
}
```
Muat dengan `next/dynamic` (`ssr: false`), **tampilkan gambar statis `bg/landing` sebagai placeholder** dan sebagai pengganti penuh bila: tidak ada WebGL, `prefers-reduced-motion`, mode hemat data, atau perangkat lemah.

### 12.8 Templat prompt

**Gaya dasar (tempel di awal setiap prompt):**
> glossy translucent orange glass and dark copper metal, soft studio lighting, warm white rim light, subtle caustics, shallow depth of field, premium 3D render, dark warm black background, color palette #EE833A #F0A56B #C54E34 #7B230F, no text, no logo, no watermark

**Negatif:**
> text, letters, logos, brand marks, people, faces, hands, clutter, harsh shadows, blue tint, low-poly, cartoon, noisy background, cropped object

**Per aset (tambahkan setelah gaya dasar):**

| ID | Prompt tambahan |
|---|---|
| `bg/shell` | "abstract flowing glossy ribbons curving from the left edge, coral to deep red, thin white light streak from top, large empty dark space in the center, wide 16:10 composition" |
| `bg/auth` | "two soft glass rings bottom-left and top-right, calm composition, large empty center for a login card" |
| `bg/landing` | "hero composition, a large twisted glass ribbon knot on the right third, small floating glass cubes, empty left side for headline" |
| `emblem/python` | "two interlocking glass ribbons forming an infinity knot, centered, isolated, transparent background" |
| `emblem/rust` | "copper gear with fine gold cracks on the rim, centered, isolated" |
| `emblem/kotlin` | "faceted crystal prism gradient from orange to dark violet, isolated" |
| `emblem/flutter-dart` | "glass dart arrow piercing a stack of translucent cards, isolated" |
| `emblem/dsa` | "cluster of glass spheres connected by thin copper rods like a tree graph, isolated" |
| `emblem/system-design` | "stack of isometric glass blocks linked by glowing lines, isolated" |
| `emblem/architect` | "copper drafting compass resting on a translucent blueprint pyramid, isolated" |
| `emblem/ml-cv` | "glass lens sphere with a scanning ring, like an abstract eye, isolated" |
| `emblem/ui-ux` | "three layered glass cards with a cursor arrow on top, isolated" |
| `emblem/interview` | "two overlapping translucent speech bubbles, isolated" |
| `node/<nama>` | "isometric 30 degree view of a small glass <objek> icon, single object, soft contact shadow, transparent background, 256px" |
| `badge/<nama>` | "round glass medal with embossed <simbol>, copper rim, front view, isolated" |
| `empty/<nama>` | "small diorama scene of <situasi>, calm, lots of negative space, soft orange glow" |

### 12.9 Spesifikasi berkas & performa

| Aspek | Aturan |
|---|---|
| Lokasi | `public/assets/3d/{bg,emblem,node,badge,empty,logo}/` |
| Penamaan | `emblem-rust@2x.avif`, `node-load-balancer.png` (huruf kecil, tanda hubung) |
| Format | AVIF utama, WebP cadangan, PNG hanya sumber/transparansi kritis |
| Anggaran | `bg/*` ≤ 180 KB; `bg/landing` ≤ 250 KB; emblem ≤ 40 KB; node ≤ 15 KB; total 3D di halaman aplikasi ≤ 400 KB; seluruh aset ≤ 1.5 MB |
| Pemuatan | `bg/shell` dengan `priority`; emblem `loading="lazy"`; blur-placeholder (LQIP) kecil; `next/image` |
| Alt text | dekoratif → `alt=""` ; emblem yang menandai konten (track) → `alt` nama track |
| Hak cipta | simpan sumber (`.blend`/prompt) di `design/3d-src/`; catat alat dan lisensi tiap aset di `design/3d-src/LICENSES.md` |

---

## 13. Implementasi

### 13.1 Token di Tailwind (asumsi Tailwind v4: tema lewat CSS)

Jika proyek memakai Tailwind v3, petakan nilai yang sama ke `theme.extend` di `tailwind.config`.

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --font-sans: var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;

  --color-orange-50:  #FFF6EF;  --color-orange-100: #FDEBDD;
  --color-orange-200: #FBDCC4;  --color-orange-300: #F7C19A;
  --color-orange-400: #F0A56B;  --color-orange-500: #EE833A;
  --color-orange-600: #E3691A;  --color-orange-700: #BF530F;
  --color-orange-800: #8F3D0B;  --color-orange-900: #5E2808;

  --color-bg-0: #0A0804;
  --color-ink-900: #0A0A0A; --color-ink-700: #3D3D3D; --color-ink-600: #5F5F5F;
  --color-ink-500: #848484; --color-ink-400: #A8A8A8;
  --color-surface-50: #F7F7F7; --color-surface-100: #F3F3F3; --color-surface-200: #E9E9E7;
  --color-line: #EEEEEC; --color-line-strong: #D4D4D4;
  --color-danger: #E0262F; --color-success: #2F9E4F;
  --color-warning: #F5A524; --color-info: #2F6BD8;

  --radius-shell: 24px; --radius-panel: 20px; --radius-card: 16px;
  --radius-media: 12px; --radius-thumb: 10px;
}
```
Variabel kaca, gradien, dan bayangan (§3.2–3.4) diletakkan di `:root` pada berkas yang sama.

### 13.2 Pemetaan shadcn/ui

| Variabel shadcn | Nilai |
|---|---|
| `--background` | `--surface-0` (panel); shell memakai `--bg-0` |
| `--foreground` | `--ink-900` |
| `--primary` / `--primary-foreground` | `--orange-500` / putih (mode `aa`: `--orange-700`) |
| `--secondary` | `--surface-100` |
| `--muted` / `--muted-foreground` | `--surface-100` / `--ink-500` |
| `--accent` | `--orange-100` |
| `--destructive` | `--danger` |
| `--border` / `--input` | `--line` / `--surface-100` |
| `--ring` | `--orange-500` |
| `--radius` | 16px |

### 13.3 Tema gelap panel (turunan, tidak ada di screenshot)

Screenshot hanya menampilkan panel putih. Untuk mode gelap panel (opsional, v1.0): `--surface-0 → #17120F`, `--surface-50 → #1F1914`, `--line → rgba(255,255,255,.08)`, `--ink-900 → #F2EEE9`, `--ink-600 → #BDB5AD`, `--ink-500 → #9A928A`, `--accent-ink → #F0A56B`; shell tetap kaca. **Validasi ulang kontras** setelah ditentukan.

### 13.4 Struktur komponen

```
apps/web/src/
├─ components/
│  ├─ shell/        AppShell, Sidebar, Topbar, Breadcrumb, UserCard
│  ├─ ui/           Button, Tag, Tabs, Input, Card, Badge, Toast … (shadcn)
│  ├─ learn/        PlaygroundPanel, RunBar, OutputPanel, HintCard, LessonList, NoteCard
│  ├─ srs/          ReviewCard, RatingButtons
│  ├─ sd/           Canvas, NodePalette, MetricsPanel, AdrDrawer
│  ├─ interview/    SessionList, Transcript, Bubble, PhaseStepper
│  ├─ viz/          Heatmap, Radar, ProgressRing
│  └─ art/          Background3D, EmblemImage, NodeSprite, EmptyState
├─ styles/          globals.css, tokens.css
└─ public/assets/3d/…
```

### 13.5 Checklist QA visual
- [ ] Shell, sidebar, topbar sama dengan screenshot pada 1440×900 (bandingkan overlay 50%).
- [ ] Pill aktif sidebar, badge merah, submenu dengan garis vertikal.
- [ ] Panel putih + tiga kolom di bawah panel playground sesuai proporsi.
- [ ] Tab segmented oranye, tag hitam/outline, kartu Hint bergradien.
- [ ] Bubble oranye/putih, kartu lampiran, glow peach di bawah chat.
- [ ] Kontras mode `aa` lolos; fokus terlihat; reduced-motion bekerja.
- [ ] Breakpoint 1024 / 768 / 390 berfungsi (sidebar ikon, bottom tab bar).
- [ ] Perangkat lemah: blur turun, tidak ada WebGL di halaman app.
- [ ] Anggaran aset 3D terpenuhi; LCP < 2,5 dtk di 4G (PRD §11).

---

## 14. Hal yang perlu diverifikasi
1. **Font:** DM Sans paling mirip; cocokkan dengan sumber desain. Cek lisensi DM Sans dan JetBrains Mono saat instalasi.
2. **Warna status [E]:** merah badge, hijau "pesan baru", warning, info. Ambil dengan color picker jika file desain asli tersedia.
3. **Opasitas kaca** dihitung dari dua titik; cek di atas bagian latar yang paling terang.
4. **Tailwind v3 vs v4** di proyek; sesuaikan §13.1.
5. **React Three Fiber / drei** vs React 19.2 + Next 16 (kompatibilitas versi) sebelum dipakai.
6. **Lisensi alat pembuat aset 3D/AI** untuk pemakaian komersial; simpan catatannya.
7. Kontras token editor (§8.1) dan tema gelap panel (§13.3) belum diukur.
8. `backdrop-filter` di perangkat Android menengah ke bawah: uji performa nyata.
9. Dukungan View Transitions di semua browser sasaran (sediakan fallback tanpa animasi).
