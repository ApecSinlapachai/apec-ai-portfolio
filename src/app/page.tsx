import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Code2,
  Play,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import { getAllProjects, getProfile } from "@/lib/content/loader";

const HERO_METRICS = [
  { label: "Live Production AI Systems", value: "2 Flagships" },
  { label: "RAG Golden Eval (Live)", value: "25 / 25 (100%)" },
  { label: "Tiered LLM Cost Reduction", value: "62.78% Saved" },
  { label: "PDPA PII Leak Rate", value: "0.00 (32/32)" },
];

const QUICK_PROMPTS = [
  {
    label: "Compare Project #1 (RAG) vs Project #2 (Agent Ops)",
    scope: "all",
    q: "Compare Apec's Enterprise RAG Ops Copilot vs Production AI Agent Ops architecture and verified metrics.",
  },
  {
    label: "How does $0 anti-hallucination guardrail work?",
    scope: "enterprise-rag-ops-copilot",
    q: "How does Project #1 prevent hallucinations at $0 guardrail cost?",
  },
  {
    label: "How did he cut LLM cost by 62.78% with 0.00 PDPA leak?",
    scope: "production-ai-agent-ops",
    q: "How does Project #2 enforce 0.00 PDPA leak rate and 62.78% LLM cost reduction?",
  },
  {
    label: "Summarize NOC 21232 / AI Engineer readiness",
    scope: "profile",
    q: "Summarize Apec Sinlapachai's technical readiness for AI / AI Automation Engineer roles.",
  },
];

export default function HomePage() {
  const profile = getProfile();
  const projects = getAllProjects();
  const featured = projects.filter((p) => p.featured);
  const additional = projects.filter((p) => !p.featured);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Hero Section — Recruiter 15-Second Rule */}
      <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Available for AI / AI Automation Engineer Roles
          </span>
          <span className="rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1 text-xs text-[var(--muted)]">
            {profile.location}
          </span>
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
          {profile.name}
          <span className="mt-1 block bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-2xl text-transparent sm:text-4xl">
            {profile.role}
          </span>
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          {profile.headline}
        </p>

        {/* Primary CTAs */}
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
          >
            <Sparkles className="h-4 w-4" />
            Chat with AI Portfolio Copilot
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/demos/rag-copilot"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm font-medium text-[var(--foreground)] transition hover:border-sky-500/50"
          >
            <Play className="h-4 w-4 text-sky-400" />
            Try RAG Demo
          </Link>
          <Link
            href="/demos/agent-ops"
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm font-medium text-[var(--foreground)] transition hover:border-emerald-500/50"
          >
            <Play className="h-4 w-4 text-emerald-400" />
            Try Agent Ops Demo
          </Link>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] px-4 py-3 text-sm font-medium text-[var(--muted)] transition hover:border-sky-500/50 hover:text-[var(--foreground)]"
          >
            GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* Verified Proof Strip */}
        <div className="mt-8 grid grid-cols-2 gap-3 border-t border-[var(--border)] pt-6 sm:grid-cols-4">
          {HERO_METRICS.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-3.5"
            >
              <div className="text-lg font-bold text-sky-400 sm:text-xl">
                {item.value}
              </div>
              <div className="mt-0.5 text-xs text-[var(--muted)]">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Copilot Prompt Chips */}
      <section className="mt-8 rounded-2xl border border-sky-500/20 bg-sky-500/5 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--foreground)]">
            <Bot className="h-4 w-4 text-sky-400" />
            Ask AI Copilot instantly (Zero Cold-Start · TH / EN / Code-Mixed)
          </div>
          <Link
            href="/chat"
            className="text-xs font-medium text-sky-400 hover:underline"
          >
            Open full-screen /chat →
          </Link>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {QUICK_PROMPTS.map((item) => (
            <Link
              key={item.label}
              href={`/chat?scope=${encodeURIComponent(item.scope)}&q=${encodeURIComponent(item.q)}`}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-xs font-medium text-[var(--foreground)] transition hover:border-sky-500/60 hover:text-sky-400"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Flagship Production AI Projects */}
      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Flagship Production AI Systems
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Both live interactive demos run natively inside this hub via Same-Origin Next.js proxies, backed by independent GitHub repos &amp; CI.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
            <ShieldCheck className="h-4 w-4" />
            100% Synthetic PDPA-Safe Data · No Login Required
          </span>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {featured.map((project) => (
            <article
              key={project.slug}
              className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-sky-500/40"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-0.5 text-xs font-medium text-sky-400">
                    {project.shortTitle}
                  </span>
                  <span className="text-xs font-medium text-emerald-400">
                    ● Live Cloud Verified
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-bold tracking-tight">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="hover:text-sky-400"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {project.tagline}
                </p>

                {/* Verified Metrics Grid */}
                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  {project.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5"
                    >
                      <div className="text-sm font-bold text-[var(--foreground)]">
                        {m.value}
                      </div>
                      <div className="text-[11px] text-[var(--muted)]">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stack Pills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-[var(--border)] bg-[var(--background)] px-2 py-0.5 text-[11px] text-[var(--muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-[var(--border)] pt-4">
                {project.demoPath && (
                  <Link
                    href={project.demoPath}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-sky-500 px-3.5 py-2 text-xs font-semibold text-slate-950 transition hover:bg-sky-400"
                  >
                    <Play className="h-3.5 w-3.5" />
                    Launch Live Demo
                  </Link>
                )}
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3.5 py-2 text-xs font-medium text-[var(--foreground)] hover:border-sky-500/50"
                >
                  <Terminal className="h-3.5 w-3.5" />
                  Architecture
                </Link>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-medium text-[var(--muted)] hover:border-sky-500/50 hover:text-[var(--foreground)]"
                >
                  <Code2 className="h-3.5 w-3.5" />
                  GitHub
                </a>
                <Link
                  href={`/chat?scope=${encodeURIComponent(project.slug)}&q=${encodeURIComponent(project.starterPrompts[0])}`}
                  className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-sky-400 hover:underline"
                >
                  Ask AI about this project →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Additional Projects & Extensibility */}
      {additional.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold tracking-tight">
            Additional Production &amp; Deterministic Automation Systems
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {additional.map((project) => (
              <article
                key={project.slug}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-sky-400">
                    {project.category}
                  </span>
                  <div className="flex gap-2">
                    {project.metrics.slice(0, 2).map((m) => (
                      <span
                        key={m.label}
                        className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400"
                      >
                        {m.value}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="mt-2 text-lg font-bold">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="hover:text-sky-400"
                  >
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {project.tagline}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-medium text-sky-400 hover:underline"
                  >
                    Read Case Study →
                  </Link>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--muted)] hover:text-[var(--foreground)]"
                  >
                    GitHub ↗
                  </a>
                  <Link
                    href={`/chat?scope=${encodeURIComponent(project.slug)}&q=${encodeURIComponent(project.starterPrompts[0])}`}
                    className="ml-auto font-medium text-emerald-400 hover:underline"
                  >
                    Ask AI →
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
