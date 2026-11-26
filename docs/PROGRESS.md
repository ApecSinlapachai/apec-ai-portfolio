# PROGRESS — apec-ai-portfolio

- **Last Updated:** 2026-11-26
- **Current Phase:** Phases 1–4 Complete (Verified Local Build) → Ready for Phase 5 (Vercel Deploy & Post-Launch GitHub Sync)

> **Handoff Rule:** Update this file immediately after every completed milestone alongside `git commit`.

---

## Completed
- [x] **Phase 1 — 6-Layer AI-Native SSOT Scaffold:** `AGENTS.md`, `CLAUDE.md`, `docs/SPEC.md`, `docs/PROGRESS.md`, `docs/adr/0001..0003`, `.env.example`, `README.md`, `public/llms.txt`, `.github/workflows/ci.yml`.
- [x] **Phase 2 — File-Driven Markdown SOT:** `content/profile.md`, `content/projects/{enterprise-rag-ops-copilot,production-ai-agent-ops,fast-lead-automation,_TEMPLATE_project}.md`, `content/til/engineering-highlights.md`, and Zod-validated loader/chunker (`src/lib/content/`).
- [x] **Phase 3 — Zero-Cold-Start AI Portfolio Copilot:** `src/lib/chat/{guardrails,gemini}.ts`, `POST /api/chat` (Stage 0 Injection Gate, Stage 1 PDPA & Relevance Gate, IP Rate Limiter, Tiered Gemini 3.x routing + deterministic fallback), and full-screen `/chat` UI with scope switcher and clickable citations.
- [x] **Phase 4 — Unified Shell, Showcase & Native Demo Ports:** Dark Engineering theme + Light Mode toggle, `/` 15-second showcase, `/projects/[slug]` SSG case studies, `/demos/rag-copilot` (`/api/proxy/rag/*`), and `/demos/agent-ops` (`/api/proxy/agent/*`).
- [x] **Automated Verification:** `eslint .`, `tsc --noEmit`, `vitest run` (`9/9 passed`), and `next build` (`11/11 routes`) all exit `0`.

## In Progress / Next Up (Phase 5 — Deploy & Post-Launch Sync)
1. **Push `apec-ai-portfolio` to GitHub & Deploy to Vercel Hobby (`$0/mo`):** Set `GEMINI_API_KEY`, `RAG_API_PROXY_TARGET`, and `AGENT_API_PROXY_TARGET` in Vercel Environment Variables.
2. **Post-Launch Sync — GitHub Project #1 (`enterprise-rag-ops-copilot`):** Update `README.md` Live Demo link to `https://<portfolio-domain>/demos/rag-copilot` and add `"Ask AI about this project"` link to `/chat?scope=enterprise-rag-ops-copilot`.
3. **Post-Launch Sync — GitHub Project #2 (`production-ai-agent-ops`):** Update `README.md` Live Demo link to `https://<portfolio-domain>/demos/agent-ops` and add `"Ask AI about this project"` link to `/chat?scope=production-ai-agent-ops`.
4. **Post-Launch Sync — Profile README, Resume & AI OS Rollups:** Update `ApecSinlapachai/README.md`, `resume_apec_ai_automation.html`, `portfolio_rag_and_sot_architecture.md`, and `Triage.md`.

## Blockers / Gotchas for Next Agent
- Keep all browser calls in `/demos/*` routed through `/api/proxy/rag/*` and `/api/proxy/agent/*` (zero direct `*.onrender.com` calls).
- When `GEMINI_API_KEY` is unset locally, `/api/chat` gracefully runs in `deterministic-grounded-fallback` mode with real citations.

## Last Verified Commands
```bash
npm run lint && npm run typecheck && npm test && npm run build
# Result: eslint 0 errors | tsc 0 errors | vitest 9/9 passed | next build 11/11 routes
```
