export interface LessonItem {
  id: string;
  slug: string;
  title: string;
  duration: string;
  type: "code" | "concept" | "simulator" | "quiz";
  completed?: boolean;
  active?: boolean;
  description: string;
  objectives: string[];
  starterCode?: string;
  language?: "python" | "rust" | "kotlin" | "dart";
  solution?: string;
  hints: string[];
  testCases?: Array<{ name: string; input?: string; expected?: string }>;
}

export interface ModuleItem {
  id: string;
  slug: string;
  title: string;
  lessons: LessonItem[];
}

export interface TrackItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: "Bahasa" | "Fondasi" | "Arsitektur" | "ML & CV" | "UI/UX" | "Interview";
  level: "Pemula" | "Menengah" | "Mahir";
  emblem: string;
  color: string;
  progressPercent: number;
  modulesCount: number;
  lessonsCount: number;
  modules: ModuleItem[];
  projectBrief?: {
    title: string;
    description: string;
    acceptanceCriteria: string[];
  };
}

export const TRACKS: TrackItem[] = [
  {
    id: "rust",
    slug: "rust",
    title: "Rust Systems Programming",
    tagline: "Dari nol hingga keandalan memori, ownership, lifetimes, dan backend berkinerja tinggi.",
    category: "Bahasa",
    level: "Menengah",
    emblem: "/assets/3d/emblem/emblem-rust@2x.webp",
    color: "#EE833A",
    progressPercent: 35,
    modulesCount: 6,
    lessonsCount: 24,
    projectBrief: {
      title: "CLI Fast-Grep & KV-Store",
      description: "Bangun tool command line pencari pola regex multi-threaded dan database key-value dengan persistensi file.",
      acceptanceCriteria: [
        "Menerapkan ownership tanpa clone berlebihan",
        "Penanganan error idiomatik dengan Result & thiserror",
        "Multi-threading aman dengan crossbeam/rayon",
        "Unit & integration tests dengan coverage > 85%"
      ]
    },
    modules: [
      {
        id: "b1",
        slug: "dasar-rust",
        title: "B1 — Fondasi Rust: Variabel & Kontrol Alur",
        lessons: [
          {
            id: "rust-var-01",
            slug: "variabel-mutabilitas",
            title: "Variabel & Mutabilitas di Rust",
            duration: "15m",
            type: "code",
            completed: true,
            description: "Pahami filosofi mutabilitas eksplisit di Rust. Di Rust, variabel secara default bersifat immutable.",
            objectives: [
              "Menjelaskan perbedaan let dan let mut",
              "Memahami shadowing dan alokasi ulang",
              "Menggunakan tipe primitif dengan benar"
            ],
            language: "rust",
            starterCode: `fn main() {
    let x = 5;
    println!("Nilai x adalah: {}", x);
    // Ubah x menjadi mutable atau gunakan shadowing
    let x = x + 1;
    println!("Nilai x setelah shadowing adalah: {}", x);
}`,
            hints: [
              "Secara default variabel di Rust immutable. Gunakan `mut` jika ingin mengubah nilainya.",
              "Kamu juga bisa menggunakan teknik shadowing dengan mendeklarasikan ulang `let x = ...`.",
              "Shadowing memungkinkan perubahan tipe data tanpa mengganti nama variabel."
            ],
            testCases: [
              { name: "Eksekusi main() tanpa panic", expected: "Nilai x adalah: 5" },
              { name: "Verifikasi shadowing nilai x + 1", expected: "Nilai x setelah shadowing adalah: 6" }
            ]
          },
          {
            id: "rust-ownership-01",
            slug: "ownership-dan-move",
            title: "Ownership & Semantik Move",
            duration: "25m",
            type: "code",
            active: true,
            description: "Aturan ownership adalah fitur paling unik di Rust. Memungkinkan keamanan memori tanpa garbage collector.",
            objectives: [
              "Menjelaskan 3 aturan ownership",
              "Menganalisis kapan nilai di-Move vs di-Copy",
              "Mencegah use-after-move compiler error"
            ],
            language: "rust",
            starterCode: `fn main() {
    let s1 = String::from("ArchForge");
    
    // Perbaiki kode ini agar s1 tetap bisa digunakan setelah dipinjam (borrow)
    let s2 = &s1; // Pinjam referensi s1
    
    println!("s1 masih valid: {}", s1);
    println!("s2 mereferensikan: {}", s2);
    
    let len = hitung_panjang(&s1);
    println!("Panjang string '{}' adalah {}", s1, len);
}

fn hitung_panjang(s: &String) -> usize {
    s.len()
}`,
            hints: [
              "Jika kamu menulis `let s2 = s1;`, kepemilikan string s1 akan berpindah (moved) ke s2.",
              "Gunakan referensi immutable `&s1` agar s1 tetap dapat diakses.",
              "Fungsi `hitung_panjang` harus menerima parameter referensi `&String`."
            ],
            testCases: [
              { name: "Verifikasi referensi s1 dan s2", expected: "s1 masih valid: ArchForge" },
              { name: "Perhitungan panjang string", expected: "Panjang string 'ArchForge' adalah 9" }
            ]
          },
          {
            id: "rust-borrowing-01",
            slug: "borrowing-dan-slices",
            title: "Borrowing & Slices",
            duration: "20m",
            type: "code",
            description: "Pelajari aturan peminjaman (borrowing): kamu boleh memiliki banyak referensi immutable, ATAU tepat satu referensi mutable.",
            objectives: [
              "Memahami data race prevention pada compile time",
              "Menggunakan string slices (&str)",
              "Menulis fungsi yang efisien tanpa alokasi baru"
            ],
            language: "rust",
            hints: ["Hanya boleh ada 1 &mut T pada satu waktu.", "Gunakan &[T] untuk array slices."],
            testCases: [{ name: "Uji compiler borrow checker", expected: "Lulus" }]
          }
        ]
      },
      {
        id: "b2",
        slug: "struktur-data-rust",
        title: "B2 — Struct, Enum & Pattern Matching",
        lessons: [
          {
            id: "rust-struct-01",
            slug: "struct-dan-impl",
            title: "Mendefinisikan Struct & Method `impl`",
            duration: "20m",
            type: "code",
            description: "Organisasi data dan method terkait menggunakan struct dan blok impl.",
            objectives: ["Mendefinisikan struct", "Menulis method dan fungsi asosiasi", "Implementasi trait Display"],
            hints: ["Self merujuk pada tipe struct itu sendiri.", "&self berarti meminjam instance."],
            testCases: [{ name: "Inisialisasi struct", expected: "Valid" }]
          }
        ]
      }
    ]
  },
  {
    id: "python",
    slug: "python",
    title: "Python untuk Sistem & Data",
    tagline: "Dari dasar sintaksis, OOP tingkat lanjut, Pyodide in-browser, hingga manipulasi data ilmiah.",
    category: "Bahasa",
    level: "Pemula",
    emblem: "/assets/3d/emblem/emblem-python@2x.webp",
    color: "#3B82F6",
    progressPercent: 55,
    modulesCount: 5,
    lessonsCount: 20,
    projectBrief: {
      title: "Scraper & Mini Data Pipeline",
      description: "Kembangkan ETL pipeline yang mengambil data API publik, membersihkan anomali, dan menyajikan ringkasan statistik.",
      acceptanceCriteria: [
        "Async fetching dengan httpx/aiohttp",
        "Pembersihan dan validasi data dengan Pydantic",
        "Agregasi metrik dengan Pandas",
        "Ekspor hasil ke JSON & CSV"
      ]
    },
    modules: [
      {
        id: "a1",
        slug: "python-dasar",
        title: "A1 — Dasar Python & Struktur Data",
        lessons: [
          {
            id: "py-basics-01",
            slug: "list-dict-comprehension",
            title: "List & Dict Comprehensions",
            duration: "15m",
            type: "code",
            completed: true,
            description: "Teknik idiomatik Python untuk mentransformasi dan memfilter koleksi data dalam satu baris ekspresi bersih.",
            objectives: [
              "Mengganti loop for biasa dengan list comprehension",
              "Memfilter elemen dengan klausul if",
              "Membangun lookup table dengan dictionary comprehension"
            ],
            language: "python",
            starterCode: `# Saring angka genap dan kuadratkan hasilnya
angka = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Tulis list comprehension kamu di sini
kuadrat_genap = [x**2 for x in angka if x % 2 == 0]

print("Hasil:", kuadrat_genap)
`,
            hints: [
              "Sintaks dasar: `[ekspresi for item in koleksi if kondisi]`",
              "Gunakan operator modulo `% 2 == 0` untuk menyaring angka genap.",
              "Kuadrat dihitung dengan `x ** 2`."
            ],
            testCases: [
              { name: "Cek kuadrat angka genap", expected: "Hasil: [4, 16, 36, 64, 100]" }
            ]
          },
          {
            id: "py-func-01",
            slug: "generator-dan-decorator",
            title: "Generator & Decorator Berkinerja",
            duration: "20m",
            type: "code",
            active: true,
            description: "Manajemen memori efisien dengan lazy evaluation (yield) dan wrapping fungsi dengan decorator.",
            objectives: [
              "Membuat generator untuk stream data besar tanpa membebani RAM",
              "Menulis timing decorator untuk mengukur latensi eksekusi",
              "Menggunakan functools.wraps"
            ],
            language: "python",
            starterCode: `import time

def ukur_waktu(func):
    def wrapper(*args, **kwargs):
        t0 = time.time()
        hasil = func(*args, **kwargs)
        durasi_ms = (time.time() - t0) * 1000
        print(f"[{func.__name__}] selesai dalam {durasi_ms:.2f}ms")
        return hasil
    return wrapper

@ukur_waktu
def hitung_faktorial(n):
    if n <= 1:
        return 1
    total = 1
    for i in range(2, n + 1):
        total *= i
    return total

print("Faktorial 5:", hitung_faktorial(5))
`,
            hints: [
              "Decorator adalah fungsi yang menerima fungsi lain dan mengembalikan fungsi pembungkus (wrapper).",
              "Gunakan *args dan **kwargs agar wrapper fleksibel terhadap parameter apa pun.",
              "Fungsi mengembalikan nilai total faktorial."
            ],
            testCases: [
              { name: "Perhitungan faktorial", expected: "Faktorial 5: 120" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "system-design",
    slug: "system-design",
    title: "System Design & Arsitektur IT",
    tagline: "Desain sistem berskala besar: Load Balancing, Caching, Sharding, Antrean, dan SPOF.",
    category: "Arsitektur",
    level: "Mahir",
    emblem: "/assets/3d/emblem/emblem-system-design@2x.webp",
    color: "#F59E0B",
    progressPercent: 40,
    modulesCount: 8,
    lessonsCount: 30,
    projectBrief: {
      title: "Desain Arsitektur Sistem Streaming & Clipper",
      description: "Rancang dokumen arsitektur C4, estimasi kapasitas, skema database terpartisi, dan pencegahan bottleneck.",
      acceptanceCriteria: [
        "Diagram arsitektur konteks dan container C4",
        "Kalkulasi QPS puncak dan kapasitas storage 5 tahun",
        "Penentuan strategi caching dan invalidasi",
        "Mini-ADR untuk pemilihan message queue vs gRPC"
      ]
    },
    modules: [
      {
        id: "sd-mod-1",
        slug: "fondasi-skalabilitas",
        title: "F1 — Fondasi Skalabilitas & Metrik",
        lessons: [
          {
            id: "sd-url-shortener",
            slug: "simulator-url-shortener",
            title: "Simulator: Arsitektur URL Shortener",
            duration: "30m",
            type: "simulator",
            active: true,
            description: "Rancang topologi sistem untuk URL shortener berskala 100K RPS. Hubungkan Load Balancer, Cache Redis, dan DB Primary.",
            objectives: [
              "Mencegah Single Point of Failure (SPOF)",
              "Mengatur Cache Hit Ratio > 80% untuk traffic read-heavy",
              "Meminimalisir latensi p95 di bawah 100ms"
            ],
            hints: [
              "URL Shortener memiliki rasio baca:tulis sekitar 100:1 (read-heavy).",
              "Tempatkan Cache (Redis) di depan database untuk menyerap 85%+ beban query baca.",
              "Gunakan Load Balancer dengan algoritma Round Robin atau Least Connections."
            ]
          }
        ]
      }
    ]
  },
  {
    id: "kotlin",
    slug: "kotlin",
    title: "Kotlin & Jetpack Compose",
    tagline: "Modern Android & Backend development: Coroutines, Flow, State Hoisting, Material 3.",
    category: "Bahasa",
    level: "Menengah",
    emblem: "/assets/3d/emblem/emblem-kotlin@2x.webp",
    color: "#8B5CF6",
    progressPercent: 20,
    modulesCount: 5,
    lessonsCount: 18,
    modules: []
  },
  {
    id: "flutter-dart",
    slug: "flutter-dart",
    title: "Dart & Flutter Cross-Platform",
    tagline: "Desain to code, Clean Architecture, BLoC/Riverpod, animasi kustom, dan responsif adaptif.",
    category: "Bahasa",
    level: "Menengah",
    emblem: "/assets/3d/emblem/emblem-flutter-dart@2x.webp",
    color: "#06B6D4",
    progressPercent: 25,
    modulesCount: 6,
    lessonsCount: 22,
    modules: []
  },
  {
    id: "dsa",
    slug: "dsa",
    title: "DSA & Live Coding Mastery",
    tagline: "Kuasai 15 pola algoritma umum: Two Pointers, Sliding Window, Monotonic Stack, Tree DFS, Graphs.",
    category: "Fondasi",
    level: "Menengah",
    emblem: "/assets/3d/emblem/emblem-dsa@2x.webp",
    color: "#10B981",
    progressPercent: 50,
    modulesCount: 7,
    lessonsCount: 35,
    modules: []
  },
  {
    id: "architect",
    slug: "architect",
    title: "Peran & Praktik Arsitek Software",
    tagline: "C4 Model, Architecture Decision Records (ADR), Domain-Driven Design (DDD), dan NFR Trade-offs.",
    category: "Arsitektur",
    level: "Mahir",
    emblem: "/assets/3d/emblem/emblem-architect@2x.webp",
    color: "#EC4899",
    progressPercent: 15,
    modulesCount: 6,
    lessonsCount: 18,
    modules: []
  },
  {
    id: "ml-cv",
    slug: "ml-cv",
    title: "Machine Learning & Computer Vision",
    tagline: "Matematika terapan, CNN, deteksi objek (YOLO), ekspor ONNX, dan inferensi di browser.",
    category: "ML & CV",
    level: "Mahir",
    emblem: "/assets/3d/emblem/emblem-ml-cv@2x.webp",
    color: "#6366F1",
    progressPercent: 10,
    modulesCount: 5,
    lessonsCount: 16,
    modules: []
  },
  {
    id: "ui-ux",
    slug: "ui-ux",
    title: "Desain UI/UX & Antarmuka",
    tagline: "Grid 4/8pt, tipografi, token desain, auto-layout Figma, dan transisi design-to-code.",
    category: "UI/UX",
    level: "Pemula",
    emblem: "/assets/3d/emblem/emblem-ui-ux@2x.webp",
    color: "#F97316",
    progressPercent: 30,
    modulesCount: 4,
    lessonsCount: 14,
    modules: []
  },
  {
    id: "interview",
    slug: "interview",
    title: "Simulasi Interview Teknis",
    tagline: "Latihan wawancara live: fase Klarifikasi, Perancangan, Live Coding, dan Analisis Kompleksitas.",
    category: "Interview",
    level: "Mahir",
    emblem: "/assets/3d/emblem/emblem-interview@2x.webp",
    color: "#14B8A6",
    progressPercent: 45,
    modulesCount: 4,
    lessonsCount: 12,
    modules: []
  }
];

