"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Bot, Cpu, Layers, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { href: "/", label: "Overview" },
  { href: "/demos/rag-copilot", label: "RAG Demo" },
  { href: "/demos/agent-ops", label: "Agent Ops Demo" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-4 sm:h-16 sm:gap-4 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-2 rounded-lg font-semibold tracking-tight text-[var(--foreground)] transition-colors hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] sm:gap-2.5"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--accent)]">
            <Cpu className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="truncate text-sm font-semibold sm:text-base">
            Apec Sinlapachai
          </span>
          <span className="hidden rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 font-mono text-[11px] font-medium text-[var(--accent-emerald)] md:inline-flex">
            AI Engineer
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="flex shrink-0 items-center gap-1.5 sm:gap-2"
        >
          <div className="hidden items-center gap-1 sm:flex">
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] sm:px-3 sm:text-sm ${
                    active
                      ? "border border-[var(--border-strong)] bg-[var(--surface-elevated)] text-[var(--accent)]"
                      : "border border-transparent text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <Link
            href="/chat"
            className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:px-3 sm:text-sm ${
              pathname.startsWith("/chat")
                ? "bg-[var(--accent-hover)] text-[var(--accent-fg)]"
                : "bg-[var(--accent)] text-[var(--accent-fg)] hover:bg-[var(--accent-hover)]"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Ask AI</span>
          </Link>

          <a
            href="/llms.txt"
            target="_blank"
            rel="noreferrer"
            title="Machine-readable llms.txt for AI Agents"
            className="hidden items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 font-mono text-xs font-medium text-[var(--muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] lg:inline-flex"
          >
            <Layers className="h-3.5 w-3.5" aria-hidden="true" />
            <span>llms.txt</span>
          </a>

          {/* Utility cluster: ThemeToggle (+ headroom for future EN/TH toggle) */}
          <div className="flex shrink-0 items-center gap-1.5 border-l border-[var(--border)] pl-1.5 sm:pl-2">
            <ThemeToggle />
          </div>
        </nav>
      </div>

      {/* Mobile navigation strip (zero horizontal overflow on narrow viewports) */}
      <nav
        aria-label="Mobile navigation"
        className="flex items-center justify-around gap-1 border-t border-[var(--border)]/80 px-2 py-1.5 sm:hidden"
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
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                active
                  ? "bg-[var(--surface-elevated)] text-[var(--accent)]"
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
    <div className="border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          <Link
            href={`/projects/${projectSlug}`}
            className="font-semibold text-[var(--foreground)] transition-colors hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            {title}
          </Link>
          <span
            aria-hidden="true"
            className="text-[var(--border-strong)]"
          >
            /
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--background)] px-2 py-0.5 font-mono text-[11px] font-medium text-[var(--accent-emerald)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-emerald)]" aria-hidden="true" />
            Same-Origin Proxy
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <span>GitHub Repo</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <Link
            href={chatHref}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3 py-1.5 text-xs font-semibold text-[var(--accent)] transition-colors hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <Bot className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Ask AI about architecture</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
