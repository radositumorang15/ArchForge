"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ScheduleView() {
  const [selectedDay, setSelectedDay] = useState<string>("Sel");

  const days = [
    { label: "Sen", date: "9 Nov", active: false },
    { label: "Sel", date: "10 Nov", active: true },
    { label: "Rab", date: "11 Nov", active: false },
    { label: "Kam", date: "12 Nov", active: false },
    { label: "Jum", date: "13 Nov", active: false },
    { label: "Sab", date: "14 Nov", active: false },
    { label: "Min", date: "15 Nov", active: false },
  ];

  const scheduleItems = [
    {
      time: "09:00 - 09:30",
      title: "Sesi Review SRS Pagi (FSRS)",
      desc: "Ulangi 12 konsep memori Rust, pola caching Redis, dan two pointers.",
      tag: "SRS",
      completed: true,
      href: "/review",
    },
    {
      time: "10:30 - 12:00",
      title: "Lesson: Ownership & Semantik Move",
      desc: "Eksperimen langsung di browser dengan compiler Rust dan test runner.",
      tag: "Lesson",
      completed: false,
      href: "/learn/rust/dasar-rust/ownership-dan-move",
    },
    {
      time: "14:00 - 15:30",
      title: "Simulasi Arsitektur URL Shortener",
      desc: "Uji lonjakan 100K RPS dan injeksi kegagalan pada Load Balancer.",
      tag: "System Design",
      completed: false,
      href: "/system-design/url-shortener",
    },
    {
      time: "16:30 - 17:15",
      title: "Mock Interview Live",
      desc: "Sesi tanya jawab teknis dengan pewawancara di Interview Room.",
      tag: "Interview",
      completed: false,
      href: "/interview",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-line">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink-900">
            Jadwal Belajar (Timetable)
          </h1>
          <p className="text-xs sm:text-sm text-ink-500 mt-1">
            Rencana harian terstruktur: pengulangan berjarak (SRS), materi mendalam, dan
            simulasi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-900 text-xs font-semibold flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-orange-500 fill-current" />
            <span>Target: 2.5 Jam / Hari</span>
          </div>
        </div>
      </div>

      {/* Week Days Strip */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((d) => (
          <button
            key={d.label}
            onClick={() => setSelectedDay(d.label)}
            className={cn(
              "p-3 rounded-2xl flex flex-col items-center justify-center transition border",
              d.label === selectedDay
                ? "bg-orange-500 text-white border-orange-600 shadow-glow font-bold"
                : "bg-surface-50 hover:bg-surface-100 border-line text-ink-700"
            )}
          >
            <span className="text-[11px] uppercase tracking-wider">{d.label}</span>
            <span className="text-sm font-mono mt-0.5">{d.date.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      {/* Schedule Items List */}
      <div className="space-y-3">
        {scheduleItems.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-surface-50 border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-orange-500/40 transition"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-white text-ink-700 text-[10px] font-bold uppercase border border-line">
                  {item.tag}
                </span>
                <span className="text-xs font-mono text-ink-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-orange-500" />
                  <span>{item.time}</span>
                </span>
              </div>
              <h3 className="text-sm font-bold text-ink-900">{item.title}</h3>
              <p className="text-xs text-ink-500">{item.desc}</p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              {item.completed ? (
                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-700 text-xs font-semibold flex items-center gap-1 border border-green-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  <span>Selesai</span>
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="px-4 py-1.5 rounded-full bg-ink-900 hover:bg-black text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
                >
                  <span>Buka</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

