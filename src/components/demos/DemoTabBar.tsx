"use client";

import type { ReactNode } from "react";

export interface DemoTabItem<T extends string = string> {
  id: T;
  label: string;
  icon: ReactNode;
  badge?: number;
  badgeTone?: "amber" | "rose" | "indigo" | "cyan";
}

interface DemoTabBarProps<T extends string = string> {
  tabs: DemoTabItem<T>[];
  activeTab: T;
  onChange: (tabId: T) => void;
  accent: "indigo" | "cyan";
  ariaLabel?: string;
}

const ACCENT_CLASSES = {
  indigo: {
    active: "border-indigo-500 text-indigo-300",
    ring: "focus-visible:ring-indigo-400",
  },
  cyan: {
    active: "border-cyan-500 text-cyan-300",
    ring: "focus-visible:ring-cyan-400",
  },
} as const;

const BADGE_TONE_CLASSES = {
  amber: "border-amber-500/40 bg-amber-500/15 text-amber-300",
  rose: "border-rose-500/40 bg-rose-500/15 text-rose-300",
  indigo: "border-indigo-500/40 bg-indigo-500/15 text-indigo-300",
  cyan: "border-cyan-500/40 bg-cyan-500/15 text-cyan-300",
} as const;

export function DemoTabBar<T extends string = string>({
  tabs,
  activeTab,
  onChange,
  accent,
  ariaLabel,
}: DemoTabBarProps<T>) {
  const accentStyle = ACCENT_CLASSES[accent];

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="flex gap-1 overflow-x-auto border-b border-[var(--border)]"
    >
      {tabs.map((tab) => {
        const active = tab.id === activeTab;
        const badgeClass = BADGE_TONE_CLASSES[tab.badgeTone ?? accent];

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={`inline-flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap border-b-2 px-4 py-2.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset ${accentStyle.ring} sm:text-sm ${
              active
                ? accentStyle.active
                : "border-transparent text-[var(--muted)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {typeof tab.badge === "number" && tab.badge > 0 && (
              <span
                className={`rounded-full border px-1.5 py-0.5 font-mono text-[10px] leading-none tabular-nums ${badgeClass}`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
