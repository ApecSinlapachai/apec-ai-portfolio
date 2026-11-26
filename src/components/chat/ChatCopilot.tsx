"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Cpu,
  RotateCcw,
  Send,
  ShieldAlert,
  Sparkles,
  User,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";
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

type ChatErrorState =
  | { type: "network" }
  | { type: "server"; status: number; message?: string }
  | null;

export default function ChatCopilot({ projectScopes }: ChatCopilotProps) {
  const { lang } = useLanguage();
  const t = translations[lang].chat;

  const searchParams = useSearchParams();
  const initialScope = searchParams.get("scope") || "all";
  const initialQuery = searchParams.get("q") || "";

  const [scope, setScope] = useState<string>(initialScope);
  const [input, setInput] = useState<string>(initialQuery);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<ChatErrorState>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  const scopes: ScopeOption[] = [
    { value: "all", label: t.allScopeLabel },
    ...projectScopes,
    { value: "profile", label: t.profileScopeLabel },
  ];

  const sendMessage = async (textToSend: string, targetScope = scope) => {
    const trimmed = textToSend.trim();
    if (!trimmed || loading) return;

    setErrorState(null);
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
        setErrorState({
          type: "server",
          status: res.status,
          message: typeof data?.error === "string" ? data.error : undefined,
        });
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
      setErrorState({ type: "network" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setScope(initialScope);
    if (initialQuery) {
      // Auto-Fill Only: populate input and focus without auto-submitting
      setInput(initialQuery);
      inputRef.current?.focus();
    }
  }, [initialScope, initialQuery]);

  useEffect(() => {
    if (messages.length > 0 || loading) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(input, scope);
  };

  const handleSelectChip = (chip: { scope: string; prompt: string }) => {
    // Auto-Fill Only: fill scope + input and focus without auto-submitting
    setScope(chip.scope);
    setInput(chip.prompt);
    inputRef.current?.focus();
  };

  const handleClearChat = () => {
    if (loading) return;
    setMessages([]);
    setInput("");
    setErrorState(null);
    inputRef.current?.focus();
  };

  const errorMessage =
    errorState?.type === "network"
      ? t.networkError
      : errorState?.type === "server"
        ? errorState.message || `${t.requestFailedPrefix} (${errorState.status})`
        : null;

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-4xl flex-col px-4 py-6 sm:px-6">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-[var(--border)] pb-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 font-mono text-[11px] font-medium text-[var(--accent)]">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{t.badge}</span>
          </div>
          <h1 className="mt-2.5 text-2xl font-bold tracking-tight text-[var(--foreground)]">
            {t.title}
          </h1>
          <p className="mt-0.5 text-sm text-[var(--muted)]">{t.subtitle}</p>
        </div>
        <span className="font-mono text-xs text-[var(--accent-emerald)]">
          {t.guardrailsActive}
        </span>
      </div>

      {/* Scope Switcher */}
      <div className="mb-4 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 font-mono text-[11px] font-medium text-[var(--muted)]">
          {t.scopeLabel}
        </span>
        {scopes.map((item) => {
          const active = scope === item.value;
          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setScope(item.value)}
              className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                active
                  ? "bg-[var(--accent)] font-semibold text-[var(--accent-fg)]"
                  : "border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
              }`}
            >
              {item.label}
            </button>
          );
        })}

        {(messages.length > 0 || input.length > 0) && (
          <button
            type="button"
            onClick={handleClearChat}
            disabled={loading}
            className="ml-auto inline-flex cursor-pointer items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs font-medium text-[var(--muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RotateCcw className="h-3 w-3" aria-hidden="true" />
            <span>{t.clearButton}</span>
          </button>
        )}
      </div>

      {/* Conversation Area */}
      <div className="flex-1 space-y-4 overflow-y-auto rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center py-8 text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--background)] text-[var(--accent)]">
              <Bot className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-[var(--foreground)]">
              {t.emptyTitle}
            </h2>
            <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-[var(--muted)]">
              {t.emptyDescPrefix}
              <code className="rounded border border-[var(--border)] bg-[var(--surface-elevated)] px-1.5 py-0.5 font-mono text-xs text-[var(--accent)]">
                content/
              </code>
              {t.emptyDescSuffix}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {t.starterChips.map((chip) => {
                const selected = input.trim() === chip.prompt.trim();
                return (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => handleSelectChip(chip)}
                    className={`cursor-pointer rounded-lg border px-3.5 py-2 text-left text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                      selected
                        ? "border-[var(--accent)] bg-[var(--surface-elevated)] text-[var(--accent)]"
                        : "border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:border-[var(--border-strong)] hover:text-[var(--accent)]"
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
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
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border-strong)] bg-[var(--background)] text-[var(--accent)]">
                  <Bot className="h-4 w-4" aria-hidden="true" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[var(--accent)] font-medium text-[var(--accent-fg)]"
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
                            <span className="text-[var(--accent)]" aria-hidden="true">
                              •
                            </span>
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
                                className="inline-flex items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 text-[11px] font-medium text-[var(--accent-emerald)] transition-colors hover:border-[var(--accent-emerald)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                              >
                                <span>{cit.label}</span>
                                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                              </a>
                            );
                          }
                          return (
                            <Link
                              key={cit.id}
                              href={cit.url}
                              className="inline-flex items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 text-[11px] font-medium text-[var(--accent)] transition-colors hover:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                            >
                              <span>{cit.label}</span>
                              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                            </Link>
                          );
                        })}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-[var(--muted)] tabular-nums">
                      {msg.refused ? (
                        <span className="inline-flex items-center gap-1 text-amber-500">
                          <ShieldAlert className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>
                            {t.guardrailActive} ({msg.refusalReason})
                          </span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[var(--accent-emerald)]">
                          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{t.groundedSot}</span>
                        </span>
                      )}
                      {msg.modelUsed && (
                        <span className="inline-flex items-center gap-1">
                          <Cpu className="h-3 w-3" aria-hidden="true" />
                          <span>{msg.modelUsed}</span>
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
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--muted)]">
                  <User className="h-4 w-4" aria-hidden="true" />
                </div>
              )}
            </div>
          ))
        )}

        {loading && (
          <div
            aria-live="polite"
            className="flex items-center gap-3 text-sm text-[var(--muted)]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border-strong)] bg-[var(--background)] text-[var(--accent)]">
              <Bot className="h-4 w-4 animate-pulse" aria-hidden="true" />
            </div>
            <span>{t.loadingText}</span>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {errorMessage && (
        <div
          role="alert"
          aria-live="polite"
          className="mt-3 rounded-lg border border-rose-500/40 bg-rose-500/10 px-4 py-2.5 text-xs text-rose-500"
        >
          {errorMessage}
        </div>
      )}

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <label htmlFor="copilot-input" className="sr-only">
          {t.inputLabel}
        </label>
        <input
          id="copilot-input"
          ref={inputRef}
          type="text"
          autoComplete="off"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={500}
          placeholder={t.inputPlaceholder}
          className="flex-1 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus-visible:border-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--accent-fg)] transition-colors hover:bg-[var(--accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">{t.sendButton}</span>
        </button>
      </form>
    </div>
  );
}
