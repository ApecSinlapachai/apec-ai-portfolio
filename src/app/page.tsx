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
import { getAllProjects, getProfile } from "@/lib/content/loader";

const HERO_METRICS = [
  {
    label: "Live Production AI Systems",
    value: "2 Flagships",
    detail: "Same-Origin Proxy",
  },
  {
    label: "RAG Golden Eval (Live)",
    value: "25 / 25",
    detail: "100% Pass Gate",
  },
  {
    label: "Tiered LLM Cost Reduction",
    value: "62.78%",
    detail: "Verified Savings",
  },
  {
    label: "PDPA PII Leak Rate",
    value: "0.00",
    detail: "32 / 32 Redacted",
  },
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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Editorial Hero + Telemetry Proof Matrix */}
      <section className="bg-engineering-grid relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
          {/* Left: Identity & Primary Actions */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--background)] px-2.5 py-1 text-xs font-medium text-[var(--accent-emerald)]">
                <span
                  className="h-2 w-2 rounded-full bg-[var(--accent-emerald)]"
                  aria-hidden="true"
                />
                Available for AI &amp; AI Automation Engineer Roles
              </span>
              <span className="rounded-md border border-[var(--border)] bg-[var(--background)] px-2.5 py-1 font-mono text-xs text-[var(--muted)]">
                {profile.location}
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
              {profile.name}
            </h1>
            <p className="mt-1.5 text-lg font-semibold tracking-tight text-[var(--accent)] sm:text-2xl">
              {profile.role}
            </p>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              {profile.headline}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2.5">
              <Link
                href="/chat"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--accent-fg)] transition-colors hover:bg-[var(--accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span>Chat with AI Copilot</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/demos/rag-copilot"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--background)] px-3.5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                <Play className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
                <span>RAG Demo</span>
              </Link>
              <Link
                href="/demos/agent-ops"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--background)] px-3.5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent-emerald)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                <Play
                  className="h-3.5 w-3.5 text-[var(--accent-emerald)]"
                  aria-hidden="true"
                />
                <span>Agent Ops Demo</span>
              </Link>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-elevated)]/60 px-3.5 py-2.5 text-sm font-medium text-[var(--muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                <span>GitHub</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right: Integrated Production Proof Matrix */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-lg border border-[var(--border-strong)] bg-[var(--background)]">
              <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-elevated)]/60 px-3.5 py-2">
                <span className="font-mono text-[11px] font-medium text-[var(--muted)]">
                  verified-telemetry.sot
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-medium text-[var(--accent-emerald)]">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>CI Verified</span>
                </span>
              </div>
              <div className="grid grid-cols-2 divide-x divide-y divide-[var(--border)]">
                {HERO_METRICS.map((item) => (
                  <div key={item.label} className="p-4">
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
            <Bot className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
            <span>Ask AI Copilot (Zero Cold-Start · TH / EN / Code-Mixed)</span>
          </div>
          <span className="font-mono text-[11px] text-[var(--muted)]">
            Select a prompt to pre-fill input
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {QUICK_PROMPTS.map((item) => (
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
              Flagship Production AI Systems
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Live interactive demos running natively inside this hub via Same-Origin Next.js proxies, backed by independent GitHub repos &amp; CI.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 font-mono text-[11px] text-[var(--accent-emerald)]">
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            <span>100% Synthetic PDPA-Safe · No Login</span>
          </span>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {featured.map((project) => (
            <article
              key={project.slug}
              className="flex flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--border-strong)]"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md border border-[var(--border)] bg-[var(--background)] px-2.5 py-0.5 font-mono text-xs font-medium text-[var(--accent)]">
                    {project.shortTitle}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[var(--accent-emerald)]">
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-[var(--accent-emerald)]"
                      aria-hidden="true"
                    />
                    Live Cloud Verified
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
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {project.tagline}
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
                    <span>Launch Live Demo</span>
                  </Link>
                )}
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--background)] px-3.5 py-2 text-xs font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Architecture</span>
                </Link>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] px-3 py-2 text-xs font-medium text-[var(--muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>GitHub</span>
                </a>
                <Link
                  href={`/chat?scope=${encodeURIComponent(project.slug)}&q=${encodeURIComponent(project.starterPrompts[0])}`}
                  className="ml-auto inline-flex items-center gap-1 rounded px-1 py-0.5 text-xs font-semibold text-[var(--accent)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                >
                  <span>Pre-fill AI question</span>
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
              Additional Production &amp; Deterministic Automation Systems
            </h2>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {additional.map((project) => (
              <article
                key={project.slug}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--border-strong)]"
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
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">
                  {project.tagline}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-3 text-xs">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-semibold text-[var(--accent)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    Read Case Study
                  </Link>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--muted)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </a>
                  <Link
                    href={`/chat?scope=${encodeURIComponent(project.slug)}&q=${encodeURIComponent(project.starterPrompts[0])}`}
                    className="ml-auto font-semibold text-[var(--accent-emerald)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    Ask AI
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
