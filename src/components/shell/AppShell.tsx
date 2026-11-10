"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { MobileTabBar } from "./MobileTabBar";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
  user?: {
    name: string;
    role: string;
    email?: string;
    streak?: number;
  } | null;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  noPadding?: boolean;
}

export function AppShell({
  children,
  user = null,
  breadcrumbs,
  noPadding = false,
}: AppShellProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-bg-0 overflow-x-hidden flex items-center justify-center p-0 md:p-3 lg:p-6 select-text">
      {/* 3D Background Decorative Image / Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/assets/3d/bg/bg-shell.webp"
          alt="ArchForge 3D Ambient Backdrop"
          fill
          priority
          className="object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-0/90 via-transparent to-bg-0/60" />
      </div>

      {/* Main Glass Shell Container (Desktop: rounded-shell with glass blur) */}
      <div className="relative z-10 w-full max-w-[1720px] h-screen md:h-[calc(100vh-24px)] lg:h-[calc(100vh-48px)] flex flex-col md:flex-row rounded-none md:rounded-shell glass-shell overflow-hidden border-0 md:border md:border-white/[0.12] shadow-2xl">
        {/* Desktop Sidebar (Left Column) */}
        <div className="hidden md:block flex-shrink-0 border-r border-white/[0.08] bg-black/25 backdrop-blur-xl">
          <Sidebar user={user} />
        </div>

        {/* Mobile Drawer (Slide in) */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
              onClick={() => setMobileDrawerOpen(false)}
            />
            <div className="relative z-10 w-72 h-full bg-[#151310] border-r border-white/10 shadow-2xl overflow-y-auto">
              <Sidebar user={user} onCloseMobile={() => setMobileDrawerOpen(false)} />
            </div>
          </div>
        )}

        {/* Center / Right Application Shell */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          {/* Topbar */}
          <Topbar
            user={user}
            breadcrumbs={breadcrumbs}
            onOpenMobileMenu={() => setMobileDrawerOpen(true)}
          />

          {/* White Content Panel (Design: gelap membingkai, putih bekerja) */}
          <main className="flex-1 overflow-hidden p-2 sm:p-3 md:p-3.5 pb-16 md:pb-3.5">
            <div
              className={cn(
                "w-full h-full bg-white rounded-panel shadow-card relative text-ink-900 border border-line",
                noPadding ? "p-0 overflow-hidden" : "p-4 sm:p-6 lg:p-7 overflow-y-auto"
              )}
            >
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <MobileTabBar onOpenDrawer={() => setMobileDrawerOpen(true)} />
    </div>
  );
}

