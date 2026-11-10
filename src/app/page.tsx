import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Cpu,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Terminal,
  Zap,
} from "lucide-react";
import { TRACKS } from "@/data/curriculum";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full relative bg-bg-0 text-white selection:bg-orange-500/30">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/assets/3d/bg/bg-landing.webp"
          alt="ArchForge Landing Background"
          fill
          priority
          className="object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-0 via-transparent to-bg-0/60" />
      </div>

      {/* Navigation Header */}
      <header className="relative z-20 max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 relative">
            <Image
              src="/assets/3d/logo/logo-mark-3d.webp"
              alt="ArchForge Logo"
              width={36}
              height={36}
              className="object-contain drop-shadow"
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            ArchForge
            <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
              v1.0
            </span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-xs sm:text-sm font-semibold text-white/80 hover:text-white transition"
          >
            Masuk
          </Link>
          <Link
            href="/dashboard"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-semibold text-xs sm:text-sm shadow-glow transition flex items-center gap-2"
          >
            <span>Buka Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-24 space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Satu Jalur: Dari Nol Sampai Siap System Design & Interview</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Belajar Coding, Arsitektur Sistem & Live Interview.
            </h1>

            <p className="text-base sm:text-lg text-white/70 max-w-xl leading-relaxed">
              Platform pembelajaran terpadu untuk mendalami <strong>Rust</strong>,{" "}
              <strong>Python</strong>, <strong>Kotlin</strong>, dan{" "}
              <strong>Dart/Flutter</strong> dengan simulator beban nyata, editor in-browser,
              dan pengulangan berjarak (FSRS).
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/dashboard"
                className="px-7 py-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold text-sm shadow-glow transition flex items-center gap-2"
              >
                <span>Mulai Belajar Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/system-design"
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/15 backdrop-blur transition flex items-center gap-2"
              >
                <Cpu className="w-4 h-4 text-orange-400" />
                <span>Coba Simulator Beban</span>
              </Link>
            </div>

            {/* Value Checkmarks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-white/10 text-xs text-white/70">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Tanpa Install Compiler</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Simulator 100K RPS</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>PostgreSQL di Neon</span>
              </div>
            </div>
          </div>

          {/* Right 3D Visual Cards Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative p-6 rounded-shell glass-shell border border-white/20 shadow-2xl space-y-4">
              <div className="flex items-center justify-between text-xs text-white/60">
                <span className="font-semibold text-orange-400">Jalur Belajar Terkurasi</span>
                <span>10 Track Tersedia</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {TRACKS.slice(0, 4).map((trk) => (
                  <Link
                    key={trk.id}
                    href={`/tracks/${trk.slug}`}
                    className="p-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition group text-left flex flex-col items-center text-center space-y-2"
                  >
                    <div className="w-16 h-16 relative">
                      <Image
                        src={trk.emblem}
                        alt={trk.title}
                        width={64}
                        height={64}
                        className="object-contain drop-shadow"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-orange-400 transition truncate">
                        {trk.title.split(" ")[0]}
                      </div>
                      <div className="text-[10px] text-white/50">
                        {trk.lessonsCount} Lesson
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30 text-xs text-orange-300 flex items-center justify-between">
                <span>Siap mencoba simulator System Design?</span>
                <Link
                  href="/system-design"
                  className="font-bold underline text-white hover:text-orange-200"
                >
                  Buka &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
          <div className="p-6 rounded-card bg-white/[0.04] border border-white/10 backdrop-blur space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              Editor & Runner Interaktif
            </h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Eksekusi kode Python via Pyodide Web Worker di browser dan kompilasi Rust
              dengan visualisasi kepemilikan memori dan diagnostik error yang ramah.
            </p>
          </div>

          <div className="p-6 rounded-card bg-white/[0.04] border border-white/10 backdrop-blur space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              Simulator Beban & Injeksi Kegagalan
            </h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Bukan diagram statis. Drag & drop komponen Load Balancer, Redis Cache, DB
              Primary, dan simulasikan lonjakan traffic 100K RPS serta kegagalan node.
            </p>
          </div>

          <div className="p-6 rounded-card bg-white/[0.04] border border-white/10 backdrop-blur space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              Ruang Interview & Transkrip Real-time
            </h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Latihan wawancara terstruktur dengan 4 fase: Klarifikasi masalah, Desain
              arsitektur, Live Coding, dan Analisis Kompleksitas Big-O.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

