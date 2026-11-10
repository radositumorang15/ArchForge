"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, BookOpen, Layers, Play, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchResultItem {
  type: "track" | "module" | "lesson";
  id: string;
  title: string;
  subtitle: string;
  href: string;
}

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/curriculum/search?q=${encodeURIComponent(query.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
        }
      } catch (err) {
        console.error("Search fetch error:", err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-line overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-line bg-surface-50">
          <Search className="w-5 h-5 text-orange-500 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari track, modul, materi kode, konsep arsitektur... (Esc untuk batal)"
            className="flex-1 bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
          />
          {loading && <Loader2 className="w-4 h-4 text-orange-500 animate-spin flex-shrink-0" />}
          {query && !loading && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-full hover:bg-surface-200 text-ink-400 hover:text-ink-700 transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1 divide-y divide-line/40">
          {query.trim().length >= 2 && results.length === 0 && !loading && (
            <div className="text-center py-10 text-xs text-ink-500">
              Tidak ada materi yang cocok dengan kata kunci &quot;<span className="font-semibold text-ink-800">{query}</span>&quot;.
            </div>
          )}

          {query.trim().length < 2 && (
            <div className="px-3 py-6 text-center space-y-2">
              <p className="text-xs text-ink-500">
                Ketik minimal 2 huruf untuk mulai mencari materi di seluruh kurikulum ArchForge.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
                {["Rust", "Python", "Stack vs Heap", "Compose", "Kafka", "Sharding"].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="px-2.5 py-1 rounded-full bg-surface-100 hover:bg-surface-200 text-ink-700 text-xs transition border border-line"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.map((item) => (
            <Link
              key={`${item.type}-${item.id}`}
              href={item.href}
              onClick={onClose}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-50 transition group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center flex-shrink-0">
                  {item.type === "track" && <Layers className="w-4 h-4" />}
                  {item.type === "module" && <BookOpen className="w-4 h-4" />}
                  {item.type === "lesson" && <Play className="w-3.5 h-3.5 fill-current" />}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-ink-900 truncate group-hover:text-orange-600 transition">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-ink-500 truncate">{item.subtitle}</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-ink-300 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-transform flex-shrink-0 ml-2" />
            </Link>
          ))}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-surface-100 border-t border-line text-[11px] text-ink-500 flex items-center justify-between">
          <span>Pencarian Cepat ArchForge</span>
          <div className="flex items-center gap-2">
            <span>Tekan</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white border border-line text-ink-700 font-mono text-[10px]">
              ESC
            </kbd>
            <span>untuk keluar</span>
          </div>
        </div>
      </div>
    </div>
  );
}

