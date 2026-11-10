"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FolderGit2,
  CheckCircle2,
  ExternalLink,
  GitBranch,
  Award,
  Sparkles,
  ShieldCheck,
  Star,
  Cpu,
  Smartphone,
  Globe,
} from "lucide-react";

interface PortfolioViewProps {
  user?: {
    name?: string;
    bio?: string;
    role?: string;
  } | null;
}

export function PortfolioView({ user }: PortfolioViewProps = {}) {
  const completedProjects = [
    {
      id: "port-rust-grep",
      title: "CLI Fast-Grep & Key-Value Storage Engine",
      track: "Rust Systems",
      level: "Tingkat Menengah (P2)",
      emblem: "/assets/3d/emblem/emblem-rust@2x.webp",
      repoUrl: "https://github.com/rado/archforge-fast-grep",
      ciStatus: "passing",
      description: "Peralatan pencari regex multi-threaded dengan crossbeam dan mesin penyimpanan key-value dengan persistensi disk, zero-copy deserialization, dan test coverage 94%.",
      highlights: ["Multi-threaded Rayon / Crossbeam", "Format Error thiserror idiomatik", "Zero Data Race guarantees"],
      badges: ["Rust", "Tokio", "CI/CD Passed"],
    },
    {
      id: "port-sd-shortener",
      title: "Bitly-Scale High-Throughput URL Shortener Architecture",
      track: "System Design",
      level: "Capstone Track (P3)",
      emblem: "/assets/3d/emblem/emblem-system-design@2x.webp",
      repoUrl: "https://github.com/rado/archforge-sd-shortener",
      ciStatus: "passing",
      description: "Dokumen arsitektur C4 lengkap, estimasi kapasitas 100K RPS, topologi Redis Cache-Aside, dan catatan keputusan arsitektur (ADR) mitigasi cache stampede.",
      highlights: ["100.000 RPS Target", "p95 Latency < 45ms", "Transactional Outbox Pattern"],
      badges: ["System Design", "Redis", "C4 Model", "ADR"],
    },
    {
      id: "port-compose-flutter",
      title: "Cross-Platform UI System: Compose & Flutter Design Tokens",
      track: "UI/UX & Mobile",
      level: "Capstone Lintas Track",
      emblem: "/assets/3d/emblem/emblem-flutter-dart@2x.webp",
      repoUrl: "https://github.com/rado/archforge-cross-platform-ui",
      ciStatus: "passing",
      description: "Implementasi 'Satu Desain → Dua Implementasi' dari Figma ke Jetpack Compose (Kotlin) dan Flutter (Dart) dengan sistem token desain 8-point grid.",
      highlights: ["Material 3 & ThemeExtension", "Aksesibilitas WCAG AA", "100% Shared Design Tokens"],
      badges: ["Flutter", "Jetpack Compose", "Figma Tokens"],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Portfolio Hero Header */}
      <div className="p-6 rounded-card bg-surface-50 border border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1E1914] to-[#2E2720] flex items-center justify-center p-2.5 border border-white/10 shadow-lg flex-shrink-0">
            <Image
              src="/assets/3d/logo/logo-mark-3d.webp"
              alt="ArchForge Developer"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-700 text-xs font-bold border border-green-500/20 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                Terverifikasi ArchForge
              </span>
              <span className="text-xs text-ink-500">• Profil Publik</span>
            </div>
            <h1 className="text-2xl font-bold text-ink-900 mt-1">
              Portofolio Rekayasa: {user?.name || "Pelajar"}
            </h1>
            <p className="text-xs text-ink-500 mt-0.5">
              {user?.bio || "Software Architect & Systems Engineer — Spesialisasi Rust, System Design, Kotlin & Flutter."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-ink-500">Proyek Lulus CI</div>
            <div className="text-2xl font-bold font-mono text-orange-600">3 / 3</div>
          </div>
        </div>
      </div>

      {/* Completed Portfolio Projects Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-ink-900 flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-orange-500" />
            <span>Karya Portofolio Terverifikasi (Production Ready)</span>
          </h2>
          <span className="text-xs text-ink-500">Hasil tes otomatis CI GitHub Actions</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {completedProjects.map((proj) => (
            <div
              key={proj.id}
              className="p-5 rounded-card bg-surface-50 border border-line hover:border-orange-500/40 transition shadow-card space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-line">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#1E1914] to-[#2E2720] flex items-center justify-center p-2 border border-white/10 flex-shrink-0">
                    <Image
                      src={proj.emblem}
                      alt={proj.title}
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-orange-600 uppercase">
                        {proj.track}
                      </span>
                      <span className="text-[11px] text-ink-400">• {proj.level}</span>
                    </div>
                    <h3 className="text-base font-bold text-ink-900">{proj.title}</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-700 text-xs font-mono font-bold flex items-center gap-1 border border-green-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                    CI Passed
                  </span>
                  <a
                    href={proj.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-line text-xs font-semibold text-ink-700 hover:text-orange-600 hover:border-orange-500/50 transition shadow-sm"
                  >
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>Repositori</span>
                    <ExternalLink className="w-3 h-3 text-ink-400" />
                  </a>
                </div>
              </div>

              <p className="text-xs text-ink-600 leading-relaxed">{proj.description}</p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  {proj.badges.map((b) => (
                    <span
                      key={b}
                      className="px-2.5 py-0.5 rounded-full bg-white text-ink-700 text-[11px] font-semibold border border-line shadow-xs"
                    >
                      {b}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-ink-500 text-[11px]">
                  {proj.highlights.map((h, i) => (
                    <span key={i} className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
                      <span>{h}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

