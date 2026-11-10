"use client";

import React from "react";
import { HelpCircle, Command, Terminal, Sparkles, BookOpen } from "lucide-react";

export function HelpView() {
  const shortcuts = [
    { key: "Ctrl + Enter / ⌘ + Enter", desc: "Jalankan kode di editor playground" },
    { key: "Ctrl + K / ⌘ + K", desc: "Buka palet pencarian materi & track" },
    { key: "Esc", desc: "Tutup dialog modal atau laci Mini-ADR" },
    { key: "1 / 2 / 3 / 4", desc: "Pilih tingkat kesulitan kartu saat sesi review SRS" },
  ];

  const faqs = [
    {
      q: "Bagaimana cara kerja eksekusi kode di ArchForge?",
      a: "Python dijalankan langsung di browser menggunakan Web Worker (Pyodide), aman tanpa membebani server. Rust dan kode kompilasi dievaluasi dengan sandbox terisolasi.",
    },
    {
      q: "Apa itu Mini-ADR di simulator System Design?",
      a: "Mini-ADR (Architecture Decision Record) adalah catatan tertulis yang menjelaskan alasan trade-off teknismu (misal: mengapa memilih Redis ketimbang memcached, atau mengapa memilih Kafka). Ini melatih kemampuan komunikasi seorang Software Architect.",
    },
    {
      q: "Bagaimana algoritma Spaced Repetition (SRS) bekerja?",
      a: "ArchForge menggunakan algoritma FSRS modern. Soal dan kuis yang kamu jawab sulit akan dijadwalkan ulang lebih cepat, sedangkan konsep yang kamu kuasai akan diulang dalam interval hari atau minggu.",
    },
  ];

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-line">
        <h1 className="text-2xl font-bold tracking-tight text-ink-900">
          Pusat Bantuan & Panduan Penggunaan
        </h1>
        <p className="text-xs sm:text-sm text-ink-500 mt-1">
          Daftar pintasan keyboard, panduan belajar, dan jawaban atas pertanyaan umum.
        </p>
      </div>

      {/* Keyboard Shortcuts Table */}
      <div className="p-5 rounded-card bg-surface-50 border border-line space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-line">
          <Command className="w-4 h-4 text-orange-500" />
          <h2 className="text-sm font-bold text-ink-900">Pintasan Keyboard (Shortcuts)</h2>
        </div>

        <div className="divide-y divide-line">
          {shortcuts.map((sc, i) => (
            <div key={i} className="py-2.5 flex items-center justify-between text-xs">
              <span className="text-ink-700">{sc.desc}</span>
              <kbd className="px-2 py-1 rounded bg-white border border-line font-mono font-bold text-ink-900 shadow-sm">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="p-5 rounded-card bg-surface-50 border border-line space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-line">
          <BookOpen className="w-4 h-4 text-orange-500" />
          <h2 className="text-sm font-bold text-ink-900">Pertanyaan yang Sering Diajukan</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-white border border-line space-y-1">
              <h3 className="text-xs font-bold text-ink-900">{f.q}</h3>
              <p className="text-xs text-ink-600 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

