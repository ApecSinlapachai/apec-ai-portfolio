"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Bot, Play } from "lucide-react";
import type { ProjectDoc } from "@/lib/content/schema";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";
import MarkdownArticle from "@/components/portfolio/MarkdownArticle";

interface ProjectDetailViewProps {
  project: ProjectDoc;
}

export default function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const { lang } = useLanguage();
  const t = translations[lang].projectDetail;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 rounded px-1 py-0.5 text-xs font-medium text-[var(--muted)] transition-colors hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        <span>{t.backToOverview}</span>
      </Link>

      <header className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md border border-[var(--border)] bg-[var(--background)] px-2.5 py-0.5 font-mono text-xs font-medium text-[var(--accent)]">
            {project.shortTitle}
          </span>
          <span className="rounded-md border border-[var(--border)] bg-[var(--surface-elevated)]/60 px-2.5 py-0.5 text-xs text-[var(--muted)]">
            {project.category}
          </span>
        </div>

        <h1 className="mt-3.5 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
          {project.tagline}
        </p>

        {/* Problem-First Executive Summary */}
        <div className="mt-5 rounded-lg border border-[var(--border-strong)] border-l-4 border-l-[var(--accent)] bg-[var(--background)] p-4">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {t.problemSummaryLabel}
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-[var(--foreground)] sm:text-[15px]">
            {project.summary[lang]}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-3"
            >
              <div className="font-mono text-base font-semibold text-[var(--accent)] tabular-nums">
                {m.value}
              </div>
              <div className="mt-0.5 text-xs text-[var(--muted)]">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-[var(--border)] pt-5">
          {project.demoPath && (
            <Link
              href={project.demoPath}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--accent-fg)] transition-colors hover:bg-[var(--accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              <Play className="h-4 w-4" aria-hidden="true" />
              <span>{t.launchLiveDemo}</span>
            </Link>
          )}
          <Link
            href={`/chat?scope=${encodeURIComponent(project.slug)}&q=${encodeURIComponent(project.starterPrompts[0])}`}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-4 py-2.5 text-sm font-semibold text-[var(--accent)] transition-colors hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <Bot className="h-4 w-4" aria-hidden="true" />
            <span>{t.prefillAiQuestion}</span>
          </Link>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm font-medium text-[var(--muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <span>{t.githubRepo}</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </header>

      <section className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
        <MarkdownArticle content={project.body} />
      </section>

      {/* Starter Prompts (Pre-fills AI Copilot input without auto-submitting) */}
      <section className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-[var(--foreground)]">
            {t.deepDiveTitle}
          </h2>
          <span className="font-mono text-[11px] text-[var(--muted)]">
            {t.deepDiveHint}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.starterPrompts.map((prompt) => (
            <Link
              key={prompt}
              href={`/chat?scope=${encodeURIComponent(project.slug)}&q=${encodeURIComponent(prompt)}`}
              className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3.5 py-2 text-xs font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              {prompt}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
