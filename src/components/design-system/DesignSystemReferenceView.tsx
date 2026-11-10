"use client";

import React, { useState } from "react";
import { Layers, Palette, Grid, Type, Sliders, CheckCircle2, XCircle, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function DesignSystemReferenceView() {
  const [activeTab, setActiveTab] = useState<"tokens" | "grid" | "typography" | "audit">("tokens");

  const colorTokens = [
    { name: "brand-primary", hex: "#EE833A", role: "Aksi utama, tombol aktif, emblem aksen", rgb: "238, 131, 58" },
    { name: "brand-hover", hex: "#D97028", role: "Hover state elemen primer", rgb: "217, 112, 40" },
    { name: "bg-surface-0", hex: "#0E0C0A", role: "Latar tergelap shell canvas luar", rgb: "14, 12, 10" },
    { name: "bg-surface-50", hex: "#FAF8F5", role: "Card surface terang halaman utama", rgb: "250, 248, 245" },
    { name: "text-ink-900", hex: "#1C1917", role: "Teks judul dan hierarki utama", rgb: "28, 25, 23" },
    { name: "text-ink-500", hex: "#78716C", role: "Teks deskripsi sekunder dan placeholder", rgb: "120, 113, 108" },
    { name: "border-line", hex: "#E7E5E4", role: "Garis batas card dan divider", rgb: "231, 229, 228" },
    { name: "status-success", hex: "#16A34A", role: "Badge kelulusan tes & CI passed", rgb: "22, 163, 74" },
    { name: "status-danger", hex: "#DC2626", role: "Bottleneck warning & compiler error", rgb: "220, 38, 38" },
  ];

  const spacingGrid = [
    { name: "space-1 (4px)", px: 4, usage: "Gap mikro antar icon dan teks" },
    { name: "space-2 (8px)", px: 8, usage: "Base unit grid, padding tombol kecil" },
    { name: "space-3 (12px)", px: 12, usage: "Padding input, margin item list" },
    { name: "space-4 (16px)", px: 16, usage: "Padding standar card, gap grid kolom" },
    { name: "space-6 (24px)", px: 24, usage: "Margin antar seksi halaman" },
    { name: "space-8 (32px)", px: 32, usage: "Pemisah blok besar dan hero section" },
    { name: "space-12 (48px)", px: 48, usage: "Tinggi area sentuh tombol minimum WCAG" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-ink-900">
              Perpustakaan Referensi Sistem Desain (Design Tokens)
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-600 text-xs font-bold border border-orange-500/20">
              FR-57 Terverifikasi
            </span>
          </div>
          <p className="text-xs sm:text-sm text-ink-500 mt-1">
            Katalog token resmi ArchForge: Primitive Tokens, Semantic Tokens, Spacing 8-pt Grid, dan perbandingan Sebelum/Sesudah (Audit).
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-line">
        {[
          { id: "tokens", label: "Token Warna", icon: Palette },
          { id: "grid", label: "Grid Spasi 8-Point", icon: Grid },
          { id: "typography", label: "Skala Tipografi", icon: Type },
          { id: "audit", label: "Audit Sebelum vs Sesudah", icon: Layers },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition",
                activeTab === tab.id
                  ? "bg-ink-900 text-white shadow-sm"
                  : "bg-surface-100 text-ink-600 hover:bg-surface-200 hover:text-ink-900"
              )}
            >
              <Icon className="w-3.5 h-3.5 text-orange-500" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: COLOR TOKENS */}
      {activeTab === "tokens" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {colorTokens.map((t) => (
            <div
              key={t.name}
              className="p-4 rounded-card bg-surface-50 border border-line shadow-card space-y-3 flex flex-col justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl border border-black/10 shadow-sm flex-shrink-0"
                  style={{ backgroundColor: t.hex }}
                />
                <div className="min-w-0">
                  <div className="font-mono font-bold text-xs text-ink-900">{t.name}</div>
                  <div className="font-mono text-[11px] text-ink-500">{t.hex}</div>
                </div>
              </div>
              <p className="text-xs text-ink-600 leading-relaxed border-t border-line/60 pt-2">
                {t.role}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: SPACING GRID */}
      {activeTab === "grid" && (
        <div className="p-5 rounded-card bg-surface-50 border border-line shadow-card space-y-4">
          <div className="text-xs text-ink-600">
            Semua dimensi padding, margin, dan jarak komponen di ArchForge menggunakan kelipatan 8px (dengan sub-grid 4px untuk ruang mikro).
          </div>
          <div className="space-y-3">
            {spacingGrid.map((s) => (
              <div
                key={s.name}
                className="p-3 bg-white rounded-xl border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="bg-orange-500/20 border border-orange-500/40 rounded flex items-center justify-center font-mono font-bold text-[10px] text-orange-700 flex-shrink-0"
                    style={{ width: `${Math.max(s.px, 20)}px`, height: "24px" }}
                  >
                    {s.px}
                  </div>
                  <span className="font-mono font-bold text-ink-900">{s.name}</span>
                </div>
                <span className="text-ink-500">{s.usage}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TYPOGRAPHY */}
      {activeTab === "typography" && (
        <div className="p-5 rounded-card bg-surface-50 border border-line shadow-card space-y-4">
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-xl border border-line space-y-1">
              <span className="text-[10px] uppercase font-mono text-ink-400">Heading 1 — 24px (Bold)</span>
              <h1 className="text-2xl font-bold text-ink-900">ArchForge Architecture System</h1>
            </div>
            <div className="p-4 bg-white rounded-xl border border-line space-y-1">
              <span className="text-[10px] uppercase font-mono text-ink-400">Heading 2 — 18px (Bold)</span>
              <h2 className="text-lg font-bold text-ink-900">Skalabilitas Sistem & Zero-Cost Abstraction</h2>
            </div>
            <div className="p-4 bg-white rounded-xl border border-line space-y-1">
              <span className="text-[10px] uppercase font-mono text-ink-400">Body Regular — 14px (Leading 1.6)</span>
              <p className="text-sm text-ink-700 leading-relaxed">
                Platform belajar interaktif dari konsep dasar komputasi, live coding, hingga perancangan sistem terdistribusi skala tinggi.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BEFORE VS AFTER AUDIT */}
      {activeTab === "audit" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-card bg-red-500/5 border border-red-500/20 space-y-3">
            <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase">
              <XCircle className="w-4 h-4" />
              <span>Sebelum (Anti-Pattern)</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-red-200 text-xs space-y-2">
              <div className="w-[60px] h-[36px] bg-red-100 text-red-700 flex items-center justify-center font-bold text-[10px] truncate border border-red-300">
                Simpan Perubahan...
              </div>
              <p className="text-[11px] text-red-700">
                Tombol memiliki fixed width `60px`. Saat diterjemahkan ke Bahasa Indonesia yang lebih panjang, teks terpotong dan memicu RenderFlex overflow!
              </p>
            </div>
          </div>

          <div className="p-5 rounded-card bg-green-500/5 border border-green-500/20 space-y-3">
            <div className="flex items-center gap-2 text-green-700 font-bold text-xs uppercase">
              <CheckCircle2 className="w-4 h-4" />
              <span>Sesudah (Standar ArchForge)</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-green-200 text-xs space-y-2">
              <div className="inline-flex items-center justify-center min-w-[88px] min-h-[48px] px-4 rounded-xl bg-orange-500 text-white font-bold text-xs shadow-sm">
                Simpan Perubahan
              </div>
              <p className="text-[11px] text-green-800">
                Tombol menggunakan `min-width 88dp`, padding horizontal `16dp`, dan `min-height 48dp` (WCAG AA). Teks tidak pernah overflow dan mudah disentuh.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

