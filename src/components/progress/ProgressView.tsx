"use client";

import React from "react";
import { TrendingUp, Award, Clock, CheckCircle2, ShieldCheck, Target } from "lucide-react";

export function ProgressView() {
  const metrics = [
    { label: "Modul Selesai", value: "14", sub: "+3 minggu ini", icon: CheckCircle2 },
    { label: "Jam Belajar", value: "48.5 Jam", sub: "Rata-rata 2.1 jam/hari", icon: Clock },
    { label: "Skor Arsitektur", value: "88%", sub: "Skenario System Design", icon: Target },
    { label: "Kartu SRS Terkuasai", value: "142", sub: "Retensi memori 92%", icon: ShieldCheck },
  ];

  const weaknesses = [
    { topic: "Rust Lifetimes & Variance", mastery: 55, note: "Perlu latihan borrowing berlapis" },
    { topic: "Dynamic Programming (DP)", mastery: 62, note: "Pola tabulasi vs rekursi memoized" },
    { topic: "Cache Stampede & Thundering Herd", mastery: 75, note: "Pola locking & probabilistic early expiration" },
    { topic: "Kotlin Coroutines & Structured Concurrency", mastery: 82, note: "Sangat baik" },
    { topic: "CAP & PACELC Theorem", mastery: 90, note: "Kuasai dengan baik" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-line">
        <h1 className="text-2xl font-bold tracking-tight text-ink-900">
          Statistik Progres & Analisis Performa
        </h1>
        <p className="text-xs sm:text-sm text-ink-500 mt-1">
          Pantau konsistensi belajar, penguasaan materi, dan radar topik yang perlu diperkuat.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div
              key={i}
              className="p-4 rounded-card bg-surface-50 border border-line shadow-card space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-ink-500">{m.label}</span>
                <Icon className="w-4 h-4 text-orange-500" />
              </div>
              <div className="text-2xl font-bold font-mono text-ink-900">{m.value}</div>
              <div className="text-[11px] text-green-700 font-medium">{m.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Radar / Topic Mastery Bars */}
      <div className="p-5 rounded-card bg-surface-50 border border-line shadow-card space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-line">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            <h2 className="text-sm font-bold text-ink-900">
              Tingkat Penguasaan Topik (Radar Kelemahan)
            </h2>
          </div>
          <span className="text-xs text-ink-500">Berdasarkan hasil kuis & review FSRS</span>
        </div>

        <div className="space-y-3">
          {weaknesses.map((w, i) => (
            <div key={i} className="p-3 bg-white rounded-xl border border-line space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-ink-900">{w.topic}</span>
                <span className="font-mono text-orange-600">{w.mastery}%</span>
              </div>

              <div className="w-full h-2 rounded-full bg-surface-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-orange-500"
                  style={{ width: `${w.mastery}%` }}
                />
              </div>

              <div className="text-[11px] text-ink-500">{w.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Riwayat Sesi Interview & Percobaan System Design (FR-45) */}
      <div className="p-5 rounded-card bg-surface-50 border border-line shadow-card space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-line">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-500" />
            <h2 className="text-sm font-bold text-ink-900">
              Riwayat Sesi Interview & Simulasi Terkini
            </h2>
          </div>
          <span className="text-xs text-ink-500">Live data sesi pengguna</span>
        </div>

        <div className="space-y-2.5">
          {[
            {
              id: "ses-1",
              title: "Simulasi System Design: URL Shortener (Bitly-scale)",
              type: "System Design",
              date: "Hari ini, 09:41 AM",
              interviewer: "Rico Rodrivera (Lead Systems Architect)",
              score: 92,
              status: "Lulus / Kuat",
              summary: "Strategi Cache-Aside dengan Redis di depan PostgreSQL dan mitigasi stampede dinilai sangat baik.",
            },
            {
              id: "ses-2",
              title: "Live Coding: Two Sum & Sliding Window Subarray",
              type: "DSA Coding",
              date: "Kemarin, 14:15 PM",
              interviewer: "Prof. Julian Vance, Ph.D.",
              score: 85,
              status: "Lulus",
              summary: "Verbalisasi alur berpikir (think aloud) jelas, analisis Big-O O(N) waktu dan O(1) ruang tepat.",
            },
            {
              id: "ses-3",
              title: "Architecture Review: Injeksi Failure Spike 10x",
              type: "Chaos Simulation",
              date: "8 Nov 2026",
              interviewer: "Simulasi Otomatis",
              score: 78,
              status: "Perlu Optimasi",
              summary: "Database sempat mengalami bottleneck sebelum replika diaktifkan.",
            },
          ].map((ses) => (
            <div
              key={ses.id}
              className="p-3.5 rounded-xl bg-white border border-line hover:border-orange-500/40 transition space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-600 text-[11px] font-bold uppercase">
                    {ses.type}
                  </span>
                  <h3 className="font-bold text-xs sm:text-sm text-ink-900">{ses.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-ink-500">{ses.date}</span>
                  <span className="font-mono font-bold text-orange-600 px-2 py-0.5 rounded bg-surface-100">
                    Skor: {ses.score}%
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-ink-600 leading-relaxed">{ses.summary}</p>
              <div className="text-[10px] text-ink-400 flex items-center justify-between pt-1 border-t border-line/50">
                <span>Pewawancara: {ses.interviewer}</span>
                <span className="font-semibold text-green-700">{ses.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

