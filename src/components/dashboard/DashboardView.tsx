"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Flame,
  Play,
  Calendar,
  CheckCircle2,
  BookOpen,
  Cpu,
  Code2,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Award,
  Layers,
} from "lucide-react";
import { TRACKS } from "@/data/curriculum";
import { cn } from "@/lib/utils";

interface DashboardUser {
  id?: string;
  name: string;
  email?: string;
  role: string;
  streak?: number;
}

interface DashboardViewProps {
  user?: DashboardUser | null;
}

export function DashboardView({ user }: DashboardViewProps = {}) {
  const activeTrack = TRACKS[0]; // Rust

  // 7x5 Heatmap data (simulated 35 days)
  const heatmapData = [
    3, 2, 4, 1, 0, 2, 3,
    1, 4, 3, 2, 3, 4, 1,
    0, 2, 3, 4, 2, 1, 3,
    4, 3, 2, 4, 3, 4, 2,
    1, 3, 4, 4, 3, 4, 4,
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header Greeting & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink-900">
            Halo, {user?.name || "Pelajar"} 👋
          </h1>
          <p className="text-xs sm:text-sm text-ink-500 mt-1">
            Siap mendalami Rust dan arsitektur sistem berskala tinggi hari ini?
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/review"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-semibold text-xs sm:text-sm shadow-glow transition"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Review SRS (12 Kartu)</span>
          </Link>
        </div>
      </div>

      {/* 2. Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* A. Lanjutkan Belajar Card (Large 8 cols) */}
        <div className="lg:col-span-8 p-5 sm:p-6 rounded-card bg-surface-50 border border-line shadow-card flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#1E1914] to-[#362C24] p-2 flex items-center justify-center flex-shrink-0 border border-white/10 shadow-lg">
                <Image
                  src="/assets/3d/emblem/emblem-rust@2x.webp"
                  alt="Rust Emblem"
                  width={64}
                  height={64}
                  className="object-contain drop-shadow"
                />
              </div>

              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-600 text-[11px] font-bold uppercase tracking-wider">
                  Sedang Berjalan
                </span>
                <h3 className="text-lg font-bold text-ink-900 mt-1">
                  Rust Systems: Ownership & Semantik Move
                </h3>
                <p className="text-xs text-ink-500 mt-0.5">
                  B2 — Inti Rust • Modul 2 dari 6 • Estimasi sisa 15m
                </p>
              </div>
            </div>

            <Link
              href="/learn/rust/dasar-rust/ownership-dan-move"
              className="px-5 py-2.5 rounded-full bg-ink-900 hover:bg-black text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow transition self-start sm:self-auto whitespace-nowrap"
            >
              <span>Lanjutkan</span>
              <Play className="w-3.5 h-3.5 fill-current" />
            </Link>
          </div>

          {/* Progress bar */}
          <div className="mt-6 pt-4 border-t border-line/80 relative z-10">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="text-ink-600">Progres Modul Inti Rust</span>
              <span className="text-orange-600 font-mono">60%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-400"
                style={{ width: "60%" }}
              />
            </div>
          </div>
        </div>

        {/* B. Streak Flame & Heatmap (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-card bg-surface-50 border border-line shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-500/10 text-red-600 flex items-center justify-center">
                <Flame className="w-5 h-5 fill-current text-status-danger" />
              </div>
              <div>
                <div className="text-base font-bold text-ink-900">
                  {user?.streak ?? 1} Hari Beruntun
                </div>
                <div className="text-[11px] text-ink-500">
                  Rekor terpanjang: {Math.max(user?.streak ?? 1, 14)} hari
                </div>
              </div>
            </div>

            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src="/assets/3d/badge/badge-streak-7.webp"
                alt="Badge Streak"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
          </div>

          {/* Heatmap 7x5 */}
          <div className="mt-4 pt-3 border-t border-line">
            <div className="text-[11px] font-semibold text-ink-500 mb-2 flex items-center justify-between">
              <span>Aktivitas 35 Hari Terakhir</span>
              <span className="text-[10px] text-orange-600 font-bold">Konsisten</span>
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {heatmapData.map((val, idx) => {
                const colorClass =
                  val === 0
                    ? "bg-surface-200"
                    : val === 1
                    ? "bg-orange-200"
                    : val === 2
                    ? "bg-orange-300"
                    : val === 3
                    ? "bg-orange-400"
                    : "bg-orange-500";
                return (
                  <div
                    key={idx}
                    className={cn("w-full aspect-square rounded-md transition-all", colorClass)}
                    title={`Aktivitas level ${val}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* C. Active Tracks Progress (8 cols) */}
        <div className="lg:col-span-8 p-5 rounded-card bg-surface-0 border border-line shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-orange-500" />
              <h3 className="font-bold text-sm text-ink-900">Jalur Belajar Saya</h3>
            </div>
            <Link
              href="/tracks"
              className="text-xs font-semibold text-accent-ink hover:underline flex items-center gap-1"
            >
              <span>Semua Track</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TRACKS.slice(0, 4).map((trk) => (
              <Link
                key={trk.id}
                href={`/tracks/${trk.slug}`}
                className="p-3.5 rounded-xl bg-surface-50 border border-line hover:border-orange-500/40 transition group flex items-center gap-3.5"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#1E1914] to-[#2E2720] flex items-center justify-center p-1.5 border border-white/10 flex-shrink-0">
                  <Image
                    src={trk.emblem}
                    alt={trk.title}
                    width={36}
                    height={36}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-ink-900 truncate group-hover:text-orange-600 transition">
                    {trk.title}
                  </div>
                  <div className="text-[11px] text-ink-500 mt-0.5">
                    {trk.modulesCount} Modul • {trk.lessonsCount} Lesson
                  </div>
                  <div className="mt-2 w-full h-1.5 rounded-full bg-surface-200 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-orange-500"
                      style={{ width: `${trk.progressPercent}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-ink-700">
                  {trk.progressPercent}%
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* D. Today's Agenda & SRS (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-card bg-surface-0 border border-line shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-500" />
              <h3 className="font-bold text-sm text-ink-900">Agenda Hari Ini</h3>
            </div>
            <Link
              href="/schedule"
              className="text-xs font-semibold text-accent-ink hover:underline"
            >
              Lihat Kalender
            </Link>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-orange-50 border border-orange-200/60 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-orange-900">Sesi Review SRS</div>
                <div className="text-[11px] text-orange-700">12 konsep perlu diulang</div>
              </div>
              <Link
                href="/review"
                className="px-3 py-1 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-[11px] transition shadow-sm"
              >
                Mulai
              </Link>
            </div>

            <div className="p-3 rounded-xl bg-surface-50 border border-line flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-ink-900">Proyek Fast-Grep CLI</div>
                <div className="text-[11px] text-ink-500">Tenggat dalam 3 hari</div>
              </div>
              <Link
                href="/projects"
                className="px-3 py-1 rounded-full bg-surface-200 hover:bg-surface-300 text-ink-800 font-semibold text-[11px] transition"
              >
                Detail
              </Link>
            </div>

            <div className="p-3 rounded-xl bg-surface-50 border border-line flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-ink-900">Mock Interview Room</div>
                <div className="text-[11px] text-ink-500">Evaluasi arsitektur URL shortener</div>
              </div>
              <Link
                href="/interview"
                className="px-3 py-1 rounded-full bg-surface-200 hover:bg-surface-300 text-ink-800 font-semibold text-[11px] transition"
              >
                Masuk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

