"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  Sparkles,
  Command,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchDialog } from "@/components/search/SearchDialog";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface TopbarProps {
  breadcrumbs?: BreadcrumbItem[];
  user?: {
    name?: string;
    avatarUrl?: string;
  } | null;
  onOpenMobileMenu?: () => void;
}

export function Topbar({ breadcrumbs = [], user, onOpenMobileMenu }: TopbarProps) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  // Keyboard shortcut (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Default dynamic breadcrumbs if none provided
  const segments = breadcrumbs.length > 0 ? breadcrumbs : generateBreadcrumbs(pathname);

  function generateBreadcrumbs(path: string) {
    const parts = path.split("/").filter(Boolean);
    if (parts.length === 0) return [{ label: "Home", href: "/dashboard" }];

    const items = [{ label: "ArchForge", href: "/dashboard" }];
    let accumulated = "";

    for (const part of parts) {
      accumulated += `/${part}`;
      let label = part.charAt(0).toUpperCase() + part.slice(1);
      if (part === "dashboard") label = "Home";
      if (part === "tracks") label = "Katalog Track";
      if (part === "learn") label = "Lesson";
      if (part === "system-design") label = "System Design";
      if (part === "interview") label = "Interview Room";
      if (part === "practice") label = "Latihan DSA";
      if (part === "schedule") label = "Jadwal & SRS";
      if (part === "projects") label = "Proyek & Tugas";
      items.push({ label, href: accumulated });
    }
    return items;
  }

  return (
    <>
      <header className="h-16 flex items-center justify-between px-4 sm:px-6 select-none z-20">
        {/* Left: Navigation Buttons & Breadcrumbs */}
        <div className="flex items-center gap-3 min-w-0">
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              className="md:hidden w-8 h-8 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/15 transition"
              title="Buka Menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          )}
          <div className="flex items-center gap-1 text-white/50">
            <button
              onClick={() => window.history.back()}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 hover:text-white transition"
              title="Kembali"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => window.history.forward()}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 hover:text-white transition"
              title="Maju"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs text-white/60 truncate font-medium"
          >
            {segments.map((item, idx) => {
              const isLast = idx === segments.length - 1;
              return (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-white/30 text-[10px]">/</span>}
                  {item.href && !isLast ? (
                    <Link
                      href={item.href}
                      className="hover:text-white transition truncate hover:underline"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      className={cn(
                        "truncate",
                        isLast ? "text-white font-semibold" : "text-white/70"
                      )}
                    >
                      {item.label}
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        </div>

        {/* Right: Quick Search Button & Notification */}
        <div className="flex items-center gap-2.5">
          {/* Universal Search Trigger Bar */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-white/60 hover:text-white text-xs transition border border-white/10 shadow-sm"
          >
            <Search className="w-3.5 h-3.5 text-orange-400" />
            <span className="truncate max-w-[140px] md:max-w-[200px]">
              Cari kurikulum & materi...
            </span>
            <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/10 border border-white/10 text-white/70">
              <Command className="w-2.5 h-2.5" />K
            </kbd>
          </button>

          {/* Mobile search icon only */}
          <button
            onClick={() => setSearchOpen(true)}
            className="sm:hidden w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition"
            title="Cari"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* AI Helper Shortcut Pill */}
          <Link
            href="/interview"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-400/10 border border-orange-500/30 text-orange-300 hover:text-white text-xs font-semibold shadow-sm transition group"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-400 group-hover:rotate-12 transition-transform" />
            <span>AI Interview</span>
          </Link>

          {/* Notifications Icon */}
          <Link
            href="/schedule"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition relative border border-white/10"
            title="Pengingat Review SRS"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-status-danger ring-2 ring-[#1B1915]" />
          </Link>
        </div>
      </header>

      {/* Real Search Dialog Component with Neon DB Query */}
      <SearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
