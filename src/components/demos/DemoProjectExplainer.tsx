"use client";

import { useId, useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import type { DemoExplainerTranslation } from "@/lib/i18n/translations";

interface DemoProjectExplainerProps {
  explainer: DemoExplainerTranslation;
  accent?: "indigo" | "emerald";
}

const ACCENT_TOKENS = {
  indigo: {
    text: "text-[var(--accent)]",
    ring: "focus-visible:ring-[var(--accent)]",
    hoverBorder: "hover:border-[var(--accent)]",
    leftBorder: "border-l-[var(--accent)]",
  },
  emerald: {
    text: "text-[var(--accent-emerald)]",
    ring: "focus-visible:ring-[var(--accent-emerald)]",
    hoverBorder: "hover:border-[var(--accent-emerald)]",
    leftBorder: "border-l-[var(--accent-emerald)]",
  },
} as const;

export function DemoProjectExplainer({
  explainer,
  accent = "indigo",
}: DemoProjectExplainerProps) {
  const [open, setOpen] = useState(true);
  const panelId = useId();
  const accentStyle = ACCENT_TOKENS[accent];

  const pillars = [
    {
      key: "who",
      title: explainer.whoTitle,
      body: explainer.whoBody,
      Icon: Users,
    },
    {
      key: "problem",
      title: explainer.problemTitle,
      body: explainer.problemBody,
      Icon: AlertTriangle,
    },
    {
      key: "solution",
      title: explainer.solutionTitle,
      body: explainer.solutionBody,
      Icon: ShieldCheck,
    },
  ] as const;

  return (
    <section
      aria-label={explainer.badge}
      className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <span
          className={`inline-flex items-center gap-1.5 rounded-md border border-[var(--border-strong)] bg-[var(--background)] px-2.5 py-1 text-xs font-semibold ${accentStyle.text}`}
        >
          <BookOpen className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{explainer.badge}</span>
        </span>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((prev) => !prev)}
          className={`inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--background)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] transition-colors ${accentStyle.hoverBorder} focus-visible:outline-none focus-visible:ring-2 ${accentStyle.ring}`}
        >
          <span>{open ? explainer.hideLabel : explainer.showLabel}</span>
          {open ? (
            <ChevronUp className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          )}
        </button>
      </div>

      <h2 className="mt-2.5 text-sm font-semibold leading-snug text-[var(--foreground)] sm:text-base">
        {explainer.title}
      </h2>

      {open && (
        <div id={panelId} className="mt-4 space-y-3">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {pillars.map(({ key, title, body, Icon }) => (
              <div
                key={key}
                className="min-w-0 rounded-lg border border-[var(--border)] bg-[var(--background)] p-3.5 sm:p-4"
              >
                <div className="flex items-center gap-2">
                  <Icon
                    className={`h-4 w-4 shrink-0 ${accentStyle.text}`}
                    aria-hidden="true"
                  />
                  <h3 className="text-xs font-semibold text-[var(--foreground)] sm:text-sm">
                    {title}
                  </h3>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)] sm:text-[13px]">
                  {body}
                </p>
              </div>
            ))}
          </div>

          <div
            className={`flex items-start gap-2.5 rounded-lg border border-[var(--border)] border-l-2 ${accentStyle.leftBorder} bg-[var(--background)] px-3.5 py-2.5`}
          >
            <Sparkles
              className={`mt-0.5 h-4 w-4 shrink-0 ${accentStyle.text}`}
              aria-hidden="true"
            />
            <p className="min-w-0 text-xs leading-relaxed text-[var(--foreground)] sm:text-[13px]">
              {explainer.tryGuide}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
