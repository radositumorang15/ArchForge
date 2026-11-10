"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FolderGit2,
  CheckCircle2,
  Clock,
  ExternalLink,
  GitBranch,
  Award,
  Sparkles,
  Search,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TrackProjectItem {
  id: string;
  trackId: string;
  trackSlug?: string;
  trackTitle?: string;
  tier: string;
  title: string;
  briefMarkdown: string;
  starterRepoTemplate: string;
  ciWorkflowPath: string;
  acceptanceCriteria: string[];
  rubricChecklist?: Array<{ id: string; category: string; item: string; points: number }>;
}

export function ProjectsView() {
  const [projects, setProjects] = useState<TrackProjectItem[]>([]);
  const [selectedTier, setSelectedTier] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [repoUrls, setRepoUrls] = useState<Record<string, string>>({});
  const [submittedStatus, setSubmittedStatus] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/curriculum/projects");
        if (res.ok) {
          const data = await res.json();
          if (data.projects) {
            setProjects(data.projects);
          }
        }
      } catch (err) {
        console.error("Failed to load projects from DB:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const getTierLabel = (tier: string) => {
    switch (tier) {
      case "project_1_basic":
        return "Tingkat Dasar (P1)";
      case "project_2_intermediate":
        return "Tingkat Menengah (P2)";
      case "project_3_capstone":
        return "Capstone Track (P3)";
      case "cross_track_capstone":
        return "Capstone Lintas Track";
      default:
        return tier.replace(/_/g, " ");
    }
  };

  const getTrackEmblem = (trackId: string) => {
    if (trackId.includes("rust") || trackId === "track-b") return "/assets/3d/emblem/emblem-rust@2x.webp";
    if (trackId.includes("python") || trackId === "track-a") return "/assets/3d/emblem/emblem-python@2x.webp";
    if (trackId.includes("kotlin") || trackId === "track-c") return "/assets/3d/emblem/emblem-kotlin@2x.webp";
    if (trackId.includes("flutter") || trackId.includes("dart") || trackId === "track-d") return "/assets/3d/emblem/emblem-flutter-dart@2x.webp";
    if (trackId.includes("dsa") || trackId === "track-e") return "/assets/3d/emblem/emblem-dsa@2x.webp";
    if (trackId.includes("system") || trackId === "track-f") return "/assets/3d/emblem/emblem-system-design@2x.webp";
    if (trackId.includes("uiux") || trackId === "track-j") return "/assets/3d/emblem/emblem-ui-ux@2x.webp";
    if (trackId.includes("ai") || trackId === "track-h") return "/assets/3d/emblem/emblem-ml-cv@2x.webp";
    return "/assets/3d/emblem/emblem-architect@2x.webp";
  };

  const filteredProjects = projects.filter((p) => {
    const matchTier = selectedTier === "all" || p.tier === selectedTier;
    const matchQuery =
      searchQuery === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.briefMarkdown.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.trackTitle && p.trackTitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchTier && matchQuery;
  });

  const handleSubmit = (projectId: string, e: React.FormEvent) => {
    e.preventDefault();
    const url = repoUrls[projectId];
    if (!url) return;
    setSubmittedStatus({ ...submittedStatus, [projectId]: true });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-ink-900">
              Proyek & Tugas Portofolio
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-600 text-xs font-bold border border-orange-500/20">
              {projects.length || 28} Proyek di Neon DB
            </span>
          </div>
          <p className="text-xs sm:text-sm text-ink-500 mt-1">
            Bangun portofolio berstandar produksi: kerjakan lokal, pasang CI workflow, dan kumpulkan repositori GitHub.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Tier filter tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: "all", label: "Semua Tingkat" },
            { id: "project_1_basic", label: "Dasar (P1)" },
            { id: "project_2_intermediate", label: "Menengah (P2)" },
            { id: "project_3_capstone", label: "Capstone (P3)" },
            { id: "cross_track_capstone", label: "Lintas Track" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTier(t.id)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition",
                selectedTier === t.id
                  ? "bg-ink-900 text-white shadow-sm"
                  : "bg-surface-100 text-ink-600 hover:bg-surface-200 hover:text-ink-900"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-ink-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari proyek atau topik..."
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-50 border border-line text-xs text-ink-900 focus:outline-none focus:border-orange-500 placeholder:text-ink-400"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredProjects.map((proj) => {
          const isDone = submittedStatus[proj.id];
          const emblemSrc = getTrackEmblem(proj.trackId);

          return (
            <div
              key={proj.id}
              className="p-5 rounded-card bg-surface-50 border border-line shadow-card space-y-4 flex flex-col justify-between hover:border-orange-500/40 transition group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-600 text-[11px] font-bold uppercase tracking-wider">
                    {proj.trackTitle || proj.trackId}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface-200 text-ink-700 text-[11px] font-medium">
                    {getTierLabel(proj.tier)}
                  </span>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-[#1E1914] to-[#2E2720] flex items-center justify-center p-2 border border-white/10 flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Image
                      src={emblemSrc}
                      alt={proj.title}
                      width={40}
                      height={40}
                      className="object-contain drop-shadow"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-ink-900 group-hover:text-orange-600 transition">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-ink-500 mt-1 leading-relaxed line-clamp-2">
                      {proj.briefMarkdown}
                    </p>
                  </div>
                </div>

                {/* Acceptance Criteria */}
                {proj.acceptanceCriteria && proj.acceptanceCriteria.length > 0 && (
                  <div className="p-3 rounded-xl bg-white border border-line space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-ink-700 flex items-center justify-between">
                      <span>Kriteria Penerimaan & CI:</span>
                      <span className="text-[10px] text-ink-400 font-mono font-normal">
                        {proj.ciWorkflowPath}
                      </span>
                    </div>
                    <ul className="space-y-1 text-xs text-ink-600">
                      {proj.acceptanceCriteria.slice(0, 4).map((c, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                          <span className="truncate">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Submission Form */}
              <form
                onSubmit={(e) => handleSubmit(proj.id, e)}
                className="pt-3 border-t border-line space-y-2"
              >
                <div className="text-xs font-semibold text-ink-700">Tautan Repositori GitHub:</div>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <GitBranch className="w-4 h-4 absolute left-3 top-2.5 text-ink-400" />
                    <input
                      type="url"
                      value={repoUrls[proj.id] || ""}
                      onChange={(e) =>
                        setRepoUrls({ ...repoUrls, [proj.id]: e.target.value })
                      }
                      placeholder="https://github.com/username/project"
                      className="w-full h-9 pl-9 pr-3 rounded-lg bg-white border border-line text-xs text-ink-900 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 h-9 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs transition shadow-sm whitespace-nowrap"
                  >
                    {isDone ? "Terkirim ✓" : "Kumpulkan"}
                  </button>
                </div>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
