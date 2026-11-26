import { GoogleGenAI } from "@google/genai";
import { KnowledgeChunk } from "@/lib/content/schema";
import { isComplexQuery, isThaiText, RetrievedChunk } from "./guardrails";

export interface ChatCitation {
  id: string;
  label: string;
  url: string;
  scope: string;
}

export interface ChatGenerationResult {
  answer: string;
  citations: ChatCitation[];
  modelUsed: string;
  grounded: boolean;
}

const FAST_MODEL_CHAIN = [
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite",
  "gemini-3.8-flash",
];

const COMPLEX_MODEL_CHAIN = [
  "gemini-3.8-flash",
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite",
];

export function buildDeterministicFallback(
  query: string,
  retrieved: RetrievedChunk[]
): ChatGenerationResult {
  const thai = isThaiText(query);
  const top = retrieved.slice(0, 3);

  const bulletLines = top.map(({ chunk }) => {
    const cleaned = chunk.content
      .replace(/^#+\s*/gm, "")
      .split(/\r?\n/)
      .filter((line) => line.trim().length > 0)
      .slice(0, 4)
      .join(" ");
    const snippet = cleaned.length > 260 ? `${cleaned.slice(0, 257)}...` : cleaned;
    return `- **${chunk.sourceLabel}** \`[${chunk.id}]\`: ${snippet}`;
  });

  const intro = thai
    ? "สรุปคำตอบจากเอกสาร Single Source of Truth ของพอร์ต (โหมด Deterministic Grounded Fallback):"
    : "Here is the grounded summary from Apec's Portfolio Single Source of Truth (Deterministic Grounded Fallback):";

  const footer = thai
    ? "\n\nสามารถคลิกที่แหล่งอ้างอิงด้านล่างเพื่อเปิดดูรายละเอียดเชิงลึกหรือทดสอบ Live Demo ได้ทันทีครับ"
    : "\n\nClick any cited source pill below to inspect the architecture deep-dive or launch the live interactive demo.";

  return {
    answer: `${intro}\n\n${bulletLines.join("\n")}${footer}`,
    citations: top.map(({ chunk }) => ({
      id: chunk.id,
      label: chunk.sourceLabel,
      url: chunk.sourceUrl,
      scope: chunk.scope,
    })),
    modelUsed: "deterministic-grounded-fallback",
    grounded: true,
  };
}

function buildSystemInstruction(): string {
  return [
    "You are Apec Sinlapachai's AI Portfolio Copilot on his unified AI & AI Automation Engineer portfolio website.",
    "STRICT GROUNDING RULES:",
    "1. Answer ONLY using the provided CONTEXT CHUNKS. Never invent metrics, companies, personal contact info, or features not present in the context.",
    "2. Reply in the same language as the user (Thai, English, or Thai-English Code-Mixed). Keep tone concise, articulate, and engineering-focused (BLUF style).",
    "3. Cite supporting chunks inline using their exact bracketed ID, e.g. [enterprise-rag-ops-copilot-summary].",
    "4. If the context does not contain enough information to answer a specific detail, state clearly what is not covered in the public portfolio SOT.",
    "5. Keep answers scannable with short bullet points and exact verified metrics.",
  ].join("\n");
}

function buildContextPrompt(query: string, chunks: KnowledgeChunk[], scope: string): string {
  const formattedChunks = chunks
    .map(
      (c) =>
        `[${c.id}] (${c.sourceLabel} | url: ${c.sourceUrl})\n${c.content}`
    )
    .join("\n\n---\n\n");

  return [
    `ACTIVE_SCOPE: ${scope}`,
    `USER_QUESTION: ${query}`,
    "",
    "CONTEXT_CHUNKS:",
    formattedChunks,
  ].join("\n");
}

export async function generateGroundedAnswer(
  query: string,
  retrieved: RetrievedChunk[],
  scope: string
): Promise<ChatGenerationResult> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  const chunks = retrieved.map((r) => r.chunk);

  if (!apiKey) {
    return buildDeterministicFallback(query, retrieved);
  }

  const ai = new GoogleGenAI({ apiKey });
  const modelChain = isComplexQuery(query) ? COMPLEX_MODEL_CHAIN : FAST_MODEL_CHAIN;
  const systemInstruction = buildSystemInstruction();
  const prompt = buildContextPrompt(query, chunks, scope);

  for (const model of modelChain) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.2,
          maxOutputTokens: 700,
        },
      });

      const text = response.text?.trim();
      if (text && text.length > 0) {
        // Post-LLM citation verification: only emit citations that exist in retrieved chunks
        const cited = chunks.filter((c) => text.includes(`[${c.id}]`));
        const finalChunks = cited.length > 0 ? cited : chunks.slice(0, 3);

        return {
          answer: text,
          citations: finalChunks.map((c) => ({
            id: c.id,
            label: c.sourceLabel,
            url: c.sourceUrl,
            scope: c.scope,
          })),
          modelUsed: model,
          grounded: true,
        };
      }
    } catch {
      // Fall through to next model in tiered chain or deterministic fallback
      continue;
    }
  }

  return buildDeterministicFallback(query, retrieved);
}
