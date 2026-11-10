import { pool } from "../lib/db.ts";

/**
 * Curated data map for each of the 63 modules in ArchForge.
 * Ensures every single module in Neon PostgreSQL has its own rich interactive lesson
 * with comprehensive MDX conceptual guidance, objectives, and testable exercises.
 */

const MODULE_LESSON_MAP = {
  // --- TRACK 0: Fondasi Komputasi ---
  "t0-m1": {
    title: "Arsitektur Eksekusi: CPU, Cache L1-L3, Stack vs Heap & Thread",
    level: "beginner",
    estMinutes: 20,
    objectives: [
      "Membedakan alokasi memori Stack (LIFO, stack pointer) vs Heap (dinamis, pointer)",
      "Menjelaskan siklus CPU Fetch-Decode-Execute dan hirarki cache L1/L2/L3",
      "Memahami batas isolasi proses vs thread yang berbagi memori",
    ],
    tags: ["fondasi", "cpu", "memory", "stack-heap"],
    concept: "Memahami bagaimana CPU mengeksekusi instruksi dan mengapa memori Stack ~100x lebih cepat dibanding Heap karena akses LIFO dan CPU cache locality.",
    exercise: {
      kind: "mcq",
      prompt: "Manakah pernyataan yang BENAR mengenai alokasi memori di Stack vs Heap?",
      choices: [
        { id: "a", text: "Stack dialokasikan sangat cepat dengan menggeser register Stack Pointer dan otomatis dibersihkan saat fungsi return." },
        { id: "b", text: "Heap lebih cepat dibanding Stack karena tidak memerlukan allocator." },
        { id: "c", text: "Stack dapat menampung data dinamis dengan ukuran tak terbatas saat runtime." },
      ],
      correct: "a",
      explanation: "Alokasi stack hanya menggeser CPU stack pointer, sedangkan heap memerlukan algoritma pencarian blok memori bebas."
    }
  },
  "t0-m2": {
    title: "Representasi Data Biner: Two's Complement, Float IEEE 754 & UTF-8",
    level: "beginner",
    estMinutes: 20,
    objectives: [
      "Mengonversi bilangan biner, heksadesimal, dan desimal",
      "Memahami representasi integer negatif dengan Two's Complement (Invert + 1)",
      "Menjelaskan mengapa 0.1 + 0.2 != 0.3 pada standar float IEEE 754",
    ],
    tags: ["binary", "twos-complement", "float", "utf8"],
    concept: "Komputer hanya mengenal representasi biner. Bilangan negatif disimpan dalam Two's Complement agar sirkuit penambahan dan pengurangan di ALU identik.",
    exercise: {
      kind: "fill-blank",
      prompt: "Berapakah hasil operasi bitwise masking `0b10110010 & 0b00001111` dalam format desimal?",
      blanks: [{ id: "b1", accepted: ["2"] }],
      explanation: "0b10110010 & 0b00001111 = 0b00000010, yang setara dengan desimal 2."
    }
  },
  "t0-m3": {
    title: "Logika Pemrograman, Pseudocode & Rubber Duck Debugging",
    level: "beginner",
    estMinutes: 20,
    objectives: [
      "Menulis pseudocode yang independen dari sintaks bahasa spesifik",
      "Menerapkan teknik Rubber Duck Debugging untuk melacak asumsi kode yang keliru",
      "Mendeteksi off-by-one errors pada batas loop",
    ],
    tags: ["logic", "debugging", "pseudocode"],
    concept: "Sebelum menulis kode di keyboard, alur kontrol dan invarian logika harus dipetakan dalam pseudocode. Menerangkan kode baris demi baris pada objek bebek karet mengungkap kontradiksi logika.",
    exercise: {
      kind: "mcq",
      prompt: "Apa tujuan utama dari teknik Rubber Duck Debugging?",
      choices: [
        { id: "a", text: "Memverbalisasikan asumsi kode dengan lantang agar otak menyadari kontradiksi antara apa yang diasumsikan vs apa yang tertulis." },
        { id: "b", text: "Mengompilasi kode ke WebAssembly secara otomatis." },
        { id: "c", text: "Menghapus bug memori tanpa perlu menjalankan test." },
      ],
      correct: "a",
      explanation: "Proses memverbalisasikan logika memaksa otak mengevaluasi ulang premis dan asumsi implisit yang menyebabkan bug."
    }
  },
  "t0-m4": {
    title: "Perkakas Pengembang: Terminal POSIX, Git & Membaca Stack Trace",
    level: "beginner",
    estMinutes: 25,
    objectives: [
      "Menguasai pipeline CLI Unix: piping (|), redirect (>, >>), grep, awk",
      "Memahami model objek Git: commit graph, tree, blob, staging index",
      "Membaca pesan compiler dan stack trace dari baris teratas ke terbawah",
    ],
    tags: ["git", "posix", "terminal", "cli"],
    concept: "Terminal POSIX memungkinkan otomatisasi pipeline log data. Git adalah content-addressable file system berbasis Directed Acyclic Graph (DAG) dari commit snapshot.",
    exercise: {
      kind: "fill-blank",
      prompt: "Flag apakah pada `git commit` yang otomatis men-stage file-file terdaftar yang diubah tanpa perlu `git add` terpisah?\n\n`git commit -___BLANK_1___ -m \"Pesan\"`",
      blanks: [{ id: "BLANK_1", accepted: ["a", "am"] }],
      explanation: "Flag `-a` (all) men-stage semua perubahan file yang sudah terlacak oleh git."
    }
  },
  "t0-m5": {
    title: "Jaringan Dasar: TCP 3-Way Handshake, UDP, TLS 1.3 & HTTP/3",
    level: "beginner",
    estMinutes: 25,
    objectives: [
      "Membedakan TCP (in-order delivery, retransmisi) vs UDP (datagram cepat)",
      "Menjelaskan 3-Way Handshake TCP (SYN, SYN-ACK, ACK)",
      "Memahami mengapa HTTP/3 beralih ke QUIC over UDP untuk menghindari Head-of-Line Blocking",
    ],
    tags: ["networking", "tcp", "udp", "http3"],
    concept: "TCP menjamin pengiriman paket berurutan, namun 1 paket yang hilang memicu Head-of-Line Blocking. HTTP/3 menggunakan QUIC di atas UDP sehingga setiap stream independen.",
    exercise: {
      kind: "mcq",
      prompt: "Mengapa protokol HTTP/3 memilih menggunakan QUIC di atas UDP daripada TCP konvensional?",
      choices: [
        { id: "a", text: "Untuk mengeliminasi Head-of-Line Blocking pada level transport saat terjadi packet loss parsial di jaringan." },
        { id: "b", text: "Karena TCP sudah usang dan dilarang oleh standar browser." },
        { id: "c", text: "Agar koneksi tidak memerlukan enkripsi." },
      ],
      correct: "a",
      explanation: "QUIC di atas UDP memungkinkan banyak stream berjalan independen tanpa saling menunggu saat terjadi packet loss."
    }
  },

  // --- TRACK A: Python ---
  "ta-a1": {
    title: "Python Dasar: Variabel, Koleksi & Slicing Idiomatik",
    level: "beginner",
    estMinutes: 20,
    objectives: [
      "Menguasai koleksi bawaan: list, dict, set, tuple",
      "Menggunakan slicing `[start:stop:step]` secara efisien",
      "Memahami mutabilitas objek dan dictionary comprehension",
    ],
    tags: ["python", "collections", "slicing"],
    concept: "Python menganggap semua variabel sebagai referensi objek. Koleksi seperti dict menggunakan hash table teroptimasi dengan lookup $O(1)$.",
    exercise: {
      kind: "code",
      prompt: "Lengkapi fungsi `reverse_words(s)` untuk membalik urutan kata dalam string:",
      starterCode: "def reverse_words(s: str) -> str:\n    return ' '.join(s.split()[::-1])\n\nprint(reverse_words('halo dari archforge'))",
      solution: "return ' '.join(s.split()[::-1])",
      explanation: "`s.split()` memecah kata berdasarkan spasi, dan `[::-1]` membalik urutan list dengan step negatif."
    }
  },
  "ta-a2": {
    title: "Python Menengah: Generator Memory Streaming & Decorator",
    level: "intermediate",
    estMinutes: 25,
    objectives: [
      "Menghemat RAM dengan Generator `yield` untuk membaca dataset gigabyte",
      "Membuat Decorator dengan `functools.wraps` untuk logging dan timing",
      "Menggunakan Type Hints dan Pydantic untuk validasi schema data",
    ],
    tags: ["python", "generators", "decorators"],
    concept: "Generator mengevaluasi data secara malas (lazy evaluation) sehingga hanya elemen yang sedang diminta yang disimpan di memori, menghasilkan konsumsi RAM $O(1)$.",
    exercise: {
      kind: "code",
      prompt: "Lengkapi generator `fibonacci(n)` yang menghasilkan deret Fibonacci hingga `n` angka:",
      starterCode: "def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n\nfor num in fibonacci(5):\n    print(num)",
      solution: "yield a; a, b = b, a + b",
      explanation: "Generator menyimpan state lokal `a` dan `b` di antara setiap panggilan `yield`."
    }
  },
  "ta-a3": {
    title: "Python Praktik: Asyncio Event Loop & Testing Pytest",
    level: "intermediate",
    estMinutes: 25,
    objectives: [
      "Memahami single-threaded event loop di Asyncio dan batasan Python GIL",
      "Menjalankan request I/O bound secara paralel dengan `asyncio.gather`",
      "Menulis automated unit tests menggunakan fixture di Pytest",
    ],
    tags: ["python", "asyncio", "pytest"],
    concept: "Asyncio menggunakan coroutine non-blocking untuk memproses ribuan koneksi jaringan tanpa overhead thread operating system.",
    exercise: {
      kind: "fill-blank",
      prompt: "Dekorator apakah di Pytest yang digunakan untuk membuat reusable test fixture?\n\n`@pytest.___BLANK_1___`",
      blanks: [{ id: "BLANK_1", accepted: ["fixture"] }],
      explanation: "`@pytest.fixture` mempersiapkan data uji atau koneksi mock sebelum pengujian dijalankan."
    }
  },
  "ta-a4": {
    title: "Python Ilmiah: NumPy Vectorization & Pandas Data Cleaning",
    level: "advanced",
    estMinutes: 30,
    objectives: [
      "Mengganti perulangan for dengan NumPy SIMD vectorization (100x lebih cepat)",
      "Memahami aturan NumPy broadcasting pada matriks berbeda dimensi",
      "Melakukan transformasi DataFrame, indexing boolean, dan agregasi data di Pandas",
    ],
    tags: ["python", "numpy", "pandas"],
    concept: "NumPy menyimpan data dalam array C yang contiguous, mengeksekusi operasi matematika pada jutaan elemen secara paralel menggunakan instruksi SIMD CPU.",
    exercise: {
      kind: "code",
      prompt: "Hitung Z-Score normalisasi: `(arr - mean) / std` menggunakan NumPy tanpa perulangan:",
      starterCode: "import numpy as np\narr = np.array([10.0, 20.0, 30.0])\nz = (arr - np.mean(arr)) / np.std(arr)\nprint(z)",
      solution: "(arr - np.mean(arr)) / np.std(arr)",
      explanation: "NumPy menerapkan operasi pengurangan skalar dan pembagian ke setiap elemen secara vectorized."
    }
  },

  // --- TRACK B: Rust ---
  "tb-b1": {
    title: "Rust Dasar: Cargo, Immutability Default & Sistem Tipe",
    level: "beginner",
    estMinutes: 20,
    objectives: [
      "Menjalankan proyek Rust dengan `cargo build`, `cargo run`, dan `cargo check`",
      "Memahami immutability default dan kapan menggunakan `let mut`",
      "Membedakan tipe skalar (i32, f64, bool, char) dan komposit (tuple, array)",
    ],
    tags: ["rust", "cargo", "types"],
    concept: "Rust menjamin keandalan sistem dengan menjadikan semua variabel immutable secara default, mencegah data race saat multi-threading.",
    exercise: {
      kind: "mcq",
      prompt: "Perintah Cargo manakah yang paling cepat untuk memeriksa error kompilasi tanpa membuat binary executable?",
      choices: [
        { id: "a", text: "cargo check" },
        { id: "b", text: "cargo build --release" },
        { id: "c", text: "cargo clean" },
      ],
      correct: "a",
      explanation: "`cargo check` melewati proses code generation LLVM sehingga berjalan jauh lebih cepat dibanding build penuh."
    }
  },
  "tb-b2": {
    title: "Inti Rust: Ownership, Borrowing & Lifetimes",
    level: "intermediate",
    estMinutes: 25,
    objectives: [
      "Menerapkan 3 aturan kepemilikan (ownership) tanpa runtime garbage collector",
      "Membedakan Move semantics vs Borrowing (& / &mut)",
      "Mencegah use-after-free dan dangling pointers saat compile-time",
    ],
    tags: ["rust", "ownership", "borrowing", "memory-safety"],
    concept: "Setiap nilai di Rust memiliki satu pemilik (owner). Ketika pemilik keluar dari scope, memori otomatis dibebaskan (drop). Peminjaman referensi diverifikasi oleh Borrow Checker.",
    exercise: {
      kind: "code",
      prompt: "Perbaiki kode Rust berikut agar nilai string dipinjam (&) dan tidak dipindahkan (moved):",
      starterCode: "fn calculate_len(s: &String) -> usize {\n    s.len()\n}\n\nfn main() {\n    let s1 = String::from(\"ArchForge\");\n    let len = calculate_len(&s1);\n    println!(\"s1: {}, len: {}\", s1, len);\n}",
      solution: "calculate_len(&s1)",
      explanation: "Dengan melewatkan referensi `&s1`, ownership tetap dipegang oleh fungsi `main`."
    }
  },
  "tb-b3": {
    title: "Abstraksi Zero-Cost: Trait, Generics & Monomorphization",
    level: "intermediate",
    estMinutes: 25,
    objectives: [
      "Mendefinisikan Trait sebagai kontrak perilaku bersama",
      "Memahami bagaimana Monomorphization menghasilkan kode generik secepat kode manual",
      "Menggunakan Iterator adapters (map, filter, fold) tanpa alokasi memori tambahan",
    ],
    tags: ["rust", "traits", "generics", "zero-cost"],
    concept: "Rust mengompilasi Generic dengan menduplikasi fungsi untuk setiap tipe nyata pada saat kompilasi (monomorphization), menghasilkan pemanggilan langsung tanpa vtable overhead.",
    exercise: {
      kind: "code",
      prompt: "Implementasikan trait `Area` untuk menghitung luas persegi panjang:",
      starterCode: "struct Rect { w: u32, h: u32 }\ntrait Area { fn area(&self) -> u32; }\nimpl Area for Rect {\n    fn area(&self) -> u32 { self.w * self.h }\n}\nfn main() { println!(\"{}\", Rect { w: 4, h: 5 }.area()); }",
      solution: "self.w * self.h",
      explanation: "Implementasi trait melekat langsung pada struct dengan inlining maksimal."
    }
  },
  "tb-b4": {
    title: "Keandalan Produksi: Error Handling (Result, Option & thiserror)",
    level: "intermediate",
    estMinutes: 20,
    objectives: [
      "Mengganti runtime exceptions dengan enum `Result<T, E>` yang eksplisit",
      "Menggunakan operator tanda tanya (?) untuk propagasi error ringkas",
      "Mendesain hierarki error kustom dengan derive macro `thiserror`",
    ],
    tags: ["rust", "error-handling", "result", "thiserror"],
    concept: "Rust tidak memiliki exception. Semua kemungkinan kegagalan wajib ditangani secara eksplisit melalui tipe `Result`, membuat kode sistem tahan banting.",
    exercise: {
      kind: "fill-blank",
      prompt: "Karakter apakah yang digunakan di akhir fungsi untuk mempropagasi error `Err` ke fungsi pemanggil secara otomatis?\n\n`let f = File::open(\"data.txt\")___BLANK_1___;`",
      blanks: [{ id: "BLANK_1", accepted: ["?"] }],
      explanation: "Operator `?` mengekstrak nilai sukses atau me-return error secara otomatis."
    }
  },
  "tb-b5": {
    title: "Konkurensi Tanpa Takut: Thread, Arc, Mutex & Async Tokio",
    level: "advanced",
    estMinutes: 30,
    objectives: [
      "Memahami aturan thread-safety dari compiler melalui marker traits `Send` dan `Sync`",
      "Berbagi state antar thread secara aman menggunakan `Arc<Mutex<T>>`",
      "Membangun server asynchronous non-blocking berkinerja tinggi dengan Tokio runtime",
    ],
    tags: ["rust", "concurrency", "tokio", "arc-mutex"],
    concept: "Compiler Rust memverifikasi kepemilikan dan thread-safety saat kompilasi. Jika sebuah tipe tidak aman dipindahkan antar thread, kode tidak akan bisa dikompilasi.",
    exercise: {
      kind: "mcq",
      prompt: "Mengapa tipe `Rc<T>` tidak boleh digunakan antar thread yang berbeda di Rust?",
      choices: [
        { id: "a", text: "Karena operasi penghitungan referensinya non-atomic sehingga tidak mengimplementasikan Send/Sync demi kecepatan single-thread." },
        { id: "b", text: "Karena Rc hanya bisa menyimpan integer." },
        { id: "c", text: "Karena thread di Rust melarang pointer." },
      ],
      correct: "a",
      explanation: "`Rc<T>` menggunakan non-atomic reference counting. Untuk multi-threading gunakan `Arc<T>` (Atomic Reference Counting)."
    }
  },
  "tb-b6": {
    title: "Sistem, Web & WASM: Axum REST Service & WebAssembly",
    level: "professional",
    estMinutes: 30,
    objectives: [
      "Membangun REST API berlatensi sub-milidetik dengan framework Axum dan Serde",
      "Mengompilasi logika komputasi Rust ke WebAssembly (WASM)",
      "Menghubungkan antarmuka Rust WASM ke JavaScript melalui `wasm-bindgen`",
    ],
    tags: ["rust", "axum", "wasm", "webassembly"],
    concept: "Rust dapat dikompilasi ke binary WebAssembly (.wasm) yang dijalankan oleh browser di sandbox terisolasi dengan performa mendekati native.",
    exercise: {
      kind: "fill-blank",
      prompt: "Atribut macro apakah yang disematkan di atas fungsi Rust agar diekspor ke modul WebAssembly?\n\n`#[___BLANK_1___]`\n`pub fn compute() {}`",
      blanks: [{ id: "BLANK_1", accepted: ["wasm_bindgen"] }],
      explanation: "`#[wasm_bindgen]` membuat glue code konversi tipe antara JS dan memori WASM."
    }
  },

  // --- TRACK C: Kotlin & Jetpack Compose ---
  "tc-c1": {
    title: "Kotlin Dasar: Sound Null Safety & Smart Casts",
    level: "beginner",
    estMinutes: 20,
    objectives: [
      "Mengeliminasi NullPointerException dengan sistem tipe nullable (`?`)",
      "Menggunakan Elvis Operator (`?:`) dan Safe Call (`?.`) secara idiomatik",
      "Memanfaatkan smart casting otomatis dari compiler Kotlin setelah pengecekan `is`",
    ],
    tags: ["kotlin", "null-safety", "smart-cast"],
    concept: "Sistem tipe Kotlin membedakan referensi yang boleh null (`String?`) dan tidak boleh null (`String`), membasmi NullPointerException dari tingkat kompilasi.",
    exercise: {
      kind: "code",
      prompt: "Lengkapi fungsi agar mengembalikan panjang teks jika tidak null atau 0 jika null:",
      starterCode: "fun getLen(s: String?): Int {\n    return s?.length ?: 0\n}\nfun main() { println(getLen(\"ArchForge\")); println(getLen(null)); }",
      solution: "s?.length ?: 0",
      explanation: "Safe call `?.` dan Elvis operator `?:` mengembalikan fallback 0 jika nilainya null."
    }
  },
  "tc-c2": {
    title: "OOP & Fungsional Kotlin: Data Classes, Sealed Hierarchy & Scope Functions",
    level: "intermediate",
    estMinutes: 25,
    objectives: [
      "Menggunakan Data Class untuk model data otomatis (equals, hashCode, copy)",
      "Mendesain state mesin dengan Sealed Interface untuk exhaustive pattern matching",
      "Memilih Scope Functions yang tepat: `let`, `apply`, `run`, `also`",
    ],
    tags: ["kotlin", "data-classes", "sealed-classes"],
    concept: "Sealed interface memungkinkan pemodelan status tertutup (Loading, Success, Error) di mana compiler memverifikasi kelengkapan ekspresi `when` tanpa butuh cabang else.",
    exercise: {
      kind: "mcq",
      prompt: "Apa manfaat utama menggunakan `sealed interface` untuk UI State di Kotlin?",
      choices: [
        { id: "a", text: "Compiler melakukan verifikasi menyeluruh (exhaustive check) pada blok when sehingga tidak ada kemungkinan state terlewat." },
        { id: "b", text: "Otomatis membuat antarmuka Compose di Android." },
        { id: "c", text: "Menghemat memori RAM menjadi 0 byte." },
      ],
      correct: "a",
      explanation: "Compiler memastikan semua varian sealed interface ditangani sehingga mencegah unhandled state bug."
    }
  },
  "tc-c3": {
    title: "Coroutines & Reactive Flow: Structured Concurrency di Android",
    level: "advanced",
    estMinutes: 30,
    objectives: [
      "Memahami Structured Concurrency: coroutine dibatalkan otomatis jika lifecycle parent hancur",
      "Membedakan Dispatchers.Main (UI), Dispatchers.IO (disk/network), dan Dispatchers.Default (CPU)",
      "Mengalirkan stream data reaktif dengan `Flow` dan `StateFlow`",
    ],
    tags: ["kotlin", "coroutines", "flow", "android"],
    concept: "Coroutines adalah lightweight thread yang dapat ditangguhkan (suspended) tanpa memblokir thread OS, memungkinkan ratusan ribu tugas berjalan di latar belakang.",
    exercise: {
      kind: "fill-blank",
      prompt: "Kata kunci pengubah (modifier) apakah yang wajib disematkan pada fungsi Kotlin agar dapat di-pause dan di-resume tanpa memblokir thread?\n\n`___BLANK_1___ fun fetchData(): Data`",
      blanks: [{ id: "BLANK_1", accepted: ["suspend"] }],
      explanation: "`suspend` memberitahu compiler Kotlin untuk mengubah fungsi menjadi state machine kooperatif."
    }
  },
  "tc-c4": {
    title: "Praktik Ekosistem: Server Ktor & Pengantar Kotlin Multiplatform",
    level: "advanced",
    estMinutes: 25,
    objectives: [
      "Membangun lightweight microservice dengan framework asinkron Ktor",
      "Memahami struktur shared module di Kotlin Multiplatform (KMP)",
      "Menghubungkan modul bersama KMP ke antarmuka aplikasi melalui platform channel",
    ],
    tags: ["kotlin", "ktor", "kmp", "multiplatform"],
    concept: "KMP memungkinkan penulisan logika domain, model bisnis, dan database lokal satu kali untuk dibagikan ke Android, iOS, Desktop, dan Web.",
    exercise: {
      kind: "mcq",
      prompt: "Bagian aplikasi manakah yang paling ideal dibagikan menggunakan Kotlin Multiplatform (KMP)?",
      choices: [
        { id: "a", text: "Domain logic, model data, kalkulasi bisnis, dan integrasi API REST." },
        { id: "b", text: "XML layout khusus perangkat Samsung lama." },
        { id: "c", text: "Driver hardware monitor layar." },
      ],
      correct: "a",
      explanation: "KMP sangat kuat dalam berbagi logika bisnis murni, networking, dan persistensi tanpa memaksakan framework UI."
    }
  },
  "tc-c5": {
    title: "UI Deklaratif Jetpack Compose: State Hoisting & Material 3",
    level: "advanced",
    estMinutes: 30,
    objectives: [
      "Menerapkan pola UI deklaratif: UI = f(State)",
      "Melakukan State Hoisting untuk memisahkan composable stateless dan stateful",
      "Mengoptimalkan performa recomposition dengan kunci stabil dan derivedStateOf",
    ],
    tags: ["kotlin", "compose", "jetpack-compose", "material3"],
    concept: "Compose meregenerasi tampilan saat state berubah. Dengan state hoisting, status dinaikkan ke pemanggil composable agar komponen mudah diuji dan digunakan kembali.",
    exercise: {
      kind: "code",
      prompt: "Lengkapi pola State Hoisting di Compose berikut:",
      starterCode: "// Compose State Hoisting Pattern\n// fun Counter(count: Int, onIncrement: () -> Unit)",
      solution: "Stateless composable menerima value dan callback event",
      explanation: "State hoisting memisahkan penyimpanan state dari visual komponen."
    }
  },

  // --- TRACK D: Dart & Flutter ---
  "td-d1": {
    title: "Dart Inti: Sound Null Safety, Event Loop & Isolate",
    level: "beginner",
    estMinutes: 20,
    objectives: [
      "Memahami arsitektur Single-Threaded Event Loop di Dart: Microtask vs Event Queue",
      "Membedakan eksekusi asynchronous (Future/Stream) dengan paralelisme murni (Isolate)",
      "Mencegah frame dropping (jank) dengan mendelegasikan tugas berat ke background Isolate",
    ],
    tags: ["dart", "event-loop", "isolates"],
    concept: "Dart mengeksekusi kode di satu thread dengan event loop. Komputasi CPU intensif harus didelegasikan ke Isolate terpisah agar antarmuka tidak mengalami jank.",
    exercise: {
      kind: "fill-blank",
      prompt: "Fungsi praktis Dart apakah yang menjalankan fungsi komputasi berat di background isolate secara otomatis?\n\n`final result = await Isolate.___BLANK_1___(() => compute(data));`",
      blanks: [{ id: "BLANK_1", accepted: ["run"] }],
      explanation: "`Isolate.run()` mengeksekusi komputasi di isolate terpisah dan mengembalikan hasilnya ke thread utama."
    }
  },
  "td-d2": {
    title: "Flutter Inti: Arsitektur Tiga Pohon (Widget, Element & RenderObject)",
    level: "intermediate",
    estMinutes: 25,
    objectives: [
      "Menjelaskan relasi Tiga Pohon: Widget (blueprint), Element (lifecycle), RenderObject (layout & paint)",
      "Memahami mengapa Widget bersifat immutable dan murah untuk dibuat ulang setiap frame",
      "Menghindari rebuild subtree yang tidak perlu dengan `const` constructor",
    ],
    tags: ["flutter", "widget-tree", "render-object"],
    concept: "Widget adalah konfigurasi ringan yang bisa dibuat ulang 60 kali per detik. Element tree mengelola lifecycle, dan RenderObject tree bertugas menghitung ukuran dan menggambar ke GPU.",
    exercise: {
      kind: "mcq",
      prompt: "Pohon manakah di Flutter yang bertanggung jawab langsung menghitung ukuran dimensi piksel (layout) dan menggambar ke GPU?",
      choices: [
        { id: "a", text: "RenderObject Tree" },
        { id: "b", text: "Widget Tree" },
        { id: "c", text: "Element Tree" },
      ],
      correct: "a",
      explanation: "RenderObject adalah lapisan berat yang melakukan komputasi geometri dan rendering piksel."
    }
  },
  "td-d3": {
    title: "Flutter Praktik: Networking, Freezed & Riverpod State Management",
    level: "intermediate",
    estMinutes: 25,
    objectives: [
      "Melakukan serialisasi JSON bebas bug dengan `freezed` dan `json_serializable`",
      "Mengelola status global aplikasi secara type-safe dan testable dengan Riverpod",
      "Menangani status AsyncValue: data, loading, dan error dengan pattern matching",
    ],
    tags: ["flutter", "riverpod", "state-management"],
    concept: "Riverpod menyediakan compile-safe dependency injection dan state management yang tidak bergantung pada BuildContext pohon widget.",
    exercise: {
      kind: "fill-blank",
      prompt: "Tipe widget Flutter apakah yang menggantikan StatelessWidget agar dapat membaca provider Riverpod?\n\n`class MyScreen extends ___BLANK_1___ {`",
      blanks: [{ id: "BLANK_1", accepted: ["ConsumerWidget"] }],
      explanation: "`ConsumerWidget` menyediakan parameter `WidgetRef ref` di dalam metode `build()`."
    }
  },
  "td-d4": {
    title: "Arsitektur App Skala Besar: Clean Architecture & Rust FFI di Flutter",
    level: "advanced",
    estMinutes: 30,
    objectives: [
      "Memisahkan Domain, Data, dan Presentation Layer sesuai prinsip Clean Architecture",
      "Menjaga independensi logika bisnis terhadap framework UI Flutter",
      "Menghubungkan pustaka performa tinggi Rust ke Flutter melalui Foreign Function Interface (FFI)",
    ],
    tags: ["flutter", "clean-architecture", "ffi", "rust"],
    concept: "Domain layer harus murni bahasa Dart tanpa dependensi ke `package:flutter/material.dart` agar aturan bisnis dapat diuji secara independen dari emulator.",
    exercise: {
      kind: "mcq",
      prompt: "Berdasarkan prinsip Clean Architecture, lapisan manakah yang TIDAK BOLEH mengimpor package UI Flutter?",
      choices: [
        { id: "a", text: "Domain Layer (Entities & Use Cases)" },
        { id: "b", text: "Presentation Layer" },
        { id: "c", text: "Widget Components" },
      ],
      correct: "a",
      explanation: "Domain layer harus murni dan terisolasi dari framework eksternal untuk menjamin testability."
    }
  },
  "td-d5": {
    title: "Flutter UI Mendalam: Hukum Constraints, Sliver & CustomPainter",
    level: "advanced",
    estMinutes: 30,
    objectives: [
      "Menguasai aturan emas layout Flutter: Constraints go down, Sizes go up, Parent sets position",
      "Membangun efek scrolling kompleks dengan CustomScrollView dan Slivers",
      "Menggambar grafik visual kustom langsung ke canvas GPU dengan CustomPainter",
    ],
    tags: ["flutter", "slivers", "custom-painter", "layout"],
    concept: "Kotak parent mengirimkan batasan ukuran (min/max width & height) ke child. Child menentukan ukurannya sendiri dalam batasan tersebut, dan parent menentukan posisinya.",
    exercise: {
      kind: "code",
      prompt: "Lengkapi aturan layout: Constraints go down, Sizes go up, Parent sets position:",
      starterCode: "// Hukum Layout Flutter: BoxConstraints(minWidth, maxWidth, minHeight, maxHeight)",
      solution: "Constraints go down, Sizes go up, Parent sets position",
      explanation: "Prinsip dasar layout Flutter yang mengatur bagaimana dimensi piksel dinegosiasikan antar widget."
    }
  },
  "td-d6": {
    title: "Design-to-Code: Reusable Design Tokens & Micro-Interactions",
    level: "professional",
    estMinutes: 25,
    objectives: [
      "Mengekstrak design tokens dari Figma menjadi konfigurasi ThemeExtension di Flutter",
      "Membangun transisi visual halus dengan Hero dan AnimationController",
      "Mendukung layout adaptif untuk ponsel, tablet, dan desktop",
    ],
    tags: ["flutter", "design-tokens", "animation", "micro-interactions"],
    concept: "Pengembang profesional tidak melakukan hardcode nilai warna atau spasi di widget, melainkan menggunakan token tema tersentralisasi yang mendukung dark mode dan adaptasi layar.",
    exercise: {
      kind: "ui-predict",
      prompt: "Mengapa standar aksesibilitas mewajibkan tinggi minimum area sentuh tombol sebesar 48dp?",
      choices: [
        { id: "a", text: "Sesuai ergonomi ukuran jari manusia agar tombol dapat ditekan secara akurat tanpa salah sentuh." },
        { id: "b", text: "Karena layar sentuh tidak dapat membaca sentuhan di bawah 48dp." },
      ],
      correct: "a",
      explanation: "Ukuran target sentuh minimum 48x48dp adalah standar aksesibilitas WCAG 2.5.5."
    }
  },

  // --- TRACK E: DSA & Live Coding ---
  "te-e1": {
    title: "Dasar Kompleksitas: Analisis Big-O Waktu, Ruang & Amortized Cost",
    level: "intermediate",
    estMinutes: 25,
    objectives: [
      "Menghitung kompleksitas waktu Big-O dari O(1) hingga O(2^N)",
      "Menganalisis memori auxiliary space di luar input",
      "Memahami amortized analysis pada operasi dynamic array resizing",
    ],
    tags: ["dsa", "big-o", "complexity"],
    concept: "Big-O mengukur bagaimana kebutuhan waktu atau memori suatu algoritma bertumbuh ketika ukuran input N membesar mendekati tak hingga.",
    exercise: {
      kind: "mcq",
      prompt: "Berapakah kompleksitas waktu terburuk dari Binary Search pada array terurut berukuran N?",
      choices: [
        { id: "a", text: "O(log N)" },
        { id: "b", text: "O(N)" },
        { id: "c", text: "O(1)" },
      ],
      correct: "a",
      explanation: "Binary search membagi ruang masalah menjadi setengah di setiap iterasi ($N / 2^k = 1$), menghasilkan waktu $O(\\log N)$."
    }
  },
  "te-e2": {
    title: "Struktur Data Inti: Linked List, Monotonic Stack & Heap",
    level: "intermediate",
    estMinutes: 25,
    objectives: [
      "Memanipulasi pointer pada Singly dan Doubly Linked List",
      "Memecahkan masalah Next Greater Element dengan Monotonic Stack O(N)",
      "Membangun antrean prioritas dengan Min-Heap dan Max-Heap",
    ],
    tags: ["dsa", "stack", "heap", "linked-list"],
    concept: "Monotonic stack menjaga elemen dalam urutan monotonik, memungkinkan pencarian elemen lebih besar berikutnya dalam waktu linier $O(N)$ dibanding nested loop $O(N^2)$.",
    exercise: {
      kind: "code",
      prompt: "Validasi tanda kurung `()[]{}` menggunakan Stack:",
      starterCode: "def is_valid(s: str) -> bool:\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    for c in s:\n        if c in mapping:\n            top = stack.pop() if stack else '#'\n            if mapping[c] != top: return False\n        else: stack.append(c)\n    return not stack\nprint(is_valid('()[]{}'))",
      solution: "Validasi stack matching",
      explanation: "Algoritma memastikan kurung buka terakhir ditutup terlebih dahulu (LIFO)."
    }
  },
  "te-e3": {
    title: "Teknik Algoritmik: Two Pointers, Sliding Window & Binary Search",
    level: "intermediate",
    estMinutes: 25,
    objectives: [
      "Menguasai teknik Two Pointers berlawanan arah pada sorted array",
      "Menerapkan Sliding Window dinamis untuk mencari subarray/substring optimal",
      "Menerapkan Binary Search pada ruang jawaban (Binary Search on Answer)",
    ],
    tags: ["dsa", "two-pointers", "sliding-window"],
    concept: "Two Pointers dan Sliding Window menghindari pencarian bersarang $O(N^2)$ dengan memanfaatkan sifat monotonik data untuk menggeser batas dalam waktu $O(N)$.",
    exercise: {
      kind: "mcq",
      prompt: "Syarat utama agar teknik Sliding Window dapat digunakan untuk mencari subarray optimal adalah:",
      choices: [
        { id: "a", text: "Kondisi evaluasi memiliki sifat monotonik terhadap perluasan dan penyusutan jendela." },
        { id: "b", text: "Array harus berisi nilai acak tanpa pola." },
      ],
      correct: "a",
      explanation: "Monotonisitas memastikan pergeseran pointer kiri atau kanan bersifat deterministik."
    }
  },
  "te-e4": {
    title: "Peta 15 Pola Soal Live Coding & Verbalisasi Interview",
    level: "professional",
    estMinutes: 30,
    objectives: [
      "Mengidentifikasi 15 pola soal umum interview teknis",
      "Memverbalisasikan pemikiran (think-aloud) saat memecahkan masalah live",
      "Melakukan dry-run manual dengan contoh edge cases sebelum menyatakan selesai",
    ],
    tags: ["dsa", "patterns", "interview", "two-pointers"],
    concept: "Hampir semua soal coding interview adalah variasi dari 15 pola inti. Mengenali polanya dalam 2 menit pertama adalah kunci keberhasilan wawancara.",
    exercise: {
      kind: "code",
      prompt: "Cari dua angka pada array terurut yang jumlahnya sama dengan `target` dalam O(N) waktu dan O(1) ruang:",
      starterCode: "def two_sum_sorted(nums: list[int], target: int) -> list[int]:\n    left, right = 0, len(nums) - 1\n    while left < right:\n        curr = nums[left] + nums[right]\n        if curr == target: return [left, right]\n        elif curr < target: left += 1\n        else: right -= 1\n    return []\nprint(two_sum_sorted([2, 7, 11, 15], 9))",
      solution: "Two pointers berlawanan arah",
      explanation: "Geser left jika jumlah terlalu kecil, geser right jika terlalu besar."
    }
  },
  "te-e5": {
    title: "Algoritma Lanjut: Dynamic Programming & Graf Traversal",
    level: "professional",
    estMinutes: 30,
    objectives: [
      "Mengidentifikasi syarat DP: Optimal Substructure & Overlapping Subproblems",
      "Membedakan Top-Down (Memoization) vs Bottom-Up (Tabulation)",
      "Menjalankan algoritma graf: BFS, DFS, dan Topological Sort (Kahn's)",
    ],
    tags: ["dsa", "dynamic-programming", "graphs"],
    concept: "Dynamic Programming memecahkan masalah besar dengan menyimpan hasil sub-masalah identik agar tidak dihitung berulang kali.",
    exercise: {
      kind: "code",
      prompt: "Implementasikan Coin Change minimum koin menggunakan DP:",
      starterCode: "def coin_change(coins, amount):\n    dp = [float('inf')] * (amount + 1)\n    dp[0] = 0\n    for c in coins:\n        for x in range(c, amount + 1):\n            dp[x] = min(dp[x], dp[x - c] + 1)\n    return dp[amount] if dp[amount] != float('inf') else -1\nprint(coin_change([1, 2, 5], 11))",
      solution: "dp[x] = min(dp[x], dp[x - c] + 1)",
      explanation: "Relasi transisi status DP: ambil koin c ditambah solusi optimal untuk amount - c."
    }
  },

  // --- TRACK F: System Design ---
  "tf-f1": {
    title: "Fondasi Skalabilitas: Back-of-the-Envelope Estimation & SLA/SLO",
    level: "intermediate",
    estMinutes: 25,
    objectives: [
      "Menghitung estimasi kapasitas QPS puncak, bandwidth, dan storage 5 tahun",
      "Menguasai tabel referensi Powers of Two dan hirarki latensi komputer",
      "Memahami relasi SLA, SLO, dan SLI error budget",
    ],
    tags: ["system-design", "capacity-estimation"],
    concept: "Wawancara System Design selalu dimulai dengan estimasi kapasitas kasar untuk menentukan arsitektur perangkat keras yang realistis.",
    exercise: {
      kind: "fill-blank",
      prompt: "Jika sistem memiliki 10 Juta DAU dan masing-masing melakukan 10 request/hari, berapakah rata-rata RPS (menggunakan 1 hari = 100.000 detik)?\n\n`___BLANK_1___ RPS`",
      blanks: [{ id: "BLANK_1", accepted: ["1000", "1.000", "1,000"] }],
      explanation: "(10.000.000 * 10) / 100.000 = 1.000 RPS rata-rata."
    }
  },
  "tf-f2": {
    title: "Blok Bangunan: DNS Anycast, Load Balancer L4 vs L7 & API Gateway",
    level: "intermediate",
    estMinutes: 25,
    objectives: [
      "Membedakan Layer 4 Load Balancing vs Layer 7 HTTP path-based routing",
      "Menganalisis algoritma pembagian beban: Round Robin, Least Connections, IP Hash",
      "Menjelaskan peran API Gateway: rate limiting, auth token, request routing",
    ],
    tags: ["system-design", "load-balancer", "api-gateway"],
    concept: "Load Balancer mendistribusikan trafik masuk ke kumpulan server di belakangnya untuk mencegah kelebihan beban pada satu titik.",
    exercise: {
      kind: "mcq",
      prompt: "Algoritma load balancing manakah yang paling cocok untuk server stateful WebSocket?",
      choices: [
        { id: "a", text: "IP Hash / Consistent Hashing" },
        { id: "b", text: "Random Selection" },
      ],
      correct: "a",
      explanation: "IP Hash menjamin klien diarahkan kembali ke server node yang sama tempat koneksi soket aktif berada."
    }
  },
  "tf-f3": {
    title: "Database Scaling: Indexing, Read Replicas & Sharding Horizontal",
    level: "advanced",
    estMinutes: 30,
    objectives: [
      "Memahami struktur B-Tree indexing di PostgreSQL",
      "Menerapkan Primary-Replica untuk workload read-heavy dan mengatasi replication lag",
      "Mendesain strategi partisi Sharding dan pemilihan Shard Key tanpa resiko hotspot",
    ],
    tags: ["system-design", "database", "sharding"],
    concept: "Read Replicas menyerap beban baca melalui replikasi asinkron, sementara Sharding membagi data ke banyak mesin database berdasarkan Shard Key.",
    exercise: {
      kind: "mcq",
      prompt: "Mengapa kolom timestamp (`created_at`) buruk sebagai Shard Key pada transaksi penjualan?",
      choices: [
        { id: "a", text: "Memicu hotspot karena semua transaksi baru hari ini akan membanjiri shard yang sama secara terkonsentrasi." },
        { id: "b", text: "Karena database menolak tipe tanggal." },
      ],
      correct: "a",
      explanation: "Nilai monotonik waktu memusatkan 100% beban tulis baru ke satu shard aktif."
    }
  },
  "tf-f4": {
    title: "Strategi Caching: Cache-Aside, Write-Through & Mitigasi Stampede",
    level: "advanced",
    estMinutes: 25,
    objectives: [
      "Memilih pola caching: Cache-Aside vs Write-Through vs Write-Back",
      "Menjelaskan algoritma penggusuran data: LRU vs LFU",
      "Mencegah bencana Cache Stampede saat key populer kadaluarsa serentak",
    ],
    tags: ["system-design", "caching", "redis"],
    concept: "Menyimpan data populer di Redis memotong latensi ke sub-milidetik. Cache stampede dicegah dengan distributed lock atau probabilistic early expiration.",
    exercise: {
      kind: "mcq",
      prompt: "Pola caching yang menulis ke cache dan database secara simultan sebelum merespons klien adalah:",
      choices: [
        { id: "a", text: "Write-Through" },
        { id: "b", text: "Cache-Aside" },
      ],
      correct: "a",
      explanation: "Write-Through menjamin data konsisten di kedua lapisan secara sinkron."
    }
  },
  "tf-f5": {
    title: "Sistem Terdistribusi: Teorema CAP & PACELC, Konsensus Raft & Idempotency",
    level: "professional",
    estMinutes: 30,
    objectives: [
      "Menganalisis kompromi Teorema CAP dan PACELC saat terjadi network partition",
      "Memahami algoritma konsensus Raft dalam pemilihan Leader dan replikasi log",
      "Mengimplementasikan Idempotency Key pada transaksi pembayaran untuk mencegah double-charge",
    ],
    tags: ["system-design", "cap-theorem", "raft", "idempotency"],
    concept: "Saat pemisahan jaringan terjadi (P), sistem harus memilih antara konsistensi (C) atau ketersediaan (A). Idempotensi menjamin request duplikat menghasilkan efek yang sama persis.",
    exercise: {
      kind: "fill-blank",
      prompt: "Sifat operasi matematika di mana eksekusi berulang kali menghasilkan status yang sama persis seperti dijalankan satu kali disebut ___BLANK_1___.",
      blanks: [{ id: "BLANK_1", accepted: ["idempoten", "idempotent", "idempotensi"] }],
      explanation: "Operasi idempoten melindungi sistem dari kegagalan jaringan dan retry berulang."
    }
  },
  "tf-f6": {
    title: "Komunikasi Antar Layanan: REST, gRPC Protobuf & Event Streaming Kafka",
    level: "advanced",
    estMinutes: 25,
    objectives: [
      "Membandingkan efisiensi biner gRPC HTTP/2 vs JSON REST",
      "Memahami arsitektur event-driven dengan Apache Kafka: partition, offset, consumer group",
      "Menjamin urutan pesan dalam partisi Kafka",
    ],
    tags: ["system-design", "grpc", "kafka", "event-streaming"],
    concept: "gRPC menghemat bandwidth hingga 70% dengan serialisasi Protobuf biner, sedangkan Kafka menyediakan log terdistribusi dengan retensi tinggi untuk event-driven architecture.",
    exercise: {
      kind: "mcq",
      prompt: "Bagaimana cara Kafka menjamin bahwa pesan untuk satu akun pengguna tertentu selalu diproses berurutan?",
      choices: [
        { id: "a", text: "Menggunakan User ID sebagai Message Key sehingga semua pesan akun tersebut diarahkan ke partisi yang sama." },
        { id: "b", text: "Menonaktifkan semua partisi dan hanya memakai 1 partisi global." },
      ],
      correct: "a",
      explanation: "Kafka menjamin pengurutan strictly in-order di dalam batas satu partisi yang sama."
    }
  },
  "tf-f7": {
    title: "Rekayasa Resiliensi: Circuit Breaker, Exponential Backoff & Bulkhead",
    level: "advanced",
    estMinutes: 25,
    objectives: [
      "Mencegah kegagalan berantai (cascading failure) dengan pola Circuit Breaker",
      "Menerapkan Retry dengan Exponential Backoff dan Full Jitter untuk meredakan beban server",
      "Mengisolasi sumber daya dengan Bulkhead Pattern",
    ],
    tags: ["system-design", "resilience", "circuit-breaker"],
    concept: "Sistem yang baik tidak berasumsi layanan eksternal selalu hidup. Circuit Breaker memutus koneksi secara cepat (fail fast) saat error rate meningkat.",
    exercise: {
      kind: "mcq",
      prompt: "Status Circuit Breaker apakah yang mengizinkan sejumlah kecil request uji coba lewat setelah periode cooldown untuk mengecek pemulihan server?",
      choices: [
        { id: "a", text: "Half-Open" },
        { id: "b", text: "Open" },
        { id: "c", text: "Closed" },
      ],
      correct: "a",
      explanation: "Status Half-Open menguji kesehatan layanan target sebelum beralih kembali ke Closed (normal)."
    }
  },
  "tf-f8": {
    title: "Observabilitas: Structured Logging, Metrik Kardinalitas & Distributed Tracing",
    level: "advanced",
    estMinutes: 25,
    objectives: [
      "Menerapkan Structured JSON Logging dengan trace_id dan span_id konteks",
      "Menghindari ledakan kardinalitas metrik di Prometheus",
      "Melacak alur request lintas puluhan microservices dengan OpenTelemetry",
    ],
    tags: ["system-design", "observability", "opentelemetry", "metrics"],
    concept: "Tiga pilar observabilitas (Logs, Metrics, Traces) memungkinkan rekayasawan mendiagnosis akar masalah latensi di arsitektur microservices kompleks.",
    exercise: {
      kind: "fill-blank",
      prompt: "Protokol standar industri modern terbuka untuk instrumentasi logs, metrics, dan traces adalah Open___BLANK_1___.",
      blanks: [{ id: "BLANK_1", accepted: ["Telemetry", "telemetry"] }],
      explanation: "OpenTelemetry (OTel) adalah standar observabilitas dari Cloud Native Computing Foundation (CNCF)."
    }
  },
  "tf-f9": {
    title: "Keamanan Arsitektur: OAuth2, JWT Claims, Enkripsi KMS & Model STRIDE",
    level: "professional",
    estMinutes: 25,
    objectives: [
      "Mendesain arsitektur otentikasi OAuth2 / OIDC dengan Access Token & Refresh Token",
      "Mencegah pencurian token dengan HTTP-Only Secure Cookies",
      "Melakukan threat modeling menggunakan kerangka kerja STRIDE",
    ],
    tags: ["system-design", "security", "oauth2", "stride"],
    concept: "Keamanan harus dirancang sejak awal (Security by Design). STRIDE mengidentifikasi ancaman: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege.",
    exercise: {
      kind: "mcq",
      prompt: "Di mana lokasi penyimpanan JWT Access Token di browser yang paling aman dari serangan Cross-Site Scripting (XSS)?",
      choices: [
        { id: "a", text: "HTTP-Only, Secure, SameSite Cookie" },
        { id: "b", text: "Browser LocalStorage" },
        { id: "c", text: "URL Query Parameter" },
      ],
      correct: "a",
      explanation: "Cookie HTTP-Only tidak dapat dibaca oleh script JavaScript berbahaya di browser, mengamankan token dari serangan XSS."
    }
  },
  "tf-f10": {
    title: "Laboratorium Simulasi 8 Kasus Lengkap System Design",
    level: "professional",
    estMinutes: 30,
    objectives: [
      "Menganalisis arsitektur URL Shortener, Rate Limiter, Flash Sale, Newsfeed",
      "Mendesain sistem Ride Hailing, Video Streaming, Collaborative Editor, Payment Gateway",
      "Menguji ketahanan topologi terhadap injeksi kegagalan chaos di simulator",
    ],
    tags: ["system-design", "simulator", "scenarios"],
    concept: "Sintesis menyeluruh dari 8 skenario sistem dunia nyata dengan pertimbangan trade-off biaya, ketersediaan, dan SLO latensi.",
    exercise: {
      kind: "sd-scenario",
      prompt: "Tinjau trade-off arsitektur URL Shortener Bitly-scale pada simulator ArchForge dan catat keputusan Mini-ADR Anda.",
      solution: "Cache-Aside dengan Redis cluster di depan PostgreSQL primary + replica",
      explanation: "Menyerap 90% query redirect di cache memory untuk memenuhi target 100K RPS dengan latensi < 50ms."
    }
  },

  // --- TRACK G: Peran & Praktik Arsitek ---
  "tg-g1": {
    title: "Lanskap Peran Arsitek: Enterprise, Solution & Software Architect",
    level: "professional",
    estMinutes: 20,
    objectives: [
      "Membedakan lingkup peran Enterprise, Solution, dan Software Architect",
      "Menilai kematangan arsitektur organisasi dan pengelolaan utang teknis",
      "Menyelaraskan strategi bisnis jangka panjang dengan implementasi teknis",
    ],
    tags: ["architecture", "roles", "enterprise-architect"],
    concept: "Arsitek adalah komunikator strategis yang menerjemahkan kebutuhan bisnis menjadi batasan teknis sistem yang terukur.",
    exercise: {
      kind: "mcq",
      prompt: "Arsitek manakah yang bertanggung jawab utama terhadap konsolidasi portofolio teknologi seluruh divisi perusahaan?",
      choices: [
        { id: "a", text: "Enterprise Architect" },
        { id: "b", text: "Software Architect" },
      ],
      correct: "a",
      explanation: "Enterprise Architect menyelaraskan arsitektur teknologi seluruh korporasi dengan strategi bisnis."
    }
  },
  "tg-g2": {
    title: "Pemodelan & Dokumentasi: C4 Model (Context, Container, Component) & ADR",
    level: "professional",
    estMinutes: 25,
    objectives: [
      "Membuat diagram C4: Level 1 System Context, Level 2 Container, Level 3 Component",
      "Menulis Architecture Decision Record (ADR) berstandar industri dengan format MADR",
      "Mendokumentasikan trade-off arsitektur secara transparan",
    ],
    tags: ["architecture", "c4-model", "adr"],
    concept: "C4 model memvisualisasikan arsitektur dengan tingkat pembesaran (zoom) bertahap mirip Google Maps, sedangkan ADR mencatat konteks dan justifikasi keputusan teknis penting.",
    exercise: {
      kind: "mcq",
      prompt: "Diagram C4 level 2 (Container) menggambarkan apa?",
      choices: [
        { id: "a", text: "Aplikasi, backend service, database, mobile app, dan bagaimana mereka saling berkomunikasi." },
        { id: "b", text: "Potongan kode per baris di dalam satu fungsi." },
      ],
      correct: "a",
      explanation: "C4 Container level memetakan deployable units (seperti server API, database, SPA web) dan protokol komunikasi antar unit."
    }
  },
  "tg-g3": {
    title: "Gaya Arsitektur: Modular Monolith vs Microservices & Event-Driven",
    level: "professional",
    estMinutes: 25,
    objectives: [
      "Memahami 8 Fallacies of Distributed Computing sebelum memecah sistem",
      "Merancang Modular Monolith dengan isolasi domain yang ketat",
      "Menerapkan Transactional Outbox Pattern untuk pengiriman event yang andal",
    ],
    tags: ["architecture", "modular-monolith", "microservices"],
    concept: "Modular Monolith mempertahankan kecepatan pengembangan dan kemudahan deployment, sementara memisahkan modul secara logis agar siap dipecah jika dibutuhkan.",
    exercise: {
      kind: "fill-blank",
      prompt: "Pola arsitektur apakah yang menyimpan event ke dalam tabel database lokal dalam satu transaksi ACID yang sama dengan data bisnis?\n\nPola Transactional ___BLANK_1___ Pattern.",
      blanks: [{ id: "BLANK_1", accepted: ["Outbox", "outbox"] }],
      explanation: "Transactional Outbox Pattern mencegah inkonsistensi dual-write ke database dan message broker."
    }
  },
  "tg-g4": {
    title: "Desain Domain: Domain-Driven Design (DDD) & Strategic Mapping",
    level: "professional",
    estMinutes: 25,
    objectives: [
      "Membangun Ubiquitous Language bersama antara pengembang dan domain expert",
      "Mengidentifikasi batasan Bounded Contexts dan Aggregate Roots",
      "Menggunakan Anti-Corruption Layer (ACL) untuk melindungi domain inti",
    ],
    tags: ["architecture", "ddd", "bounded-context"],
    concept: "Domain-Driven Design memisahkan konsep bisnis ke dalam Bounded Contexts independen untuk mencegah satu model data raksasa yang rapuh.",
    exercise: {
      kind: "mcq",
      prompt: "Komponen arsitektur manakah yang melindungi domain model bersih kita dari polusi sistem warisan atau API pihak ketiga?",
      choices: [
        { id: "a", text: "Anti-Corruption Layer (ACL)" },
        { id: "b", text: "Shared Kernel" },
      ],
      correct: "a",
      explanation: "ACL menerjemahkan payload eksternal ke dalam domain model internal kita."
    }
  },
  "tg-g5": {
    title: "Atribut Kualitas (NFR) & Evaluasi Trade-off dengan Metode ATAM",
    level: "professional",
    estMinutes: 25,
    objectives: [
      "Menganalisis atribut kualitas (NFR): performa, ketersediaan, keamanan, maintainability, biaya",
      "Menjalankan Architecture Tradeoff Analysis Method (ATAM) ringkas",
      "Mengidentifikasi sensitivity points dan tradeoff points pada arsitektur",
    ],
    tags: ["architecture", "atam", "tradeoffs"],
    concept: "Tidak ada arsitektur yang sempurna; yang ada hanyalah arsitektur dengan trade-off yang dipahami dan disetujui bersama.",
    exercise: {
      kind: "mcq",
      prompt: "Dalam evaluasi ATAM, keputusan mengaktifkan header COOP/COEP untuk keamanan memori tetapi merusak kompatibilitas iframe pihak ketiga disebut:",
      choices: [
        { id: "a", text: "Tradeoff Point" },
        { id: "b", text: "Error Koding" },
      ],
      correct: "a",
      explanation: "Tradeoff point adalah keputusan arsitektur yang meningkatkan satu atribut kualitas namun menurunkan atribut kualitas lainnya."
    }
  },
  "tg-g6": {
    title: "Rekayasa Platform: CI/CD, IaC & Strategi Rilis Zero-Downtime",
    level: "professional",
    estMinutes: 25,
    objectives: [
      "Mendesain pipeline automated testing dan build artifacts di CI/CD",
      "Memahami strategi rilis Blue/Green vs Canary deployments",
      "Menjalankan migrasi database zero-downtime dengan pola Expand and Contract",
    ],
    tags: ["devops", "ci-cd", "blue-green", "canary"],
    concept: "Pola Expand and Contract memungkinkan penambahan kolom database baru secara backward-compatible sebelum kode aplikasi lama dimatikan.",
    exercise: {
      kind: "mcq",
      prompt: "Strategi rilis yang mengalirkan 5% trafik pengguna ke versi baru aplikasi sebelum peluncuran penuh disebut:",
      choices: [
        { id: "a", text: "Canary Deployment" },
        { id: "b", text: "Blue/Green Deployment" },
      ],
      correct: "a",
      explanation: "Canary deployment menguji stabilitas versi baru pada sebagian kecil user nyata untuk meminimalkan dampak jika terjadi bug."
    }
  },
  "tg-g7": {
    title: "Arsitektur Cloud & FinOps: Multi-AZ & Optimasi Unit Economics",
    level: "professional",
    estMinutes: 20,
    objectives: [
      "Menerapkan Shared Responsibility Model pada cloud computing",
      "Mendesain arsitektur Multi-Availability Zone (Multi-AZ) untuk high availability",
      "Mengoptimalkan biaya infrastruktur dengan prinsip FinOps dan kalkulasi unit economics",
    ],
    tags: ["cloud", "finops", "aws", "multi-az"],
    concept: "Arsitek hebat tidak hanya merancang sistem yang cepat, tetapi juga sistem yang ekonomis dan dapat dipertanggungjawabkan secara biaya per transaksi pengguna.",
    exercise: {
      kind: "mcq",
      prompt: "Menurut model Shared Responsibility di AWS, siapa yang bertanggung jawab atas keamanan data aplikasi dan konfigurasi firewall security group pengguna?",
      choices: [
        { id: "a", text: "Pengguna / Pelanggan Cloud" },
        { id: "b", text: "Pihak Penyedia Cloud (AWS)" },
      ],
      correct: "a",
      explanation: "Penyedia cloud bertanggung jawab atas keamanan fasilitas fisik (Security OF the Cloud), sedangkan pengguna bertanggung jawab atas data dan konfigurasinya (Security IN the Cloud)."
    }
  },
  "tg-g8": {
    title: "Kepemimpinan Teknis: Komunikasi Eksekutif & Manajemen Utang Teknis",
    level: "professional",
    estMinutes: 20,
    objectives: [
      "Mengomunikasikan risiko teknis kepada pemangku kepentingan tingkat C-Level",
      "Membuat kuadran utang teknis (Technical Debt Quadrant)",
      "Menjalankan sesi Architecture Review Board (ARB) secara objektif",
    ],
    tags: ["leadership", "technical-debt", "communication"],
    concept: "Utang teknis yang tidak dikelola ibarat bunga pinjaman berbunga tinggi yang akhirnya melumpuhkan kecepatan rilis fitur baru perusahaan.",
    exercise: {
      kind: "mcq",
      prompt: "Cara paling efektif menyampaikan urgensi refactoring utang teknis kepada direksi bisnis adalah:",
      choices: [
        { id: "a", text: "Mengaitkan utang teknis dengan risiko downtime bisnis, perlambatan waktu rilis fitur, dan biaya finansial operasional." },
        { id: "b", text: "Mengeluh tentang betapa jeleknya sintaks kode lama." },
      ],
      correct: "a",
      explanation: "Eksekutif bisnis merespons metrik finansial, kepuasan pelanggan, dan kecepatan inovasi produk."
    }
  },

  // --- TRACK H: ML & Computer Vision ---
  "th-h1": {
    title: "Matematika Terapan ML: Aljabar Linier, Vektor & Gradien",
    level: "intermediate",
    estMinutes: 25,
    objectives: [
      "Memahami representasi teks dan gambar sebagai vektor multidimensi",
      "Menghitung perkalian dot product dan cosine similarity",
      "Memahami intuisi algoritma Gradient Descent dalam optimasi bobot model",
    ],
    tags: ["ml", "math", "linear-algebra"],
    concept: "Dot product mengukur keselarasan arah antara dua vektor, menjadi dasar mekanisme perhatian (Attention Mechanism) pada model AI modern.",
    exercise: {
      kind: "code",
      prompt: "Hitung dot product dari dua vektor NumPy:",
      starterCode: "import numpy as np\nv1 = np.array([2, 3])\nv2 = np.array([4, 1])\nprint(np.dot(v1, v2))",
      solution: "np.dot(v1, v2)",
      explanation: "2(4) + 3(1) = 8 + 3 = 11."
    }
  },
  "th-h2": {
    title: "ML Klasik: Regresi, Decision Tree, Cross-Validation & Metrik ROC/F1",
    level: "intermediate",
    estMinutes: 25,
    objectives: [
      "Membedakan masalah Regresi (kontinu) vs Klasifikasi (kategori)",
      "Mencegah overfitting dengan validasi silang K-Fold Cross-Validation",
      "Menganalisis Confusion Matrix: Precision, Recall, F1-Score, dan ROC-AUC",
    ],
    tags: ["ml", "scikit-learn", "metrics", "classification"],
    concept: "Akurasi mentah adalah metrik yang menipu saat dataset tidak seimbang (imbalanced data). F1-Score menyeimbangkan Precision dan Recall.",
    exercise: {
      kind: "mcq",
      prompt: "Pada sistem deteksi penyakit medis langka, metrik evaluasi manakah yang paling krusial untuk dimaksimalkan?",
      choices: [
        { id: "a", text: "Recall (Sensitivitas), untuk meminimalkan pasien sakit yang salah didiagnosis sebagai sehat (False Negative)." },
        { id: "b", text: "Akurasi mentah." },
      ],
      correct: "a",
      explanation: "Dalam bidang medis, false negative sangat berbahaya sehingga recall harus diprioritaskan."
    }
  },
  "th-h3": {
    title: "Deep Learning Inti: Backpropagation & Arsitektur CNN",
    level: "advanced",
    estMinutes: 30,
    objectives: [
      "Memahami fungsi aktivasi non-linier: ReLU, Sigmoid, Softmax",
      "Mempelajari bagaimana Backpropagation menghitung gradien bobot neural network",
      "Memahami lapisan konvolusi dan pooling pada Convolutional Neural Networks (CNN)",
    ],
    tags: ["deep-learning", "cnn", "backpropagation"],
    concept: "CNN memanfaatkan bobot kernel yang dibagikan (weight sharing) untuk mengekstrak fitur spasial lokal seperti garis tepi, tekstur, dan bentuk objek.",
    exercise: {
      kind: "mcq",
      prompt: "Lapisan pada CNN yang bertugas mengurangi dimensi spasial gambar dan menghemat komputasi disebut:",
      choices: [
        { id: "a", text: "Pooling Layer (Max Pooling / Average Pooling)" },
        { id: "b", text: "Dense Layer" },
      ],
      correct: "a",
      explanation: "Max pooling mengambil nilai terbesar pada jendela spasial, menurunkan dimensi tanpa kehilangan fitur menonjol."
    }
  },
  "th-h4": {
    title: "Computer Vision Terapan: OpenCV Filter Kernel & Deteksi Objek YOLO",
    level: "advanced",
    estMinutes: 30,
    objectives: [
      "Menerapkan filter kernel matriks konvolusi untuk deteksi tepi di OpenCV",
      "Memahami prinsip deteksi objek satu tahap (single-stage) pada YOLO",
      "Mengeliminasi bounding box ganda dengan Non-Maximum Suppression (NMS)",
    ],
    tags: ["computer-vision", "opencv", "yolo"],
    concept: "YOLO membagi gambar menjadi kisi-kisi dan memprediksi kotak batas serta probabilitas kelas objek dalam satu kali pass forward neural network.",
    exercise: {
      kind: "mcq",
      prompt: "Algoritma untuk mengeliminasi kotak prediksi berlebih pada deteksi objek adalah:",
      choices: [
        { id: "a", text: "Non-Maximum Suppression (NMS)" },
        { id: "b", text: "Gradient Clipping" },
      ],
      correct: "a",
      explanation: "NMS memilih kotak dengan skor tertinggi dan membuang kotak lain yang memiliki overlap IoU tinggi."
    }
  },
  "th-h5": {
    title: "MLOps & Edge Inference: Ekspor ONNX, Kuantisasi & Browser Runtime",
    level: "advanced",
    estMinutes: 30,
    objectives: [
      "Mengekspor model PyTorch / TensorFlow ke format standar terbuka ONNX",
      "Mereduksi ukuran model hingga 75% dengan Kuantisasi INT8 tanpa penurunan akurasi signifikan",
      "Menjalankan model inferensi di browser menggunakan `onnxruntime-web` dan WebAssembly",
    ],
    tags: ["mlops", "onnx", "edge-ai", "wasm"],
    concept: "Menjalankan model langsung di browser klien mengeliminasi biaya server inferensi cloud dan menjamin privasi data pengguna 100% lokal.",
    exercise: {
      kind: "fill-blank",
      prompt: "Format terbuka standar industri untuk merepresentasikan model AI lintas framework adalah format ___BLANK_1___.",
      blanks: [{ id: "BLANK_1", accepted: ["ONNX", "onnx"] }],
      explanation: "Open Neural Network Exchange (ONNX) memungkinkan model dilatih di satu framework dan dijalankan di berbagai runtime hardware."
    }
  },

  // --- TRACK I: Persiapan Interview ---
  "ti-i1": {
    title: "Anatomi Interview: Rubrik Penilaian Bar Raiser & Kriteria Evaluasi",
    level: "professional",
    estMinutes: 20,
    objectives: [
      "Memahami 4 pilar penilaian wawancara: Analisis, Algoritma, Kualitas Kode, Verifikasi",
      "Mempelajari cara pewawancara Bar Raiser memberi skor pada rubrik formal",
      "Menghindari jebakan langsung menulis kode tanpa klarifikasi batasan soal",
    ],
    tags: ["interview", "bar-raiser", "career"],
    concept: "Wawancara bukan ujian menghafal rumus, melainkan simulasi kolaborasi kerja bagaimana Anda menyelesaikan masalah ambigu bersama tim.",
    exercise: {
      kind: "mcq",
      prompt: "Langkah pertama yang wajib dilakukan saat menerima soal wawancara live coding adalah:",
      choices: [
        { id: "a", text: "Mengklarifikasi batasan input, ukuran data, dan mengonfirmasi contoh kasus batas (edge cases)." },
        { id: "b", text: "Langsung mengetik kode dalam diam." },
      ],
      correct: "a",
      explanation: "Klarifikasi diawal menunjukkan kematangan berpikir dan mencegah salah asumsi yang membuang waktu."
    }
  },
  "ti-i2": {
    title: "Behavioral Interview: Metode STAR & Komunikasi Trade-Off",
    level: "professional",
    estMinutes: 20,
    objectives: [
      "Menyusun cerita pengalaman kerja dengan format STAR (Situation, Task, Action, Result)",
      "Membahas kegagalan teknis dan konflik arsitektur secara konstruktif",
      "Menegosiasikan penawaran kerja di tingkat Principal / Lead Architect",
    ],
    tags: ["behavioral", "star-method", "interview"],
    concept: "Format STAR menyajikan narasi pencapaian teknis dengan bukti dampak bisnis kuantitatif yang terukur.",
    exercise: {
      kind: "fill-blank",
      prompt: "Huruf 'R' pada metode wawancara STAR mewakili ___BLANK_1___ yang harus terukur dengan angka.",
      blanks: [{ id: "BLANK_1", accepted: ["Result", "result", "Results"] }],
      explanation: "Result menunjukkan dampak nyata dari keputusan teknis yang Anda ambil."
    }
  },
  "ti-i3": {
    title: "Simulasi Penuh Berwaktu 45-60 Menit: Live Coding & System Design",
    level: "professional",
    estMinutes: 30,
    objectives: [
      "Mengelola alokasi waktu wawancara 45 menit: 5m klarifikasi, 15m high-level, 20m deep dive, 5m wrap-up",
      "Menjaga ketenangan dan komunikasi verbal saat menghadapi tantangan kompleks",
      "Menerima evaluasi komprehensif pada mode Interview Room",
    ],
    tags: ["interview", "mock-interview", "simulation"],
    concept: "Latihan simulasi terikat waktu membangun refleks dan ketahanan mental menghadapi tekanan wawancara nyata.",
    exercise: {
      kind: "mcq",
      prompt: "Berapa porsi waktu yang direkomendasikan untuk tahap klarifikasi dan estimasi kapasitas pada wawancara System Design 45 menit?",
      choices: [
        { id: "a", text: "5 - 7 Menit Pertama" },
        { id: "b", text: "35 Menit" },
      ],
      correct: "a",
      explanation: "5-7 menit cukup untuk menetapkan SLO, QPS, dan batasan fungsional sebelum masuk ke perancangan arsitektur."
    }
  },

  // --- TRACK J: UI/UX & Design Systems ---
  "tj-j1": {
    title: "Prinsip Visual: Grid 8-Point, Skala Tipografi & Kontras Aksesibilitas WCAG",
    level: "intermediate",
    estMinutes: 20,
    objectives: [
      "Menerapkan sistem spasi Grid 8-Point untuk konsistensi layout lintas platform",
      "Membangun skala tipografi harmonis dengan rasio modular",
      "Memastikan kepatuhan rasio kontras warna WCAG 2.1 minimal 4.5:1",
    ],
    tags: ["ui-ux", "visual-hierarchy", "wcag"],
    concept: "Kelipatan 8px mencegah rendering sub-pixel yang kabur pada beragam resolusi layar perangkat mobile dan desktop.",
    exercise: {
      kind: "mcq",
      prompt: "Berapakah rasio kontras minimum WCAG Level AA untuk teks berukuran normal?",
      choices: [
        { id: "a", text: "4.5 : 1" },
        { id: "b", text: "2 : 1" },
      ],
      correct: "a",
      explanation: "Standar 4.5:1 memastikan teks dapat dibaca dengan jelas oleh penyandang gangguan penglihatan warna."
    }
  },
  "tj-j2": {
    title: "Desain Interaksi: User Flow, State Kosong & Skeleton Loading",
    level: "intermediate",
    estMinutes: 20,
    objectives: [
      "Mendesain state antarmuka lengkap: Normal, Hover, Disabled, Loading, Empty, Error",
      "Menggunakan Skeleton Screen untuk menurunkan perceived latency pengguna",
      "Menulis pesan microcopy yang solutif saat terjadi kendala sistem",
    ],
    tags: ["ui-ux", "interaction-design", "skeleton-screen"],
    concept: "Skeleton screens mempersiapkan ekspektasi visual tata letak konten sehingga aplikasi terasa merespons seketika.",
    exercise: {
      kind: "mcq",
      prompt: "Mengapa Skeleton Screen lebih unggul dibanding spinner lingkaran di tengah layar?",
      choices: [
        { id: "a", text: "Memberi ekspektasi bentuk konten yang akan muncul sehingga menurunkan persepsi waktu tunggu pengguna." },
        { id: "b", text: "Karena spinner dilarang oleh standar web." },
      ],
      correct: "a",
      explanation: "Skeleton screen menurunkan perceived latency dengan menampilkan layout blueprint."
    }
  },
  "tj-j3": {
    title: "Sistem Desain: Arsitektur Design Tokens (Global vs Semantic Tokens)",
    level: "professional",
    estMinutes: 25,
    objectives: [
      "Menyusun hierarki token: Primitive (Global) -> Semantic (Alias) -> Component Tokens",
      "Mendukung dark mode instan dengan memetakan semantic tokens ke primitive yang sesuai",
      "Menjaga konsistensi token lintas tim Figma, Flutter, dan Jetpack Compose",
    ],
    tags: ["ui-ux", "design-tokens", "design-systems"],
    concept: "Arsitektur token memisahkan nilai absolut warna dari makna penggunaannya (misal color-brand-primary alih-alih hardcode orange-500).",
    exercise: {
      kind: "ui-predict",
      prompt: "Jika tema gelap diaktifkan, token manakah yang nilainya diubah?",
      choices: [
        { id: "a", text: "Semantic Token (misal bg-surface yang sebelumnya memetakan ke white dipetakan ulang ke neutral-900)." },
        { id: "b", text: "Semua angka hex primitif dihapus." },
      ],
      correct: "a",
      explanation: "Semantic alias berganti referensi ke token primitif yang sesuai tanpa perlu mengubah kode komponen antarmuka."
    }
  },
  "tj-j4": {
    title: "Figma untuk Developer: Auto Layout Bersarang & Handoff Bersih",
    level: "professional",
    estMinutes: 25,
    objectives: [
      "Memetakan Auto Layout Figma (Hug, Fill, Fixed) langsung ke Flexbox / Flutter / Compose",
      "Menggunakan Figma Variables untuk mengontrol token desain",
      "Menghilangkan ambiguitas spesifikasi saat handoff ke tim perekayasa",
    ],
    tags: ["figma", "auto-layout", "design-handoff"],
    concept: "Auto Layout bekerja identik dengan model layout Flexbox modern, memudahkan konversi desain menjadi kode native yang fleksibel.",
    exercise: {
      kind: "mcq",
      prompt: "Properti Figma Auto Layout 'Fill Container' setara dengan apa di dalam sebuah Row pada Flutter?",
      choices: [
        { id: "a", text: "Expanded(child: ...)" },
        { id: "b", text: "SizedBox(width: 10)" },
      ],
      correct: "a",
      explanation: "Widget `Expanded` memaksa anak widget untuk mengisi sisa ruang fleksibel di dalam flex container."
    }
  },
  "tj-j5": {
    title: "Adaptasi Lintas Platform: Material 3 vs iOS HIG & Lokalisasi Teks",
    level: "professional",
    estMinutes: 25,
    objectives: [
      "Membedakan konvensi navigasi Android (Material 3) vs iOS (Human Interface Guidelines)",
      "Mengantisipasi ekspansi teks hingga 30% saat lokalisasi ke Bahasa Indonesia",
      "Mencegah overflow teks dengan auto-wrapping dan fleksibilitas container",
    ],
    tags: ["ui-ux", "material3", "ios-hig", "localization"],
    concept: "Teks terjemahan Bahasa Indonesia rata-rata 20-35% lebih panjang dibanding Bahasa Inggris. Menggunakan fixed-width pada tombol memicu RenderFlex overflow.",
    exercise: {
      kind: "mcq",
      prompt: "Apa yang terjadi jika sebuah tombol dirancang dengan fixed-width 60px ketika teks diterjemahkan ke Bahasa Indonesia yang lebih panjang?",
      choices: [
        { id: "a", text: "Teks akan terpotong atau memicu layout overflow; solusinya gunakan min-width dengan horizontal padding." },
        { id: "b", text: "Layar otomatis membesar 200%." },
      ],
      correct: "a",
      explanation: "Fixed-width adalah anti-pattern dalam desain lokalisasi. Gunakan fluid padding dan min-width."
    }
  },
  "tj-j6": {
    title: "Evaluasi & Audit Kualitas: 10 Heuristik Usability Nielsen & Aksesibilitas",
    level: "professional",
    estMinutes: 25,
    objectives: [
      "Mengaudit antarmuka nyata menggunakan 10 Prinsip Heuristik Jakob Nielsen",
      "Menjalankan usability testing dengan 5 pengguna untuk mengungkap 85% masalah UX",
      "Melakukan audit aksesibilitas menggunakan screen reader TalkBack / VoiceOver",
    ],
    tags: ["ui-ux", "heuristics", "nielsen", "audit"],
    concept: "Heuristik Nielsen adalah prinsip panduan ergonomi digital untuk mendiagnosis kebingungan navigasi pengguna sebelum aplikasi dirilis ke publik.",
    exercise: {
      kind: "fill-blank",
      prompt: "Prinsip heuristik Nielsen nomor 5 yang mendesain sistem agar proaktif mencegah pengguna membuat kesalahan disebut Error ___BLANK_1___.",
      blanks: [{ id: "BLANK_1", accepted: ["prevention", "Prevention"] }],
      explanation: "Error Prevention merancang interaksi yang meminimalkan peluang salah sentuh atau salah input."
    }
  }
};

async function runSeedAll() {
  const client = await pool.connect();
  console.log("Connected to Neon DB!");

  try {
    // 1. Fetch all modules from public.modules
    const modulesRes = await client.query(`
      SELECT id, track_id, code, title, difficulty, learning_goals, order_index
      FROM public.modules
      ORDER BY track_id, order_index;
    `);

    console.log(`Found ${modulesRes.rows.length} modules in Neon database.`);

    let insertedCount = 0;

    for (const m of modulesRes.rows) {
      const customData = MODULE_LESSON_MAP[m.id];
      const lessonId = `lesson-${m.id}-core`;
      const lessonTitle = customData ? customData.title : `Materi Inti: ${m.title}`;
      const level = customData ? customData.level : m.difficulty;
      const estMinutes = customData ? customData.estMinutes : 20;
      const objectives = customData ? customData.objectives : (Array.isArray(m.learning_goals) ? m.learning_goals : ["Memahami konsep inti"]);
      const tags = customData ? customData.tags : [m.code.toLowerCase(), m.difficulty];
      
      const mdxBody = `# ${m.code} — ${lessonTitle}

Selamat datang di materi pembelajaran resmi **ArchForge** untuk modul **${m.title}**.

## Target Pembelajaran
${objectives.map(o => `- ${o}`).join("\n")}

## Konsep & Prinsip Rekayasa
${customData ? customData.concept : `Modul ini membahas prinsip-prinsip penting dalam kurikulum ArchForge tingkat **${m.difficulty}**. Anda akan mempelajari implementasi kode berstandar produksi, pencegahan kegagalan sistem, dan pola arsitektur yang teruji di industri teknologi.`}

### Panduan Implementasi
1. **Keandalan & Kebersihan Kode:** Terapkan pemisahan tanggung jawab yang jelas.
2. **Kinerja & Efisiensi:** Perhatikan konsumsi memori dan latensi runtime.
3. **Pengujian Mandiri:** Uji pemahaman Anda melalui latihan interaktif di bawah ini.`;

      // Upsert Lesson
      await client.query(`
        INSERT INTO public.lessons (
          id, module_id, title, level, est_minutes, prereq, objectives, tags, mdx_body, srs_cards_auto, order_index
        )
        VALUES ($1, $2, $3, $4, $5, '{}', $6, $7, $8, true, 1)
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          level = EXCLUDED.level,
          est_minutes = EXCLUDED.est_minutes,
          objectives = EXCLUDED.objectives,
          tags = EXCLUDED.tags,
          mdx_body = EXCLUDED.mdx_body,
          order_index = EXCLUDED.order_index;
      `, [
        lessonId,
        m.id,
        lessonTitle,
        level,
        estMinutes,
        objectives,
        tags,
        mdxBody
      ]);

      // Upsert Exercise
      const exId = `ex-${m.id}-main`;
      const exData = customData?.exercise || {
        kind: "mcq",
        prompt: `Evaluasi Pemahaman Modul ${m.code}: Manakah pendekatan rekayasa terbaik untuk mencapai '${objectives[0] || m.title}'?`,
        choices: [
          { id: "a", text: `Menerapkan pemisahan tanggung jawab terstruktur dan automated testing untuk ${objectives[0] || m.title}.` },
          { id: "b", text: "Menonaktifkan testing dan mengabaikan error handling." }
        ],
        correct: "a",
        explanation: `Standar kurikulum ArchForge mewajibkan ${objectives[0] || m.title} didukung oleh pengujian terotomatisasi.`
      };

      const options = exData.kind === "mcq" || exData.kind === "ui-predict"
        ? { choices: exData.choices, correctChoiceId: exData.correct }
        : exData.kind === "fill-blank"
        ? { blanks: exData.blanks }
        : null;

      await client.query(`
        INSERT INTO public.exercises (
          id, lesson_id, level, kind, language, runner, prompt_markdown, starter_code, options, hints, solution, explanation
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        ON CONFLICT (id) DO UPDATE SET
          prompt_markdown = EXCLUDED.prompt_markdown,
          starter_code = EXCLUDED.starter_code,
          options = EXCLUDED.options,
          hints = EXCLUDED.hints,
          solution = EXCLUDED.solution,
          explanation = EXCLUDED.explanation;
      `, [
        exId,
        lessonId,
        level,
        exData.kind,
        exData.kind === "code" ? (m.track_id.includes("python") ? "python" : m.track_id.includes("rust") ? "rust" : m.track_id.includes("kotlin") ? "kotlin" : "dart") : null,
        exData.kind === "code" ? (m.track_id.includes("python") ? "pyodide" : m.track_id.includes("rust") ? "judge0" : null) : null,
        exData.prompt,
        exData.starterCode || null,
        options ? JSON.stringify(options) : null,
        JSON.stringify(["Tinjau kembali konsep inti yang disajikan pada materi.", "Pilihlah solusi yang mengedepankan clean code dan reliability."]),
        exData.solution || exData.correct || "Solusi terverifikasi",
        exData.explanation
      ]);

      insertedCount++;
    }

    console.log(`✓ Berhasil memverifikasi & meng-upsert ${insertedCount} materi lessons dan latihan ke seluruh modul.`);

    // 2. Final counts in Neon DB
    const finalTracks = await client.query(`SELECT count(*) as count FROM public.tracks;`);
    const finalModules = await client.query(`SELECT count(*) as count FROM public.modules;`);
    const finalLessons = await client.query(`SELECT count(*) as count FROM public.lessons;`);
    const finalExercises = await client.query(`SELECT count(*) as count FROM public.exercises;`);
    const finalScenarios = await client.query(`SELECT count(*) as count FROM public.sd_scenarios;`);
    const finalProjects = await client.query(`SELECT count(*) as count FROM public.track_projects;`);

    console.log("\n=================================================");
    console.log("STATUS LENGKAP SELURUH MATERI DI NEON POSTGRESQL:");
    console.log(`- Tracks:         ${finalTracks.rows[0].count} / 11`);
    console.log(`- Modules:        ${finalModules.rows[0].count} / 63`);
    console.log(`- Lessons:        ${finalLessons.rows[0].count}`);
    console.log(`- Exercises:      ${finalExercises.rows[0].count}`);
    console.log(`- SD Scenarios:   ${finalScenarios.rows[0].count} / 8`);
    console.log(`- Track Projects: ${finalProjects.rows[0].count} / 28`);
    console.log("=================================================\n");

  } finally {
    client.release();
    await pool.end();
  }
}

runSeedAll().catch(console.error);

