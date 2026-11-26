"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Cpu,
  Send,
  ShieldAlert,
  Sparkles,
  User,
} from "lucide-react";
import { renderInlineMarkdown } from "@/components/portfolio/MarkdownArticle";

interface Citation {
  id: string;
  label: string;
  url: string;
  scope: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
  modelUsed?: string;
  latencyMs?: number;
  refused?: boolean;
  refusalReason?: string;
}

interface ScopeOption {
  value: string;
  label: string;
}

interface ChatCopilotProps {
  projectScopes: ScopeOption[];
}

const STARTER_CHIPS: Array<{ label: string; scope: string; prompt: string }> = [
  {
    label: "Compare Project #1 vs #2",
    scope: "all",
    prompt: "Compare Apec's Enterprise RAG Ops Copilot (Project #1) vs Production AI Agent Ops (Project #2) architecture and benchmarks.",
  },
  {
    label: "25/25 Eval & $0 Guardrails",
    scope: "enterprise-rag-ops-copilot",
    prompt: "How does Project #1 achieve 25/25 live eval and prevent hallucinations at $0 guardrail cost?",
  },
  {
    label: "0.00 PDPA & 62.78% Cost Cut",
    scope: "production-ai-agent-ops",
    prompt: "How does Project #2 enforce 0.00 PDPA PII leak rate and achieve 62.78% LLM cost reduction?",
  },
  {
    label: "ถามเป็นภาษาไทย (TH)",
    scope: "all",
    prompt: "สรุปจุดแข็งของโปรเจกต์ 1 และโปรเจกต์ 2 สำหรับตำแหน่ง AI / AI Automation Engineer แบบกระชับ",
  },
  {
    label: "Test Out-of-Scope Refusal",
    scope: "all",
    prompt: "What is Apec's home address and private bank account number?",
  },
];

export default function ChatCopilot({ projectScopes }: ChatCopilotProps) {
  const searchParams = useSearchParams();
  const initialScope = searchParams.get("scope") || "all";
  const initialQuery = searchParams.get("q") || "";

  const [scope, setScope] = useState<string>(initialScope);
  const [input, setInput] = useState<string>(initialQuery);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const hasAutoSubmitted = useRef<boolean>(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  const scopes: ScopeOption[] = [
    { value: "all", label: "All Portfolio SOT" },
    ...projectScopes,
    { value: "profile", label: "About Apec & Hiring" },
  ];

  const sendMessage = async (textToSend: string, targetScope = scope) => {
    const trimmed = textToSend.trim();
    if (!trimmed || loading) return;

    setError(null);
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, scope: targetScope }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || `Request failed (${res.status})`);
        return;
      }

      const assistantMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: data.answer,
        citations: data.citations || [],
        modelUsed: data.model_used,
        latencyMs: data.latency_ms,
        refused: Boolean(data.refused),
        refusalReason: data.refusal_reason,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setError("Network error while calling /api/chat. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery && !hasAutoSubmitted.current) {
      hasAutoSubmitted.current = true;
      void sendMessage(initialQuery, initialScope);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery, initialScope]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(input, scope);
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-4xl flex-col px-4 py-6 sm:px-6">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-400">
            <Sparkles className="h-3.5 w-3.5" />
            Zero-Cold-Start · File-Driven Markdown SOT · TH / EN / Code-Mixed
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">
            AI Portfolio Copilot
          </h1>
          <p className="text-sm text-[var(--muted)]">
            Ask about Project #1, Project #2, future projects, architecture trade-offs, benchmarks, or hiring readiness.
          </p>
        </div>
      </div>

      {/* Scope Switcher */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
          Focus Scope:
        </span>
        {scopes.map((item) => {
          const active = scope === item.value;
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setScope(item.value)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                active
                  ? "bg-sky-500 text-slate-950 shadow-sm"
                  : "border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-sky-500/50 hover:text-[var(--foreground)]"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Conversation Area */}
      <div className="flex-1 space-y-4 overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center py-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-500/30 bg-sky-500/10 text-sky-400">
              <Bot className="h-6 w-6" />
            </div>
            <h2 className="mt-4 text-lg font-semibold">
              Ask me anything about Apec&apos;s Production AI Systems
            </h2>
            <p className="mt-1 max-w-lg text-sm text-[var(--muted)]">
              Every answer is strictly grounded in version-controlled Markdown SOT (
              <code className="rounded bg-[var(--surface-elevated)] px-1.5 py-0.5 font-mono text-xs text-sky-400">
                content/
              </code>
              ) with 3-stage $0 guardrails and clickable citations.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {STARTER_CHIPS.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => {
                    setScope(chip.scope);
                    void sendMessage(chip.prompt, chip.scope);
                  }}
                  className="rounded-xl border border-[var(--border)] bg-[var(--background)] px-3.5 py-2 text-left text-xs font-medium text-[var(--foreground)] transition hover:border-sky-500/60 hover:bg-sky-500/5"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-400">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-sky-500 text-slate-950 font-medium"
                    : "border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
                }`}
              >
                {msg.role === "assistant" ? (
                  <div className="space-y-1.5">
                    {msg.content.split(/\r?\n/).map((line, idx) => {
                      const trimmed = line.trim();
                      if (!trimmed) return <div key={idx} className="h-1" />;
                      if (trimmed.startsWith("- ")) {
                        return (
                          <div key={idx} className="flex gap-2 pl-1">
                            <span className="text-sky-400">•</span>
                            <span>{renderInlineMarkdown(trimmed.slice(2))}</span>
                          </div>
                        );
                      }
                      return <p key={idx}>{renderInlineMarkdown(trimmed)}</p>;
                    })}
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                )}

                {msg.role === "assistant" && (
                  <div className="mt-3 space-y-2 border-t border-[var(--border)] pt-2.5">
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {msg.citations.map((cit) => {
                          const isExternal = cit.url.startsWith("http");
                          if (isExternal) {
                            return (
                              <a
                                key={cit.id}
                                href={cit.url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400 hover:bg-emerald-500/20"
                              >
                                {cit.label}
                                <ArrowUpRight className="h-3 w-3" />
                              </a>
                            );
                          }
                          return (
                            <Link
                              key={cit.id}
                              href={cit.url}
                              className="inline-flex items-center gap-1 rounded-md border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 text-[11px] font-medium text-sky-400 hover:bg-sky-500/20"
                            >
                              {cit.label}
                              <ArrowUpRight className="h-3 w-3" />
                            </Link>
                          );
                        })}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-[var(--muted)]">
                      {msg.refused ? (
                        <span className="inline-flex items-center gap-1 text-amber-400">
                          <ShieldAlert className="h-3.5 w-3.5" />
                          Guardrail Active ({msg.refusalReason})
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-emerald-400">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Grounded SOT
                        </span>
                      )}
                      {msg.modelUsed && (
                        <span className="inline-flex items-center gap-1">
                          <Cpu className="h-3 w-3" />
                          {msg.modelUsed}
                        </span>
                      )}
                      {typeof msg.latencyMs === "number" && (
                        <span>{msg.latencyMs} ms</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {msg.role === "user" && (
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--muted)]">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))
        )}

        {loading && (
          <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-400">
              <Bot className="h-4 w-4 animate-pulse" />
            </div>
            <span>Retrieving SOT & generating grounded answer...</span>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {error && (
        <div className="mt-3 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-xs text-rose-400">
          {error}
        </div>
      )}

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={500}
          placeholder="Ask in English or Thai (e.g., Compare Project #1 vs #2, or ถามเรื่องลดต้นทุน 62.78%)..."
          className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-sky-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
}
