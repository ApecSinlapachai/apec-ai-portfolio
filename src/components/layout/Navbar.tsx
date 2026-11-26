"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, Cpu, Layers, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { href: "/", label: "Overview" },
  { href: "/demos/rag-copilot", label: "RAG Demo" },
  { href: "/demos/agent-ops", label: "Agent Ops Demo" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-4 sm:h-16 sm:gap-4 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-2 font-semibold tracking-tight text-[var(--foreground)] sm:gap-2.5"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-sky-500/30 bg-sky-500/10 text-sky-400">
            <Cpu className="h-4 w-4" />
          </span>
          <span className="truncate text-sm sm:text-base">Apec Sinlapachai</span>
          <span className="hidden rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400 md:inline-flex">
            AI Engineer
          </span>
        </Link>

        <nav className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="hidden items-center gap-1 sm:flex sm:gap-2">
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-medium transition sm:px-3 sm:text-sm ${
                    active
                      ? "bg-sky-500/15 text-sky-400"
                      : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <Link
            href="/chat"
            className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-semibold transition sm:px-3 sm:text-sm ${
              pathname.startsWith("/chat")
                ? "bg-sky-400 text-slate-950"
                : "bg-sky-500 text-slate-950 hover:bg-sky-400"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Ask AI</span>
          </Link>

          <a
            href="/llms.txt"
            target="_blank"
            rel="noreferrer"
            title="Machine-readable llms.txt for AI Agents"
            className="hidden items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs font-medium text-[var(--muted)] transition hover:border-sky-500/50 hover:text-[var(--foreground)] lg:inline-flex"
          >
            <Layers className="h-3.5 w-3.5" />
            llms.txt
          </a>

          <ThemeToggle />
        </nav>
      </div>

      {/* Mobile navigation strip (zero horizontal overflow on narrow viewports) */}
      <nav
        aria-label="Mobile navigation"
        className="flex items-center justify-around gap-1 border-t border-[var(--border)]/70 px-2 py-1.5 sm:hidden"
      >
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                active
                  ? "bg-sky-500/15 text-sky-400"
                  : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

export function DemoTopBar({
  projectSlug,
  title,
  repoUrl,
  defaultQuestion,
}: {
  projectSlug: string;
  title: string;
  repoUrl: string;
  defaultQuestion: string;
}) {
  const chatHref = `/chat?scope=${encodeURIComponent(projectSlug)}&q=${encodeURIComponent(defaultQuestion)}`;

  return (
    <div className="border-b border-[var(--border)] bg-[var(--surface)]/90">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          <Link
            href={`/projects/${projectSlug}`}
            className="font-semibold text-[var(--foreground)] hover:text-sky-400"
          >
            {title}
          </Link>
          <span className="text-[var(--muted)]">•</span>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
            Same-Origin Proxy (0 CORS/AdBlock blocks)
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] hover:border-sky-500/50 hover:text-[var(--foreground)]"
          >
            View GitHub Repo
          </a>
          <Link
            href={chatHref}
            className="inline-flex items-center gap-1.5 rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-1.5 text-xs font-semibold text-sky-400 hover:bg-sky-500/20"
          >
            <Bot className="h-3.5 w-3.5" />
            Ask AI about this architecture →
          </Link>
        </div>
      </div>
    </div>
  );
}
