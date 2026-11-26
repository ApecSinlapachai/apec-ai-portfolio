# PROGRESS — apec-ai-portfolio

- **Last Updated:** 2026-11-26
- **Current Phase:** Phase 5b Complete — Live on Vercel Hobby (`https://apec-ai-portfolio.vercel.app/`) & Post-Launch GitHub/Resume/AI OS Sync Done

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
- [x] **Automated Verification:** `eslint .`, `tsc --noEmit`, `vitest run` (`9/9 passed`), and `next build` (`11/11 routes`) all exit `0`.

## In Progress / Next Up
- Monitor Vercel auto-deploy after `maxOutputTokens: 1200` update and keep `content/projects/` updated via 1-file Markdown additions as new projects ship.

## Blockers / Gotchas for Next Agent
- Keep all browser calls in `/demos/*` routed through `/api/proxy/rag/*` and `/api/proxy/agent/*` (zero direct `*.onrender.com` calls).
- When `GEMINI_API_KEY` is unset locally, `/api/chat` gracefully runs in `deterministic-grounded-fallback` mode with real citations.

## Last Verified Commands
```bash
npm run lint && npm run typecheck && npm test && npm run build
# Result: eslint 0 errors | tsc 0 errors | vitest 9/9 passed | next build 11/11 routes
```
