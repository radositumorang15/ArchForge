"use client";

import React, { useState } from "react";
import { User, Palette, Globe, Shield, Save, Check } from "lucide-react";

interface SettingsViewProps {
  user?: {
    name?: string;
    email?: string;
    role?: string;
  } | null;
}

export function SettingsView({ user }: SettingsViewProps = {}) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [contrastMode, setContrastMode] = useState<"faithful" | "aa">("faithful");
  const [editorTheme, setEditorTheme] = useState<"dark" | "light">("dark");
  const [fontSize, setFontSize] = useState("13px");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-line">
        <h1 className="text-2xl font-bold tracking-tight text-ink-900">
          Pengaturan Aplikasi & Profil
        </h1>
        <p className="text-xs sm:text-sm text-ink-500 mt-1">
          Sesuaikan preferensi belajar, tema editor, kontras aksesibilitas, dan privasi akun.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="p-5 rounded-card bg-surface-50 border border-line space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-line">
            <User className="w-4 h-4 text-orange-500" />
            <h2 className="text-sm font-bold text-ink-900">Profil Pengguna</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-ink-700">Nama Tampilan</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-9 px-3 rounded-lg bg-white border border-line text-xs text-ink-900 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-ink-700">Email Akun</label>
              <input
                type="email"
                disabled
                value={email}
                className="w-full h-9 px-3 rounded-lg bg-surface-100 border border-line text-xs text-ink-500"
              />
            </div>
          </div>
        </div>

        {/* Display & Contrast Settings (DESIGN.md §11 Accessibility) */}
        <div className="p-5 rounded-card bg-surface-50 border border-line space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-line">
            <Palette className="w-4 h-4 text-orange-500" />
            <h2 className="text-sm font-bold text-ink-900">
              Tampilan & Aksesibilitas Kontras
            </h2>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-ink-700 block">
                Mode Kontras Warna (WCAG AA vs Faithful)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setContrastMode("faithful")}
                  className={`p-3 rounded-xl border cursor-pointer transition ${
                    contrastMode === "faithful"
                      ? "border-orange-500 bg-orange-50/50"
                      : "border-line bg-white"
                  }`}
                >
                  <div className="text-xs font-bold text-ink-900">
                    Faithful (Sesuai Referensi)
                  </div>
                  <div className="text-[11px] text-ink-500 mt-0.5">
                    Warna oranye murni `#EE833A` persis seperti screenshot desain.
                  </div>
                </div>

                <div
                  onClick={() => setContrastMode("aa")}
                  className={`p-3 rounded-xl border cursor-pointer transition ${
                    contrastMode === "aa"
                      ? "border-orange-500 bg-orange-50/50"
                      : "border-line bg-white"
                  }`}
                >
                  <div className="text-xs font-bold text-ink-900">
                    WCAG AA Compliant
                  </div>
                  <div className="text-[11px] text-ink-500 mt-0.5">
                    Aksen oranye `#BF530F` untuk kontras teks yang lolos audit aksesibilitas.
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-ink-700">Tema Editor</label>
                <select
                  value={editorTheme}
                  onChange={(e) => setEditorTheme(e.target.value as any)}
                  className="w-full h-9 px-3 rounded-lg bg-white border border-line text-xs text-ink-900"
                >
                  <option value="dark">Dark Slate (#17120F)</option>
                  <option value="light">Pure White (#FFFFFF)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-ink-700">
                  Ukuran Font Editor
                </label>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-white border border-line text-xs text-ink-900"
                >
                  <option value="12px">12px (Kompak)</option>
                  <option value="13px">13px (Standar)</option>
                  <option value="14px">14px (Besar)</option>
                  <option value="16px">16px (Aksesibilitas)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {saved && (
            <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
              <Check className="w-4 h-4" />
              <span>Pengaturan berhasil disimpan!</span>
            </span>
          )}
          <button
            type="submit"
            className="px-6 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs shadow-glow transition flex items-center gap-2"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </form>
    </div>
  );
}

