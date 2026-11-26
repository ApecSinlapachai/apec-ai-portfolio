import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-[var(--surface)]/50">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:px-6">
        <div>
          <p className="font-medium text-[var(--foreground)]">
            Apec Sinlapachai · AI &amp; AI Automation Engineer
          </p>
          <p className="mt-1">
            Built with Next.js 15, Tailwind CSS v4, File-Driven Markdown SOT, and Same-Origin API Proxies ($0/mo).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/chat" className="hover:text-sky-400">
            AI Copilot
          </Link>
          <a
            href="https://github.com/ApecSinlapachai"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-sky-400"
          >
            GitHub <ArrowUpRight className="h-3 w-3" />
          </a>
          <a
            href="https://github.com/ApecSinlapachai/ai-automation-til"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-sky-400"
          >
            TIL Notes <ArrowUpRight className="h-3 w-3" />
          </a>
          <a href="/llms.txt" className="hover:text-sky-400">
            llms.txt
          </a>
        </div>
      </div>
    </footer>
  );
}
