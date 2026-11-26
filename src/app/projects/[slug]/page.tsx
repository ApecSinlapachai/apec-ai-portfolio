import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Bot, Play } from "lucide-react";
import { getAllProjects, getProjectBySlug } from "@/lib/content/loader";
import MarkdownArticle from "@/components/portfolio/MarkdownArticle";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Apec Sinlapachai`,
    description: project.tagline,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 rounded px-1 py-0.5 text-xs font-medium text-[var(--muted)] transition-colors hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Back to Portfolio Overview</span>
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
              <span>Launch Live Demo</span>
            </Link>
          )}
          <Link
            href={`/chat?scope=${encodeURIComponent(project.slug)}&q=${encodeURIComponent(project.starterPrompts[0])}`}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)] px-4 py-2.5 text-sm font-semibold text-[var(--accent)] transition-colors hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <Bot className="h-4 w-4" aria-hidden="true" />
            <span>Pre-fill AI Question</span>
          </Link>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm font-medium text-[var(--muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <span>GitHub Repository</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </header>

      <section className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
        <MarkdownArticle content={project.body} />
      </section>

      {/* Starter Prompts (Pre-fills AI Copilot input) */}
      <section className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-[var(--foreground)]">
            Deep-Dive Questions for AI Copilot
          </h2>
          <span className="font-mono text-[11px] text-[var(--muted)]">
            Opens /chat with input pre-filled
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
