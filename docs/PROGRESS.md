# PROGRESS — apec-ai-portfolio

- **Last Updated:** 2026-11-26
- **Current Phase:** Phase 7 Complete — Site-Wide EN/TH Switcher, Problem-First Summaries & Custom Microchip Favicon/Logo

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

## In Progress / Next Up (Phase 8 Backlog — Noted, Not Implemented Yet)
1. **HR-Friendly Project Summaries & Localized Metric Boxes:**
   - Rewrite both flagship project summaries (`enterprise-rag-ops-copilot` and `production-ai-agent-ops`) so general HR / non-technical readers immediately understand: *Who does this help? What real problem caused it? Why does this system exist?* (keep card summaries concise, then expand in detail on each Demo page — see item #3).
   - Remove redundant benchmark strings from the summary paragraph (e.g., `"ผลทดสอบบนระบบจริงผ่าน Golden Eval 25/25 เคส (100%) ที่ความเร็วเฉลี่ย 767 ms, ผ่าน pytest 47/47 เคส และมีต้นทุน LLM เป็น $0 สำหรับคำถามที่ถูกปฏิเสธ"`) because those metrics are already displayed in the metric boxes below.
   - Localize the metric box labels/values into Thai when `lang === "th"`.
2. **Language Toggle Label:** Change the switcher button text from `EN/ไทย` to `EN/TH`.
3. **Demo Page Project Explanations:** Add a clear, expanded project explanation section inside each Demo page (`/demos/rag-copilot` and `/demos/agent-ops`), taking advantage of the extra space to explain the system in plain, accessible language for general audiences.
4. **Red Maple Leaf Brand Logo:** Replace both the browser tab favicon (`src/app/icon.svg`) and the Navbar brand logo (`BrandMicrochipMark` in `Navbar.tsx`) with a custom red maple leaf icon.
5. **Post-Deploy & Ongoing:** Keep `content/projects/` updated via 1-file Markdown additions as new projects ship, and run post-deploy smoke checks on `https://apec-ai-portfolio.vercel.app/` after pushing changes.

## Blockers / Gotchas for Next Agent
- Keep all browser calls in `/demos/*` routed through `/api/proxy/rag/*` and `/api/proxy/agent/*` (zero direct `*.onrender.com` calls).
- Keep all starter/sample/preset chips site-wide as **auto-fill only** (focus input without auto-submitting).
- When `GEMINI_API_KEY` is unset locally, `/api/chat` gracefully runs in `deterministic-grounded-fallback` mode with real citations.

## Last Verified Commands
```bash
npm run verify
# Result: eslint 0 errors | tsc 0 errors | vitest 9/9 passed | next build 12/12 routes (incl. /icon.svg)
```
