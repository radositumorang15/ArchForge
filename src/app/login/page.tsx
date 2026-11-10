"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, Sparkles, Check } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal masuk.");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isDemo: true }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal masuk demo.");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 bg-bg-0">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/assets/3d/bg/bg-auth.webp"
          alt="ArchForge Auth Background"
          fill
          priority
          className="object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-0 via-transparent to-bg-0/60" />
      </div>

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-[420px] p-6 sm:p-8 rounded-shell glass-shell border border-white/20 shadow-2xl text-white space-y-6">
        {/* Brand Logo & Title */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-14 h-14 relative mb-1">
            <Image
              src="/assets/3d/logo/logo-mark-3d.webp"
              alt="ArchForge Logo"
              width={56}
              height={56}
              className="object-contain drop-shadow"
            />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Masuk ke ArchForge
          </h1>
          <p className="text-xs text-white/60">
            Platform belajar interaktif: coding nol, live interview, dan system design.
          </p>
        </div>

        {/* 1-Click Demo Button */}
        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-glow transition disabled:opacity-60"
        >
          <Sparkles className="w-4 h-4 fill-current" />
          <span>Masuk Cepat sebagai Rado (Demo)</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-[11px] text-white/40 uppercase tracking-wider">
            atau akun terdaftar
          </span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-xs text-red-200">
            {error}
          </div>
        )}

        {/* Email/Password Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-white/80">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3 text-white/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full h-10 pl-10 pr-3 rounded-full bg-white/10 border border-white/15 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-white/80">Kata Sandi</label>
              <Link
                href="#"
                className="text-[11px] text-orange-400 hover:underline"
              >
                Lupa sandi?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-white/40" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-10 pl-10 pr-3 rounded-full bg-white/10 border border-white/15 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-full bg-white text-ink-900 hover:bg-white/90 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            <span>{loading ? "Memproses..." : "Masuk"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-white/60">
          Belum punya akun?{" "}
          <Link href="/register" className="text-orange-400 font-semibold hover:underline">
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}

