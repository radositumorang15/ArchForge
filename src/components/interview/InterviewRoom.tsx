"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Send,
  Sparkles,
  CheckCircle2,
  Clock,
  Cpu,
  Layers,
  Award,
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  History,
  TrendingUp,
  RotateCcw,
  BookOpen,
  ArrowRight,
  BarChart3,
  Check,
  X,
  Code2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface InterviewMessage {
  id: string;
  sender: "user" | "interviewer";
  text: string;
  time: string;
  stage?: string;
}

interface Scenario {
  id: string;
  kind: "system_design" | "coding";
  title: string;
  difficulty: "Menengah" | "Lanjut" | "Profesional";
  estMinutes: number;
  tags: string[];
  brief: string;
  stagePrompts: {
    clarification: string;
    architecture: string;
    deepDive: string;
  };
}

const INTERVIEW_SCENARIOS: Scenario[] = [
  {
    id: "sd-url-shortener",
    kind: "system_design",
    title: "Rancang URL Shortener Skala Besar (100.000 RPS)",
    difficulty: "Menengah",
    estMinutes: 45,
    tags: ["System Design", "Hashing", "Redis Cache", "SQL vs NoSQL"],
    brief: "Rancang layanan pemendek URL dengan beban baca sangat tinggi (100:1 read-write ratio), latensi p95 < 20ms, dan ketersediaan 99.99%.",
    stagePrompts: {
      clarification:
        "Selamat datang di sesi wawancara System Design. Skenario kita: **Rancang URL Shortener skala 100.000 RPS**.\n\nMari mulai dengan **Tahap 1: Klarifikasi Kebutuhan & Asumsi (Think Aloud)**:\n1. Berapa estimasi storage selama 5 tahun?\n2. Bagaimana perbandingan rasio baca vs tulis?\n3. Apakah ada kebutuhan custom alias atau analitik klik?",
      architecture:
        "Bagus! Mari melangkah ke **Tahap 2: Desain Arsitektur & Komponen**:\n1. Gambarkan flow dari Client -> DNS -> Load Balancer -> App Server.\n2. Bagaimana strategi pembuatan Hash ID 7-karakter (Base62 vs MD5 vs SnowFlake ID generator)?\n3. Di mana caching diletakkan dan bagaimana skema database yang kamu pilih?",
      deepDive:
        "Sekarang masuk ke **Tahap 3: Deep Dive, SPOF & Trade-offs**:\n1. Bagaimana menangani `Cache Stampede` saat tautan viral kedaluwarsa serentak?\n2. Bila database di-shard, apa `Shard Key` yang kamu gunakan untuk menghindari Hotspotting?\n3. Berapa estimasi kompleksitas waktu dan ruang untuk operasi redirect?",
    },
  },
  {
    id: "sd-rate-limiter",
    kind: "system_design",
    title: "Distributed Rate Limiter API Gateway",
    difficulty: "Lanjut",
    estMinutes: 45,
    tags: ["Distributed Systems", "Token Bucket", "Redis Cluster", "Concurrency"],
    brief: "Rancang rate limiter terdistribusi untuk membatasi 100 request/menit per user di depan puluhan API gateway instances tanpa race condition.",
    stagePrompts: {
      clarification:
        "Halo! Skenario hari ini adalah merancang **Distributed Rate Limiter**.\n\n**Tahap 1: Klarifikasi Kebutuhan**:\n1. Apa algoritma yang kamu pertimbangkan (Token Bucket vs Leaky Bucket vs Sliding Window Counter)?\n2. Apakah pembatasan berbasis IP, User ID, atau API Key?\n3. Berapa toleransi latensi per request check?",
      architecture:
        "Mari masuk ke **Tahap 2: High-Level Architecture**:\n1. Di mana rate limiter dieksekusi (in-memory proxy, gateway middleware, atau dedicated service)?\n2. Bagaimana sinkronisasi state antar instance menggunakan Redis Cluster atau local cache?\n3. Apa HTTP status code dan response headers yang dikembalikan saat client melanggar limit?",
      deepDive:
        "**Tahap 3: Bottleneck & Resiliensi**:\n1. Bagaimana menangani `Race Condition` saat beberapa worker mengakses token count bersamaan (Redis Lua Script vs Transaction)?\n2. Apa skenario fallback jika Redis cluster mengalami downtime (`Fail-open` vs `Fail-closed`)?",
    },
  },
  {
    id: "sd-kv-store",
    kind: "system_design",
    title: "Distributed Key-Value Store (LSM-Tree & Quorum)",
    difficulty: "Profesional",
    estMinutes: 50,
    tags: ["Storage Engine", "LSM-Tree", "Consistent Hashing", "Raft"],
    brief: "Rancang key-value store terdistribusi dengan penulisan berkecepatan tinggi, replikasi quorum yang konsisten, dan deteksi kegagalan node otomatis.",
    stagePrompts: {
      clarification:
        "Selamat datang di wawancara tingkat Principal/Architect. Skenario: **Distributed Key-Value Store**.\n\n**Tahap 1: Klarifikasi & Batasan Desain**:\n1. Berdasarkan CAP Theorem, apakah sistem ini memprioritaskan CP atau AP?\n2. Berapa ukuran rata-rata key dan value?\n3. Apakah ada dukungan transaksi multi-key?",
      architecture:
        "**Tahap 2: Arsitektur Node & Partisi**:\n1. Bagaimana strategi partisi data menggunakan `Consistent Hashing` dan virtual nodes?\n2. Bagaimana arsitektur penyimpanan lokal pada tiap node (`LSM-Tree` dengan MemTable, WAL, SSTable)?",
      deepDive:
        "**Tahap 3: Konsistensi & Pemulihan**:\n1. Jelaskan protokol Quorum (`R + W > N`) untuk tunable consistency.\n2. Bagaimana mekanisme anti-entropy (Merkle Trees) dan Gossip Protocol untuk kegagalan node?",
    },
  },
  {
    id: "dsa-lru-cache",
    kind: "coding",
    title: "Live Coding: Desain LRU Cache O(1)",
    difficulty: "Menengah",
    estMinutes: 35,
    tags: ["DSA", "Hash Table", "Doubly Linked List", "O(1)"],
    brief: "Implementasikan struktur data Least Recently Used (LRU) Cache dengan operasi get dan put berjalan dalam kompleksitas waktu O(1).",
    stagePrompts: {
      clarification:
        "Selamat datang di sesi Technical Coding. Tugas: **Desain LRU Cache O(1)**.\n\n**Tahap 1: Klarifikasi Masalah**:\n1. Apa batasan kapasitas (`capacity`)?\n2. Apa yang dikembalikan jika key tidak ditemukan?\n3. Sebutkan struktur data kombinasi yang kamu pilih sebelum menulis kode.",
      architecture:
        "**Tahap 2: Struktur Data & Pointer**:\n1. Jelaskan bagaimana HashMap + Doubly Linked List bekerja sama mempertahankan urutan akses.\n2. Di mana letak node paling baru digunakan (`head`) dan paling usang (`tail`)?",
      deepDive:
        "**Tahap 3: Kompleksitas & Edge Cases**:\n1. Buktikan bahwa operasi `get` dan `put` keduanya adalah O(1) waktu.\n2. Bagaimana penanganan update value pada key yang sudah ada vs penambahan key baru saat kapasitas penuh?",
    },
  },
];

type PhaseType = "clarification" | "architecture" | "deepDive" | "completed";

interface RubricOutcome {
  score: number;
  dimensions: {
    correctness: number;
    scalability: number;
    communication: number;
    tradeoffs: number;
  };
  strengths: string[];
  weaknesses: string[];
  recommendation: string;
}

interface SavedSession {
  id: string;
  kind: string;
  title: string;
  started_at: string;
  ended_at?: string;
  current_phase: string;
  outcome?: RubricOutcome;
}

interface InterviewRoomProps {
  user?: {
    id?: string;
    name: string;
    email?: string;
    role: string;
    streak?: number;
  } | null;
  initialSessionId?: string;
}

// Markdown formatting helper to render bold, lists, and inline code cleanly
function FormattedMessageText({
  text,
  isUser = false,
}: {
  text: string;
  isUser?: boolean;
}) {
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5 leading-relaxed text-xs sm:text-[13px]">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        const isNumbered = /^\d+\.\s/.test(trimmed);
        const isBullet = /^[-*]\s/.test(trimmed);

        const content = isNumbered
          ? trimmed.replace(/^\d+\.\s/, "")
          : isBullet
          ? trimmed.replace(/^[-*]\s/, "")
          : trimmed;

        const renderedLine = parseInline(content, isUser);

        if (isNumbered) {
          const numMatch = trimmed.match(/^(\d+)\./);
          const num = numMatch ? numMatch[1] : "";
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 my-0.5">
              <span
                className={cn(
                  "font-bold font-mono text-[11px] min-w-[16px]",
                  isUser ? "text-orange-200" : "text-orange-600"
                )}
              >
                {num}.
              </span>
              <span className="flex-1">{renderedLine}</span>
            </div>
          );
        }

        if (isBullet) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1 my-0.5">
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0",
                  isUser ? "bg-white" : "bg-orange-500"
                )}
              />
              <span className="flex-1">{renderedLine}</span>
            </div>
          );
        }

        return <p key={idx}>{renderedLine}</p>;
      })}
    </div>
  );
}

function parseInline(text: string, isUser: boolean) {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);

  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong
          key={i}
          className={cn(
            "font-bold",
            isUser ? "text-white underline decoration-white/40" : "text-ink-950 font-bold"
          )}
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="italic opacity-90">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className={cn(
            "px-1.5 py-0.5 mx-0.5 rounded font-mono text-[11px] font-semibold border",
            isUser
              ? "bg-black/20 text-white border-white/20"
              : "bg-surface-200 text-orange-700 border-line/60"
          )}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export function InterviewRoom({ user, initialSessionId }: InterviewRoomProps) {
  const [activeTab, setActiveTab] = useState<"room" | "history">("room");
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>("sd-url-shortener");
  const [currentPhase, setCurrentPhase] = useState<PhaseType>("clarification");
  const [inputText, setInputText] = useState<string>("");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [showOutcomeModal, setShowOutcomeModal] = useState<boolean>(false);
  const [outcomeData, setOutcomeData] = useState<RubricOutcome | null>(null);
  const [historySessions, setHistorySessions] = useState<SavedSession[]>([]);
  const [historyLoading, setHistoryLoading] = useState<boolean>(false);

  const activeScenario =
    INTERVIEW_SCENARIOS.find((s) => s.id === selectedScenarioId) ||
    INTERVIEW_SCENARIOS[0];

  // Fixed initial time string prevents SSR hydration mismatch
  const [messages, setMessages] = useState<InterviewMessage[]>([
    {
      id: "m-init",
      sender: "interviewer",
      text: activeScenario.stagePrompts.clarification,
      time: "10:00 WIB",
      stage: "Fase 1: Klarifikasi (Think Aloud)",
    },
  ]);

  const getClientTime = () => {
    return new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }) + " WIB";
  };

  // Load history from Neon DB
  const fetchHistory = async () => {
    setHistoryLoading(true);
    try {
      const res = await fetch("/api/interview/session");
      if (res.ok) {
        const data = await res.json();
        setHistorySessions(data.sessions || []);
      }
    } catch (err) {
      console.error("Failed to load interview history:", err);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Timer countdown / elapsed
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && currentPhase !== "completed") {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, currentPhase]);

  const handleSelectScenario = (sc: Scenario) => {
    setSelectedScenarioId(sc.id);
    setCurrentPhase("clarification");
    setElapsedSeconds(0);
    setShowOutcomeModal(false);
    setOutcomeData(null);
    setMessages([
      {
        id: `m-init-${Date.now()}`,
        sender: "interviewer",
        text: sc.stagePrompts.clarification,
        time: getClientTime(),
        stage: "Fase 1: Klarifikasi (Think Aloud)",
      },
    ]);
  };

  const handleAdvancePhase = () => {
    let nextPhase: PhaseType = "architecture";
    let promptText = "";
    let stageTitle = "";

    if (currentPhase === "clarification") {
      nextPhase = "architecture";
      promptText = activeScenario.stagePrompts.architecture;
      stageTitle = "Fase 2: Desain Arsitektur & Pilihan DB";
    } else if (currentPhase === "architecture") {
      nextPhase = "deepDive";
      promptText = activeScenario.stagePrompts.deepDive;
      stageTitle = "Fase 3: Deep Dive & Trade-offs";
    } else if (currentPhase === "deepDive") {
      handleCompleteInterview();
      return;
    }

    setCurrentPhase(nextPhase);
    setMessages((prev) => [
      ...prev,
      {
        id: `m-stage-${Date.now()}`,
        sender: "interviewer",
        text: promptText,
        time: getClientTime(),
        stage: stageTitle,
      },
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    const newMsg: InterviewMessage = {
      id: `m-user-${Date.now()}`,
      sender: "user",
      text: userText,
      time: getClientTime(),
      stage: getStageLabel(currentPhase),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
    setIsEvaluating(true);

    // Dynamic technical interviewer feedback
    setTimeout(() => {
      let replyText = "";
      const textLower = userText.toLowerCase();

      if (currentPhase === "clarification") {
        if (textLower.includes("rps") || textLower.includes("read") || textLower.includes("write")) {
          replyText =
            "Analisis rasio dan estimasi throughput yang tajam! Estimasi ini krusial untuk menentukan kapasitas storage dan node cache.\n\nBagaimana dengan SLA latensi p99 dan strategi persistensi data jangka panjang?";
        } else {
          replyText =
            "Poin klarifikasi yang baik. Catat juga batasan skala: 100K RPS berarti ~8.6 miliar request per hari. Mari pastikan arsitektur mampu menahan lonjakan ini sebelum kita lanjut ke desain komponen.";
        }
      } else if (currentPhase === "architecture") {
        if (textLower.includes("redis") || textLower.includes("cache") || textLower.includes("cdn")) {
          replyText =
            "Penempatan caching layer sangat pas untuk meredam 90%+ beban baca dari database utama. Apa eviction policy (LRU vs LFU) dan TTL yang kamu sarankan?";
        } else if (textLower.includes("base62") || textLower.includes("snowflake") || textLower.includes("hash")) {
          replyText =
            "Pilihan encoding ID yang tepat. 62^7 menyediakan sekitar 3.5 triliun kombinasi unik, sangat memadai untuk siklus hidup 10 tahun.";
        } else {
          replyText =
            "Komponen utama telah terpetakan. Jelaskan bagaimana API Gateway membagi beban ke microservices worker dan database replika.";
        }
      } else {
        // Deep Dive
        if (textLower.includes("stampede") || textLower.includes("mutex") || textLower.includes("lock")) {
          replyText =
            "Solusi locking terdistribusi atau probabilistic early expiration efektif mengeliminasi Cache Stampede. Anda menunjukkan pemahaman mendalam tentang kegagalan sistem nyata!";
        } else if (textLower.includes("shard") || textLower.includes("partition")) {
          replyText =
            "Pemilihan partition key yang matang. Pastikan juga memiliki fallback jika salah satu shard mengalami node crash.";
        } else {
          replyText =
            "Analisis kompromi (trade-offs) yang rasional. Semua poin kritis telah dibahas dengan baik. Anda dapat menyelesaikan sesi untuk menerima rubrik evaluasi.";
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `m-rep-${Date.now()}`,
          sender: "interviewer",
          text: replyText,
          time: getClientTime(),
          stage: getStageLabel(currentPhase),
        },
      ]);
      setIsEvaluating(false);
    }, 1200);
  };

  const handleCompleteInterview = async () => {
    setIsEvaluating(true);
    setCurrentPhase("completed");
    setIsTimerRunning(false);

    const allUserTexts = messages
      .filter((m) => m.sender === "user")
      .map((m) => m.text)
      .join(" ")
      .toLowerCase();

    const correctness = Math.min(
      95,
      70 + (allUserTexts.includes("rps") ? 10 : 0) + (allUserTexts.includes("database") || allUserTexts.includes("sql") ? 10 : 5)
    );
    const scalability = Math.min(
      98,
      68 + (allUserTexts.includes("cache") || allUserTexts.includes("redis") ? 12 : 0) + (allUserTexts.includes("shard") || allUserTexts.includes("balancer") ? 15 : 5)
    );
    const communication = Math.min(92, 75 + Math.min(15, messages.filter((m) => m.sender === "user").length * 4));
    const tradeoffs = Math.min(
      94,
      70 + (allUserTexts.includes("stampede") || allUserTexts.includes("spof") || allUserTexts.includes("latensi") ? 18 : 6)
    );

    const overall = Math.round((correctness + scalability + communication + tradeoffs) / 4);

    const outcome: RubricOutcome = {
      score: overall,
      dimensions: {
        correctness,
        scalability,
        communication,
        tradeoffs,
      },
      strengths: [
        "Kemampuan klarifikasi kapasitas kuantitatif (RPS & storage) terstruktur.",
        "Pemilihan komponen caching dan strategi read-heavy tepat sasaran.",
        "Komunikasi Think Aloud jelas dan mudah diikuti.",
      ],
      weaknesses: [
        "Detail strategi failover jika Redis cluster mengalami partisi jaringan dapat diperdalam.",
        "Pertimbangkan skema dual-write dan konsistensi eventual pada replikasi.",
      ],
      recommendation:
        "Tingkatkan penguasaan di Track F: System Design (Modul F3 Caching & Modul F5 Sharding) untuk pemahaman optimal mitigasi kegagalan terdistribusi.",
    };

    setOutcomeData(outcome);
    setShowOutcomeModal(true);

    try {
      await fetch("/api/interview/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: activeScenario.kind,
          title: activeScenario.title,
          startedAt: new Date(Date.now() - elapsedSeconds * 1000).toISOString(),
          endedAt: new Date().toISOString(),
          currentPhase: "completed",
          phases: {
            durationSeconds: elapsedSeconds,
            stagesCompleted: 3,
          },
          transcript: messages,
          outcome,
        }),
      });
      fetchHistory();
    } catch (err) {
      console.error("Error saving interview session:", err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const getStageLabel = (phase: PhaseType) => {
    switch (phase) {
      case "clarification":
        return "Fase 1: Klarifikasi (Think Aloud)";
      case "architecture":
        return "Fase 2: Arsitektur & Pilihan DB";
      case "deepDive":
        return "Fase 3: Deep Dive & Trade-offs";
      case "completed":
        return "Fase 4: Evaluasi Selesai";
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const filteredScenarios = INTERVIEW_SCENARIOS.filter(
    (s) =>
      s.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  return (
    <div className="h-full w-full flex flex-col md:flex-row overflow-hidden bg-white select-none">
      {/* 1. LEFT COLUMN: Scenario Selector & History Tabs */}
      <div className="w-full md:w-[320px] lg:w-[350px] flex-shrink-0 border-r border-line flex flex-col bg-surface-50/50">
        {/* Top Switcher Tabs */}
        <div className="p-3 border-b border-line flex items-center gap-1.5 bg-surface-100/60">
          <button
            onClick={() => setActiveTab("room")}
            className={cn(
              "flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition",
              activeTab === "room"
                ? "bg-white text-orange-600 shadow-xs border border-line"
                : "text-ink-600 hover:text-ink-900"
            )}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Skenario Aktif</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("history");
              fetchHistory();
            }}
            className={cn(
              "flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition",
              activeTab === "history"
                ? "bg-white text-orange-600 shadow-xs border border-line"
                : "text-ink-600 hover:text-ink-900"
            )}
          >
            <History className="w-3.5 h-3.5" />
            <span>Riwayat Sesi ({historySessions.length})</span>
          </button>
        </div>

        {activeTab === "room" ? (
          <>
            {/* Search Box */}
            <div className="p-3 border-b border-line flex items-center gap-2 bg-white">
              <div className="flex-1 relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-ink-400" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Cari skenario..."
                  className="w-full h-8 pl-8 pr-3 rounded-full bg-surface-100 text-xs text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Scenarios List */}
            <div className="flex-1 overflow-y-auto divide-y divide-line/60 p-2 space-y-1 bg-surface-50/30">
              <div className="text-[10px] font-bold uppercase tracking-wider text-ink-400 px-2 py-1">
                Bank Skenario Interview (PRD §6.5)
              </div>

              {filteredScenarios.map((sc) => {
                const isSelected = sc.id === selectedScenarioId;
                return (
                  <div
                    key={sc.id}
                    onClick={() => handleSelectScenario(sc)}
                    className={cn(
                      "p-3 rounded-xl cursor-pointer transition border text-xs space-y-1.5",
                      isSelected
                        ? "bg-orange-500/10 border-orange-500 shadow-xs"
                        : "border-transparent bg-white hover:bg-surface-100/80"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-ink-900 leading-snug">
                        {sc.title}
                      </span>
                      <span
                        className={cn(
                          "text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0",
                          sc.difficulty === "Profesional"
                            ? "bg-purple-100 text-purple-700"
                            : sc.difficulty === "Lanjut"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-blue-100 text-blue-700"
                        )}
                      >
                        {sc.difficulty}
                      </span>
                    </div>

                    <p className="text-[11px] text-ink-500 line-clamp-2 leading-relaxed">
                      {sc.brief}
                    </p>

                    <div className="flex items-center justify-between pt-1 text-[10px] text-ink-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-orange-500" />
                        <span>{sc.estMinutes} Menit</span>
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-surface-200 text-ink-600 font-mono">
                        {sc.kind === "system_design" ? "System Design" : "Live Coding"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* History View */
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-surface-50/30">
            <div className="text-[10px] font-bold uppercase tracking-wider text-ink-400 px-1 py-1">
              Riwayat Sesi Tersimpan di Neon DB
            </div>

            {historyLoading ? (
              <div className="text-center py-8 text-xs text-ink-400">
                Memuat riwayat sesi...
              </div>
            ) : historySessions.length === 0 ? (
              <div className="text-center py-8 px-4 rounded-xl border border-dashed border-line text-xs text-ink-400 space-y-2 bg-white">
                <History className="w-8 h-8 text-ink-300 mx-auto" />
                <p>Belum ada sesi wawancara yang tersimpan.</p>
                <p className="text-[11px] text-ink-400">
                  Selesaikan satu skenario wawancara untuk melihat radar kelemahan & rubrik skor Anda.
                </p>
              </div>
            ) : (
              historySessions.map((session) => (
                <div
                  key={session.id}
                  className="p-3 rounded-xl bg-white border border-line text-xs space-y-2 shadow-xs"
                >
                  <div className="flex items-start justify-between font-bold text-ink-900 gap-2">
                    <span className="leading-snug">{session.title}</span>
                    {session.outcome?.score ? (
                      <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 font-mono text-[10px] flex-shrink-0">
                        Skor: {session.outcome.score}
                      </span>
                    ) : (
                      <span className="text-[10px] text-ink-400 flex-shrink-0">Selesai</span>
                    )}
                  </div>
                  <div className="text-[10px] text-ink-400">
                    {new Date(session.started_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  {session.outcome?.dimensions && (
                    <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px] text-ink-600 font-mono bg-surface-50 p-2 rounded-lg border border-line/60">
                      <div>Kesesuaian: {session.outcome.dimensions.correctness}%</div>
                      <div>Skalabilitas: {session.outcome.dimensions.scalability}%</div>
                      <div>Komunikasi: {session.outcome.dimensions.communication}%</div>
                      <div>Trade-offs: {session.outcome.dimensions.tradeoffs}%</div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Footer Info */}
        <div className="p-3 border-t border-line text-[11px] text-ink-500 bg-white flex items-center justify-between flex-shrink-0">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
            <span className="font-semibold text-ink-700">FSRS & Radar PRD §6.5</span>
          </span>
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-surface-100 text-ink-600 border border-line">
            Neon DB Synced
          </span>
        </div>
      </div>

      {/* 2. RIGHT COLUMN: Active Technical Interview Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden bg-white select-text">
        {/* Header Bar */}
        <div className="h-16 px-4 sm:px-6 border-b border-line flex items-center justify-between bg-white z-10 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0 mr-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1E1914] to-[#2E2720] border border-white/10 flex items-center justify-center flex-shrink-0 shadow-sm">
              <Cpu className="w-5 h-5 text-orange-400" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-ink-900 truncate">
                {activeScenario.title}
              </h2>
              <div className="text-[11px] text-ink-500 flex items-center gap-2 mt-0.5">
                <span className="font-semibold text-orange-600">{activeScenario.difficulty}</span>
                <span>•</span>
                <span>Evaluator AI ArchForge</span>
                <span>•</span>
                <span className="font-mono text-[10px] text-ink-400">PRD §6.5</span>
              </div>
            </div>
          </div>

          {/* Structured Phase & Timer Actions */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-100 border border-line font-mono text-xs font-semibold text-ink-800 shadow-xs">
              <Clock className="w-3.5 h-3.5 text-orange-500" />
              <span>{formatTimer(elapsedSeconds)}</span>
              <span className="text-ink-400 font-normal">/ {activeScenario.estMinutes}:00</span>
            </div>

            {currentPhase !== "completed" ? (
              <button
                onClick={handleAdvancePhase}
                className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold text-xs shadow-glow transition flex items-center gap-1.5"
              >
                <span>
                  {currentPhase === "deepDive" ? "Selesai & Evaluasi" : "Fase Selanjutnya"}
                </span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setShowOutcomeModal(true)}
                className="px-3.5 py-1.5 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold text-xs shadow-sm transition flex items-center gap-1.5"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Lihat Rubrik Skor</span>
              </button>
            )}
          </div>
        </div>

        {/* Phase Step Indicator Banner */}
        <div className="px-4 sm:px-6 py-2.5 bg-surface-50 border-b border-line flex items-center justify-between text-[11px] flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto min-w-0 pr-2">
            <span
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold transition whitespace-nowrap",
                currentPhase === "clarification"
                  ? "bg-orange-500/10 text-orange-600 border border-orange-500/30"
                  : currentPhase === "architecture" || currentPhase === "deepDive" || currentPhase === "completed"
                  ? "text-green-700 bg-green-500/10"
                  : "text-ink-400"
              )}
            >
              <span className="w-4 h-4 rounded-full bg-current/20 text-current flex items-center justify-center text-[10px] font-bold">
                1
              </span>
              <span>Klarifikasi (Think Aloud)</span>
            </span>

            <ChevronRight className="w-3.5 h-3.5 text-ink-300 flex-shrink-0" />

            <span
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold transition whitespace-nowrap",
                currentPhase === "architecture"
                  ? "bg-orange-500/10 text-orange-600 border border-orange-500/30"
                  : currentPhase === "deepDive" || currentPhase === "completed"
                  ? "text-green-700 bg-green-500/10"
                  : "text-ink-400"
              )}
            >
              <span className="w-4 h-4 rounded-full bg-current/20 text-current flex items-center justify-center text-[10px] font-bold">
                2
              </span>
              <span>Arsitektur & Pilihan DB</span>
            </span>

            <ChevronRight className="w-3.5 h-3.5 text-ink-300 flex-shrink-0" />

            <span
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold transition whitespace-nowrap",
                currentPhase === "deepDive"
                  ? "bg-orange-500/10 text-orange-600 border border-orange-500/30"
                  : currentPhase === "completed"
                  ? "text-green-700 bg-green-500/10"
                  : "text-ink-400"
              )}
            >
              <span className="w-4 h-4 rounded-full bg-current/20 text-current flex items-center justify-center text-[10px] font-bold">
                3
              </span>
              <span>Deep Dive & SPOF</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-ink-600 text-xs flex-shrink-0 pl-2">
            <span className="text-ink-400">Kandidat:</span>
            <span className="font-bold text-ink-900 bg-white px-2 py-0.5 rounded-full border border-line">
              {user?.name || "Pelajar"}
            </span>
            <span className="text-status-danger font-bold text-[11px]">
              🔥 {user?.streak ?? 1}d
            </span>
          </div>
        </div>

        {/* Chat Transcript Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-surface-50/40">
          {/* Brief Card */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1.5 text-amber-900">
            <div className="font-bold flex items-center gap-1.5 text-amber-700">
              <AlertTriangle className="w-4 h-4" />
              <span>Pedoman Wawancara Think Aloud (PRD §6.5 & FR-43):</span>
            </div>
            <p className="text-amber-800 leading-relaxed text-[11px] sm:text-xs">
              Jelaskan asumsi dan perhitunganmu secara terbuka (*Think Aloud*) sebelum melangkah ke detail implementasi. Evaluator menilai pemilihan komponen, penanganan failover, dan analisis kompleksitas Big-O waktu & memori.
            </p>
          </div>

          {/* Messages Stream */}
          {messages.map((msg) => {
            const isUser = msg.sender === "user";
            return (
              <div
                key={msg.id}
                className={cn(
                  "flex flex-col max-w-[90%] sm:max-w-[80%]",
                  isUser ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                {/* Stage Tag & Header */}
                <div className="text-[11px] text-ink-400 mb-1 flex items-center gap-1.5 px-1">
                  <span suppressHydrationWarning>{msg.time}</span>
                  <span>•</span>
                  <span className="font-semibold text-ink-700">
                    {isUser ? user?.name || "Kandidat (Anda)" : "Evaluator Sistem"}
                  </span>
                  {msg.stage && (
                    <span className="ml-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
                      {msg.stage}
                    </span>
                  )}
                </div>

                {/* Bubble Body */}
                <div
                  className={cn(
                    "p-4 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-sm space-y-2",
                    isUser
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-br-xs shadow-glow/30"
                      : "bg-white text-ink-900 rounded-bl-xs border border-line"
                  )}
                >
                  <FormattedMessageText text={msg.text} isUser={isUser} />
                </div>
              </div>
            );
          })}

          {isEvaluating && (
            <div className="text-xs text-ink-500 italic flex items-center gap-2 pt-2 px-1">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
              <span>Evaluator sedang menganalisis argumen arsitekturmu...</span>
            </div>
          )}
        </div>

        {/* Input Form Bar */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 sm:p-4 border-t border-line bg-white flex items-center gap-2.5 z-10 flex-shrink-0"
        >
          <input
            type="text"
            value={inputText}
            disabled={currentPhase === "completed"}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              currentPhase === "completed"
                ? "Sesi wawancara telah selesai. Klik 'Lihat Rubrik Skor' untuk ringkasan evaluasi."
                : currentPhase === "clarification"
                ? "Tuliskan klarifikasi kapasitas, batasan fungsional, atau asumsi RPS..."
                : currentPhase === "architecture"
                ? "Jelaskan susunan komponen, alur data, atau pilihan skema database..."
                : "Tuliskan penanganan SPOF, mitigasi Cache Stampede, atau analisis Big-O..."
            }
            className="flex-1 min-w-0 h-11 px-4 rounded-full bg-surface-100 border border-line text-xs sm:text-[13px] text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={currentPhase === "completed" || !inputText.trim()}
            className="w-11 h-11 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white flex items-center justify-center transition shadow-glow flex-shrink-0 disabled:opacity-40"
            title="Kirim Argumen"
          >
            <Send className="w-4 h-4 fill-current ml-0.5" />
          </button>
        </form>
      </div>

      {/* 3. EVALUATION OUTCOME MODAL (PRD §6.5 & §10) */}
      {showOutcomeModal && outcomeData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-shell max-w-lg w-full p-6 space-y-5 border border-line shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-500" />
                <h3 className="font-bold text-base text-ink-900">
                  Laporan Hasil Wawancara Arsitektur
                </h3>
              </div>
              <button
                onClick={() => setShowOutcomeModal(false)}
                className="w-7 h-7 rounded-full bg-surface-100 hover:bg-surface-200 flex items-center justify-center text-ink-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Overall Score Badge */}
            <div className="p-4 rounded-2xl bg-gradient-to-tr from-orange-500/10 via-orange-500/5 to-transparent border border-orange-500/20 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600">
                  Skor Keseluruhan (PRD §6.5)
                </span>
                <div className="text-3xl font-extrabold text-ink-900 font-mono mt-0.5">
                  {outcomeData.score} <span className="text-sm font-normal text-ink-500">/ 100</span>
                </div>
                <div className="text-xs text-ink-600 mt-1">
                  Status:{" "}
                  <strong className="text-green-600 font-semibold">
                    {outcomeData.score >= 75 ? "Lulus (Memuaskan)" : "Perlu Penguatan Modul"}
                  </strong>
                </div>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-white border border-line shadow-sm flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-orange-500" />
              </div>
            </div>

            {/* 4 Rubric Dimensions */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink-500">
                Rubrik Penilaian 4 Dimensi
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-surface-50 border border-line space-y-1">
                  <div className="text-ink-500 font-medium">Kesesuaian Kebutuhan</div>
                  <div className="text-lg font-bold font-mono text-ink-900">
                    {outcomeData.dimensions.correctness}%
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-surface-50 border border-line space-y-1">
                  <div className="text-ink-500 font-medium">Skalabilitas & Resiliensi</div>
                  <div className="text-lg font-bold font-mono text-ink-900">
                    {outcomeData.dimensions.scalability}%
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-surface-50 border border-line space-y-1">
                  <div className="text-ink-500 font-medium">Komunikasi & Think Aloud</div>
                  <div className="text-lg font-bold font-mono text-ink-900">
                    {outcomeData.dimensions.communication}%
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-surface-50 border border-line space-y-1">
                  <div className="text-ink-500 font-medium">Trade-offs & Edge Cases</div>
                  <div className="text-lg font-bold font-mono text-ink-900">
                    {outcomeData.dimensions.tradeoffs}%
                  </div>
                </div>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="space-y-3 text-xs">
              <div className="space-y-1.5">
                <div className="font-bold text-green-700 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span>Kekuatan Utama Argumen:</span>
                </div>
                <ul className="list-disc pl-5 text-ink-600 space-y-1">
                  {outcomeData.strengths.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1.5">
                <div className="font-bold text-orange-700 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-orange-600" />
                  <span>Area Peningkatan (Radar Kelemahan):</span>
                </div>
                <ul className="list-disc pl-5 text-ink-600 space-y-1">
                  {outcomeData.weaknesses.map((w, idx) => (
                    <li key={idx}>{w}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-surface-100 border border-line text-ink-700 space-y-1">
                <div className="font-bold text-ink-900 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-orange-500" />
                  <span>Rekomendasi Silabus:</span>
                </div>
                <p className="leading-relaxed">{outcomeData.recommendation}</p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-line">
              <button
                onClick={() => {
                  setShowOutcomeModal(false);
                  setActiveTab("history");
                }}
                className="px-4 py-2 rounded-full bg-ink-900 hover:bg-black text-white font-semibold text-xs transition"
              >
                Lihat di Riwayat Sesi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
