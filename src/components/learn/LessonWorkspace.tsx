"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Download,
  Share2,
  Sparkles,
  CheckCircle2,
  Play,
  Lightbulb,
  BookOpen,
  Code2,
  Layers,
  Send,
  ThumbsUp,
  FileText,
  Clock,
  Compass,
} from "lucide-react";
import { CodePlayground } from "./CodePlayground";
import { InteractiveMemoryVisualizer } from "./InteractiveMemoryVisualizer";
import { TrackItem, ModuleItem, LessonItem } from "@/data/curriculum";
import { cn } from "@/lib/utils";

interface LessonWorkspaceProps {
  track: TrackItem;
  module: ModuleItem;
  lesson: LessonItem;
}

interface UserNote {
  id: number;
  author: string;
  role: string;
  time: string;
  text: string;
}

export function LessonWorkspace({ track, module, lesson }: LessonWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<"code" | "memory">("code");
  const [activeHintLevel, setActiveHintLevel] = useState<number | null>(null);
  const [readMore, setReadMore] = useState(false);
  const [notes, setNotes] = useState<UserNote[]>([]);
  const [newNoteText, setNewNoteText] = useState("");
  const [isCompleted, setIsCompleted] = useState(lesson.completed || false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    setNotes((prev) => [
      ...prev,
      {
        id: Date.now(),
        author: "Anda",
        role: "Pelajar",
        time: "Baru saja",
        text: newNoteText.trim(),
      },
    ]);
    setNewNoteText("");
  };

  const handleCopyCode = () => {
    const codeToCopy = lesson.starterCode || "";
    if (codeToCopy) {
      navigator.clipboard.writeText(codeToCopy);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    }
  };

  const handleLessonSuccess = async () => {
    setIsCompleted(true);
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: lesson.id,
          status: "completed",
        }),
      });
    } catch {
      // Graceful offline fallback
    }
  };

  return (
    <div className="space-y-6">
      {/* 0. WORKSPACE HEADER & TAB SWITCHER */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-line">
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-surface-100 border border-line text-xs font-semibold">
          <button
            onClick={() => setActiveTab("code")}
            className={cn(
              "px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition",
              activeTab === "code"
                ? "bg-orange-500 text-white shadow-sm font-bold"
                : "text-ink-600 hover:text-ink-900"
            )}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Editor Kode & Eksekusi (CM6)</span>
          </button>
          <button
            onClick={() => setActiveTab("memory")}
            className={cn(
              "px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition",
              activeTab === "memory"
                ? "bg-orange-500 text-white shadow-sm font-bold"
                : "text-ink-600 hover:text-ink-900"
            )}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Visualisator Memori (Stack & Heap)</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-ink-500">
          <Clock className="w-3.5 h-3.5 text-orange-500" />
          <span>Estimasi: {lesson.duration || "20m"}</span>
          <span>•</span>
          <span className="capitalize font-medium text-ink-700">
            Bahasa: {lesson.language || "Rust"}
          </span>
        </div>
      </div>

      {/* 1. TOP INTERACTIVE PLAYER / CODE PLAYGROUND */}
      <section>
        {activeTab === "code" ? (
          <CodePlayground
            initialCode={
              lesson.starterCode ||
              `// ArchForge Code Workspace\nfn main() {\n    println!("Halo dari ${lesson.title}!");\n}`
            }
            language={lesson.language || "rust"}
            testCases={lesson.testCases}
            onSuccess={handleLessonSuccess}
            onHintClick={() => setActiveHintLevel(1)}
          />
        ) : (
          <div className="p-4 rounded-2xl bg-surface-50 border border-line">
            <InteractiveMemoryVisualizer />
          </div>
        )}
      </section>

      {/* 2. BOTTOM 3-COLUMN LAYOUT */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* COLUMN 1: Real Lesson Details & Curated Content (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Badge Tags from DB */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-ink-900 text-white text-xs font-semibold tracking-wide">
              {track.title}
            </span>
            <span className="px-3 py-1 rounded-full bg-surface-100 text-ink-700 text-xs font-medium border border-line">
              {module.title}
            </span>
            {isCompleted && (
              <span className="px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-700 text-xs font-semibold border border-green-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                Selesai
              </span>
            )}
          </div>

          {/* H1 Title from DB */}
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ink-900 leading-snug">
            {lesson.title}
          </h1>

          {/* Module Goal / Curriculum Author Info */}
          <div className="flex items-center justify-between py-2.5 border-y border-line">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-orange-400 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                AF
              </div>
              <div>
                <div className="text-xs font-bold text-ink-900">
                  Kurikulum Resmi ArchForge
                </div>
                <div className="text-[11px] text-ink-500">
                  Modul {module.title.split("—")[0].trim()}
                </div>
              </div>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface-100 text-ink-600 border border-line">
              Level: {track.level}
            </span>
          </div>

          {/* Learning Objectives from DB */}
          {lesson.objectives && lesson.objectives.length > 0 && (
            <div className="p-3.5 rounded-xl bg-surface-50 border border-line space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-ink-700 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-orange-500" />
                <span>Target Pembelajaran</span>
              </div>
              <ul className="space-y-1.5 text-xs text-ink-700">
                {lesson.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Real Lesson Body Description */}
          <div className="text-xs sm:text-[13px] text-ink-600 leading-relaxed space-y-3">
            <p className="whitespace-pre-line">{lesson.description}</p>

            {lesson.solution && (
              <div>
                <button
                  onClick={() => setReadMore(!readMore)}
                  className="text-orange-600 font-semibold hover:underline block pt-1 text-xs"
                >
                  {readMore ? "Sembunyikan Referensi Solusi" : "Tampilkan Panduan Arsitektur & Solusi"}
                </button>
                {readMore && (
                  <div className="mt-2 p-3 rounded-xl bg-surface-100 border border-line text-xs font-mono text-ink-800 overflow-x-auto">
                    <pre>{lesson.solution}</pre>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Bar */}
          <div className="pt-3 border-t border-line flex items-center justify-between text-xs text-ink-500">
            <span>Materi Terverifikasi DB</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-100 hover:bg-surface-200 text-ink-700 border border-line font-medium transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{copyFeedback ? "Tersalin!" : "Salin Kode Starter"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* COLUMN 2: Real Hints & Module Playlist from DB (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* A. HINTS CARD */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#E7803D] via-[#F28A3E] to-[#EEA66A] text-white shadow-glow space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-bold text-sm tracking-tight text-white drop-shadow-sm">
                  Petunjuk Solusi (Hints)
                </span>
              </div>
              <span className="text-[11px] font-semibold bg-white/20 px-2 py-0.5 rounded-full">
                Bertingkat
              </span>
            </div>

            {/* Hint Level Buttons */}
            <div className="flex items-center gap-2 pt-1">
              {[1, 2, 3].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() =>
                    setActiveHintLevel(activeHintLevel === lvl ? null : lvl)
                  }
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition border shadow-sm",
                    activeHintLevel === lvl
                      ? "bg-white text-orange-600 border-white scale-105"
                      : "bg-white/20 hover:bg-white/30 text-white border-white/20"
                  )}
                  title={`Petunjuk Tingkat ${lvl}`}
                >
                  H{lvl}
                </button>
              ))}
              {lesson.solution && (
                <button
                  onClick={() =>
                    setActiveHintLevel(activeHintLevel === 4 ? null : 4)
                  }
                  className={cn(
                    "px-3 h-9 rounded-full flex items-center justify-center font-semibold text-xs transition border shadow-sm",
                    activeHintLevel === 4
                      ? "bg-white text-orange-600 border-white"
                      : "bg-white/20 hover:bg-white/30 text-white border-white/20"
                  )}
                >
                  Solusi
                </button>
              )}
            </div>

            {/* Hint Display */}
            {activeHintLevel && (
              <div className="p-3 rounded-xl bg-black/25 border border-white/20 text-xs leading-relaxed text-white/95 animate-in fade-in duration-150">
                {activeHintLevel <= 3 && (
                  <div>
                    <strong>Petunjuk {activeHintLevel}:</strong>{" "}
                    {lesson.hints?.[activeHintLevel - 1] ||
                      "Teliti struktur input, jenis tipe data, dan perhatikan invariant dari algoritma."}
                  </div>
                )}
                {activeHintLevel === 4 && lesson.solution && (
                  <div className="space-y-1">
                    <strong>Solusi Lengkap:</strong>
                    <pre className="font-mono text-[11px] p-2 bg-black/40 rounded mt-1 overflow-x-auto text-white/90">
                      {lesson.solution}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* B. REAL MODULE LESSONS PLAYLIST FROM DB */}
          <div className="bg-white rounded-2xl border border-line p-3.5 space-y-3 shadow-card">
            <div className="flex items-center justify-between pb-2 border-b border-line">
              <span className="font-bold text-xs uppercase tracking-wider text-ink-700">
                Daftar Materi: {module.title}
              </span>
              <span className="text-[11px] text-ink-500 font-medium">
                {module.lessons.length} Materi
              </span>
            </div>

            <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1">
              {module.lessons.map((item, idx) => {
                const isActive = item.id === lesson.id;
                return (
                  <Link
                    key={item.id}
                    href={`/learn/${track.slug}/${module.slug}/${item.slug}`}
                    className={cn(
                      "block p-2.5 rounded-xl transition border text-xs",
                      isActive
                        ? "border-orange-500 bg-orange-50/30 shadow-xs"
                        : "border-line hover:border-line-strong hover:bg-surface-50"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-ink-900 truncate">
                        {idx + 1}. {item.title}
                      </span>
                      <span className="text-[10px] text-ink-400 font-mono flex-shrink-0 ml-2">
                        {item.duration || "20m"}
                      </span>
                    </div>
                    {isActive && (
                      <div className="mt-1 flex items-center gap-1 text-[10px] font-bold text-orange-600">
                        <Play className="w-2.5 h-2.5 fill-current" />
                        <span>Sedang Dipelajari</span>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* COLUMN 3: User Notes & Reflections (Real State, Clean Empty State) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl border border-line p-3.5 space-y-3 shadow-card">
            <div className="flex items-center justify-between pb-2 border-b border-line">
              <span className="font-bold text-xs uppercase tracking-wider text-ink-700 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-orange-500" />
                <span>Catatan Mandiri</span>
              </span>
              <span className="text-[11px] text-ink-500 font-medium">
                {notes.length} Catatan
              </span>
            </div>

            {/* Notes List or Clear Empty State */}
            {notes.length === 0 ? (
              <div className="py-8 px-4 text-center rounded-xl bg-surface-50 border border-line/60 space-y-2">
                <Compass className="w-6 h-6 text-ink-300 mx-auto" />
                <p className="text-xs text-ink-500 font-medium">
                  Belum ada catatan untuk materi ini.
                </p>
                <p className="text-[11px] text-ink-400 leading-relaxed">
                  Tuliskan rangkuman konsep, strategi Big-O, atau catatan penting saat belajar di bawah.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="p-3 rounded-xl bg-surface-50 border border-line text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px] text-ink-400">
                      <span className="font-semibold text-ink-800">{note.author}</span>
                      <span>{note.time}</span>
                    </div>
                    <p className="text-ink-700 text-xs leading-relaxed">{note.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Note Input Box */}
            <form onSubmit={handleAddNote} className="pt-2 border-t border-line flex items-center gap-2">
              <input
                type="text"
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Tulis catatan penting..."
                className="flex-1 h-9 px-3 rounded-full bg-surface-100 border border-line text-xs text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition shadow-xs flex-shrink-0"
                title="Simpan Catatan"
              >
                <Send className="w-3.5 h-3.5 fill-current ml-0.5" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
