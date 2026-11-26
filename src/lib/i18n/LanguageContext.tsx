"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Lang = "en" | "th";

export const LANG_STORAGE_KEY = "apec-portfolio-lang";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  toggleLang: () => {},
});

function isValidLang(value: string | null): value is Lang {
  return value === "en" || value === "th";
}

function applyLangToDocument(lang: Lang) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Hydration-safe: SSR and initial client render always start as "en"
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (isValidLang(saved)) {
        setLangState(saved);
        applyLangToDocument(saved);
        return;
      }
    } catch {
      // Ignore storage errors in restricted browser contexts
    }
    applyLangToDocument("en");
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    applyLangToDocument(next);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      // Ignore storage errors in restricted browser contexts
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next: Lang = prev === "en" ? "th" : "en";
      applyLangToDocument(next);
      try {
        localStorage.setItem(LANG_STORAGE_KEY, next);
      } catch {
        // Ignore storage errors in restricted browser contexts
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ lang, setLang, toggleLang }),
    [lang, setLang, toggleLang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
