# Silabus ArchForge (Beginner → Expert)

**11 track · 63 modul · 105 lesson · 200 soal · 8 skenario SD · 28 proyek · 15 soal pola DSA**


## Track 0 — Fondasi Komputasi
_Peta dunia sebelum menulis kode: CPU, memori, data, terminal, jaringan._


### Cara komputer menjalankan program
*Tujuan:* Memahami CPU, memori, stack/heap, proses/thread

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **CPU, Memori, Stack vs Heap**<br><sub>_Kamu jadi koki CPU: resep ada di rak RAM, meja kerja = stack, gudang = heap._</sub> | 🌱 Beginner | 20 | Menjelaskan peran CPU dan RAM; Membedakan stack dan heap | mcq×2 |
| **Proses vs Thread**<br><sub>_Satu restoran (proses), banyak pelayan (thread), satu dapur bersama._</sub> | 🌱 Beginner | 20 | Membedakan proses dan thread; Menjelaskan kenapa thread berbagi memori | mcq×1, fill-blank×1 |

### Representasi data
*Tujuan:* Bit/byte, integer, float, Unicode

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Bit, Byte, dan Integer**<br><sub>_Lampu saklar: 8 saklar menyimpan angka 0–255. Bisa kamu nyalakan angka 42?_</sub> | 🌱 Beginner | 20 | Mengonversi biner ke desimal; Menghitung rentang integer N-bit | mcq×1, fill-blank×1 |
| **Float dan Unicode**<br><sub>_Misteri uang receh yang hilang 0.0000000000000000555 rupiah._</sub> | 🌱 Beginner | 25 | Menjelaskan kenapa 0.1+0.2≠0.3; Memahami UTF-8 | mcq×2 |

### Logika & pemecahan masalah
*Tujuan:* Pseudocode, alur kontrol, debugging

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Pseudocode & Debugging Rubber Duck**<br><sub>_Jelaskan bug-mu ke bebek karet. Seringnya, kamu menemukannya sendiri._</sub> | 🌱 Beginner | 20 | Menulis pseudocode; Mereproduksi dan mengisolasi bug | parsons×1, mcq×1 |

### Terminal, Git, membaca error
*Tujuan:* Bekerja nyaman di terminal & Git

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Terminal, Git, dan Membaca Error**<br><sub>_Mesin waktu bernama git: simpan, kembali, bercabang._</sub> | 🌱 Beginner | 30 | Menavigasi file via terminal; Commit dan push dengan Git; Membaca stack trace | mcq×2, parsons×1 |

### Jaringan dasar
*Tujuan:* IP, DNS, TCP/UDP, HTTP, REST, WebSocket

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **IP, DNS, TCP/UDP**<br><sub>_Perjalanan satu klik: dari ketik domain sampai halaman muncul._</sub> | 🌱 Beginner | 25 | Menjelaskan alur DNS; Membedakan TCP dan UDP | mcq×2 |
| **HTTP, REST, dan WebSocket**<br><sub>_Kamu jadi kurir pesan: GET mengambil, POST mengantar, WebSocket menelepon._</sub> | 🔧 Menengah | 25 | Memilih metode & status HTTP yang tepat; Menentukan kapan memakai WebSocket | mcq×2, fill-blank×1 |

## Track A — Python: Dari Nol ke Data/ML
_Bahasa pertama yang ramah: dari variabel sampai numpy/pandas._ Bahasa: python


### A1 Dasar
*Tujuan:* Variabel, kondisi, loop, fungsi, struktur data · *Mini-proyek:* CLI todo

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Variabel dan Tipe Data**<br><sub>_Kalkulator suhu untuk wisata ke Dieng yang dingin._</sub> | 🌱 Beginner | 20 | Memakai int/float/str/bool; Mengonversi tipe | code×1, mcq×1 |
| **Kondisi dan Loop**<br><sub>_Game FizzBuzz: tebak aturan tersembunyi dari output._</sub> | 🌱 Beginner | 25 | Menulis if/elif/else; Menulis for dan while | code×1, parsons×1 |
| **Fungsi**<br><sub>_Bangun mesin kecil: masukkan angka, keluarkan angka yang aman._</sub> | 🌱 Beginner | 25 | Mendefinisikan fungsi, parameter default; Menghindari mutable default | code×1, mcq×1 |
| **List, Dict, Set, Tuple**<br><sub>_Hitung kata terpopuler di lirik fiksi buatanmu._</sub> | 🌱 Beginner | 30 | Memilih struktur data yang tepat; Menghitung frekuensi dengan dict | code×1, fill-blank×1 |

### A2 Menengah
*Tujuan:* OOP, exception, comprehension, generator, decorator, type hints

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **OOP: Class dan Objek**<br><sub>_Rancang mesin kasir yang tak bisa dicurangi._</sub> | 🔧 Menengah | 30 | Membuat class dengan state dan method; Menjaga invarian | code×1, mcq×1 |
| **Exception dan File I/O**<br><sub>_Input pengguna selalu nakal. Bikin program yang tidak mudah panik._</sub> | 🔧 Menengah | 25 | Menangani error dengan try/except; Membaca/menulis file | code×1, mcq×1 |
| **Comprehension dan Generator**<br><sub>_Pabrik angka tanpa batas yang hemat memori._</sub> | 🔧 Menengah | 25 | Menulis comprehension; Memakai yield untuk lazy sequence | code×1, mcq×1 |
| **Decorator dan Type Hints**<br><sub>_Bungkus fungsi seperti kado: tambah log tanpa sentuh isinya._</sub> | 🚀 Lanjut | 30 | Menulis decorator; Menambah type hints | code×1, mcq×1 |

### A3 Praktik
*Tujuan:* Testing, venv/pyproject, async, regex, HTTP · *Mini-proyek:* Scraper sederhana

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Testing, venv, dan pyproject**<br><sub>_Jadilah QA bagi kodemu sendiri._</sub> | 🔧 Menengah | 30 | Menulis tes dengan assert; Mengelola lingkungan virtual | code×1, fill-blank×1 |
| **Async, Regex, JSON/HTTP**<br><sub>_Detektif teks: tangkap email dari log yang berantakan._</sub> | 🚀 Lanjut | 35 | Memahami async/await; Menulis regex; Memanggil API HTTP | code×1, mcq×1 |

### A4 Ilmiah
*Tujuan:* numpy, pandas, matplotlib di Pyodide · *Mini-proyek:* Analisis dataset kecil

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **numpy: Array dan Broadcasting**<br><sub>_Satu baris numpy menggantikan 20 baris loop._</sub> | 🚀 Lanjut | 30 | Memakai ndarray; Memprediksi shape hasil broadcasting | code×1, mcq×1 |
| **pandas dan matplotlib**<br><sub>_Bedah data penjualan warung dan temukan pelanggan emas._</sub> | 🚀 Lanjut | 35 | Mengelompokkan data dengan groupby; Membuat grafik | code×1, mcq×1 |

## Track B — Rust: Dari Nol ke Sistem
_Ownership, konkurensi, web, WASM: bahasa sistem yang aman._ Bahasa: rust


### B1 Dasar
*Tujuan:* Cargo, mutabilitas, tipe, fungsi, alur · *Mini-proyek:* CLI grep mini

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Cargo, Variabel, dan Mutabilitas**<br><sub>_Rust suka bilang tidak. Bagus: itu tanda sayang._</sub> | 🌱 Beginner | 20 | Membuat proyek Cargo; Memahami let vs let mut | code×1, mcq×1 |
| **Tipe, Fungsi, dan Alur Kontrol**<br><sub>_Lintasi labirin Collatz: berapa langkah sampai 1?_</sub> | 🌱 Beginner | 25 | Memakai tipe skalar; Menulis fungsi dan loop | code×1 |

### B2 Inti Rust
*Tujuan:* Ownership, borrowing, lifetimes, struct/enum, Option/Result

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Ownership**<br><sub>_Satu kunci rumah, satu pemilik. Serahkan kunci = kamu tak bisa masuk lagi._</sub> | 🔧 Menengah | 30 | Menjelaskan aturan ownership; Memprediksi move vs copy | mcq×2, fill-blank×1 |
| **Borrowing dan Lifetimes**<br><sub>_Pinjam buku dari perpustakaan: tak boleh lebih lama dari umur perpustakaan._</sub> | 🚀 Lanjut | 35 | Membedakan & dan &mut; Membaca anotasi lifetime | code×1, mcq×1 |
| **Struct, Enum, Pattern Matching**<br><sub>_Kalkulator luas bangun datar: compiler memaksa kamu tak lupa satu bentuk pun._</sub> | 🔧 Menengah | 30 | Memodelkan data dengan enum; Menulis match yang exhaustive | code×1, mcq×1 |
| **Option dan Result**<br><sub>_Tak ada null. Ada Option. Tidur lebih nyenyak._</sub> | 🔧 Menengah | 25 | Menangani ketiadaan nilai dengan Option; Memakai ? untuk error | code×1, mcq×1 |

### B3 Abstraksi
*Tujuan:* Trait, generics, closure, iterator, koleksi, modul

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Trait dan Generics**<br><sub>_Satu fungsi untuk semua tipe, tanpa kehilangan kecepatan._</sub> | 🚀 Lanjut | 35 | Menulis fungsi generik dengan trait bound; Membedakan static vs dynamic dispatch | code×1, mcq×1 |
| **Closure dan Iterator**<br><sub>_Rantai pipa data: filter, map, jumlahkan._</sub> | 🚀 Lanjut | 30 | Merangkai iterator adapter; Memahami lazy evaluation | code×1, mcq×1 |
| **Koleksi dan Modul**<br><sub>_Hitung frekuensi kata: HashMap sebagai alat serbaguna._</sub> | 🚀 Lanjut | 30 | Memakai Vec/HashMap; Mengatur modul dan visibilitas | code×1, mcq×1 |

### B4 Keandalan
*Tujuan:* Error handling, testing, dokumentasi · *Mini-proyek:* Key-value store

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Error Handling Idiomatik**<br><sub>_Kalkulator yang menolak dengan sopan._</sub> | 🚀 Lanjut | 30 | Mendesain error type; Menyebarkan error dengan ? | code×1 |
| **Testing dan Dokumentasi**<br><sub>_Dokumentasi yang bisa dijalankan sebagai tes._</sub> | 🚀 Lanjut | 25 | Menulis unit test; Menulis doc comment dan doctest | fill-blank×1, mcq×1 |

### B5 Konkurensi
*Tujuan:* Thread, channel, Arc/Mutex, async Tokio, Send/Sync

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Thread dan Channel**<br><sub>_Empat koki memasak bersamaan, satu kasir menjumlahkan._</sub> | 🚀 Lanjut | 35 | Membagi kerja ke thread; Mengirim hasil lewat channel | code×1 |
| **Arc, Mutex, Send, Sync**<br><sub>_Satu papan skor, banyak pemain, tak ada skor yang hilang._</sub> | 🏆 Expert | 35 | Berbagi state aman antar thread; Menjelaskan Send/Sync | code×1, mcq×1 |
| **async/await dan Tokio**<br><sub>_Satu pelayan, seribu meja: kuncinya tidak menunggu sambil berdiri._</sub> | 🏆 Expert | 35 | Menjelaskan Future dan executor; Menulis task Tokio sederhana | mcq×2 |

### B6 Sistem & Web
*Tujuan:* Axum, serde, sqlx, WASM, FFI, unsafe · *Mini-proyek:* HTTP server / engine simulasi

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Axum, serde, sqlx**<br><sub>_Rakit API pertamamu: dari request sampai baris di Postgres._</sub> | 🏆 Expert | 40 | Membangun endpoint JSON; Query DB tervalidasi compile-time | mcq×1, fill-blank×1 |
| **WASM, FFI, dan unsafe**<br><sub>_Rust menembus browser: engine simulasi System Design jalan di tab-mu._</sub> | 🏆 Expert | 40 | Mengekspor fungsi ke WASM; Memakai unsafe secara bertanggung jawab | mcq×2 |

## Track C — Kotlin & Jetpack Compose
_Dari null safety, coroutines, sampai UI deklaratif Android._ Bahasa: kotlin


### C1 Dasar
*Tujuan:* val/var, null safety, fungsi, alur

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **val, var, dan Null Safety**<br><sub>_NullPointerException? Di sini ia dilarang masuk._</sub> | 🌱 Beginner | 20 | Membedakan val/var; Memakai ?. dan ?: | code×1, mcq×1 |
| **Fungsi dan Alur Kontrol**<br><sub>_when: switch yang naik kelas._</sub> | 🌱 Beginner | 25 | Menulis fungsi ekspresi; Memakai when | code×1 |

### C2 OOP & Fungsional
*Tujuan:* Class, sealed, extension, lambda, koleksi

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Class, Data Class, Sealed**<br><sub>_Sealed class: daftar kemungkinan yang tertutup rapat._</sub> | 🔧 Menengah | 30 | Memakai data class; Memodelkan state dengan sealed | code×1 |
| **Lambda dan Koleksi**<br><sub>_Rantai transformasi koleksi seperti merakit LEGO._</sub> | 🔧 Menengah | 30 | Merangkai filter/map/sorted; Memahami Sequence | code×1 |

### C3 Lanjut
*Tujuan:* Generics, delegation, DSL, coroutines & Flow

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Generics, Delegation, DSL**<br><sub>_Bikin bahasa mini di dalam Kotlin._</sub> | 🚀 Lanjut | 35 | Memahami variance (in/out); Menulis DSL kecil | mcq×2 |
| **Coroutines dan Flow**<br><sub>_Ribuan tugas ringan, tanpa neraka callback._</sub> | 🏆 Expert | 40 | Membedakan launch/async; Memahami structured concurrency dan Flow | mcq×2 |

### C4 Praktik
*Tujuan:* Testing, Gradle, Ktor, KMP, jembatan Flutter · *Mini-proyek:* REST API Ktor

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Testing, Gradle, Ktor**<br><sub>_Server mungil dalam 10 baris._</sub> | 🚀 Lanjut | 40 | Menulis tes JUnit; Membuat route Ktor | fill-blank×1, mcq×1 |
| **Kotlin Multiplatform & Jembatan Platform**<br><sub>_Tulis sekali, jalan di mana-mana, dengan sadar harganya._</sub> | 🏆 Expert | 35 | Memahami expect/actual; Menghubungkan ke Flutter lewat platform channel | fill-blank×1, mcq×1 |

### C5 UI dengan Jetpack Compose
*Tujuan:* UI = fungsi dari state · *Mini-proyek:* App Compose daftar+detail

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Compose: Composable, Modifier, Layout**<br><sub>_UI adalah fungsi. Ubah inputnya, UI berubah._</sub> | 🔧 Menengah | 30 | Menyusun Row/Column/Box; Memakai Modifier | ui-predict×1, mcq×1 |
| **State dan State Hoisting**<br><sub>_Siapa pemilik state? Jawabannya: yang paling atas yang butuh._</sub> | 🚀 Lanjut | 35 | Memakai remember/mutableStateOf; Mengangkat state ke atas | ui-predict×1, mcq×1 |
| **Material 3, Navigasi, Animasi**<br><sub>_Satu tema, seluruh app berganti suasana._</sub> | 🚀 Lanjut | 35 | Menerapkan theming M3; Mengatur navigasi | mcq×2 |
| **Recomposition, Performa, Aksesibilitas**<br><sub>_Kenapa layar berkedip? Telusuri recomposition berlebih._</sub> | 🏆 Expert | 40 | Mengurangi recomposition; Menerapkan semantics & ukuran sentuh | mcq×2 |

## Track D — Dart & Flutter
_Satu codebase, UI lintas platform: dari widget tree sampai FFI Rust._ Bahasa: dart


### D1 Dart
*Tujuan:* Sintaks, null safety, async, isolate

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Dart: Sintaks dan Null Safety**<br><sub>_Dart: bahasa yang dirancang untuk UI._</sub> | 🌱 Beginner | 25 | Memakai tipe & null safety; Memakai koleksi dan fungsi | code×1, mcq×1 |
| **Future, Stream, Isolate**<br><sub>_Banyak pekerjaan, satu thread UI yang harus tetap mulus._</sub> | 🚀 Lanjut | 30 | Membedakan Future dan Stream; Menjelaskan isolate | mcq×2 |

### D2 Flutter Inti
*Tujuan:* Widget tree, layout, state, navigasi

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Widget Tree dan Layout**<br><sub>_Semua adalah widget, bahkan padding._</sub> | 🔧 Menengah | 30 | Menyusun Row/Column/Stack; Membaca widget tree | ui-predict×1, mcq×1 |
| **State dan Navigasi**<br><sub>_Dari satu layar ke banyak layar tanpa tersesat._</sub> | 🔧 Menengah | 35 | Memakai setState dan Riverpod/Provider; Navigasi antar layar | mcq×2 |

### D3 Praktik
*Tujuan:* HTTP/JSON, penyimpanan lokal, testing, performa · *Mini-proyek:* App catatan offline-first

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **HTTP, Penyimpanan Lokal, Testing**<br><sub>_App yang tetap berguna saat sinyal hilang._</sub> | 🚀 Lanjut | 40 | Mengambil JSON; Menyimpan lokal; Menulis widget test | mcq×2 |

### D4 Arsitektur App
*Tujuan:* Clean architecture, DI, platform channel, FFI

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Clean Architecture, DI, FFI**<br><sub>_Pisahkan UI dari logika sampai bisa diganti tanpa menangis._</sub> | 🏆 Expert | 40 | Menerapkan repository & DI; Memanggil Rust via FFI | mcq×2 |

### D5 Flutter UI Mendalam
*Tujuan:* Constraints, sliver, painter, animasi, adaptif, golden test

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Constraints, Sliver, Scroll**<br><sub>_Constraints go down, sizes go up, parent sets position._</sub> | 🚀 Lanjut | 35 | Menjelaskan aturan constraints; Memakai Sliver | fill-blank×1, mcq×1 |
| **Animasi dan CustomPainter**<br><sub>_Hidupkan UI: dari fade sederhana sampai kanvas sendiri._</sub> | 🏆 Expert | 40 | Membedakan implicit/explicit; Menggambar dengan CustomPainter | ui-predict×1, mcq×1 |
| **UI Adaptif, Aksesibilitas, Golden Test**<br><sub>_Satu app, dari ponsel sampai layar 27 inci._</sub> | 🏆 Expert | 40 | Membuat layout adaptif; Menguji tampilan dengan golden test | mcq×2 |

### D6 Rancang UI (design-to-code)
*Tujuan:* Tokens, komponen, Figma ke layar nyata · *Mini-proyek:* Toolkit komponen UI

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Design Tokens dan Komponen Reusable**<br><sub>_Ganti satu warna di satu tempat, seluruh app ikut._</sub> | 🚀 Lanjut | 35 | Mendefinisikan tokens; Membangun komponen konsisten | ui-predict×1, mcq×1 |
| **Dari Figma ke Layar Nyata**<br><sub>_Rakit ulang desain pixel demi pixel, lalu bandingkan._</sub> | 🏆 Expert | 40 | Menerjemahkan frame Figma ke widget; Menangani state loading/empty/error | mcq×1, ui-predict×1 |

## Track E — Struktur Data, Algoritma & Live Coding
_Dari Big-O sampai 15 pola soal dan teknik live coding._ Bahasa: python, rust


### E1 Dasar Kompleksitas
*Tujuan:* Big-O waktu/ruang, amortized

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Big-O: Waktu dan Ruang**<br><sub>_Kenapa satu kode 1 detik, kode lain 1 jam? Rahasia Big-O._</sub> | 🌱 Beginner | 25 | Menentukan Big-O loop bersarang; Memahami amortized | mcq×2 |

### E2 Struktur Data
*Tujuan:* Array sampai union-find · *Mini-proyek:* Mini-library struktur data

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Array dan Hash Table**<br><sub>_Mencari jarum di tumpukan jerami dalam sekali lihat._</sub> | 🔧 Menengah | 30 | Memakai hash table untuk lookup O(1); Menyelesaikan two-sum | code×1 |
| **Stack, Queue, Heap**<br><sub>_Tumpukan piring, antrean loket, dan prioritas UGD._</sub> | 🔧 Menengah | 35 | Memilih stack/queue/heap; Mengevaluasi RPN | code×1 |
| **Tree, Graph, Trie, Union-Find**<br><sub>_Silsilah keluarga, peta kota, dan kamus: semua graf._</sub> | 🚀 Lanjut | 40 | Menghitung tinggi tree; Memodelkan masalah sebagai graph | code×1 |

### E3 Teknik
*Tujuan:* Two pointers, DP, graf · *Mini-proyek:* Visualizer algoritma

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Two Pointers dan Sliding Window**<br><sub>_Jendela geser: sekali lewat, tanpa mengulang._</sub> | 🔧 Menengah | 30 | Mengenali masalah window; Menulis solusi O(n) | code×1 |
| **Binary Search dan Rekursi**<br><sub>_Tebak angka 1–1.000.000 dalam 20 tebakan._</sub> | 🚀 Lanjut | 35 | Menulis lower_bound dengan benar; Merancang kasus dasar rekursi | code×1 |
| **Dynamic Programming dan Greedy**<br><sub>_Maling pintar: ambil rumah yang tidak bersebelahan._</sub> | 🚀 Lanjut | 40 | Merumuskan state dan transisi DP; Membedakan DP dan greedy | code×1 |
| **BFS, DFS, Topological Sort, Dijkstra**<br><sub>_Rute tercepat di peta kota imajiner._</sub> | 🏆 Expert | 45 | Memakai BFS untuk jarak terpendek; Menjelaskan Dijkstra | code×1 |

### E4 Pola Soal
*Tujuan:* 15 pola umum, soal terkurasi · *Mini-proyek:* 30 soal pola

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Peta 15 Pola Soal**<br><sub>_Setiap soal punya sidik jari. Pelajari mengenalinya._</sub> | 🚀 Lanjut | 30 | Mengenali pola dari ciri soal; Memilih struktur data yang tepat | mcq×2 |

### E5 Teknik Live Coding
*Tujuan:* Klarifikasi sampai analisis kompleksitas

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Teknik Live Coding**<br><sub>_Bicara sambil mengetik: skill yang bisa dilatih._</sub> | 🏆 Expert | 30 | Menjalankan fase klarifikasi sampai analisis; Memverbalisasi pikiran | parsons×1, mcq×1 |

## Track F — System Design & Arsitektur IT
_Dari estimasi kapasitas sampai 8 skenario sistem nyata._


### F1 Fondasi
*Tujuan:* Skala, latensi vs throughput, estimasi, SLO

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Estimasi Kapasitas dan SLO**<br><sub>_Berapa server yang dibutuhkan? Tebak dengan rumus, bukan firasat._</sub> | 🔧 Menengah | 30 | Melakukan back-of-envelope estimation; Menghitung error budget | fill-blank×1, code×1 |

### F2 Blok Bangunan
*Tujuan:* DNS, CDN, LB, gateway, rate limiting

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **DNS, CDN, Load Balancer, API Gateway**<br><sub>_Pintu masuk stadion: bagaimana 50.000 orang masuk tanpa desak-desakan?_</sub> | 🔧 Menengah | 30 | Memilih algoritma LB; Menempatkan CDN dan gateway | mcq×2 |

### F3 Data
*Tujuan:* SQL/NoSQL, index, replikasi, sharding

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **SQL/NoSQL, Index, Replikasi**<br><sub>_Buku telepon tanpa abjad? Itu database tanpa index._</sub> | 🚀 Lanjut | 40 | Menjelaskan manfaat dan biaya index; Memahami replication lag | mcq×2 |
| **Sharding dan Consistent Hashing**<br><sub>_Pindah 1 dari 4 server tanpa memindahkan semua data._</sub> | 🏆 Expert | 40 | Membagi data lintas shard; Mengimplementasikan hash ring | code×1 |

### F4 Caching
*Tujuan:* Pola cache, invalidasi, stampede

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Pola Caching dan Eviction**<br><sub>_Cache cepat, invalidasi sulit. Kita hadapi keduanya._</sub> | 🚀 Lanjut | 35 | Membedakan cache-aside dan write-through; Mengimplementasikan LRU | code×1, mcq×1 |

### F5 Sistem Terdistribusi
*Tujuan:* CAP/PACELC, konsistensi, idempotensi, konsensus

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **CAP, PACELC, Model Konsistensi**<br><sub>_Dua ATM, jaringan putus: izinkan tarik tunai atau tidak?_</sub> | 🏆 Expert | 40 | Menjelaskan CAP dan PACELC; Memilih model konsistensi | mcq×2 |
| **Idempotensi dan Konsensus**<br><sub>_Klik bayar dua kali, tertagih sekali._</sub> | 🏆 Expert | 40 | Mendesain API idempoten; Menjelaskan Raft secara konsep | code×1 |

### F6 Komunikasi
*Tujuan:* REST/gRPC/GraphQL, queue, streaming

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **REST, gRPC, GraphQL, Real-time**<br><sub>_Pilih bahasa percakapan antar layanan._</sub> | 🚀 Lanjut | 30 | Membandingkan gaya API; Memilih WebSocket/SSE/polling | mcq×2 |
| **Queue, Pub/Sub, Event Streaming**<br><sub>_Kurir antar layanan yang tidak boleh menghilangkan paket._</sub> | 🏆 Expert | 35 | Membedakan at-least-once dan exactly-once; Memakai outbox | fill-blank×1, mcq×1 |

### F7 Keandalan
*Tujuan:* Circuit breaker, retry, DR, chaos

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Circuit Breaker, Retry, DR**<br><sub>_Sistem yang jatuh dengan anggun, bukan dengan teriakan._</sub> | 🏆 Expert | 40 | Menghitung backoff; Merancang degradasi anggun dan RPO/RTO | code×1, mcq×1 |

### F8 Observability & Operasi
*Tujuan:* Log/metrik/trace, SLO budget

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Observability dan SLO Budget**<br><sub>_Dokter butuh monitor jantung. Sistem butuh metrik._</sub> | 🏆 Expert | 35 | Membedakan log/metrik/trace; Menghitung error budget | mcq×2 |

### F9 Keamanan
*Tujuan:* AuthN/Z, OAuth2, OWASP, STRIDE

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Keamanan: AuthN/Z, OWASP, STRIDE**<br><sub>_Pikir seperti penyerang untuk mendesain seperti pembela._</sub> | 🏆 Expert | 40 | Membandingkan JWT dan sesi; Melakukan threat modeling STRIDE | mcq×2 |

### F10 Kasus Lengkap
*Tujuan:* 8 skenario dengan alur interview · *Mini-proyek:* Desain lengkap + presentasi

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **8 Skenario Sistem Lengkap**<br><sub>_Delapan sistem, delapan tantangan, satu kanvas._</sub> | 🏆 Expert | 60 | Menyelesaikan skenario end-to-end; Menulis mini-ADR | sd-scenario×8 |

## Track G — Peran & Praktik Arsitek
_C4, ADR, DDD, trade-off, platform, sampai kepemimpinan teknis._


### G1 Peran
*Tujuan:* EA, SA, software architect

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **EA, Solution, dan Software Architect**<br><sub>_Tiga topi arsitek: strategi, solusi, struktur._</sub> | 🔧 Menengah | 25 | Membedakan tiga peran arsitek; Memetakan jalur karier | mcq×2 |

### G2 Pemodelan & Dokumentasi
*Tujuan:* C4, UML, ADR, arc42

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **C4 Model dan ADR**<br><sub>_Peta zoom-in untuk sistemmu, plus buku harian keputusan._</sub> | 🚀 Lanjut | 35 | Menggambar C4 level 1–3; Menulis ADR | parsons×1, mcq×1 |

### G3 Gaya Arsitektur
*Tujuan:* Monolit modular, microservices, event-driven, CQRS

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Monolit, Microservices, Event-Driven, CQRS**<br><sub>_Jangan pecah monolit kalau belum sakit._</sub> | 🚀 Lanjut | 40 | Membandingkan gaya arsitektur; Menentukan kapan memecah monolit | mcq×2 |

### G4 Desain Domain
*Tujuan:* DDD, API design, OpenAPI

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **DDD dan Desain API**<br><sub>_Bahasa bersama dengan bisnis: Ubiquitous Language._</sub> | 🏆 Expert | 40 | Menetapkan bounded context; Mendesain kontrak OpenAPI | fill-blank×1, mcq×1 |

### G5 Atribut Kualitas
*Tujuan:* NFR dan analisis trade-off (ATAM)

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Atribut Kualitas dan Trade-off**<br><sub>_Cepat, murah, aman: pilih dua, lalu jelaskan harganya._</sub> | 🏆 Expert | 40 | Menuliskan NFR terukur; Menganalisis trade-off dengan ATAM | mcq×2 |

### G6 Rekayasa Platform
*Tujuan:* CI/CD, IaC, container, strategi rilis

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **CI/CD, IaC, Container, Strategi Rilis**<br><sub>_Rilis di hari Jumat tanpa keringat dingin._</sub> | 🏆 Expert | 45 | Membandingkan blue/green dan canary; Memahami 12-factor | mcq×2 |

### G7 Cloud
*Tujuan:* Shared responsibility, region/AZ, FinOps

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Cloud, Shared Responsibility, FinOps**<br><sub>_Tagihan cloud juga bagian dari arsitektur._</sub> | 🏆 Expert | 35 | Menjelaskan shared responsibility; Menghitung biaya dasar | mcq×1, fill-blank×1 |

### G8 Kepemimpinan Teknis
*Tujuan:* Stakeholder, utang teknis, review desain · *Mini-proyek:* Dokumen arsitektur arc42

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Kepemimpinan Teknis**<br><sub>_Arsitek yang baik membuat tim lebih pintar._</sub> | 🏆 Expert | 35 | Mengelola utang teknis; Memimpin design review | mcq×2 |

## Track H — Machine Learning & Computer Vision
_Matematika, ML klasik, deep learning, CV, sampai ONNX di browser._ Bahasa: python


### H1 Matematika Terapan
*Tujuan:* Vektor, probabilitas, gradien

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Matematika Terapan: Vektor, Probabilitas, Gradien**<br><sub>_Dua kalimat, seberapa mirip? Hitung dengan sudut vektor._</sub> | 🔧 Menengah | 35 | Menghitung dot product & cosine; Memahami gradien | code×1 |

### H2 ML Klasik
*Tujuan:* Regresi, klasifikasi, validasi, metrik · *Mini-proyek:* Klasifikasi gambar sederhana

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **ML Klasik dan Metrik**<br><sub>_Alarm kebakaran yang terlalu sensitif: precision atau recall?_</sub> | 🚀 Lanjut | 40 | Menghitung precision/recall; Mengenali overfitting | code×1 |

### H3 Deep Learning
*Tujuan:* Backprop, CNN, transfer learning

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Deep Learning: Neuron, CNN, Transfer Learning**<br><sub>_Neuron buatan: tebakan yang belajar dari salah._</sub> | 🏆 Expert | 45 | Menghitung softmax; Menjelaskan CNN dan transfer learning | code×1 |

### H4 Computer Vision
*Tujuan:* Kernel, kontur, deteksi, segmentasi, OCR

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Computer Vision: Gambar dan Kernel**<br><sub>_Gambar hanyalah angka. Sobel mengubahnya jadi sketsa._</sub> | 🚀 Lanjut | 40 | Menerapkan kernel konvolusi; Menjelaskan deteksi tepi | code×1 |
| **Deteksi Objek, Segmentasi, OCR**<br><sub>_Seberapa pas kotak tebakanmu? Ukur dengan IoU._</sub> | 🏆 Expert | 45 | Menghitung IoU; Menjelaskan NMS | code×1 |

### H5 MLOps
*Tujuan:* ONNX, kuantisasi, inferensi di browser, drift · *Mini-proyek:* Demo CV di browser

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **MLOps: ONNX, Kuantisasi, Drift**<br><sub>_Latih di laptop, jalankan di browser teman._</sub> | 🏆 Expert | 40 | Mengekspor ke ONNX; Menjelaskan kuantisasi dan drift | mcq×3 |

## Track I — Persiapan Interview
_Alur, behavioral STAR, dan simulasi penuh berwaktu._


### I1 Alur & Rubrik
*Tujuan:* Struktur interview coding & system design

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Alur Interview Coding dan System Design**<br><sub>_Interview adalah permainan dengan aturan. Hafalkan aturannya._</sub> | 🚀 Lanjut | 25 | Menyusun fase interview; Memahami rubrik umum | parsons×1, mcq×1 |

### I2 Behavioral
*Tujuan:* STAR, negosiasi

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Behavioral STAR dan Negosiasi**<br><sub>_Ceritakan kegagalanmu dengan bangga._</sub> | 🚀 Lanjut | 25 | Menyusun cerita STAR; Berkomunikasi trade-off | fill-blank×1, mcq×1 |

### I3 Simulasi Penuh
*Tujuan:* 45–60 menit berwaktu + umpan balik

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Simulasi Penuh Berwaktu**<br><sub>_Boss terakhir: timer berjalan, penonton diam._</sub> | 🏆 Expert | 60 | Menyelesaikan interview 45–60 menit; Menerima umpan balik terstruktur | mcq×1, sd-scenario×1 |

## Track J — Desain UI/UX & Rancang Antarmuka
_Prinsip visual sampai evaluasi kegunaan; diimplementasi di Compose dan Flutter._


### J1 Prinsip Visual
*Tujuan:* Hierarki, grid, tipografi, warna, kontras

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Prinsip Visual: Hierarki, Grid, Warna, Kontras**<br><sub>_Kenapa tombol itu tak terlihat? Salahkan kontras._</sub> | 🌱 Beginner | 30 | Menerapkan grid 4/8pt; Menghitung rasio kontras WCAG | code×1, fill-blank×1 |

### J2 Desain Interaksi
*Tujuan:* Alur, umpan balik, state kosong/error/loading

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Desain Interaksi dan State UI**<br><sub>_Layar kosong bukan layar jelek, hanya belum dirancang._</sub> | 🔧 Menengah | 30 | Merancang loading/empty/error; Menulis microcopy | mcq×2 |

### J3 Sistem Desain
*Tujuan:* Tokens, komponen, varian

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Design Tokens dan Komponen**<br><sub>_Satu sumber kebenaran untuk semua pixel._</sub> | 🚀 Lanjut | 30 | Mendefinisikan tokens; Menyusun varian komponen | mcq×2 |

### J4 Rancang di Figma
*Tujuan:* Auto layout, prototipe, handoff

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Rancang di Figma**<br><sub>_Prototipe klik-klik sebelum satu baris kode ditulis._</sub> | 🚀 Lanjut | 35 | Memakai auto layout dan komponen; Menyiapkan handoff | mcq×2 |

### J5 Platform
*Tujuan:* Material 3 vs HIG, adaptif, dark mode, lokalisasi

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Material 3 vs HIG, Adaptif, Dark Mode**<br><sub>_Satu desain, dua kebiasaan platform._</sub> | 🚀 Lanjut | 30 | Membandingkan M3 dan HIG; Mengatur lokalisasi ID vs EN | mcq×2 |

### J6 Evaluasi
*Tujuan:* Uji kegunaan, heuristik, aksesibilitas · *Mini-proyek:* Satu desain → dua implementasi

| Lesson | Tier | Menit | Tujuan belajar | Soal |
|---|---|---|---|---|
| **Uji Kegunaan dan Aksesibilitas**<br><sub>_Lima pengguna pertama menemukan 85% masalah._</sub> | 🚀 Lanjut | 35 | Menghitung skor SUS; Memakai heuristik Nielsen | code×1, mcq×1 |
