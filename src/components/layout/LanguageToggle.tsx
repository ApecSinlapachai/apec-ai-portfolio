"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { translations } from "@/lib/i18n/translations";

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();
  const t = translations[lang].nav;

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t.toggleLangAria}
      title={t.toggleLangTitle}
      className="inline-flex h-9 shrink-0 cursor-pointer items-center gap-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2 font-mono text-[11px] font-medium transition-colors hover:border-[var(--border-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] sm:px-2.5 sm:text-xs"
    >
      <span
        className={
          lang === "en"
            ? "font-semibold text-[var(--accent)]"
            : "text-[var(--muted)]"
        }
      >
        EN
      </span>
      <span className="text-[var(--border-strong)]" aria-hidden="true">
        /
      </span>
      <span
        className={
          lang === "th"
            ? "font-semibold text-[var(--accent)]"
            : "text-[var(--muted)]"
        }
      >
        TH
      </span>
    </button>
  );
}
