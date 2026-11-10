"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, CheckCircle2, Award, Sparkles } from "lucide-react";
import { TRACKS, TrackItem } from "@/data/curriculum";
import { cn } from "@/lib/utils";

interface TrackViewItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  level: string;
  emblem: string;
  color: string;
  progressPercent: number;
  modulesCount: number;
  lessonsCount: number;
}

interface TracksCatalogueViewProps {
  initialTracks?: TrackViewItem[];
}

export function TracksCatalogueView({ initialTracks }: TracksCatalogueViewProps) {
  const [trackList, setTrackList] = useState<TrackViewItem[]>(
    initialTracks && initialTracks.length > 0 ? initialTracks : TRACKS
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [isLoading, setIsLoading] = useState(!initialTracks || initialTracks.length === 0);

  useEffect(() => {
    async function loadTracks() {
      try {
        const res = await fetch("/api/curriculum/tracks");
        if (res.ok) {
          const data = await res.json();
          if (data.tracks && data.tracks.length > 0) {
            const mapped: TrackViewItem[] = data.tracks.map((t: any) => ({
              id: t.id,
              slug: t.slug,
              title: t.title,
              tagline: t.subtitle,
              category: t.category,
              level: t.levelRange,
              emblem: t.emblem,
              color: t.color,
              progressPercent: t.progressPercent || 0,
              modulesCount: t.modulesCount || 4,
              lessonsCount: t.lessonsCount || 12,
            }));
            setTrackList(mapped);
          }
        }
      } catch (err) {
        console.error("Failed to load tracks from API, using fallback:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (!initialTracks || initialTracks.length === 0) {
      loadTracks();
    }
  }, [initialTracks]);

  const categories = [
    "Semua",
    "Bahasa",
    "Fondasi",
    "Arsitektur",
    "ML & CV",
    "UI/UX",
    "Interview",
  ];

  const filteredTracks =
    selectedCategory === "Semua"
      ? trackList
      : trackList.filter((t) => t.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-ink-900">
              Katalog Jalur Belajar (Tracks)
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 text-xs font-bold border border-orange-500/20">
              11 Track Aktif di Neon DB
            </span>
          </div>
          <p className="text-xs sm:text-sm text-ink-500 mt-1">
            Dari fondasi coding nol, sistem berkinerja tinggi, arsitektur IT, hingga interview live.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition",
              selectedCategory === cat
                ? "bg-ink-900 text-white shadow-sm"
                : "bg-surface-100 text-ink-600 hover:bg-surface-200 hover:text-ink-900"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Track Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTracks.map((track) => (
          <Link
            key={track.id}
            href={`/tracks/${track.slug}`}
            className="p-5 rounded-card bg-surface-50 border border-line hover:border-orange-500/50 hover:shadow-card transition flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-white text-ink-700 text-[11px] font-semibold border border-line">
                  {track.category}
                </span>
                <span className="text-[11px] text-ink-500 font-medium">
                  {track.level}
                </span>
              </div>

              {/* 3D Emblem Showcase */}
              <div className="w-full h-32 rounded-2xl bg-gradient-to-tr from-[#1E1914] to-[#2E2720] flex items-center justify-center p-3 border border-white/10 shadow-inner group-hover:scale-[1.02] transition-transform">
                <Image
                  src={track.emblem || "/assets/3d/emblem/emblem-rust@2x.webp"}
                  alt={track.title}
                  width={96}
                  height={96}
                  className="object-contain drop-shadow-md"
                />
              </div>

              <div>
                <h3 className="text-base font-bold text-ink-900 group-hover:text-orange-600 transition">
                  {track.title}
                </h3>
                <p className="text-xs text-ink-500 mt-1 line-clamp-2 leading-relaxed">
                  {track.tagline}
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-line/80 space-y-2">
              <div className="flex items-center justify-between text-xs text-ink-600">
                <span>
                  {track.modulesCount} Modul • {track.lessonsCount} Lesson
                </span>
                <span className="font-mono font-bold text-orange-600">
                  {track.progressPercent}%
                </span>
              </div>

              <div className="w-full h-1.5 rounded-full bg-surface-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-orange-500"
                  style={{ width: `${track.progressPercent}%` }}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
