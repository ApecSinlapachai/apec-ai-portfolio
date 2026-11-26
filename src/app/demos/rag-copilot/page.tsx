"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Activity,
  BarChart3,
  Bot,
  Languages,
  RefreshCw,
  Ticket,
} from "lucide-react";

import { DemoTopBar } from "@/components/layout/Navbar";
import { EvalAndCorpusWorkspace } from "@/components/demos/rag-copilot/EvalAndCorpusWorkspace";
import { RagWorkspace } from "@/components/demos/rag-copilot/RagWorkspace";
import { TriageWorkspace } from "@/components/demos/rag-copilot/TriageWorkspace";
import { API_PROXY_PREFIX, fetchHealth } from "@/lib/demos/rag/api";
import type { HealthResponse } from "@/lib/demos/rag/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

type ActiveTab = "rag" | "triage" | "eval";

const HEALTH_RETRY_INTERVAL_MS = 5_000;
const HEALTH_MAX_ATTEMPTS = 10;

export default function RagCopilotDemoPage() {
  const { lang: uiLang, toggleLang } = useLanguage();
  const t = translations[uiLang].ragCopilot;
  const navT = translations[uiLang].nav;

  const [activeTab, setActiveTab] = useState<ActiveTab>("rag");
  const [healthState, setHealthState] = useState<"warming" | "ready" | "offline">("warming");
  const [healthInfo, setHealthInfo] = useState<HealthResponse | null>(null);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pingRunIdRef = useRef(0);

  const startHealthCheck = useCallback(() => {
    if (retryTimerRef.current !== null) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }

    pingRunIdRef.current += 1;
    const runId = pingRunIdRef.current;
    setHealthState("warming");

    async function attemptPing(attempt: number) {
      let latestHealth: HealthResponse | null = null;
      try {
        latestHealth = await fetchHealth();
        if (runId !== pingRunIdRef.current) return;

        if (latestHealth.database_connected) {
          setHealthInfo(latestHealth);
          setHealthState("ready");
          return;
        }
      } catch {
        if (runId !== pingRunIdRef.current) return;
      }

      if (attempt < HEALTH_MAX_ATTEMPTS) {
        retryTimerRef.current = setTimeout(() => {
          retryTimerRef.current = null;
          void attemptPing(attempt + 1);
        }, HEALTH_RETRY_INTERVAL_MS);
        return;
      }

      if (latestHealth !== null) {
        setHealthInfo(latestHealth);
      }
      setHealthState("offline");
    }

    void attemptPing(1);
  }, []);

  useEffect(() => {
    startHealthCheck();
    return () => {
      pingRunIdRef.current += 1;
      if (retryTimerRef.current !== null) {
        clearTimeout(retryTimerRef.current);
        retryTimerRef.current = null;
      }
    };
  }, [startHealthCheck]);

  return (
    <div className="demo-theme-scope min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <DemoTopBar
        projectSlug="enterprise-rag-ops-copilot"
        title={t.topBarTitle}
        repoUrl="https://github.com/ApecSinlapachai/enterprise-rag-ops-copilot"
        defaultQuestion={t.topBarDefaultQuestion}
      />

      {/* Demo Header & Tabs */}
      <div className="border-b border-slate-800/80 bg-[var(--background)]/90">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600/20 ring-1 ring-indigo-500/40">
              <Bot className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-slate-100 sm:text-lg">
                {t.headerTitle}
              </h1>
              <p className="text-xs text-slate-400">{t.headerSubtitle}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => startHealthCheck()}
              title={`${t.proxyTitlePrefix} ${API_PROXY_PREFIX}`}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                healthState === "ready"
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                  : healthState === "warming"
                    ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
                    : "border-rose-500/40 bg-rose-500/10 text-rose-300"
              }`}
            >
              {healthState === "warming" ? (
                <RefreshCw className="h-3 w-3 animate-spin" aria-hidden="true" />
              ) : (
                <Activity className="h-3 w-3" aria-hidden="true" />
              )}
              <span>
                {healthState === "ready"
                  ? `${t.apiReadyPrefix} (v${healthInfo?.version ?? "0.1.0"})`
                  : healthState === "warming"
                    ? t.apiWarming
                    : t.apiOffline}
              </span>
            </button>

            <button
              type="button"
              onClick={toggleLang}
              aria-label={navT.toggleLangAria}
              title={navT.toggleLangTitle}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:border-indigo-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <Languages className="h-3.5 w-3.5 text-indigo-400" aria-hidden="true" />
              <span>{uiLang === "en" ? "EN / ไทย" : "ไทย / EN"}</span>
            </button>
          </div>
        </div>

        <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 sm:px-6">
          <TabButton
            active={activeTab === "rag"}
            onClick={() => setActiveTab("rag")}
            icon={<Bot className="h-4 w-4" aria-hidden="true" />}
            label={t.tabs.rag}
          />
          <TabButton
            active={activeTab === "triage"}
            onClick={() => setActiveTab("triage")}
            icon={<Ticket className="h-4 w-4" aria-hidden="true" />}
            label={t.tabs.triage}
          />
          <TabButton
            active={activeTab === "eval"}
            onClick={() => setActiveTab("eval")}
            icon={<BarChart3 className="h-4 w-4" aria-hidden="true" />}
            label={t.tabs.eval}
          />
        </div>
      </div>

      {/* Main Workspace */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {activeTab === "rag" && <RagWorkspace uiLang={uiLang} />}
        {activeTab === "triage" && <TriageWorkspace uiLang={uiLang} />}
        {activeTab === "eval" && <EvalAndCorpusWorkspace uiLang={uiLang} />}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex cursor-pointer whitespace-nowrap items-center gap-2 border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 sm:text-sm ${
        active
          ? "border-indigo-500 text-indigo-300"
          : "border-transparent text-slate-400 hover:border-slate-700 hover:text-slate-200"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
