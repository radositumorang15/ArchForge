"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Code2, Calendar, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileTabBarProps {
  onOpenDrawer: () => void;
}

export function MobileTabBar({ onOpenDrawer }: MobileTabBarProps) {
  const pathname = usePathname();

  const tabs = [
    { label: "Beranda", href: "/dashboard", icon: Home },
    { label: "Materi", href: "/tracks", icon: BookOpen },
    { label: "Latihan", href: "/practice", icon: Code2 },
    { label: "Jadwal", href: "/schedule", icon: Calendar, badge: "12" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#141210]/90 backdrop-blur-xl border-t border-white/10 px-2 py-1.5 flex items-center justify-around">
      {tabs.map((tab) => {
        const isActive =
          pathname === tab.href ||
          (tab.href !== "/dashboard" && pathname.startsWith(tab.href));
        const Icon = tab.icon;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex flex-col items-center justify-center min-w-[56px] py-1 px-2 rounded-xl transition-all relative",
              isActive ? "text-orange-400 font-semibold" : "text-white/60 hover:text-white"
            )}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {tab.badge && (
                <span className="absolute -top-1 -right-2 px-1 text-[9px] font-bold rounded-full bg-status-danger text-white">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5">{tab.label}</span>
          </Link>
        );
      })}

      <button
        onClick={onOpenDrawer}
        className="flex flex-col items-center justify-center min-w-[56px] py-1 px-2 rounded-xl text-white/60 hover:text-white transition"
      >
        <Menu className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Menu</span>
      </button>
    </nav>
  );
}

