"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BarChart3, Bot, Ticket } from "lucide-react";

import {
  DemoHealthBanner,
  type DemoHealthStatus,
  type DemoTelemetryChip,
} from "@/components/demos/DemoHealthBanner";
import { DemoProjectExplainer } from "@/components/demos/DemoProjectExplainer";
import { DemoTabBar, type DemoTabItem } from "@/components/demos/DemoTabBar";
import { EvalAndCorpusWorkspace } from "@/components/demos/rag-copilot/EvalAndCorpusWorkspace";
import { RagWorkspace } from "@/components/demos/rag-copilot/RagWorkspace";
import { TriageWorkspace } from "@/components/demos/rag-copilot/TriageWorkspace";
import { DemoTopBar } from "@/components/layout/Navbar";
import { API_PROXY_PREFIX, fetchHealth } from "@/lib/demos/rag/api";
import type { HealthResponse } from "@/lib/demos/rag/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

type ActiveTab = "rag" | "triage" | "eval";

type HealthErrorState =
  | { type: "retrying"; attempt: number }
  | { type: "offline" }
  | null;

const HEALTH_RETRY_INTERVAL_MS = 5_000;
const HEALTH_MAX_ATTEMPTS = 10;

export default function RagCopilotDemoPage() {
  const { lang: uiLang } = useLanguage();
  const t = translations[uiLang].ragCopilot;
  const healthT = translations[uiLang].demoHealth;

  const [activeTab, setActiveTab] = useState<ActiveTab>("rag");
  const [healthStatus, setHealthStatus] = useState<DemoHealthStatus>("checking");
  const [healthInfo, setHealthInfo] = useState<HealthResponse | null>(null);
  const [healthLoading, setHealthLoading] = useState(true);
  const [healthErrorState, setHealthErrorState] =
    useState<HealthErrorState>(null);

  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pingRunIdRef = useRef(0);

  const startHealthCheck = useCallback(() => {
    if (retryTimerRef.current !== null) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }

    pingRunIdRef.current += 1;
    const runId = pingRunIdRef.current;
    setHealthLoading(true);
    setHealthStatus("checking");
    setHealthErrorState(null);

    async function attemptPing(attempt: number) {
      let latestHealth: HealthResponse | null = null;
      try {
        latestHealth = await fetchHealth();
        if (runId !== pingRunIdRef.current) return;

        if (latestHealth.database_connected) {
          setHealthInfo(latestHealth);
          setHealthStatus("ready");
          setHealthErrorState(null);
          setHealthLoading(false);
          return;
        }
      } catch {
        if (runId !== pingRunIdRef.current) return;
      }

      if (attempt < HEALTH_MAX_ATTEMPTS) {
        if (latestHealth !== null) {
          setHealthInfo(latestHealth);
        }
        setHealthStatus("warming");
        setHealthErrorState({ type: "retrying", attempt });
        setHealthLoading(false);
        retryTimerRef.current = setTimeout(() => {
          retryTimerRef.current = null;
          void attemptPing(attempt + 1);
        }, HEALTH_RETRY_INTERVAL_MS);
        return;
      }

      if (latestHealth !== null) {
        setHealthInfo(latestHealth);
        setHealthStatus("degraded");
      } else {
        setHealthStatus("offline");
      }
      setHealthErrorState({ type: "offline" });
      setHealthLoading(false);
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

  const healthError =
    healthErrorState?.type === "retrying"
      ? `${healthT.waitingApiPrefix} ${API_PROXY_PREFIX} (${healthT.retryLabel} ${healthErrorState.attempt}/${HEALTH_MAX_ATTEMPTS})...`
      : healthErrorState?.type === "offline"
        ? `${healthT.offlineApiPrefix} ${API_PROXY_PREFIX} (${HEALTH_MAX_ATTEMPTS} ${healthT.offlineRetriesSuffix}).`
        : null;

  const healthChips: DemoTelemetryChip[] = [];
  if (healthInfo) {
    healthChips.push({
      id: "version",
      label: `v${healthInfo.version}`,
      icon: "tag",
      tone: "indigo",
    });

    const chatModel = healthInfo.chat_model?.trim();
    const complexModel = healthInfo.complex_model?.trim();
    const embedModel = healthInfo.embed_model?.trim();

    if (chatModel || complexModel || embedModel) {
      if (chatModel) {
        healthChips.push({
          id: "chat-model",
          label: `FAST: ${chatModel}`,
          icon: "cpu",
          tone: "emerald",
        });
      }
      if (complexModel) {
        healthChips.push({
          id: "complex-model",
          label: `COMPLEX: ${complexModel}`,
          icon: "cpu",
          tone: "sky",
        });
      }
      if (embedModel) {
        healthChips.push({
          id: "embed-model",
          label: `EMBED: ${embedModel}`,
          icon: "database",
          tone: "cyan",
        });
      }
    } else {
      healthChips.push({
        id: "stack-fallback",
        label: healthT.ragFallbackStack,
        icon: "database",
        tone: "indigo",
      });
    }
  }

  const tabs: DemoTabItem<ActiveTab>[] = [
    {
      id: "rag",
      label: t.tabs.rag,
      icon: <Bot className="h-4 w-4 shrink-0" aria-hidden="true" />,
    },
    {
      id: "triage",
      label: t.tabs.triage,
      icon: <Ticket className="h-4 w-4 shrink-0" aria-hidden="true" />,
    },
    {
      id: "eval",
      label: t.tabs.eval,
      icon: <BarChart3 className="h-4 w-4 shrink-0" aria-hidden="true" />,
    },
  ];

  return (
    <div className="demo-theme-scope min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <DemoTopBar
        projectSlug="enterprise-rag-ops-copilot"
        title={t.topBarTitle}
        repoUrl="https://github.com/ApecSinlapachai/enterprise-rag-ops-copilot"
        defaultQuestion={t.topBarDefaultQuestion}
      />

      <div className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:px-6">
        <header className="bg-engineering-grid relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
          <div className="flex items-start gap-3.5 sm:items-center">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-500/40 bg-indigo-500/15">
              <Bot className="h-5 w-5 text-indigo-400" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-bold tracking-tight text-[var(--foreground)] sm:text-2xl">
                {t.headerTitle}
              </h1>
              <p className="mt-1 text-xs leading-relaxed text-[var(--muted)] sm:text-sm">
                {t.headerSubtitle}
              </p>
            </div>
          </div>
        </header>

        <DemoHealthBanner
          status={healthStatus}
          statusDetail={healthStatus === "degraded" ? "disconnected" : undefined}
          chips={healthChips}
          endpoint={API_PROXY_PREFIX}
          accent="indigo"
          loading={healthLoading}
          error={healthError}
          onRetry={startHealthCheck}
        />

        <DemoProjectExplainer explainer={t.explainer} accent="indigo" />

        <DemoTabBar
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          accent="indigo"
          ariaLabel={t.headerTitle}
        />

        <div role="tabpanel">
          {activeTab === "rag" && <RagWorkspace uiLang={uiLang} />}
          {activeTab === "triage" && <TriageWorkspace uiLang={uiLang} />}
          {activeTab === "eval" && <EvalAndCorpusWorkspace uiLang={uiLang} />}
        </div>
      </div>
    </div>
  );
}
