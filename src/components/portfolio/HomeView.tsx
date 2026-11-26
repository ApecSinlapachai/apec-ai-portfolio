"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Code2,
  Play,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import type { ProfileDoc, ProjectDoc } from "@/lib/content/schema";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

interface HomeViewProps {
  profile: ProfileDoc;
  projects: ProjectDoc[];
}

export default function HomeView({ profile, projects }: HomeViewProps) {
  const { lang } = useLanguage();
  const t = translations[lang].home;

  const featured = projects.filter((p) => p.featured);
  const additional = projects.filter((p) => !p.featured);

  const headline =
    lang === "th" && profile.headlineTh ? profile.headlineTh : profile.headline;
  const location =
    lang === "th" && profile.locationTh ? profile.locationTh : profile.location;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Editorial Hero + Telemetry Proof Matrix */}
      <section className="bg-engineering-grid relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
          {/* Left: Identity & Primary Actions */}
          <div className="min-w-0 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--background)] px-2.5 py-1 text-xs font-medium text-[var(--accent-emerald)]">
                <span
                  className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent-emerald)]"
                  aria-hidden="true"
                />
                <span>{t.availabilityBadge}</span>
              </span>
              <span className="rounded-md border border-[var(--border)] bg-[var(--background)] px-2.5 py-1 font-mono text-xs text-[var(--muted)]">
                {location}
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
              {profile.name}
            </h1>
            <p className="mt-1.5 text-lg font-semibold tracking-tight text-[var(--accent)] sm:text-2xl">
              {profile.role}
            </p>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              {headline}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--accent-fg)] transition-colors hover:bg-[var(--accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span>{t.chatCta}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/demos/rag-copilot"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--background)] px-3.5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                <Play className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
                <span>{t.ragDemoCta}</span>
              </Link>
              <Link
                href="/demos/agent-ops"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--background)] px-3.5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent-emerald)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                <Play
                  className="h-3.5 w-3.5 text-[var(--accent-emerald)]"
                  aria-hidden="true"
                />
                <span>{t.agentOpsDemoCta}</span>
              </Link>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/60 px-3.5 py-2.5 text-sm font-medium text-[var(--muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                <span>{t.githubCta}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right: Integrated Production Proof Matrix */}
          <div className="min-w-0 lg:col-span-5">
            <div className="overflow-hidden rounded-lg border border-[var(--border-strong)] bg-[var(--background)]">
              <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-elevated)]/60 px-3.5 py-2">
                <span className="font-mono text-[11px] font-medium text-[var(--muted)]">
                  {t.telemetryHeader}
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium text-[var(--accent-emerald)]">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t.ciVerified}</span>
                </span>
              </div>
              <div className="grid grid-cols-2 divide-x divide-y divide-[var(--border)]">
                {t.heroMetrics.map((item) => (
                  <div key={item.label} className="min-w-0 p-4">
                    <div className="font-mono text-xl font-semibold tracking-tight text-[var(--foreground)] tabular-nums sm:text-2xl">
                      {item.value}
                    </div>
                    <div className="mt-1 text-xs font-medium text-[var(--muted)]">
                      {item.label}
                    </div>
                    <div className="mt-1.5 font-mono text-[11px] text-[var(--accent)]">
                      {item.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Copilot Prompt Bar (Pre-fills input without auto-submitting) */}
      <section className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
            <Bot className="h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
            <span>{t.copilotBarTitle}</span>
          </div>
          <span className="font-mono text-[11px] text-[var(--muted)]">
            {t.copilotBarHint}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {t.quickPrompts.map((item) => (
            <Link
              key={item.label}
              href={`/chat?scope=${encodeURIComponent(item.scope)}&q=${encodeURIComponent(item.q)}`}
              className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Flagship Production AI Systems */}
      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--border)] pb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
              {t.flagshipTitle}
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {t.flagshipSubtitle}
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 font-mono text-[11px] text-[var(--accent-emerald)]">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.flagshipBadge}</span>
          </span>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {featured.map((project) => (
            <article
              key={project.slug}
              className="flex min-w-0 flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--border-strong)]"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-md border border-[var(--border)] bg-[var(--background)] px-2.5 py-0.5 font-mono text-xs font-medium text-[var(--accent)]">
                    {project.shortTitle}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[var(--accent-emerald)]">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-[var(--accent-emerald)]"
                      aria-hidden="true"
                    />
                    {t.liveCloudVerified}
                  </span>
                </div>

                <h3 className="mt-3.5 text-xl font-bold tracking-tight text-[var(--foreground)]">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="rounded transition-colors hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[var(--foreground)]/90">
                  {project.summary[lang]}
                </p>

                {/* Verified Metrics Matrix */}
                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5"
                    >
                      <div className="font-mono text-sm font-semibold text-[var(--foreground)] tabular-nums">
                        {m.value}
                      </div>
                      <div className="mt-0.5 text-[11px] text-[var(--muted)]">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stack Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-[var(--border)] bg-[var(--surface-elevated)]/60 px-2 py-0.5 font-mono text-[11px] text-[var(--muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-[var(--border)] pt-4">
                {project.demoPath && (
                  <Link
                    href={project.demoPath}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--accent)] px-3.5 py-2 text-xs font-semibold text-[var(--accent-fg)] transition-colors hover:bg-[var(--accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    <Play className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{t.launchLiveDemo}</span>
                  </Link>
                )}
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--background)] px-3.5 py-2 text-xs font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t.architecture}</span>
                </Link>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-medium text-[var(--muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{t.github}</span>
                </a>
                <Link
                  href={`/chat?scope=${encodeURIComponent(project.slug)}&q=${encodeURIComponent(project.starterPrompts[0])}`}
                  className="ml-auto inline-flex items-center gap-1 rounded px-1 py-0.5 text-xs font-semibold text-[var(--accent)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  <span>{t.prefillAiQuestion}</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Additional Projects & Extensibility */}
      {additional.length > 0 && (
        <section className="mt-12">
          <div className="border-b border-[var(--border)] pb-3">
            <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
              {t.additionalTitle}
            </h2>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {additional.map((project) => (
              <article
                key={project.slug}
                className="min-w-0 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--border-strong)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs font-medium text-[var(--accent)]">
                    {project.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.metrics.slice(0, 2).map((m) => (
                      <span
                        key={m.label}
                        className="rounded-md border border-[var(--border)] bg-[var(--background)] px-2 py-0.5 font-mono text-[11px] font-medium text-[var(--accent-emerald)] tabular-nums"
                      >
                        {m.value}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="mt-2.5 text-lg font-bold text-[var(--foreground)]">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="rounded transition-colors hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]/90">
                  {project.summary[lang]}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-3 text-xs">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-semibold text-[var(--accent)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    {t.readCaseStudy}
                  </Link>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--muted)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    <span>{t.github}</span>
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </a>
                  <Link
                    href={`/chat?scope=${encodeURIComponent(project.slug)}&q=${encodeURIComponent(project.starterPrompts[0])}`}
                    className="ml-auto font-semibold text-[var(--accent-emerald)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    {t.askAi}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
