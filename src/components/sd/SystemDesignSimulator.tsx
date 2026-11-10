"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Play,
  RotateCcw,
  Zap,
  AlertTriangle,
  Server,
  Layers,
  Database,
  HardDrive,
  Cpu,
  ArrowRight,
  Plus,
  CheckCircle2,
  FileText,
  X,
  TrendingUp,
  DollarSign,
  Activity,
  Sliders,
  ChevronDown,
  Sparkles,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SDNode {
  id: string;
  type: "lb" | "api" | "cache" | "db_primary" | "queue";
  name: string;
  sprite: string;
  x: number;
  y: number;
  capacityRps: number;
  status: "healthy" | "overloaded" | "down";
  latencyMs: number;
}

interface ScenarioData {
  id: string;
  scenarioNumber: number;
  title: string;
  level: string;
  briefMarkdown: string;
  functionalReqs: string[];
  nonFunctionalReqs: {
    targetRps: number;
    maxP95Ms: number;
    availability: string;
    maxCostUnits: number;
  };
  chaosEvents: Array<{
    tick: number;
    kind: string;
    targetNode: string;
    detail: string;
  }>;
  rubricRules: Array<{
    ruleId: string;
    weight: number;
    checkDescription: string;
    failFeedback: string;
  }>;
  adrPrompts: string[];
}

export function SystemDesignSimulator() {
  const [scenarios, setScenarios] = useState<ScenarioData[]>([]);
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const [scenarioDropdownOpen, setScenarioDropdownOpen] = useState(false);

  const [nodes, setNodes] = useState<SDNode[]>([
    {
      id: "node-lb-1",
      type: "lb",
      name: "Load Balancer NGINX",
      sprite: "/assets/3d/node/node-load-balancer.webp",
      x: 60,
      y: 120,
      capacityRps: 50000,
      status: "healthy",
      latencyMs: 2,
    },
    {
      id: "node-api-1",
      type: "api",
      name: "API Server Cluster (Rust/Axum)",
      sprite: "/assets/3d/node/node-api-server.webp",
      x: 240,
      y: 80,
      capacityRps: 20000,
      status: "healthy",
      latencyMs: 15,
    },
    {
      id: "node-cache-1",
      type: "cache",
      name: "Cache Redis Cluster",
      sprite: "/assets/3d/node/node-cache.webp",
      x: 440,
      y: 40,
      capacityRps: 60000,
      status: "healthy",
      latencyMs: 3,
    },
    {
      id: "node-db-1",
      type: "db_primary",
      name: "Neon PostgreSQL Primary",
      sprite: "/assets/3d/node/node-db-primary.webp",
      x: 440,
      y: 180,
      capacityRps: 8000,
      status: "healthy",
      latencyMs: 45,
    },
    {
      id: "node-queue-1",
      type: "queue",
      name: "Event Queue (Kafka)",
      sprite: "/assets/3d/node/node-queue.webp",
      x: 240,
      y: 220,
      capacityRps: 30000,
      status: "healthy",
      latencyMs: 8,
    },
  ]);

  const [rps, setRps] = useState<number>(15000);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [spikeActive, setSpikeActive] = useState<boolean>(false);
  const [adrDrawerOpen, setAdrDrawerOpen] = useState<boolean>(false);
  const [adrNotes, setAdrNotes] = useState<string>(
    "Kami memilih Cache-Aside dengan Redis di depan PostgreSQL untuk menahan 90% query read URL shortener. Load Balancer membagi traffic secara seimbang."
  );

  // Fetch all 8 scenarios from Neon DB
  useEffect(() => {
    async function loadScenarios() {
      try {
        const res = await fetch("/api/curriculum/scenarios");
        if (res.ok) {
          const data = await res.json();
          if (data.scenarios && data.scenarios.length > 0) {
            setScenarios(data.scenarios);
          }
        }
      } catch (err) {
        console.error("Failed to load scenarios from DB:", err);
      }
    }
    loadScenarios();
  }, []);

  const activeScenario =
    scenarios[selectedScenarioIndex] || {
      id: "sd-scenario-1",
      scenarioNumber: 1,
      title: "URL Shortener Berkinerja Tinggi (Bitly-scale)",
      level: "intermediate",
      briefMarkdown:
        "Rancang layanan pemendek URL dengan target 100K RPS puncak, latensi p95 < 50ms, dan ketersediaan 99.99%.",
      functionalReqs: [
        "Generate short URL 7-karakter Base62",
        "Redirection 301/302 latensi rendah",
        "Custom alias dan expired link",
        "Agregasi analytics kunjungan",
      ],
      nonFunctionalReqs: {
        targetRps: 100000,
        maxP95Ms: 50,
        availability: "99.99%",
        maxCostUnits: 300,
      },
      chaosEvents: [
        {
          tick: 15,
          kind: "traffic_spike_10x",
          targetNode: "node-lb-1",
          detail: "Lonjakan trafik viral 10x (Spike)",
        },
        {
          tick: 30,
          kind: "kill_node",
          targetNode: "node-cache-1",
          detail: "Cache Redis mengalami crash OOM",
        },
      ],
      rubricRules: [
        {
          ruleId: "r1",
          weight: 40,
          checkDescription: "Kapasitas cache mampu menahan minimal 85% read traffic",
          failFeedback: "Tambahkan cluster cache untuk melindungi primary database",
        },
      ],
      adrPrompts: [
        "Mengapa memilih Base62 dibanding UUIDv4?",
        "Trade-off HTTP 301 vs 302 untuk analytics tracking",
      ],
    };

  // Calculated metrics
  const currentLoad = spikeActive ? rps * 10 : rps;
  const dbCapacity = 8000;
  const cacheHitRatio = nodes.some((n) => n.type === "cache" && n.status === "healthy") ? 0.88 : 0.05;
  const dbLoad = currentLoad * (1 - cacheHitRatio);
  const isDbOverloaded = dbLoad > dbCapacity;
  const p95Latency = isDbOverloaded ? 480 : Math.round(18 + currentLoad / 2500);
  const errorRate = isDbOverloaded ? 12.4 : 0.02;
  const monthlyCost = Math.round(120 + currentLoad * 0.008);

  const handleToggleSpike = () => {
    setSpikeActive(!spikeActive);
  };

  const handleKillNode = (id: string) => {
    setNodes(
      nodes.map((n) =>
        n.id === id ? { ...n, status: n.status === "down" ? "healthy" : "down" } : n
      )
    );
  };

  const addNode = (type: SDNode["type"], name: string, sprite: string, cap: number) => {
    const newNode: SDNode = {
      id: `node-${Date.now()}`,
      type,
      name,
      sprite,
      x: 100 + Math.random() * 300,
      y: 80 + Math.random() * 150,
      capacityRps: cap,
      status: "healthy",
      latencyMs: 10,
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <div className="space-y-4">
      {/* Top Scenario Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-card bg-surface-50 border border-line">
        <div className="relative">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setScenarioDropdownOpen(!scenarioDropdownOpen)}
              className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 text-xs font-bold uppercase tracking-wider transition border border-orange-500/30"
            >
              <span>Skenario {activeScenario.scenarioNumber}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <h2 className="text-base font-bold text-ink-900">{activeScenario.title}</h2>
          </div>
          <p className="text-xs text-ink-500 mt-1 max-w-2xl">{activeScenario.briefMarkdown}</p>

          {/* Scenario Selection Dropdown */}
          {scenarioDropdownOpen && (
            <div className="absolute left-0 top-full mt-2 w-80 sm:w-96 rounded-xl bg-white border border-line shadow-2xl p-2 z-50 animate-in fade-in space-y-1">
              <div className="text-[11px] font-bold text-ink-400 px-2 py-1 uppercase tracking-wider">
                Pilih Skenario Simulator ({scenarios.length || 8} Skenario di Neon DB):
              </div>
              {scenarios.map((sc, idx) => (
                <button
                  key={sc.id}
                  onClick={() => {
                    setSelectedScenarioIndex(idx);
                    setScenarioDropdownOpen(false);
                  }}
                  className={cn(
                    "w-full text-left p-2 rounded-lg text-xs transition flex items-center justify-between",
                    selectedScenarioIndex === idx
                      ? "bg-orange-500/10 text-orange-700 font-bold"
                      : "hover:bg-surface-100 text-ink-700"
                  )}
                >
                  <div className="truncate">
                    <span className="font-mono text-ink-500 mr-1.5">#{sc.scenarioNumber}</span>
                    <span>{sc.title}</span>
                  </div>
                  <span className="text-[10px] uppercase font-semibold text-ink-400 ml-2">
                    {sc.level}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/tracks/system-design"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 border border-orange-500/30 text-xs font-semibold shadow-xs transition"
          >
            <Layers className="w-3.5 h-3.5 text-orange-500" />
            <span>Materi Teori Track F (10 Modul)</span>
          </a>

          <button
            onClick={() => setAdrDrawerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-ink-700 border border-line hover:border-orange-500 text-xs font-semibold shadow-sm transition"
          >
            <FileText className="w-3.5 h-3.5 text-orange-500" />
            <span>Mini-ADR ({adrNotes ? "Tercatat" : "Kosong"})</span>
          </button>
        </div>
      </div>

      {/* Functional & Non-Functional Requirements Chips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded-xl bg-surface-50 border border-line text-xs">
        <div>
          <span className="font-bold text-ink-800 text-[11px] uppercase tracking-wider block mb-1.5">
            Kebutuhan Fungsional:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {activeScenario.functionalReqs?.map((req, rIdx) => (
              <span
                key={rIdx}
                className="px-2 py-0.5 rounded bg-white border border-line text-[11px] text-ink-700"
              >
                ✓ {req}
              </span>
            ))}
          </div>
        </div>
        <div>
          <span className="font-bold text-ink-800 text-[11px] uppercase tracking-wider block mb-1.5">
            Kebutuhan Non-Fungsional (SLO):
          </span>
          <div className="flex flex-wrap gap-2 text-[11px]">
            <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-700 font-mono font-bold">
              Target RPS: {activeScenario.nonFunctionalReqs?.targetRps?.toLocaleString() || "100,000"}
            </span>
            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-700 font-mono font-bold">
              Max p95: {activeScenario.nonFunctionalReqs?.maxP95Ms || 50}ms
            </span>
            <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-700 font-mono font-bold">
              Ketersediaan: {activeScenario.nonFunctionalReqs?.availability || "99.99%"}
            </span>
          </div>
        </div>
      </div>

      {/* Simulator Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Component Palette (Left 2 cols on desktop) */}
        <div className="lg:col-span-2 bg-surface-50 p-3 rounded-card border border-line space-y-2 select-none">
          <div className="text-[11px] font-bold uppercase tracking-wider text-ink-500 mb-2">
            Palet Komponen
          </div>
          <button
            onClick={() =>
              addNode("lb", "Load Balancer", "/assets/3d/node/node-load-balancer.webp", 50000)
            }
            className="w-full flex items-center gap-2 p-2 rounded-xl bg-white border border-line hover:border-orange-500/50 hover:shadow-sm text-xs font-medium text-ink-800 transition text-left"
          >
            <Image
              src="/assets/3d/node/node-load-balancer.webp"
              alt="LB"
              width={24}
              height={24}
              className="object-contain"
            />
            <span>+ Load Balancer</span>
          </button>

          <button
            onClick={() =>
              addNode("api", "API Server", "/assets/3d/node/node-api-server.webp", 20000)
            }
            className="w-full flex items-center gap-2 p-2 rounded-xl bg-white border border-line hover:border-orange-500/50 hover:shadow-sm text-xs font-medium text-ink-800 transition text-left"
          >
            <Image
              src="/assets/3d/node/node-api-server.webp"
              alt="API"
              width={24}
              height={24}
              className="object-contain"
            />
            <span>+ API Server</span>
          </button>

          <button
            onClick={() =>
              addNode("cache", "Cache Redis", "/assets/3d/node/node-cache.webp", 60000)
            }
            className="w-full flex items-center gap-2 p-2 rounded-xl bg-white border border-line hover:border-orange-500/50 hover:shadow-sm text-xs font-medium text-ink-800 transition text-left"
          >
            <Image
              src="/assets/3d/node/node-cache.webp"
              alt="Cache"
              width={24}
              height={24}
              className="object-contain"
            />
            <span>+ Cache Redis</span>
          </button>

          <button
            onClick={() =>
              addNode("db_primary", "Neon DB Replica", "/assets/3d/node/node-db-primary.webp", 8000)
            }
            className="w-full flex items-center gap-2 p-2 rounded-xl bg-white border border-line hover:border-orange-500/50 hover:shadow-sm text-xs font-medium text-ink-800 transition text-left"
          >
            <Image
              src="/assets/3d/node/node-db-primary.webp"
              alt="DB"
              width={24}
              height={24}
              className="object-contain"
            />
            <span>+ Neon DB</span>
          </button>

          <button
            onClick={() =>
              addNode("queue", "Kafka Queue", "/assets/3d/node/node-queue.webp", 30000)
            }
            className="w-full flex items-center gap-2 p-2 rounded-xl bg-white border border-line hover:border-orange-500/50 hover:shadow-sm text-xs font-medium text-ink-800 transition text-left"
          >
            <Image
              src="/assets/3d/node/node-queue.webp"
              alt="Queue"
              width={24}
              height={24}
              className="object-contain"
            />
            <span>+ Kafka Queue</span>
          </button>
        </div>

        {/* Central Canvas (7 cols on desktop) */}
        <div className="lg:col-span-7 bg-[#1A1612] rounded-card border border-white/10 relative h-[420px] overflow-hidden select-none flex flex-col justify-between p-4 shadow-inner">
          {/* Dot Grid Canvas Background */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Canvas Nodes with 3D sprites */}
          <div className="relative flex-1">
            {nodes.map((node) => (
              <div
                key={node.id}
                onClick={() => handleKillNode(node.id)}
                className={cn(
                  "absolute p-2 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all border backdrop-blur-md",
                  node.status === "down"
                    ? "bg-red-950/60 border-red-500 opacity-60 scale-95"
                    : isDbOverloaded && node.type === "db_primary"
                    ? "bg-yellow-950/60 border-yellow-500 animate-pulse"
                    : "bg-surface-50/10 border-white/20 hover:border-orange-500 hover:scale-105"
                )}
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  width: "120px",
                }}
                title="Klik untuk simulasi Chaos (Kill/Restore Node)"
              >
                <div className="w-12 h-12 relative mb-1">
                  <Image
                    src={node.sprite}
                    alt={node.name}
                    width={48}
                    height={48}
                    className={cn(
                      "object-contain transition",
                      node.status === "down" && "grayscale opacity-50"
                    )}
                  />
                </div>
                <div className="text-[11px] font-bold text-white text-center truncate w-full">
                  {node.name}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      node.status === "down"
                        ? "bg-red-500"
                        : node.type === "db_primary" && isDbOverloaded
                        ? "bg-yellow-400"
                        : "bg-green-400"
                    )}
                  />
                  <span className="text-[10px] text-white/60 font-mono">
                    {node.status === "down"
                      ? "DOWN"
                      : `${node.capacityRps.toLocaleString()} RPS`}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Canvas Bottom Floating Controls */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-white/80">Beban Trafik:</span>
              <input
                type="range"
                min="1000"
                max="50000"
                step="1000"
                value={rps}
                onChange={(e) => setRps(Number(e.target.value))}
                className="w-32 accent-orange-500 cursor-pointer"
              />
              <span className="text-xs font-mono font-bold text-orange-400">
                {currentLoad.toLocaleString()} RPS
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleSpike}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-sm",
                  spikeActive
                    ? "bg-red-500 text-white animate-bounce"
                    : "bg-surface-50/20 text-white hover:bg-surface-50/30 border border-white/20"
                )}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{spikeActive ? "Spike 10x AKTIF" : "Injeksi Spike 10x"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Metrics & Telemetry (Right 3 cols on desktop) */}
        <div className="lg:col-span-3 bg-surface-50 p-4 rounded-card border border-line space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-line">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-orange-500" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-ink-900">
                Telemetri Sistem
              </h3>
            </div>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-white rounded-xl border border-line shadow-sm">
              <div className="text-[11px] text-ink-500">Latensi p95</div>
              <div
                className={cn(
                  "text-lg font-bold font-mono mt-0.5",
                  p95Latency > 50 ? "text-red-500" : "text-green-600"
                )}
              >
                {p95Latency}ms
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-line shadow-sm">
              <div className="text-[11px] text-ink-500">Error Rate</div>
              <div
                className={cn(
                  "text-lg font-bold font-mono mt-0.5",
                  errorRate > 1 ? "text-red-500" : "text-green-600"
                )}
              >
                {errorRate}%
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-line shadow-sm">
              <div className="text-[11px] text-ink-500">Cache Hit Ratio</div>
              <div className="text-lg font-bold font-mono mt-0.5 text-orange-600">
                {(cacheHitRatio * 100).toFixed(0)}%
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-line shadow-sm">
              <div className="text-[11px] text-ink-500">Estimasi Biaya</div>
              <div className="text-lg font-bold font-mono mt-0.5 text-ink-900">
                ${monthlyCost}/bln
              </div>
            </div>
          </div>

          {/* Bottleneck Analysis */}
          <div className="p-3 rounded-xl bg-white border border-line text-xs space-y-1.5">
            <span className="font-bold text-ink-800 block">Status Arsitektur:</span>
            {isDbOverloaded ? (
              <div className="text-red-600 flex items-start gap-1.5">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Database Bottleneck!</strong> Beban tulis/miss cache melebihi kapasitas 8.000 RPS Neon DB Primary. Tambahkan Read Replica atau perbesar cache cluster!
                </span>
              </div>
            ) : (
              <div className="text-green-700 flex items-start gap-1.5">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  Sistem sehat. Cache Redis berhasil menyerap mayoritas beban query baca sesuai SLO.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mini-ADR Drawer */}
      {adrDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end animate-in fade-in">
          <div className="w-full max-w-md h-full bg-white shadow-2xl p-6 overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="font-bold text-base text-ink-900">
                Catatan Keputusan Arsitektur (Mini-ADR)
              </h3>
              <button
                onClick={() => setAdrDrawerOpen(false)}
                className="p-1 rounded-lg hover:bg-surface-100 text-ink-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-ink-700">
              <p>
                Tuliskan justifikasi trade-off arsitektur yang kamu pilih untuk skenario ini:
              </p>
              <textarea
                rows={6}
                value={adrNotes}
                onChange={(e) => setAdrNotes(e.target.value)}
                placeholder="Misal: Memilih Redis dibanding Memcached karena butuh struktur data sorted sets dan TTL otomatis..."
                className="w-full p-3 rounded-xl border border-line bg-surface-50 text-xs text-ink-900 focus:outline-none focus:border-orange-500"
              />

              <div className="space-y-2 pt-2">
                <div className="font-bold text-ink-900">Checklist Rubrik Penilaian:</div>
                {activeScenario.rubricRules && activeScenario.rubricRules.length > 0 ? (
                  activeScenario.rubricRules.map((rubric) => (
                    <label key={rubric.ruleId} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-orange-500" />
                      <span>{rubric.checkDescription} ({rubric.weight} poin)</span>
                    </label>
                  ))
                ) : (
                  <>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-orange-500" />
                      <span>Tidak ada SPOF di jalur kritis request baca</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-orange-500" />
                      <span>Strategi Caching jelas (Cache-Aside dengan TTL 24 jam)</span>
                    </label>
                  </>
                )}
              </div>

              <button
                onClick={() => setAdrDrawerOpen(false)}
                className="w-full py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold mt-4 shadow-sm"
              >
                Simpan Keputusan (ADR)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
