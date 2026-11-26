# ADR-0003: Dark Engineering Default Theme with Light Mode Toggle on Tailwind CSS v4

- **Status:** Accepted
- **Date:** 2026-11-26
- **Deciders:** Apec Sinlapachai

---

## 1. Context
Project #1 (`enterprise-rag-ops-copilot`) used Tailwind CSS v3.4 with a dark slate UI, while Project #2 (`production-ai-agent-ops`) used Tailwind CSS v4.1 with a dark zinc/emerald control plane. Merging both into one portfolio requires a single consistent design system.

## 2. Decision
> We will standardize on **Tailwind CSS v4.1** with a **Dark Engineering / Mission Control** default (`slate-950` / `zinc-950`, `sky-400` & `emerald-400` accents) and a client-persisted **Light/Dark theme toggle** using CSS custom properties and `.light` class overrides.

## 3. Alternatives Considered
| Option | Pros | Cons | Why Rejected / Chosen |
| :--- | :--- | :--- | :--- |
| **Dark Engineering Default + Light Toggle (Chosen)** | Matches both existing AI Ops demos natively; respects user preference | Requires testing both themes | Cohesive, modern engineering aesthetic |
| **Light-Only Editorial** | Clean for reading | Requires full restyling of dark control-plane demos | Rejected to keep demo parity |

## 4. Consequences
- **Positive:** Seamless visual transition between `/`, `/chat`, `/demos/rag-copilot`, and `/demos/agent-ops`.
- **Negative / Trade-offs:** Ported Project #1 components require checking v3→v4 utility compatibility.
- **Reversibility:** Medium — theme tokens are centralized in `src/app/globals.css`.
