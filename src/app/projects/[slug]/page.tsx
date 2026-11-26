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
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--muted)] hover:text-sky-400"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Portfolio Overview
      </Link>

      <header className="mt-5 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-0.5 text-xs font-medium text-sky-400">
            {project.shortTitle}
          </span>
          <span className="rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-0.5 text-xs text-[var(--muted)]">
            {project.category}
          </span>
        </div>

        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-2 text-base text-[var(--muted)]">{project.tagline}</p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3"
            >
              <div className="text-base font-bold text-sky-400">{m.value}</div>
              <div className="text-xs text-[var(--muted)]">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          {project.demoPath && (
            <Link
              href={project.demoPath}
              className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
            >
              <Play className="h-4 w-4" />
              Launch Interactive Live Demo
            </Link>
          )}
          <Link
            href={`/chat?scope=${encodeURIComponent(project.slug)}&q=${encodeURIComponent(project.starterPrompts[0])}`}
            className="inline-flex items-center gap-2 rounded-xl border border-sky-500/40 bg-sky-500/10 px-4 py-2.5 text-sm font-semibold text-sky-400 hover:bg-sky-500/20"
          >
            <Bot className="h-4 w-4" />
            Ask AI about this project →
          </Link>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--muted)] hover:border-sky-500/50 hover:text-[var(--foreground)]"
          >
            GitHub Repository
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      <section className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
        <MarkdownArticle content={project.body} />
      </section>

      {/* Starter Prompts */}
      <section className="mt-6 rounded-2xl border border-sky-500/20 bg-sky-500/5 p-5">
        <h2 className="text-sm font-semibold text-[var(--foreground)]">
          Deep-Dive Questions for AI Copilot
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.starterPrompts.map((prompt) => (
            <Link
              key={prompt}
              href={`/chat?scope=${encodeURIComponent(project.slug)}&q=${encodeURIComponent(prompt)}`}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-xs font-medium text-[var(--foreground)] hover:border-sky-500/60 hover:text-sky-400"
            >
              {prompt}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
