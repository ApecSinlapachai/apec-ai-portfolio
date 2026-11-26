# PROGRESS — apec-ai-portfolio

- **Last Updated:** 2026-11-26
- **Current Phase:** Phase 8 Complete — HR-Friendly Summaries, Localized Thai Metrics, Red Maple Leaf Brand, Demo Explainers & Social Open Graph SEO

> **Handoff Rule:** Update this file immediately after every completed milestone alongside `git commit`.

---

## Completed
- [x] **Phase 1 — 6-Layer AI-Native SSOT Scaffold:** `AGENTS.md`, `CLAUDE.md`, `docs/SPEC.md`, `docs/PROGRESS.md`, `docs/adr/0001..0003`, `.env.example`, `README.md`, `public/llms.txt`, `.github/workflows/ci.yml`.
- [x] **Phase 2 — File-Driven Markdown SOT:** `content/profile.md`, `content/projects/{enterprise-rag-ops-copilot,production-ai-agent-ops,fast-lead-automation,_TEMPLATE_project}.md`, `content/til/engineering-highlights.md`, and Zod-validated loader/chunker (`src/lib/content/`).
- [x] **Phase 3 — Zero-Cold-Start AI Portfolio Copilot:** `src/lib/chat/{guardrails,gemini}.ts`, `POST /api/chat` (Stage 0 Injection Gate, Stage 1 PDPA & Relevance Gate, IP Rate Limiter, Tiered Gemini 3.x routing + deterministic fallback), and full-screen `/chat` UI with scope switcher and clickable citations.
- [x] **Phase 4 — Unified Shell, Showcase & Native Demo Ports:** Dark Engineering theme + Light Mode toggle, `/` 15-second showcase, `/projects/[slug]` SSG case studies, `/demos/rag-copilot` (`/api/proxy/rag/*`), and `/demos/agent-ops` (`/api/proxy/agent/*`).
- [x] **Phase 5a — Local Browser QA, Polish & GitHub Push:**
  - Verified all 5 routes live in browser with `0` console errors and `0` direct `*.onrender.com` calls (live Render proxies returned `200`/`201`).
  - Fixed mobile (`390px`) header overflow (`Navbar.tsx`), inline Markdown rendering in headings & chat (`MarkdownArticle.tsx`, `ChatCopilot.tsx`), and full Light Mode support inside `/demos/rag-copilot` and `/demos/agent-ops` (`globals.css` `.demo-theme-scope`).
  - Pushed public repo to `https://github.com/ApecSinlapachai/apec-ai-portfolio`.
- [x] **Phase 5b — Live Vercel Smoke Test, Output Cap Polish & Post-Launch Sync:**
  - Live Vercel Hobby deployment (`https://apec-ai-portfolio.vercel.app/`) smoke-tested across `/`, `/chat`, `/demos/rag-copilot`, and `/demos/agent-ops` with `0` console errors, `0` failed requests, `0` direct `*.onrender.com` calls, Light/Dark mode verified, EN (`gemini-3.1-flash-lite`) & TH (`gemini-3.5-flash-lite`) grounded citations verified, and Stage 0 `BLOCKED_INJECTION` verified (`1 ms`, `$0` LLM spend).
  - Raised `/api/chat` `maxOutputTokens` from `700` to `1200` (`src/lib/chat/gemini.ts`) to prevent mid-sentence truncation on long Thai multi-project summaries.
  - Synced live URLs into `enterprise-rag-ops-copilot/README.md`, `production-ai-agent-ops/README.md`, `ApecSinlapachai/README.md`, `resume_apec_ai_automation.html`, and AI OS SSOT (`portfolio_rag_and_sot_architecture.md`, `Triage.md`).
- [x] **Phase 6 — Studio-Grade UX/UI Redesign & Auto-Fill Only Preset Chips:**
  - Installed global UX/UI skills (`frontend-design`, `web-design-guidelines`, `ui-ux-pro-max`) and applied precision engineering typography (`Space Grotesk`, `Inter`, `IBM Plex Sans Thai`, `JetBrains Mono` via `next/font/google` in `src/app/layout.tsx`) plus `tabular-nums`, `.bg-engineering-grid`, `prefers-reduced-motion`, and refined WCAG AA+ Dark/Light CSS tokens (`src/app/globals.css`).
  - Redesigned `/` (2-column Editorial Hero + Verified Telemetry Proof Matrix, Quick Copilot Bar, Flagship & Additional cards), `/chat` (`ChatCopilot.tsx`), `/projects/[slug]` (`MarkdownArticle.tsx` `72ch` prose width), and polished `Navbar.tsx`, `ThemeToggle.tsx`, `Footer.tsx`, `/demos/rag-copilot`, and `/demos/agent-ops`.
  - Prepared clean utility cluster headroom beside `ThemeToggle` in `Navbar.tsx` for a future top-right `EN/TH` language switcher.
  - Enforced **Auto-Fill Only (no auto-submit)** across all preset/sample chips site-wide (`/`, `/chat`, `/projects/[slug]`, `/demos/rag-copilot` RAG & Triage tabs, `/demos/agent-ops`).
  - Verified with `npm run verify` (`eslint .`, `tsc --noEmit`, `vitest run` 9/9, `next build` 11/11) and full Browser QA across Desktop (`1440px`), Mobile (`390px`, zero overflow), Dark Mode, and Light Mode (`0` console errors, `0` failed requests, `0` direct `*.onrender.com` calls), committed as `9441a3e`.
- [x] **Phase 7 — Site-Wide `EN / TH` Switcher, Problem-First Summaries & Custom Microchip Favicon/Logo:**
  - **Track A (Content & Schema SSOT):** Extended `ProjectFrontmatterSchema` (`src/lib/content/schema.ts`) with `summary: { en, th }` (`LocalizedTextSchema`) and `ProfileFrontmatterSchema` with optional `headlineTh` / `locationTh`; authored Problem-First 2–3 sentence EN/TH summaries across all 3 projects + `_TEMPLATE_project.md`, updated `content/profile.md`, included both summaries in `getKnowledgeChunks()` (`src/lib/content/loader.ts`), and added Vitest schema/chunk assertions (`tests/content-and-chat.test.ts`).
  - **Track B (Site-Wide i18n Shell & Brand Identity):** Added `src/lib/i18n/{LanguageContext,translations}.ts` (`localStorage` key `apec-portfolio-lang`, hydration-safe `"en"` SSR default + inline `<head>` `LANG_INIT_SCRIPT` in `src/app/layout.tsx`), compact `LanguageToggle` (`EN / ไทย`) beside `ThemeToggle` in `Navbar.tsx`, custom geometric microchip SVG favicon (`src/app/icon.svg`) + matching `BrandMicrochipMark` in `Navbar.tsx`, and translated `Navbar`, `DemoTopBar`, and `Footer`.
  - **Track C (Pages, Copilot & Live Demos i18n Sync):** Extracted client views `HomeView.tsx` and `ProjectDetailView.tsx` while keeping `src/app/page.tsx` and `src/app/projects/[slug]/page.tsx` as SSG Server Components; surfaced `project.summary[lang]` prominently on project cards and case studies; translated `ChatCopilot.tsx` (preserving Auto-Fill Only on all presets/chips); synced `/demos/rag-copilot` `uiLang` directly with `useLanguage()`; and translated `/demos/agent-ops` header, subtitle, health badges, and tabs.
  - **Track D (Verification & Browser QA):** Verified with `npm run verify` (`eslint` 0 errors, `tsc` 0 errors, `vitest` 9/9 passed, `next build` 12/12 routes incl. `/icon.svg`) and full local Browser QA (`http://localhost:3005`) across EN/TH persistence on reload, Dark/Light mode, Desktop `1440px`, Mobile `390px` (zero horizontal overflow in both EN & TH), `/icon.svg` HTTP 200 + brand SVG mark, Auto-Fill Only verified (`0` auto-submitted `/api/chat` requests), `0` console/hydration errors, and `0` direct `*.onrender.com` calls.

- [x] **Phase 8 — HR-Friendly Summaries, Localized Thai Metrics, Red Maple Leaf Brand, Demo Explainers & Social Open Graph SEO (Swarm: 1 Neon Medium Coordinator + 3 Hydrogen High Workers):**
  - **Track 1 (`content-metrics`):** Extended `MetricSchema` (`src/lib/content/schema.ts`) with optional `labelTh` & `valueTh`; rewrote EN/TH `summary` across all 3 projects (`enterprise-rag-ops-copilot`, `production-ai-agent-ops`, `fast-lead-automation`) + `_TEMPLATE_project.md` into plain-language HR-friendly 2–3 sentence explanations without redundant benchmark numbers; localized metric boxes in `HomeView.tsx` & `ProjectDetailView.tsx`; added Vitest assertions in `tests/content-and-chat.test.ts`.
  - **Track 2 (`brand-og-seo`):** Updated language switcher label from `EN / ไทย` to `EN / TH` (`LanguageToggle.tsx` + `/demos/rag-copilot` secondary toggle); replaced microchip mark with custom Red Maple Leaf SVG favicon (`src/app/icon.svg`) & `BrandMapleMark` (`Navbar.tsx`); added `metadataBase`, `openGraph`, and `twitter` (`summary_large_image`) to `src/app/layout.tsx`, static `1200×630` `src/app/opengraph-image.tsx`, and route-level metadata layouts (`src/app/demos/{rag-copilot,agent-ops}/layout.tsx`).
  - **Track 3 (`demo-explainers`):** Added bilingual plain-language `explainer` content (`src/lib/i18n/translations.ts`) and collapsible 3-pillar `DemoProjectExplainer` (`src/components/demos/DemoProjectExplainer.tsx`, Dark/Light semantic tokens, `aria-expanded`) mounted on `/demos/rag-copilot` and `/demos/agent-ops` while preserving `/api/proxy/*` and Auto-Fill Only chips.
  - **Verification & Browser QA:** Verified with `npm run verify` (`eslint` 0 errors, `tsc` 0 errors, `vitest` 9/9 passed, `next build` 13/13 routes incl. `/icon.svg` and `/opengraph-image`) and full local Browser QA (`http://localhost:3006`) across EN/TH, Dark/Light, Desktop `1440px`, Mobile `390px` (`0` console errors, `0` hydration errors, `0` horizontal overflow, `0` direct `*.onrender.com` calls).

## In Progress / Next Up (Post-Deploy & Ongoing)
1. **Deploy & Refresh Social Previews:** Push `main` to GitHub (triggers Vercel Hobby deployment), then run [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) on `/`, `/demos/rag-copilot`, and `/demos/agent-ops` to clear LinkedIn's cached blank preview.
2. **Ongoing:** Keep `content/projects/` updated via 1-file Markdown additions as new projects ship, and run post-deploy smoke checks on `https://apec-ai-portfolio.vercel.app/` after pushing changes.

## Blockers / Gotchas for Next Agent
- Keep all browser calls in `/demos/*` routed through `/api/proxy/rag/*` and `/api/proxy/agent/*` (zero direct `*.onrender.com` calls).
- Keep all starter/sample/preset chips site-wide as **auto-fill only** (focus input without auto-submitting).
- When `GEMINI_API_KEY` is unset locally, `/api/chat` gracefully runs in `deterministic-grounded-fallback` mode with real citations.

## Last Verified Commands
```bash
npm run verify
# Result: eslint 0 errors | tsc 0 errors | vitest 9/9 passed | next build 13/13 routes (incl. /icon.svg & /opengraph-image)
```
