"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, CheckCircle2, RotateCcw, ArrowLeft, Lightbulb } from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

interface ReviewCardItem {
  id: number;
  sourceId: string;
  track: string;
  question: string;
  answer: string;
  reps: number;
}

export function SRSReviewView() {
  const [cards, setCards] = useState<ReviewCardItem[]>([
    {
      id: 1,
      sourceId: "rust-ownership-01",
      track: "Rust Systems",
      question: "Apa 3 aturan kepemilikan (ownership) dasar di Rust?",
      answer:
        "1. Setiap nilai memiliki pemilik (owner).\n2. Hanya ada tepat satu pemilik dalam satu waktu.\n3. Ketika pemilik keluar dari scope, nilai akan otomatis di-drop dari memori.",
      reps: 3,
    },
    {
      id: 2,
      sourceId: "sd-caching-01",
      track: "System Design",
      question: "Kapan sebaiknya memilih strategi Cache-Aside vs Write-Through?",
      answer:
        "Cache-Aside ideal untuk beban read-heavy dengan toleransi delay konsistensi singkat; Write-Through menjamin data di cache selalu sinkron dengan DB saat penulisan, tapi menambah latensi tulis.",
      reps: 5,
    },
    {
      id: 3,
      sourceId: "dsa-twopointer-01",
      track: "DSA & Algoritma",
      question: "Apa syarat utama agar teknik Two Pointers dapat mengoptimasi pencarian dari O(N^2) menjadi O(N)?",
      answer:
        "Data array harus terurut (sorted), atau terdapat sifat monotonik di mana pergeseran pointer kiri/kanan selalu mengubah nilai ke satu arah yang pasti.",
      reps: 2,
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  const currentCard = cards[currentIndex];

  const handleRate = async (rating: 1 | 2 | 3 | 4) => {
    // Record rating to API
    try {
      await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardId: currentCard.id,
          rating,
        }),
      });
    } catch {
      // ignore
    }

    if (currentIndex + 1 < cards.length) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      setSessionCompleted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }
  };

  const handleResetSession = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setSessionCompleted(false);
  };

  if (sessionCompleted) {
    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-ink-900">
            Sesi Review Hari Ini Selesai! 🎉
          </h2>
          <p className="text-sm text-ink-500">
            Hebat, kamu telah meninjau seluruh kartu konsep dengan metode FSRS Spaced
            Repetition.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={handleResetSession}
            className="px-4 py-2 rounded-full bg-surface-100 hover:bg-surface-200 text-ink-800 text-xs font-semibold flex items-center gap-2 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Review Ulang</span>
          </button>
          <Link
            href="/dashboard"
            className="px-5 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold shadow-glow transition"
          >
            Kembali ke Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-4">
      {/* Top Header & Progress */}
      <div className="flex items-center justify-between text-xs font-semibold text-ink-500">
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 hover:text-ink-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Dashboard</span>
        </Link>
        <span className="font-mono">
          Kartu {currentIndex + 1} dari {cards.length}
        </span>
      </div>

      <div className="w-full h-1.5 rounded-full bg-surface-200 overflow-hidden">
        <div
          className="h-full rounded-full bg-orange-500 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
        />
      </div>

      {/* Main Flashcard */}
      <div className="bg-surface-50 border border-line rounded-card p-6 sm:p-8 shadow-card space-y-6 min-h-[300px] flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 text-xs font-bold uppercase tracking-wider">
              {currentCard.track}
            </span>
            <span className="text-xs text-ink-400 font-mono">
              Repetisi ke-{currentCard.reps}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-ink-900 leading-snug">
            {currentCard.question}
          </h2>

          {showAnswer && (
            <div className="p-4 rounded-xl bg-white border border-line text-sm text-ink-800 leading-relaxed whitespace-pre-line animate-in fade-in duration-200">
              {currentCard.answer}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="pt-4 border-t border-line">
          {!showAnswer ? (
            <button
              onClick={() => setShowAnswer(true)}
              className="w-full py-3 rounded-full bg-ink-900 hover:bg-black text-white font-semibold text-sm transition shadow-sm"
            >
              Tampilkan Jawaban
            </button>
          ) : (
            <div className="space-y-2">
              <div className="text-center text-[11px] font-semibold text-ink-500">
                Seberapa mudah kamu mengingat konsep ini?
              </div>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => handleRate(1)}
                  className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-bold transition flex flex-col items-center"
                >
                  <span>Lagi</span>
                  <span className="text-[10px] font-normal opacity-75 mt-0.5">&lt; 10m</span>
                </button>

                <button
                  onClick={() => handleRate(2)}
                  className="p-2.5 rounded-xl bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 text-yellow-800 text-xs font-bold transition flex flex-col items-center"
                >
                  <span>Sulit</span>
                  <span className="text-[10px] font-normal opacity-75 mt-0.5">1 hari</span>
                </button>

                <button
                  onClick={() => handleRate(3)}
                  className="p-2.5 rounded-xl bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 text-xs font-bold transition flex flex-col items-center"
                >
                  <span>Bagus</span>
                  <span className="text-[10px] font-normal opacity-75 mt-0.5">3 hari</span>
                </button>

                <button
                  onClick={() => handleRate(4)}
                  className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold transition flex flex-col items-center"
                >
                  <span>Mudah</span>
                  <span className="text-[10px] font-normal opacity-75 mt-0.5">7 hari</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

