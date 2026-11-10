"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Code2, CheckCircle2, ArrowRight, Terminal, Sparkles, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export function PracticeView() {
  const [selectedPattern, setSelectedPattern] = useState<string>("Semua");

  const patterns = [
    "Semua",
    "Two Pointers",
    "Sliding Window",
    "Binary Search",
    "Trees & Graphs",
    "Dynamic Programming",
  ];

  const questions = [
    {
      id: "two-sum-ii",
      title: "Two Sum II — Array Terurut Input",
      pattern: "Two Pointers",
      difficulty: "Mudah",
      completed: true,
      languages: ["Rust", "Python"],
      desc: "Temukan dua angka yang jumlahnya sama dengan target menggunakan waktu O(N) dan memori O(1).",
    },
    {
      id: "longest-substring",
      title: "Substring Terpanjang Tanpa Karakter Berulang",
      pattern: "Sliding Window",
      difficulty: "Menengah",
      completed: false,
      languages: ["Rust", "Python"],
      desc: "Gunakan jendela geser dinamis dengan hash set untuk melacak karakter unik.",
    },
    {
      id: "search-rotated",
      title: "Pencarian pada Array Terotasi",
      pattern: "Binary Search",
      difficulty: "Menengah",
      completed: false,
      languages: ["Rust", "Python"],
      desc: "Lakukan binary search modifikasi untuk mencari target dalam waktu O(log N).",
    },
    {
      id: "lru-cache",
      title: "Implementasi LRU Cache (Least Recently Used)",
      pattern: "Trees & Graphs",
      difficulty: "Menengah",
      completed: true,
      languages: ["Rust", "Python"],
      desc: "Rancang struktur data O(1) get dan O(1) put menggunakan HashMap + Doubly Linked List.",
    },
    {
      id: "coin-change",
      title: "Coin Change (Jumlah Koin Minimum)",
      pattern: "Dynamic Programming",
      difficulty: "Menengah",
      completed: false,
      languages: ["Rust", "Python"],
      desc: "Hitung jumlah koin paling sedikit untuk membentuk total nilai tertentu.",
    },
  ];

  const filteredQuestions =
    selectedPattern === "Semua"
      ? questions
      : questions.filter((q) => q.pattern === selectedPattern);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink-900">
            Bank Soal Algoritma & Live Coding
          </h1>
          <p className="text-xs sm:text-sm text-ink-500 mt-1">
            Kuasai 15 pola algoritma umum yang sering diujikan pada wawancara teknis.
          </p>
        </div>
      </div>

      {/* Pattern Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {patterns.map((pat) => (
          <button
            key={pat}
            onClick={() => setSelectedPattern(pat)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition",
              selectedPattern === pat
                ? "bg-ink-900 text-white shadow-sm"
                : "bg-surface-100 text-ink-600 hover:bg-surface-200 hover:text-ink-900"
            )}
          >
            {pat}
          </button>
        ))}
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.map((q) => (
          <div
            key={q.id}
            className="p-4 rounded-xl bg-surface-50 border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-orange-500/40 hover:shadow-sm transition"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    q.difficulty === "Mudah"
                      ? "bg-green-500/10 text-green-700 border border-green-500/20"
                      : q.difficulty === "Menengah"
                      ? "bg-yellow-500/10 text-yellow-800 border border-yellow-500/20"
                      : "bg-red-500/10 text-red-700 border border-red-500/20"
                  )}
                >
                  {q.difficulty}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white text-ink-600 text-[10px] font-medium border border-line">
                  {q.pattern}
                </span>
                {q.completed && (
                  <span className="text-xs text-green-600 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Terselesaikan</span>
                  </span>
                )}
              </div>

              <h3 className="text-sm font-bold text-ink-900">{q.title}</h3>
              <p className="text-xs text-ink-500">{q.desc}</p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <Link
                href="/learn/rust/dasar-rust/ownership-dan-move"
                className="px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition whitespace-nowrap"
              >
                <span>Kerjakan Soal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

