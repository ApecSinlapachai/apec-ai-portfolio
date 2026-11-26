import crypto from "crypto";
import { KnowledgeChunk } from "@/lib/content/schema";

const INJECTION_PATTERNS: RegExp[] = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+instructions?/i,
  /reveal\s+(your\s+)?(system|hidden|secret)\s+prompt/i,
  /print\s+(your\s+)?(system|initial)\s+prompt/i,
  /disregard\s+(all\s+)?(rules|guardrails|instructions)/i,
  /\bjailbreak\b|\bdo\s+anything\s+now\b|\bdeveloper\s+mode\b/i,
  /ลืมคำสั่ง(ก่อนหน้า|ทั้งหมด)/i,
  /(เปิดเผย|แสดง|บอก)\s*(system\s*prompt|คำสั่งระบบ|prompt\s*ลับ)/i,
  /ไม่สนใจกฎ(ทั้งหมด|ก่อนหน้า)/i,
];

const OUT_OF_SCOPE_PRIVATE_PATTERNS: RegExp[] = [
  /\b(home\s+address|phone\s+number|bank\s+account|credit\s+card|citizen\s+id|national\s+id|password)\b/i,
  /(ที่อยู่บ้าน|เบอร์โทร|เลขบัญชี|บัตรประชาชน|รหัสผ่าน|เงินเดือนปัจจุบัน|เงินเก็บในบัญชี)/i,
];

const THAI_SYNONYM_MAP: Array<[RegExp, string[]]> = [
  [/เปรียบเทียบ|ต่างกันยังไง|เทียบ/i, ["compare", "enterprise-rag-ops-copilot", "production-ai-agent-ops", "architecture", "benchmark"]],
  [/โปรเจกต์\s*1|โปรเจค\s*1|ชิ้นที่\s*1|rag/i, ["enterprise-rag-ops-copilot", "rag", "pgvector", "pythainlp", "hybrid", "triage"]],
  [/โปรเจกต์\s*2|โปรเจค\s*2|ชิ้นที่\s*2|agent|เอเจนต์/i, ["production-ai-agent-ops", "langgraph", "agent", "hitl", "dlq", "pdpa", "n8n"]],
  [/โปรเจกต์\s*3|fast-?lead|ไลน์|line/i, ["fast-lead-automation", "deterministic", "line", "apps", "script"]],
  [/ต้นทุน|ประหยัด|ค่าใช้จ่าย|ราคา|งบ/i, ["cost", "62.78%", "tiered", "routing", "fallback", "$0"]],
  [/มั่ว|หลอน|ปฏิเสธ|กันมั่ว|ความแม่นยำ|eval|วัดผล/i, ["hallucination", "refusal", "guardrails", "25", "eval", "citation", "accuracy"]],
  [/ข้อมูลส่วนตัว|ความเป็นส่วนตัว|pdpa|pii/i, ["pdpa", "pii", "redaction", "0.00", "masked"]],
  [/อนุมัติ|คนตรวจ|hitl|ค้าง|พัง|ซ้ำ/i, ["hitl", "approval", "idempotency", "retry", "dlq", "for", "update"]],
  [/แคนาดา|สมัครงาน|ตำแหน่ง|ทักษะ|ประวัติ|สกิล|ประสบการณ์|เกี่ยวกับ/i, ["apec", "profile", "noc", "21232", "21221", "stack", "skills", "canada", "engineer"]],
  [/บทเรียน|til|เรียนรู้|เทคนิค/i, ["til", "lessons", "proxy", "rewrites", "ssot"]],
];

export interface RetrievedChunk {
  chunk: KnowledgeChunk;
  score: number;
}

export function detectPromptInjection(query: string): boolean {
  return INJECTION_PATTERNS.some((pattern) => pattern.test(query));
}

export function detectPrivateOutOfScope(query: string): boolean {
  return OUT_OF_SCOPE_PRIVATE_PATTERNS.some((pattern) => pattern.test(query));
}

export function isThaiText(text: string): boolean {
  return /[\u0E00-\u0E7F]/.test(text);
}

export function isComplexQuery(query: string): boolean {
  return /(compare|comparison|trade-?off|difference|vs\.?|versus|architecture|เปรียบเทียบ|ต่างกัน|ข้อดีข้อเสีย|สถาปัตยกรรม)/i.test(
    query
  );
}

function extractQueryTerms(query: string): string[] {
  const lower = query.toLowerCase();
  const baseTerms = lower
    .split(/[^a-z0-9\u0E00-\u0E7F.#+%-]+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 2);

  const expanded = new Set<string>(baseTerms);

  for (const [pattern, synonyms] of THAI_SYNONYM_MAP) {
    if (pattern.test(query)) {
      synonyms.forEach((s) => expanded.add(s));
    }
  }

  return Array.from(expanded);
}

export function retrieveChunks(
  query: string,
  chunks: KnowledgeChunk[],
  scope = "all",
  topK = 5
): RetrievedChunk[] {
  const terms = extractQueryTerms(query);
  if (terms.length === 0) return [];

  const isComparison = isComplexQuery(query);
  const scored: RetrievedChunk[] = [];

  for (const chunk of chunks) {
    const haystack = `${chunk.title} ${chunk.section} ${chunk.scope} ${chunk.content}`.toLowerCase();
    const titleHaystack = `${chunk.title} ${chunk.section} ${chunk.scope}`.toLowerCase();

    let score = 0;
    for (const term of terms) {
      if (haystack.includes(term)) {
        score += 1.0;
        if (titleHaystack.includes(term)) {
          score += 0.85;
        }
      }
    }

    if (score > 0 && scope !== "all" && chunk.scope === scope) {
      score *= 1.45;
    }

    if (score > 0 && isComparison && chunk.id.endsWith("-summary")) {
      score += 1.2;
    }

    if (score > 0) {
      scored.push({ chunk, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);

  // If comparison query across all projects, ensure at least 1 chunk from each flagship project when matched
  if (isComparison && scope === "all") {
    const top = scored.slice(0, topK);
    const hasP1 = top.some((item) => item.chunk.scope === "enterprise-rag-ops-copilot");
    const hasP2 = top.some((item) => item.chunk.scope === "production-ai-agent-ops");
    if (!hasP1) {
      const p1 = scored.find((item) => item.chunk.scope === "enterprise-rag-ops-copilot");
      if (p1) top[top.length - 1] = p1;
    }
    if (!hasP2) {
      const p2 = scored.find((item) => item.chunk.scope === "production-ai-agent-ops");
      if (p2 && top.length >= 2) top[top.length - 2] = p2;
    }
    return top;
  }

  return scored.slice(0, topK);
}

// --- SHA-256 IP-Hashed Sliding Window Rate Limiter ---

interface RateRecord {
  minuteHits: number[];
  dayHits: number[];
}

const rateStore = new Map<string, RateRecord>();
const MAX_TRACKED_KEYS = 2000;

export function hashIp(ip: string): string {
  return crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

export function checkRateLimit(
  ip: string,
  limits?: { perMin?: number; perDay?: number },
  now = Date.now()
): { allowed: boolean; retryAfterSec: number } {
  const perMin = limits?.perMin ?? Number(process.env.CHAT_RATE_LIMIT_PER_MIN || 15);
  const perDay = limits?.perDay ?? Number(process.env.CHAT_RATE_LIMIT_PER_DAY || 60);

  const key = hashIp(ip || "unknown");

  if (rateStore.size >= MAX_TRACKED_KEYS && !rateStore.has(key)) {
    const oldestKey = rateStore.keys().next().value;
    if (oldestKey) rateStore.delete(oldestKey);
  }

  const record = rateStore.get(key) ?? { minuteHits: [], dayHits: [] };
  const oneMinAgo = now - 60_000;
  const oneDayAgo = now - 86_400_000;

  record.minuteHits = record.minuteHits.filter((t) => t > oneMinAgo);
  record.dayHits = record.dayHits.filter((t) => t > oneDayAgo);

  if (record.minuteHits.length >= perMin) {
    const oldest = record.minuteHits[0];
    const retryAfterSec = Math.max(1, Math.ceil((oldest + 60_000 - now) / 1000));
    rateStore.set(key, record);
    return { allowed: false, retryAfterSec };
  }

  if (record.dayHits.length >= perDay) {
    const oldest = record.dayHits[0];
    const retryAfterSec = Math.max(60, Math.ceil((oldest + 86_400_000 - now) / 1000));
    rateStore.set(key, record);
    return { allowed: false, retryAfterSec };
  }

  record.minuteHits.push(now);
  record.dayHits.push(now);
  rateStore.set(key, record);

  return { allowed: true, retryAfterSec: 0 };
}

export function resetRateLimiterForTests(): void {
  rateStore.clear();
}
