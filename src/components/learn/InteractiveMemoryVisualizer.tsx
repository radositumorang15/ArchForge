"use client";

import React, { useState } from "react";
import { Play, RotateCcw, ArrowRight, Layers, Database, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StackFrame {
  id: string;
  name: string;
  type: string;
  value: string;
  address: string;
  color: string;
  isMoved?: boolean;
}

interface HeapBlock {
  address: string;
  content: string;
  sizeBytes: number;
  allocatedBy: string;
}

export function InteractiveMemoryVisualizer() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      code: `let x: i32 = 42;`,
      description: "Alokasi Stack murni: integer bernilai 42 disimpan langsung di stack frame fungsi saat ini. Ukuran 4 byte diketahui saat compile-time.",
      stack: [
        { id: "x", name: "x", type: "i32", value: "42", address: "0x7fff_01", color: "bg-blue-500/10 border-blue-500/30 text-blue-700" }
      ],
      heap: [],
      insight: "Stack sangat cepat karena CPU hanya menggeser Stack Pointer ke bawah sebesar 4 byte."
    },
    {
      code: `let s1: String = String::from("ArchForge");`,
      description: "Alokasi Heap + Stack: metadata String (pointer, length 9, capacity 9) disimpan di Stack. Karakter teks aktual dialokasikan di Heap memori dinamis.",
      stack: [
        { id: "x", name: "x", type: "i32", value: "42", address: "0x7fff_01", color: "bg-blue-500/10 border-blue-500/30 text-blue-700" },
        { id: "s1", name: "s1 (ptr, len, cap)", type: "String", value: "-> 0x55a1_heap", address: "0x7fff_05", color: "bg-orange-500/10 border-orange-500/30 text-orange-700" }
      ],
      heap: [
        { address: "0x55a1_heap", content: "\"ArchForge\"", sizeBytes: 9, allocatedBy: "s1" }
      ],
      insight: "Pointer di stack (8 byte) menunjuk ke alamat buffer heap di memori RAM utama."
    },
    {
      code: `let s2 = s1; // Semantik Move di Rust!`,
      description: "Rust Move: Metadata di stack disalin ke variabel s2. Kepemilikan (ownership) buffer heap berpindah ke s2, dan variabel s1 menjadi TIDAK VALID (Invalidated)!",
      stack: [
        { id: "x", name: "x", type: "i32", value: "42", address: "0x7fff_01", color: "bg-blue-500/10 border-blue-500/30 text-blue-700" },
        { id: "s1", name: "s1 (MOVED)", type: "Invalid", value: "--- INVALID ---", address: "0x7fff_05", color: "bg-red-500/10 border-red-500/30 text-red-600 line-through opacity-60", isMoved: true },
        { id: "s2", name: "s2 (ptr, len, cap)", type: "String", value: "-> 0x55a1_heap", address: "0x7fff_1d", color: "bg-green-500/10 border-green-500/30 text-green-700" }
      ],
      heap: [
        { address: "0x55a1_heap", content: "\"ArchForge\"", sizeBytes: 9, allocatedBy: "s2 (moved from s1)" }
      ],
      insight: "Rust TIDAK menyalin data heap (Zero-Cost Deep Copy prevention), dan mencegah Double-Free error dengan menonaktifkan s1 saat compile-time!"
    },
    {
      code: `let r = &s2; // Borrowing / Referensi`,
      description: "Peminjaman (Borrowing): variabel r menyimpan pointer referensi ke s2 tanpa memindahkan kepemilikan. Nilai s2 tetap valid untuk dibaca.",
      stack: [
        { id: "x", name: "x", type: "i32", value: "42", address: "0x7fff_01", color: "bg-blue-500/10 border-blue-500/30 text-blue-700" },
        { id: "s1", name: "s1 (MOVED)", type: "Invalid", value: "--- INVALID ---", address: "0x7fff_05", color: "bg-red-500/10 border-red-500/30 text-red-600 line-through opacity-60", isMoved: true },
        { id: "s2", name: "s2 (ptr, len, cap)", type: "String", value: "-> 0x55a1_heap", address: "0x7fff_1d", color: "bg-green-500/10 border-green-500/30 text-green-700" },
        { id: "r", name: "r (&String)", type: "&String", value: "ref to &s2", address: "0x7fff_25", color: "bg-purple-500/10 border-purple-500/30 text-purple-700" }
      ],
      heap: [
        { address: "0x55a1_heap", content: "\"ArchForge\"", sizeBytes: 9, allocatedBy: "s2 (borrowed by r)" }
      ],
      insight: "Borrow Checker memverifikasi bahwa masa hidup (lifetime) referensi r tidak boleh melebihi s2."
    }
  ];

  const current = steps[step];

  return (
    <div className="p-4 sm:p-5 rounded-card bg-surface-50 border border-line space-y-4">
      {/* Top Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-line">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-ink-900">
              Visualisator Interaktif: Memori Stack vs Heap & Pointer
            </h3>
            <p className="text-[11px] text-ink-500">
              Simulasi alokasi memori real-time langkah demi langkah.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setStep((s) => (s > 0 ? s - 1 : s))}
            disabled={step === 0}
            className="px-2.5 py-1 rounded-lg bg-white border border-line text-xs font-semibold text-ink-700 disabled:opacity-40 hover:bg-surface-100 transition shadow-sm"
          >
            Kembali
          </button>
          <button
            onClick={() => setStep((s) => (s < steps.length - 1 ? s + 1 : 0))}
            className="px-3 py-1 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold flex items-center gap-1 transition shadow-sm"
          >
            <span>{step === steps.length - 1 ? "Ulangi Dari Awal" : "Langkah Berikutnya"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Code Snippet Display */}
      <div className="p-3 rounded-xl bg-[#1C1814] text-white border border-white/10 font-mono text-xs flex items-center justify-between">
        <span className="text-orange-400 font-bold">{current.code}</span>
        <span className="text-[10px] text-white/50">Langkah {step + 1} dari {steps.length}</span>
      </div>

      <p className="text-xs text-ink-600 leading-relaxed">{current.description}</p>

      {/* Memory Visualization Grid: Stack vs Heap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* STACK PANEL (LIFO) */}
        <div className="p-3.5 rounded-xl bg-white border border-line space-y-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-line">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Stack Memory (Cepat, Fixed LIFO)
            </span>
            <span className="text-[10px] text-ink-400 font-mono">Tumbuh ke Bawah ↓</span>
          </div>

          <div className="space-y-1.5 min-h-[140px] flex flex-col justify-end">
            {current.stack.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "p-2 rounded-lg border flex items-center justify-between text-xs transition-all",
                  item.color
                )}
              >
                <div className="font-mono font-semibold">
                  <span>{item.name}</span>
                  <span className="text-[10px] text-ink-500 ml-1.5">({item.type})</span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span>{item.value}</span>
                  <span className="text-[9px] text-ink-400 opacity-75">[{item.address}]</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HEAP PANEL (Dinamis) */}
        <div className="p-3.5 rounded-xl bg-white border border-line space-y-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-line">
            <span className="text-xs font-bold uppercase tracking-wider text-ink-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              Heap Memory (Dinamis, Alokator)
            </span>
            <span className="text-[10px] text-ink-400 font-mono">RAM Pointer</span>
          </div>

          <div className="space-y-1.5 min-h-[140px] flex flex-col justify-center">
            {current.heap.length > 0 ? (
              current.heap.map((h, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-900 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between font-mono font-bold">
                    <span>{h.content}</span>
                    <span className="text-[10px] text-orange-600">[{h.address}]</span>
                  </div>
                  <div className="text-[10px] text-ink-500 flex items-center justify-between">
                    <span>Ukuran: {h.sizeBytes} bytes</span>
                    <span>Dimiliki oleh: {h.allocatedBy}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-xs text-ink-400 py-6 border border-dashed border-line rounded-lg">
                (Heap masih kosong pada langkah ini)
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Architectural Insight Alert */}
      <div className="p-3 rounded-xl bg-orange-500/5 border border-orange-500/20 text-xs text-ink-800 flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-ink-900">Wawasan Arsitektur:</strong> {current.insight}
        </div>
      </div>
    </div>
  );
}

