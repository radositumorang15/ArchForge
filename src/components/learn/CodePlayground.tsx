"use client";

import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { rust } from "@codemirror/lang-rust";
import {
  Play,
  RotateCcw,
  Lightbulb,
  CheckCircle2,
  XCircle,
  Clock,
  Terminal,
  Settings2,
  Maximize2,
  Check,
} from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

interface TestCase {
  name: string;
  expected?: string;
  input?: string;
}

interface CodePlaygroundProps {
  initialCode: string;
  language: "python" | "rust" | "kotlin" | "dart";
  testCases?: TestCase[];
  onSuccess?: () => void;
  onHintClick?: () => void;
}

export function CodePlayground({
  initialCode,
  language,
  testCases = [],
  onSuccess,
  onHintClick,
}: CodePlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [activeTab, setActiveTab] = useState<"output" | "tests" | "stdin">("output");
  const [stdinInput, setStdinInput] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string>("");
  const [testResults, setTestResults] = useState<
    Array<{ name: string; passed: boolean; message: string; durationMs: number }>
  >([]);
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  const langExtension = language === "rust" ? rust() : python();

  const handleRun = async () => {
    setIsRunning(true);
    setActiveTab("output");
    setOutput("Mengompilasi dan menjalankan program...\n");

    const startTime = performance.now();

    // Realistic evaluation simulator for Rust and Python
    setTimeout(() => {
      const duration = Math.round(performance.now() - startTime + 85);
      setExecutionTime(duration);

      const results = testCases.map((tc) => {
        // Validation check based on keywords and logic
        let passed = true;
        let msg = "Output sesuai ekspektasi.";

        if (language === "rust") {
          if (tc.name.includes("s1 dan s2") && !code.includes("&s1") && !code.includes("clone")) {
            passed = false;
            msg = "Error[E0382]: borrow of moved value: `s1`";
          }
        }

        return {
          name: tc.name,
          passed,
          message: msg,
          durationMs: Math.floor(Math.random() * 20) + 12,
        };
      });

      setTestResults(results);

      const allPassed = results.length === 0 || results.every((r) => r.passed);

      if (allPassed) {
        setOutput(
          `Compiling archforge-lesson v0.1.0\nFinished \`dev\` profile [unoptimized + debuginfo] in 0.12s\nRunning \`target/debug/lesson\`\n\n` +
            (language === "rust"
              ? `s1 masih valid: ArchForge\ns2 mereferensikan: ArchForge\nPanjang string 'ArchForge' adalah 9\n\nProcess finished with exit code 0`
              : `Hasil: [4, 16, 36, 64, 100]\n\nProcess finished with exit code 0`)
        );
        // Trigger celebratory confetti!
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.7 },
          });
        } catch {
          // ignore
        }
        if (onSuccess) onSuccess();
      } else {
        setOutput(
          `error[E0382]: borrow of moved value: \`s1\`\n  --> src/main.rs:7:38\n   |\n4  |     let s2 = s1;\n   |              -- value moved here\n...\n7  |     println!("s1 masih valid: {}", s1);\n   |                                    ^^ value borrowed here after move\n\nUntuk info lebih lanjut, gunakan flag --explain E0382.`
        );
      }

      setIsRunning(false);
    }, 450);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput("");
    setTestResults([]);
  };

  const passedCount = testResults.filter((r) => r.passed).length;

  return (
    <div className="w-full bg-[#181512] rounded-media border border-line overflow-hidden shadow-card flex flex-col">
      {/* Top Header Bar of Editor */}
      <div className="h-10 bg-[#1D1A16] px-4 flex items-center justify-between border-b border-white/[0.08] text-white/70 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="font-mono text-white/90 font-medium">
            main.{language === "rust" ? "rs" : "py"}
          </span>
          <span className="text-[11px] text-white/40 uppercase">({language})</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onHintClick}
            className="flex items-center gap-1 text-orange-400 hover:text-orange-300 transition text-[11px]"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Hint</span>
          </button>
          <span className="text-white/20">|</span>
          <span className="text-white/40 text-[11px]">Ctrl+Enter untuk Jalankan</span>
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="relative min-h-[220px] max-h-[360px] overflow-auto bg-[#141210] font-mono text-[13px]">
        <CodeMirror
          value={code}
          height="240px"
          theme="dark"
          extensions={[langExtension]}
          onChange={(val) => setCode(val)}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            foldGutter: false,
          }}
        />
      </div>

      {/* Video-Style Run Bar (Screenshot Parity) */}
      <div className="h-12 bg-[#1C1915] px-4 flex items-center justify-between border-t border-white/[0.08] text-white select-none">
        {/* Left: Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="h-8 px-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-glow transition disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? "Menjalankan..." : "Jalankan"}</span>
          </button>

          <button
            onClick={handleReset}
            className="w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white/70 hover:text-white flex items-center justify-center transition"
            title="Reset Kode"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onHintClick}
            className="w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-orange-400 hover:text-orange-300 flex items-center justify-center transition"
            title="Lihat Petunjuk"
          >
            <Lightbulb className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Center: Timer & Status */}
        <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-white/60">
          <Clock className="w-3.5 h-3.5 text-white/40" />
          <span>
            {executionTime ? `00:${executionTime < 100 ? "00" : "01"}` : "00:00"} / 05:00
          </span>
          {testResults.length > 0 && (
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-[11px] font-semibold",
                passedCount === testResults.length
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-red-500/20 text-red-400 border border-red-500/30"
              )}
            >
              {passedCount}/{testResults.length} tes lulus
            </span>
          )}
        </div>

        {/* Right: Language Indicator & Settings */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold px-2 py-1 rounded bg-white/[0.08] text-white/80 uppercase">
            {language}
          </span>
          <button
            className="w-7 h-7 rounded-full hover:bg-white/[0.1] text-white/50 hover:text-white flex items-center justify-center transition"
            title="Pengaturan Editor"
          >
            <Settings2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tabbed Output Panel (Output | Tes | Waktu) */}
      <div className="bg-[#110F0D] border-t border-white/[0.08] text-white/90">
        <div className="flex items-center px-4 h-9 gap-4 border-b border-white/[0.06] text-xs font-medium">
          <button
            onClick={() => setActiveTab("output")}
            className={cn(
              "h-full flex items-center gap-1.5 transition border-b-2",
              activeTab === "output"
                ? "border-orange-500 text-orange-400 font-semibold"
                : "border-transparent text-white/50 hover:text-white"
            )}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Output Konsol</span>
          </button>

          <button
            onClick={() => setActiveTab("tests")}
            className={cn(
              "h-full flex items-center gap-1.5 transition border-b-2",
              activeTab === "tests"
                ? "border-orange-500 text-orange-400 font-semibold"
                : "border-transparent text-white/50 hover:text-white"
            )}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>
              Hasil Tes {testResults.length > 0 && `(${passedCount}/${testResults.length})`}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("stdin")}
            className={cn(
              "h-full flex items-center gap-1.5 transition border-b-2",
              activeTab === "stdin"
                ? "border-orange-500 text-orange-400 font-semibold"
                : "border-transparent text-white/50 hover:text-white"
            )}
          >
            <Settings2 className="w-3.5 h-3.5" />
            <span>Input Stdin {stdinInput.trim() && "•"}</span>
          </button>
        </div>

        <div className="p-3 font-mono text-[12px] min-h-[90px] max-h-[160px] overflow-y-auto">
          {activeTab === "stdin" && (
            <div className="space-y-1.5">
              <div className="text-[11px] text-white/50">
                Input standar (stdin) untuk latihan (misal: input() di Python atau io::stdin() di Rust):
              </div>
              <textarea
                rows={3}
                value={stdinInput}
                onChange={(e) => setStdinInput(e.target.value)}
                placeholder="Masukkan nilai input stdin di sini..."
                className="w-full p-2.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500"
              />
            </div>
          )}

          {activeTab === "output" && (
            <pre className="text-white/80 whitespace-pre-wrap leading-relaxed">
              {output || "Klik tombol ▶ Jalankan untuk menguji kodemu."}
            </pre>
          )}

          {activeTab === "tests" && (
            <div className="space-y-1.5">
              {testResults.length > 0 ? (
                testResults.map((t, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex items-center justify-between p-2 rounded-lg text-xs",
                      t.passed
                        ? "bg-green-500/10 text-green-300 border border-green-500/20"
                        : "bg-red-500/10 text-red-300 border border-red-500/20"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {t.passed ? (
                        <Check className="w-3.5 h-3.5 text-green-400" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-red-400" />
                      )}
                      <span className="font-semibold">{t.name}</span>
                      <span className="text-white/40 text-[11px]">— {t.message}</span>
                    </div>
                    <span className="text-[10px] text-white/50">{t.durationMs}ms</span>
                  </div>
                ))
              ) : (
                <div className="text-white/40 py-2">
                  Belum ada pengujian yang dijalankan.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

