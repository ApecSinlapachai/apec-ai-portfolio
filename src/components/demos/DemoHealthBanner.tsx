"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  Activity,
  CircleHelp,
  Cpu,
  Database,
  RefreshCw,
  ShieldCheck,
  Tag,
  WifiOff,
} from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

export type DemoHealthStatus =
  | "checking"
  | "warming"
  | "ready"
  | "degraded"
  | "offline";

export interface DemoTelemetryChip {
  id: string;
  label: string;
  icon: "shield" | "cpu" | "database" | "tag";
  tone?: "indigo" | "sky" | "cyan" | "emerald" | "neutral";
}

interface DemoHealthBannerProps {
  status: DemoHealthStatus;
  statusDetail?: string;
  chips?: DemoTelemetryChip[];
  endpoint: string;
  accent: "indigo" | "cyan";
  loading: boolean;
  error?: string | null;
  onRetry: () => void;
}

const ACCENT_STYLES = {
  indigo: {
    ring: "focus-visible:ring-indigo-400",
    hoverBorder: "hover:border-indigo-500/50",
    helpActive: "border-indigo-500/60 bg-indigo-500/10 text-indigo-300",
    endpointText: "text-indigo-300",
  },
  cyan: {
    ring: "focus-visible:ring-cyan-400",
    hoverBorder: "hover:border-cyan-500/50",
    helpActive: "border-cyan-500/60 bg-cyan-500/10 text-cyan-300",
    endpointText: "text-cyan-300",
  },
} as const;

const CHIP_ICON_TONE = {
  indigo: "text-indigo-400",
  sky: "text-sky-400",
  cyan: "text-cyan-400",
  emerald: "text-emerald-400",
  neutral: "text-[var(--muted)]",
} as const;

function ChipIcon({
  icon,
  tone = "neutral",
}: {
  icon: DemoTelemetryChip["icon"];
  tone?: DemoTelemetryChip["tone"];
}) {
  const colorClass = CHIP_ICON_TONE[tone];
  switch (icon) {
    case "shield":
      return <ShieldCheck className={`h-3.5 w-3.5 shrink-0 ${colorClass}`} aria-hidden="true" />;
    case "cpu":
      return <Cpu className={`h-3.5 w-3.5 shrink-0 ${colorClass}`} aria-hidden="true" />;
    case "database":
      return <Database className={`h-3.5 w-3.5 shrink-0 ${colorClass}`} aria-hidden="true" />;
    case "tag":
      return <Tag className={`h-3.5 w-3.5 shrink-0 ${colorClass}`} aria-hidden="true" />;
  }
}

export function DemoHealthBanner({
  status,
  statusDetail,
  chips = [],
  endpoint,
  accent,
  loading,
  error,
  onRetry,
}: DemoHealthBannerProps) {
  const { lang } = useLanguage();
  const t = translations[lang].demoHealth;
  const accentStyle = ACCENT_STYLES[accent];

  const [pinnedOpen, setPinnedOpen] = useState(false);
  const [hoverOpen, setHoverOpen] = useState(false);
  const [focusOpen, setFocusOpen] = useState(false);
  const popoverOpen = pinnedOpen || hoverOpen || focusOpen;

  const popoverId = useId();
  const controlsRef = useRef<HTMLDivElement | null>(null);

  const closePopover = () => {
    setPinnedOpen(false);
    setHoverOpen(false);
    setFocusOpen(false);
  };

  useEffect(() => {
    if (!popoverOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (
        controlsRef.current &&
        event.target instanceof Node &&
        !controlsRef.current.contains(event.target)
      ) {
        closePopover();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closePopover();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [popoverOpen]);

  const isBusy = status === "checking" || status === "warming";
  const isOk = status === "ready";

  const statusBadgeText =
    status === "warming"
      ? t.wakingContainer
      : status === "checking"
        ? t.checkingHealth
        : status === "ready"
          ? t.onlinePg16
          : status === "degraded"
            ? `${t.degradedLabel}${statusDetail ? ` (${statusDetail})` : ""}`
            : t.offlineUnreachable;

  return (
    <section
      aria-label={t.apiStatusLabel}
      className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
    >
      <div className="relative flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {isBusy ? (
              <RefreshCw
                className="h-4 w-4 shrink-0 animate-spin text-amber-400"
                aria-hidden="true"
              />
            ) : isOk ? (
              <Activity
                className="h-4 w-4 shrink-0 text-emerald-400"
                aria-hidden="true"
              />
            ) : (
              <WifiOff
                className="h-4 w-4 shrink-0 text-rose-400"
                aria-hidden="true"
              />
            )}

            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              {t.apiStatusLabel}
            </span>

            {isBusy ? (
              <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-amber-300 tabular-nums">
                {statusBadgeText}
              </span>
            ) : isOk ? (
              <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-emerald-300 tabular-nums">
                {statusBadgeText}
              </span>
            ) : (
              <span className="rounded-full border border-rose-500/40 bg-rose-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-rose-300 tabular-nums">
                {statusBadgeText}
              </span>
            )}
          </div>

          {chips.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              {chips.map((chip) => (
                <span
                  key={chip.id}
                  className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--background)] px-2 py-0.5 font-mono text-[11px] text-[var(--foreground)]/90 tabular-nums"
                >
                  <ChipIcon icon={chip.icon} tone={chip.tone} />
                  <span>{chip.label}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Ping + Accessible Same-Origin Proxy Info Popover */}
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={onRetry}
            disabled={loading}
            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--background)] px-2.5 py-1 text-xs font-medium text-[var(--foreground)] transition-colors ${accentStyle.hoverBorder} hover:bg-[var(--surface-elevated)] focus-visible:outline-none focus-visible:ring-2 ${accentStyle.ring} disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
              aria-hidden="true"
            />
            <span>{t.pingHealth}</span>
          </button>

          <div
            ref={controlsRef}
            onMouseEnter={() => setHoverOpen(true)}
            onMouseLeave={() => setHoverOpen(false)}
            onBlur={(event) => {
              if (
                !event.currentTarget.contains(
                  event.relatedTarget as Node | null,
                )
              ) {
                setFocusOpen(false);
                setPinnedOpen(false);
              }
            }}
            className="sm:relative"
          >
            <button
              type="button"
              aria-label={t.endpointInfoAria}
              aria-expanded={popoverOpen}
              aria-controls={popoverId}
              onFocus={() => setFocusOpen(true)}
              onClick={() => {
                if (pinnedOpen) {
                  closePopover();
                } else {
                  setPinnedOpen(true);
                }
              }}
              className={`inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 ${accentStyle.ring} ${
                popoverOpen
                  ? accentStyle.helpActive
                  : `border-[var(--border-strong)] bg-[var(--background)] text-[var(--muted)] ${accentStyle.hoverBorder} hover:text-[var(--foreground)]`
              }`}
            >
              <CircleHelp className="h-3.5 w-3.5" aria-hidden="true" />
            </button>

            {popoverOpen && (
              <div
                id={popoverId}
                role="region"
                aria-label={t.endpointPopoverTitle}
                className="absolute left-0 right-0 top-full z-30 pt-2 sm:left-auto sm:right-0 sm:w-80"
              >
                <div className="rounded-xl border border-[var(--border-strong)] bg-[var(--surface-elevated)] p-3 text-left shadow-lg">
                  <div className="text-xs font-semibold text-[var(--foreground)]">
                    {t.endpointPopoverTitle}
                  </div>
                  <div className="mt-1.5 rounded-md border border-[var(--border)] bg-[var(--background)] px-2.5 py-1.5 font-mono text-xs tabular-nums">
                    <span className="text-[var(--muted)]">{t.endpointLabel}: </span>
                    <span className={accentStyle.endpointText}>{endpoint}</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">
                    {t.endpointPopoverDesc}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-2 text-xs leading-relaxed text-amber-300">
          {error} {t.coldStartHint}
        </p>
      )}
    </section>
  );
}
