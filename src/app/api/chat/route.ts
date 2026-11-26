import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getKnowledgeChunks } from "@/lib/content/loader";
import {
  checkRateLimit,
  detectPrivateOutOfScope,
  detectPromptInjection,
  isThaiText,
  retrieveChunks,
} from "@/lib/chat/guardrails";
import { generateGroundedAnswer } from "@/lib/chat/gemini";

const ChatRequestSchema = z.object({
  message: z.string().trim().min(1, "Message is required").max(500, "Message too long (max 500 chars)"),
  scope: z.string().trim().min(1).max(80).default("all"),
});

export async function POST(request: NextRequest) {
  const startedAt = Date.now();

  const forwarded = request.headers.get("x-forwarded-for");
  const clientIp = forwarded ? forwarded.split(",")[0].trim() : "local";

  const rate = checkRateLimit(clientIp);
  if (!rate.allowed) {
    return NextResponse.json(
      {
        error: "Rate limit exceeded. Please wait before sending another message.",
        retry_after_seconds: rate.retryAfterSec,
      },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSec) },
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const parsed = ChatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid request." },
      { status: 400 }
    );
  }

  const { message, scope } = parsed.data;
  const thai = isThaiText(message);

  // Stage 0: Prompt Injection Gate ($0 LLM spend)
  if (detectPromptInjection(message)) {
    return NextResponse.json({
      answer: thai
        ? "คำขอนี้ถูกบล็อกโดยระบบป้องกัน Prompt Injection (Stage 0 · $0 LLM cost) กรุณาถามเกี่ยวกับโปรเจกต์ สถาปัตยกรรม ผล Eval หรือประสบการณ์ของ Apec ครับ"
        : "This request was blocked by the Stage 0 Prompt Injection Gate ($0 LLM spend). Please ask about Apec's AI projects, architectures, benchmarks, or engineering background.",
      citations: [],
      model_used: "guardrail-stage0-injection",
      scope,
      refused: true,
      refusal_reason: "BLOCKED_INJECTION",
      latency_ms: Date.now() - startedAt,
    });
  }

  // Stage 1a: Private / PDPA Out-of-Scope Gate ($0 LLM spend)
  if (detectPrivateOutOfScope(message)) {
    return NextResponse.json({
      answer: thai
        ? "ขออภัยครับ ระบบปฏิเสธการตอบข้อมูลส่วนตัวหรือข้อมูลที่ไม่เปิดเผยต่อสาธารณะ (Stage 1 PDPA Gate · $0 LLM cost) สามารถถามเกี่ยวกับผลงาน Project #1, Project #2, Tech Stack หรือความพร้อมสาย AI Engineer ได้เลยครับ"
        : "I cannot answer questions about private personal information (Stage 1 PDPA Gate · $0 LLM spend). Feel free to ask about Project #1 (RAG Copilot), Project #2 (Agent Ops), tech stack, or verified benchmarks.",
      citations: [],
      model_used: "guardrail-stage1-pdpa",
      scope,
      refused: true,
      refusal_reason: "REFUSED_PRIVATE_PII",
      latency_ms: Date.now() - startedAt,
    });
  }

  // Stage 1b: Retrieval Relevance Gate ($0 LLM spend)
  const chunks = getKnowledgeChunks();
  const retrieved = retrieveChunks(message, chunks, scope, 5);

  if (retrieved.length === 0 || retrieved[0].score < 1.0) {
    return NextResponse.json({
      answer: thai
        ? "ไม่พบข้อมูลที่เกี่ยวข้องในคลังเอกสารพอร์ตโฟลิโอ (Stage 1 Retrieval Gate · $0 LLM cost) ลองถามเกี่ยวกับ Project #1 (`enterprise-rag-ops-copilot`), Project #2 (`production-ai-agent-ops`), การลดต้นทุน LLM `62.78%`, หรือความพร้อมสาย AI / AI Automation Engineer ดูนะครับ"
        : "I couldn't find supporting evidence in Apec's public portfolio knowledge base (Stage 1 Retrieval Gate · $0 LLM spend). Try asking about Project #1 (Enterprise RAG Ops Copilot), Project #2 (Production AI Agent Ops), PDPA/cost guardrails, or AI Engineer readiness.",
      citations: [],
      model_used: "guardrail-stage1-low-evidence",
      scope,
      refused: true,
      refusal_reason: "REFUSED_LOW_EVIDENCE",
      latency_ms: Date.now() - startedAt,
    });
  }

  const result = await generateGroundedAnswer(message, retrieved, scope);

  return NextResponse.json({
    answer: result.answer,
    citations: result.citations,
    model_used: result.modelUsed,
    scope,
    refused: false,
    latency_ms: Date.now() - startedAt,
  });
}
