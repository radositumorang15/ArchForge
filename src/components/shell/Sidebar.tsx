"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Home,
  Calendar,
  CheckSquare,
  BookOpen,
  Code2,
  Cpu,
  MessageSquare,
  TrendingUp,
  HelpCircle,
  Settings,
  ChevronDown,
  ChevronRight,
  Flame,
  LogOut,
  MoreVertical,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  user?: {
    name: string;
    role: string;
    email?: string;
    streak?: number;
  } | null;
  collapsed?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ user, collapsed = false, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [tracksOpen, setTracksOpen] = useState(
    pathname.startsWith("/tracks") || pathname.startsWith("/learn")
  );
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = [
    { label: "Beranda", href: "/dashboard", icon: Home },
    {
      label: "Materi & Silabus",
      href: "/tracks",
      icon: BookOpen,
      hasSubmenu: true,
      isOpen: tracksOpen,
      toggle: () => setTracksOpen(!tracksOpen),
      subItems: [
        { label: "Semua Track & Modul", href: "/tracks" },
        { label: "System Design & Arsitektur IT", href: "/tracks/system-design" },
        { label: "Peran & Praktik Arsitek", href: "/tracks/arsitek" },
        { label: "Rust: Dari Nol ke Sistem", href: "/tracks/rust-sistem" },
        { label: "Python: Dari Nol ke Data/ML", href: "/tracks/python-data-ml" },
        { label: "Kotlin & Jetpack Compose", href: "/tracks/kotlin-compose" },
        { label: "Dart & Flutter UI", href: "/tracks/dart-flutter" },
        { label: "Struktur Data & Algoritma", href: "/tracks/dsa-live-coding" },
        { label: "Fondasi Komputasi", href: "/tracks/fondasi" },
        { label: "Machine Learning & CV", href: "/tracks/ml-cv" },
        { label: "Persiapan Interview", href: "/tracks/interview" },
        { label: "Desain UI/UX & Antarmuka", href: "/tracks/ui-ux" },
      ],
    },
    { label: "Simulator Arsitektur", href: "/system-design", icon: Cpu },
    { label: "Latihan DSA & Kuis", href: "/practice", icon: Code2 },
    { label: "Simulasi Wawancara", href: "/interview", icon: MessageSquare, badge: "1" },
    { label: "Proyek & Tugas", href: "/projects", icon: CheckSquare, badge: "3" },
    { label: "Jadwal & SRS", href: "/schedule", icon: Calendar, badge: "12" },
    { label: "Progres Belajar", href: "/progress", icon: TrendingUp },
    { label: "Portofolio Publik", href: "/portfolio", icon: Layers },
  ];

  const bottomItems = [
    { label: "Bantuan", href: "/help", icon: HelpCircle },
    { label: "Pengaturan", href: "/settings", icon: Settings },
  ];

  const recentItems = [
    {
      title: "Ownership (Rust)",
      href: "/learn/rust/dasar-rust/ownership-dan-move",
      emblem: "/assets/3d/emblem/emblem-rust@2x.webp",
      badge: "2",
    },
    {
      title: "URL Shortener",
      href: "/system-design/url-shortener",
      emblem: "/assets/3d/emblem/emblem-system-design@2x.webp",
    },
    {
      title: "Two Sum & Sliding Window",
      href: "/practice",
      emblem: "/assets/3d/emblem/emblem-dsa@2x.webp",
    },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch {
      router.push("/login");
    }
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-full select-none text-white/90 relative z-20",
        collapsed ? "w-[72px]" : "w-[248px]"
      )}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center px-4 gap-3 border-b border-white/[0.08]">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 overflow-hidden"
          onClick={onCloseMobile}
        >
          <div className="relative w-8 h-8 flex-shrink-0">
            <Image
              src="/assets/3d/logo/logo-mark-3d.webp"
              alt="ArchForge Logo"
              width={32}
              height={32}
              className="object-contain drop-shadow"
            />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-[17px] tracking-tight text-white flex items-center gap-1.5">
                ArchForge
                <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  v1.0
                </span>
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Main Navigation Scrollable */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-5 scrollbar-thin">
        {/* Menu Section */}
        <div>
          {!collapsed && (
            <div className="text-[11px] font-semibold uppercase tracking-wider text-white/40 px-3 mb-2">
              Menu
            </div>
          )}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));
              const Icon = item.icon;

              if (item.hasSubmenu) {
                return (
                  <div key={item.label} className="space-y-1">
                    <button
                      onClick={item.toggle}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 h-10 rounded-xl text-[13px] font-medium transition-all group",
                        isActive
                          ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                          : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon
                        className={cn(
                          "w-4 h-4 flex-shrink-0 transition-colors",
                          isActive ? "text-orange-400" : "text-white/60 group-hover:text-white"
                        )}
                      />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-left">{item.label}</span>
                          {item.isOpen ? (
                            <ChevronDown className="w-3.5 h-3.5 text-white/40" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
                          )}
                        </>
                      )}
                    </button>

                    {!collapsed && item.isOpen && item.subItems && (
                      <div className="ml-5 pl-3 border-l border-white/10 space-y-0.5 py-1">
                        {item.subItems.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={onCloseMobile}
                              className={cn(
                                "block px-2 py-1.5 rounded-lg text-[12px] transition-colors",
                                isSubActive
                                  ? "text-orange-400 font-semibold bg-orange-500/10"
                                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                              )}
                            >
                              {sub.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={cn(
                    "flex items-center gap-3 px-3 h-10 rounded-xl text-[13px] font-medium transition-all group relative",
                    isActive
                      ? "bg-orange-500/20 text-white font-semibold border border-orange-500/30 shadow-[0_2px_12px_rgba(238,131,58,0.25)]"
                      : "text-white/70 hover:text-white hover:bg-white/[0.06]"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4 flex-shrink-0 transition-colors",
                      isActive ? "text-orange-400" : "text-white/60 group-hover:text-white"
                    )}
                  />
                  {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
                  {item.badge && (
                    <span
                      className={cn(
                        "flex items-center justify-center text-[10px] font-bold px-1.5 h-4 rounded-full bg-status-danger text-white",
                        collapsed && "absolute top-1 right-1"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Akses Terakhir / Active Study Tracks */}
        {!collapsed && (
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-white/40 px-3 mb-2 flex items-center justify-between">
              <span>Terakhir Dipelajari</span>
              <span className="text-[10px] text-orange-400 font-mono">SRS</span>
            </div>
            <div className="space-y-1">
              {recentItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={onCloseMobile}
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl hover:bg-white/[0.06] text-white/80 transition-colors group"
                >
                  <div className="w-6 h-6 rounded-lg overflow-hidden flex-shrink-0 bg-white/5 border border-white/10 flex items-center justify-center p-0.5">
                    <Image
                      src={item.emblem}
                      alt={item.title}
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                  <span className="flex-1 text-[12px] truncate group-hover:text-white">
                    {item.title}
                  </span>
                  {item.badge && (
                    <span className="w-4 h-4 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Utility Menu */}
        <div>
          <nav className="space-y-1 pt-2 border-t border-white/[0.08]">
            {bottomItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={cn(
                    "flex items-center gap-3 px-3 h-9 rounded-xl text-[13px] font-medium transition-all group",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="w-4 h-4 text-white/50 group-hover:text-white" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* User Card at Bottom */}
      <div className="p-3 border-t border-white/[0.08] relative">
        <div
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className={cn(
            "flex items-center gap-3 p-2 rounded-2xl bg-white/[0.08] hover:bg-white/[0.12] transition cursor-pointer border border-white/[0.08]",
            collapsed && "justify-center p-1.5"
          )}
        >
          {/* Avatar with Streak Flame badge */}
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-orange-400 flex items-center justify-center text-white font-bold text-sm shadow-md border-2 border-white/20">
              {user?.name ? user.name[0].toUpperCase() : "U"}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-status-danger text-white flex items-center justify-center text-[9px] font-extrabold shadow">
              🔥
            </div>
          </div>

          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-white truncate flex items-center gap-1.5">
                <span>{user?.name || "Pengguna"}</span>
              </div>
              <div className="text-[11px] text-white/60 truncate flex items-center gap-1">
                <span>{user?.streak ?? 1} Hari Streak</span>
                <span>•</span>
                <span className="capitalize">{user?.role || "Pelajar"}</span>
              </div>
            </div>
          )}

          {!collapsed && (
            <MoreVertical className="w-4 h-4 text-white/50 hover:text-white" />
          )}
        </div>

        {/* Dropdown Menu */}
        {userMenuOpen && (
          <div className="absolute bottom-16 left-3 right-3 bg-[#1A1815] border border-white/15 rounded-xl shadow-2xl p-1.5 z-50 text-[12px] space-y-1">
            <Link
              href="/settings"
              onClick={() => setUserMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Pengaturan Profil</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 text-left"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar (Logout)</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

