"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertOctagon,
  BarChart3,
  Bot,
  ShieldAlert,
  Workflow,
} from "lucide-react";

import {
  DemoHealthBanner,
  type DemoHealthStatus,
  type DemoTelemetryChip,
} from "@/components/demos/DemoHealthBanner";
import { DemoProjectExplainer } from "@/components/demos/DemoProjectExplainer";
import { DemoTabBar, type DemoTabItem } from "@/components/demos/DemoTabBar";
import { ApprovalsQueue } from "@/components/demos/agent-ops/ApprovalsQueue";
import { BenchmarkScorecard } from "@/components/demos/agent-ops/BenchmarkScorecard";
import { DlqPanel } from "@/components/demos/agent-ops/DlqPanel";
import { WorkflowSandbox } from "@/components/demos/agent-ops/WorkflowSandbox";
import { DemoTopBar } from "@/components/layout/Navbar";
import {
  API_PROXY_PREFIX,
  fetchBenchmark,
  fetchHealth,
  listApprovals,
  listDlqJobs,
  listRuns,
} from "@/lib/demos/agent/api";
import type {
  ApprovalResponse,
  BenchmarkReport,
  DLQJobResponse,
  HealthResponse,
  RunResponse,
} from "@/lib/demos/agent/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

type TabId = "sandbox" | "approvals" | "dlq" | "benchmark";

type HealthErrorState =
  | { type: "retrying"; attempt: number }
  | { type: "offline" }
  | null;

const HEALTH_RETRY_INTERVAL_MS = 5000;
const HEALTH_MAX_RETRIES = 10;

export default function AgentOpsDemoPage() {
  const { lang } = useLanguage();
  const t = translations[lang].agentOps;
  const healthT = translations[lang].demoHealth;

  const [activeTab, setActiveTab] = useState<TabId>("sandbox");

  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [healthLoading, setHealthLoading] = useState(true);
  const [healthErrorState, setHealthErrorState] =
    useState<HealthErrorState>(null);
  const [wakingUp, setWakingUp] = useState(false);

  const [runs, setRuns] = useState<RunResponse[]>([]);
  const [approvals, setApprovals] = useState<ApprovalResponse[]>([]);
  const [dlqJobs, setDlqJobs] = useState<DLQJobResponse[]>([]);
  const [benchmark, setBenchmark] = useState<BenchmarkReport | null>(null);
  const [benchmarkError, setBenchmarkError] = useState<string | null>(null);
  const [dataLoading, setDataLoading] = useState(false);

  const loadOperationalData = useCallback(async () => {
    setDataLoading(true);
    try {
      const [runsRes, approvalsRes, dlqRes] = await Promise.all([
        listRuns(undefined, 25),
        listApprovals(undefined, 50),
        listDlqJobs(undefined, 50),
      ]);
      setRuns(runsRes);
      setApprovals(approvalsRes);
      setDlqJobs(dlqRes);
    } catch {
      // Errors surfaced via DemoHealthBanner
    } finally {
      setDataLoading(false);
    }
  }, []);

  const loadBenchmark = useCallback(async () => {
    try {
      const report = await fetchBenchmark();
      setBenchmark(report);
      setBenchmarkError(null);
    } catch (err) {
      setBenchmarkError(
        err instanceof Error ? err.message : t.benchmarkLoadError,
      );
    }
  }, [t.benchmarkLoadError]);

  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);

  const clearRetryTimer = useCallback(() => {
    if (retryTimerRef.current !== null) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
  }, []);

  const checkHealth = useCallback(
    async (attempt = 0) => {
      clearRetryTimer();
      setHealthLoading(true);
      if (attempt === 0) {
        setHealthErrorState(null);
      }
      try {
        const res = await fetchHealth();
        if (!mountedRef.current) return;
        setHealth(res);
        setWakingUp(false);
        setHealthErrorState(null);
        setHealthLoading(false);
        await Promise.all([loadOperationalData(), loadBenchmark()]);
      } catch {
        if (!mountedRef.current) return;
        setHealth(null);
        if (attempt < HEALTH_MAX_RETRIES) {
          const nextAttempt = attempt + 1;
          setWakingUp(true);
          setHealthErrorState({ type: "retrying", attempt: nextAttempt });
          setHealthLoading(false);
          retryTimerRef.current = setTimeout(() => {
            void checkHealth(nextAttempt);
          }, HEALTH_RETRY_INTERVAL_MS);
        } else {
          setWakingUp(false);
          setHealthErrorState({ type: "offline" });
          setHealthLoading(false);
        }
      }
    },
    [clearRetryTimer, loadBenchmark, loadOperationalData],
  );

  useEffect(() => {
    mountedRef.current = true;
    void checkHealth(0);
    return () => {
      mountedRef.current = false;
      clearRetryTimer();
    };
  }, [checkHealth, clearRetryTimer]);

  const healthError =
    healthErrorState?.type === "retrying"
      ? `${healthT.waitingApiPrefix} ${API_PROXY_PREFIX} (${healthT.retryLabel} ${healthErrorState.attempt}/${HEALTH_MAX_RETRIES})...`
      : healthErrorState?.type === "offline"
        ? `${healthT.offlineApiPrefix} ${API_PROXY_PREFIX} (${HEALTH_MAX_RETRIES} ${healthT.offlineRetriesSuffix}).`
        : null;

  const isOk = health?.status === "ok" && health?.database === "connected";
  const healthStatus: DemoHealthStatus = wakingUp
    ? "warming"
    : healthLoading
      ? "checking"
      : isOk
        ? "ready"
        : health
          ? "degraded"
          : "offline";

  const healthChips: DemoTelemetryChip[] = health
    ? [
        {
          id: "auth-mode",
          label: `auth: ${health.auth_mode}`,
          icon: "shield",
          tone: "cyan",
        },
        {
          id: "fast-model",
          label: `FAST: ${health.fast_model}`,
          icon: "cpu",
          tone: "emerald",
        },
        {
          id: "complex-model",
          label: `COMPLEX: ${health.complex_model}`,
          icon: "cpu",
          tone: "sky",
        },
      ]
    : [];

  const pendingApprovalsCount = approvals.filter(
    (a) => a.status === "PENDING",
  ).length;
  const openDlqCount = dlqJobs.filter((j) => j.status === "OPEN").length;

  const tabs: DemoTabItem<TabId>[] = [
    {
      id: "sandbox",
      label: t.tabs.sandbox,
      icon: <Workflow className="h-4 w-4 shrink-0" aria-hidden="true" />,
    },
    {
      id: "approvals",
      label: t.tabs.approvals,
      icon: <ShieldAlert className="h-4 w-4 shrink-0" aria-hidden="true" />,
      badge: pendingApprovalsCount,
      badgeTone: "amber",
    },
    {
      id: "dlq",
      label: t.tabs.dlq,
      icon: <AlertOctagon className="h-4 w-4 shrink-0" aria-hidden="true" />,
      badge: openDlqCount,
      badgeTone: "rose",
    },
    {
      id: "benchmark",
      label: t.tabs.benchmark,
      icon: <BarChart3 className="h-4 w-4 shrink-0" aria-hidden="true" />,
    },
  ];

  return (
    <div className="demo-theme-scope min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <DemoTopBar
        projectSlug="production-ai-agent-ops"
        title={t.topBarTitle}
        repoUrl="https://github.com/ApecSinlapachai/production-ai-agent-ops"
        defaultQuestion={t.topBarDefaultQuestion}
      />

      <div className="mx-auto max-w-6xl space-y-5 px-4 py-6 sm:px-6">
        <header className="bg-engineering-grid relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
          <div className="flex items-start gap-3.5 sm:items-center">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-500/15">
              <Bot className="h-5 w-5 text-cyan-300" aria-hidden="true" />
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
          statusDetail={health && !isOk ? health.database : undefined}
          chips={healthChips}
          endpoint={API_PROXY_PREFIX}
          accent="cyan"
          loading={healthLoading}
          error={healthError}
          onRetry={() => void checkHealth(0)}
        />

        <DemoProjectExplainer explainer={t.explainer} accent="emerald" />

        <DemoTabBar
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          accent="cyan"
          ariaLabel={t.headerTitle}
        />

        <div role="tabpanel">
          {activeTab === "sandbox" && (
            <WorkflowSandbox
              recentRuns={runs}
              onRunCompleted={() => void loadOperationalData()}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === "approvals" && (
            <ApprovalsQueue
              approvals={approvals}
              loading={dataLoading}
              onRefresh={() => void loadOperationalData()}
            />
          )}

          {activeTab === "dlq" && (
            <DlqPanel
              jobs={dlqJobs}
              loading={dataLoading}
              onRefresh={() => void loadOperationalData()}
            />
          )}

          {activeTab === "benchmark" && (
            <BenchmarkScorecard
              report={benchmark}
              loading={dataLoading}
              error={benchmarkError}
              onRefresh={() => void loadBenchmark()}
            />
          )}
        </div>
      </div>
    </div>
  );
}
