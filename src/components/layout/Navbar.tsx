"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Bot, Layers, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";

function BrandMapleMark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="h-8 w-8 shrink-0"
    >
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="7.5"
        fill="#0f172a"
        stroke="#334155"
      />
      <path
        d="M16 4.5L17.9 8.6L20.1 7.6L18.7 13.3L22.5 10.3L22.2 12.4L26.4 12.2L24.3 14.9L25.4 16.8L20.4 18.6L21.1 20.8L16.7 20.1L17 27H15L15.3 20.1L10.9 20.8L11.6 18.6L6.6 16.8L7.7 14.9L5.6 12.2L9.8 12.4L9.5 10.3L13.3 13.3L11.9 7.6L14.1 8.6L16 4.5Z"
        fill="#ef4444"
        stroke="#dc2626"
        strokeWidth="0.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const t = translations[lang];

  const navItems = [
    { href: "/", label: t.nav.overview },
    { href: "/demos/rag-copilot", label: t.nav.ragDemo },
    { href: "/demos/agent-ops", label: t.nav.agentOpsDemo },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-3 sm:h-16 sm:gap-4 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 rounded-lg font-semibold tracking-tight text-[var(--foreground)] transition-colors hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] sm:gap-2.5"
        >
          <BrandMapleMark />
          <span className="truncate text-[13px] font-semibold sm:text-base">
            {t.nav.brandName}
          </span>
          <span className="hidden shrink-0 rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 font-mono text-[11px] font-medium text-[var(--accent-emerald)] md:inline-flex">
            {t.nav.roleBadge}
          </span>
        </Link>

        <nav
          aria-label={t.nav.primaryNavAria}
          className="flex shrink-0 items-center gap-1.5 sm:gap-2"
        >
          <div className="hidden items-center gap-1 sm:flex">
            {navItems.map((item) => {
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
            className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-lg px-2 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] sm:gap-1.5 sm:px-3 sm:text-sm ${
              pathname.startsWith("/chat")
                ? "bg-[var(--accent-hover)] text-[var(--accent-fg)]"
                : "bg-[var(--accent)] text-[var(--accent-fg)] hover:bg-[var(--accent-hover)]"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.nav.askAi}</span>
          </Link>

          <a
            href="/llms.txt"
            target="_blank"
            rel="noreferrer"
            title={t.nav.llmsTitle}
            className="hidden items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 font-mono text-xs font-medium text-[var(--muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] lg:inline-flex"
          >
            <Layers className="h-3.5 w-3.5" aria-hidden="true" />
            <span>llms.txt</span>
          </a>

          {/* Utility cluster: LanguageToggle + ThemeToggle */}
          <div className="flex shrink-0 items-center gap-1 border-l border-[var(--border)] pl-1.5 sm:gap-1.5 sm:pl-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </nav>
      </div>

      {/* Mobile navigation strip (zero horizontal overflow on narrow viewports) */}
      <nav
        aria-label={t.nav.mobileNavAria}
        className="flex items-center justify-around gap-1 border-t border-[var(--border)]/80 px-2 py-1.5 sm:hidden"
      >
        {navItems.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
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
  const { lang } = useLanguage();
  const t = translations[lang].demoTopBar;
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
          <span aria-hidden="true" className="text-[var(--border-strong)]">
            /
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--background)] px-2 py-0.5 font-mono text-[11px] font-medium text-[var(--accent-emerald)]">
            <span
              className="h-1.5 w-1.5 rounded-full bg-[var(--accent-emerald)]"
              aria-hidden="true"
            />
            {t.sameOriginProxy}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <span>{t.githubRepo}</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <Link
            href={chatHref}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-3 py-1.5 text-xs font-semibold text-[var(--accent)] transition-colors hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <Bot className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.askAiArchitecture}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
