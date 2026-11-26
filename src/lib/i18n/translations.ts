import type { Lang } from "./LanguageContext";

export interface MetricTranslation {
  label: string;
  value: string;
  detail: string;
}

export interface QuickPromptTranslation {
  label: string;
  scope: string;
  q: string;
}

export interface StarterChipTranslation {
  label: string;
  scope: string;
  prompt: string;
}

export interface DemoExplainerTranslation {
  badge: string;
  title: string;
  showLabel: string;
  hideLabel: string;
  whoTitle: string;
  whoBody: string;
  problemTitle: string;
  problemBody: string;
  solutionTitle: string;
  solutionBody: string;
  tryGuide: string;
}

export interface TranslationDictionary {
  nav: {
    brandName: string;
    roleBadge: string;
    overview: string;
    ragDemo: string;
    agentOpsDemo: string;
    askAi: string;
    llmsTitle: string;
    primaryNavAria: string;
    mobileNavAria: string;
    toggleLangAria: string;
    toggleLangTitle: string;
  };
  demoTopBar: {
    sameOriginProxy: string;
    githubRepo: string;
    askAiArchitecture: string;
  };
  footer: {
    title: string;
    subtitle: string;
    aiCopilot: string;
    github: string;
    tilNotes: string;
    llmsTxt: string;
  };
  home: {
    availabilityBadge: string;
    chatCta: string;
    ragDemoCta: string;
    agentOpsDemoCta: string;
    githubCta: string;
    telemetryHeader: string;
    ciVerified: string;
    heroMetrics: MetricTranslation[];
    copilotBarTitle: string;
    copilotBarHint: string;
    quickPrompts: QuickPromptTranslation[];
    flagshipTitle: string;
    flagshipSubtitle: string;
    flagshipBadge: string;
    liveCloudVerified: string;
    launchLiveDemo: string;
    architecture: string;
    github: string;
    prefillAiQuestion: string;
    additionalTitle: string;
    readCaseStudy: string;
    askAi: string;
  };
  projectDetail: {
    backToOverview: string;
    problemSummaryLabel: string;
    launchLiveDemo: string;
    prefillAiQuestion: string;
    githubRepo: string;
    deepDiveTitle: string;
    deepDiveHint: string;
  };
  chat: {
    badge: string;
    title: string;
    subtitle: string;
    guardrailsActive: string;
    scopeLabel: string;
    allScopeLabel: string;
    profileScopeLabel: string;
    emptyTitle: string;
    emptyDescPrefix: string;
    emptyDescSuffix: string;
    starterChips: StarterChipTranslation[];
    groundedSot: string;
    guardrailActive: string;
    loadingText: string;
    inputLabel: string;
    inputPlaceholder: string;
    sendButton: string;
    clearButton: string;
    networkError: string;
    requestFailedPrefix: string;
  };
  ragCopilot: {
    topBarTitle: string;
    topBarDefaultQuestion: string;
    headerTitle: string;
    headerSubtitle: string;
    proxyTitlePrefix: string;
    apiReadyPrefix: string;
    apiWarming: string;
    apiOffline: string;
    explainer: DemoExplainerTranslation;
    tabs: {
      rag: string;
      triage: string;
      eval: string;
    };
  };
  agentOps: {
    topBarTitle: string;
    topBarDefaultQuestion: string;
    headerTitle: string;
    headerSubtitle: string;
    endpointLabel: string;
    waitingApiPrefix: string;
    retryLabel: string;
    offlineApiPrefix: string;
    offlineRetriesSuffix: string;
    benchmarkLoadError: string;
    explainer: DemoExplainerTranslation;
    tabs: {
      sandbox: string;
      approvals: string;
      dlq: string;
      benchmark: string;
    };
  };
}

export const translations: Record<Lang, TranslationDictionary> = {
  en: {
    nav: {
      brandName: "Apec Sinlapachai",
      roleBadge: "AI Engineer",
      overview: "Overview",
      ragDemo: "RAG Demo",
      agentOpsDemo: "Agent Ops Demo",
      askAi: "Ask AI",
      llmsTitle: "Machine-readable llms.txt for AI Agents",
      primaryNavAria: "Primary navigation",
      mobileNavAria: "Mobile navigation",
      toggleLangAria: "Switch language to Thai",
      toggleLangTitle: "Switch UI language to ไทย (Thai)",
    },
    demoTopBar: {
      sameOriginProxy: "Same-Origin Proxy",
      githubRepo: "GitHub Repo",
      askAiArchitecture: "Ask AI about architecture",
    },
    footer: {
      title: "Apec Sinlapachai — AI & AI Automation Engineer",
      subtitle:
        "Next.js 15, Tailwind CSS v4, File-Driven Markdown SOT, and Same-Origin API Proxies ($0/mo).",
      aiCopilot: "AI Copilot",
      github: "GitHub",
      tilNotes: "TIL Notes",
      llmsTxt: "llms.txt",
    },
    home: {
      availabilityBadge: "Available for AI & AI Automation Engineer Roles",
      chatCta: "Chat with AI Copilot",
      ragDemoCta: "RAG Demo",
      agentOpsDemoCta: "Agent Ops Demo",
      githubCta: "GitHub",
      telemetryHeader: "verified-telemetry.sot",
      ciVerified: "CI Verified",
      heroMetrics: [
        {
          label: "Live Production AI Systems",
          value: "2 Flagships",
          detail: "Same-Origin Proxy",
        },
        {
          label: "RAG Golden Eval (Live)",
          value: "25 / 25",
          detail: "100% Pass Gate",
        },
        {
          label: "Tiered LLM Cost Reduction",
          value: "62.78%",
          detail: "Verified Savings",
        },
        {
          label: "PDPA PII Leak Rate",
          value: "0.00",
          detail: "32 / 32 Redacted",
        },
      ],
      copilotBarTitle:
        "Ask AI Copilot (Zero Cold-Start · TH / EN / Code-Mixed)",
      copilotBarHint: "Select a prompt to pre-fill input",
      quickPrompts: [
        {
          label: "Compare Project #1 (RAG) vs Project #2 (Agent Ops)",
          scope: "all",
          q: "Compare Apec's Enterprise RAG Ops Copilot vs Production AI Agent Ops architecture and verified metrics.",
        },
        {
          label: "How does $0 anti-hallucination guardrail work?",
          scope: "enterprise-rag-ops-copilot",
          q: "How does Project #1 prevent hallucinations at $0 guardrail cost?",
        },
        {
          label: "How did he cut LLM cost by 62.78% with 0.00 PDPA leak?",
          scope: "production-ai-agent-ops",
          q: "How does Project #2 enforce 0.00 PDPA leak rate and 62.78% LLM cost reduction?",
        },
        {
          label: "Summarize NOC 21232 / AI Engineer readiness",
          scope: "profile",
          q: "Summarize Apec Sinlapachai's technical readiness for AI / AI Automation Engineer roles.",
        },
      ],
      flagshipTitle: "Flagship Production AI Systems",
      flagshipSubtitle:
        "Live interactive demos running natively inside this hub via Same-Origin Next.js proxies, backed by independent GitHub repos & CI.",
      flagshipBadge: "100% Synthetic PDPA-Safe · No Login",
      liveCloudVerified: "Live Cloud Verified",
      launchLiveDemo: "Launch Live Demo",
      architecture: "Architecture",
      github: "GitHub",
      prefillAiQuestion: "Pre-fill AI question",
      additionalTitle:
        "Additional Production & Deterministic Automation Systems",
      readCaseStudy: "Read Case Study",
      askAi: "Ask AI",
    },
    projectDetail: {
      backToOverview: "Back to Portfolio Overview",
      problemSummaryLabel: "Problem & Business Impact",
      launchLiveDemo: "Launch Live Demo",
      prefillAiQuestion: "Pre-fill AI Question",
      githubRepo: "GitHub Repository",
      deepDiveTitle: "Deep-Dive Questions for AI Copilot",
      deepDiveHint: "Opens /chat with input pre-filled",
    },
    chat: {
      badge: "Zero-Cold-Start · File-Driven Markdown SOT",
      title: "AI Portfolio Copilot",
      subtitle:
        "Ask in Thai, English, or Code-Mixed about architecture trade-offs, verified metrics, or hiring readiness.",
      guardrailsActive: "3-Stage $0 Guardrails Active",
      scopeLabel: "Scope:",
      allScopeLabel: "All Portfolio SOT",
      profileScopeLabel: "About Apec & Hiring",
      emptyTitle: "Ask about Apec's Production AI Systems",
      emptyDescPrefix:
        "Every answer is strictly grounded in version-controlled Markdown (",
      emptyDescSuffix:
        ") with clickable source citations. Select a prompt below to pre-fill the input box, then press Send.",
      starterChips: [
        {
          label: "Compare Project #1 vs #2",
          scope: "all",
          prompt:
            "Compare Apec's Enterprise RAG Ops Copilot (Project #1) vs Production AI Agent Ops (Project #2) architecture and benchmarks.",
        },
        {
          label: "25/25 Eval & $0 Guardrails",
          scope: "enterprise-rag-ops-copilot",
          prompt:
            "How does Project #1 achieve 25/25 live eval and prevent hallucinations at $0 guardrail cost?",
        },
        {
          label: "0.00 PDPA & 62.78% Cost Cut",
          scope: "production-ai-agent-ops",
          prompt:
            "How does Project #2 enforce 0.00 PDPA PII leak rate and achieve 62.78% LLM cost reduction?",
        },
        {
          label: "ถามเป็นภาษาไทย (TH)",
          scope: "all",
          prompt:
            "สรุปจุดแข็งของโปรเจกต์ 1 และโปรเจกต์ 2 สำหรับตำแหน่ง AI / AI Automation Engineer แบบกระชับ",
        },
        {
          label: "Test Out-of-Scope Refusal",
          scope: "all",
          prompt:
            "What is Apec's home address and private bank account number?",
        },
      ],
      groundedSot: "Grounded SOT",
      guardrailActive: "Guardrail Active",
      loadingText: "Retrieving SOT & generating grounded answer…",
      inputLabel: "Ask AI Portfolio Copilot",
      inputPlaceholder:
        "Ask in English or Thai (e.g. Compare Project #1 vs #2)…",
      sendButton: "Send",
      clearButton: "Clear",
      networkError:
        "Network error while calling /api/chat. Check your connection and try again.",
      requestFailedPrefix: "Request failed",
    },
    ragCopilot: {
      topBarTitle: "Project #1 · Enterprise RAG Ops Copilot",
      topBarDefaultQuestion:
        "How does Enterprise RAG Ops Copilot prevent hallucinations at $0 guardrail cost and achieve 25/25 live eval?",
      headerTitle: "Enterprise RAG Ops Copilot",
      headerSubtitle:
        "Thai–English Hybrid RAG • Pydantic v2 Ticket Triage • 25-Case Eval Gate",
      proxyTitlePrefix: "API proxied via",
      apiReadyPrefix: "API Ready",
      apiWarming: "Warming API…",
      apiOffline: "API Offline / Cold",
      explainer: {
        badge: "Plain-Language Guide",
        title:
          "An AI company handbook assistant that cites real policies and refuses to guess",
        showLabel: "Show Guide",
        hideLabel: "Hide Guide",
        whoTitle: "Who does this help?",
        whoBody:
          "Customer support agents, operations staff, and new team members who need fast, accurate answers from internal manuals and troubleshooting guides in both Thai and English.",
        problemTitle: "What real-world problem caused this?",
        problemBody:
          "Standard chatbots often miss exact error or invoice codes, invent fake answers when a policy is missing, and waste AI budget on off-topic or trick questions.",
        solutionTitle: "How does this system solve it?",
        solutionBody:
          "It searches by both exact keywords and meaning, blocks unsafe or unsupported questions before paying for an AI response, and attaches clickable document sources to every answer.",
        tryGuide:
          "Try it below: pick a sample question in Hybrid RAG Copilot (including out-of-scope or trick queries), sort a support message in Ticket Triage, or inspect the 25-case test scorecard.",
      },
      tabs: {
        rag: "Hybrid RAG Copilot",
        triage: "Ticket Triage",
        eval: "Eval Scorecard & Corpus",
      },
    },
    agentOps: {
      topBarTitle: "Project #2 · Production AI Agent Ops",
      topBarDefaultQuestion:
        "How does Production AI Agent Ops achieve 0.00 PDPA leak rate, FOR UPDATE HITL/DLQ locking, and 62.78% LLM cost reduction?",
      headerTitle: "Production AI Agent Ops",
      headerSubtitle:
        "No-Login Live Control Plane • LangGraph State Machine • PDPA Redaction • HITL • Idempotent Retry + DLQ",
      endpointLabel: "endpoint",
      waitingApiPrefix: "Waiting for API via",
      retryLabel: "retry",
      offlineApiPrefix: "Could not connect to API via",
      offlineRetriesSuffix: "retries",
      benchmarkLoadError: "Failed to load benchmark scorecard.",
      explainer: {
        badge: "Plain-Language Guide",
        title:
          "A safety-first AI workflow engine that protects customer data and requires human sign-off on risky actions",
        showLabel: "Show Guide",
        hideLabel: "Hide Guide",
        whoTitle: "Who does this help?",
        whoBody:
          "Operations managers, compliance teams, and support leads who want AI to speed up routine customer requests without risking data leaks, duplicate refunds, or runaway bills.",
        problemTitle: "What real-world problem caused this?",
        problemBody:
          "Unchecked AI agents can accidentally send private customer details to external AI models, issue double refunds when a request arrives twice, or waste money using expensive models for simple tasks.",
        solutionTitle: "How does this system solve it?",
        solutionBody:
          "It hides sensitive personal info before any AI sees it, pauses high-risk actions like refunds for human approval, prevents duplicate runs, and sends simple tasks to low-cost models.",
        tryGuide:
          "Try it below: load a scenario in Workflow Sandbox to watch personal data get masked live, approve or reject paused actions in HITL Approvals, or compare savings in Cost Benchmark.",
      },
      tabs: {
        sandbox: "Workflow Sandbox",
        approvals: "HITL Approvals",
        dlq: "Dead-Letter Queue",
        benchmark: "Cost Benchmark",
      },
    },
  },
  th: {
    nav: {
      brandName: "Apec Sinlapachai",
      roleBadge: "วิศวกร AI",
      overview: "ภาพรวม",
      ragDemo: "เดโม RAG",
      agentOpsDemo: "เดโม Agent Ops",
      askAi: "ถาม AI",
      llmsTitle: "ไฟล์ llms.txt สำหรับ AI Agent",
      primaryNavAria: "เมนูนำทางหลัก",
      mobileNavAria: "เมนูนำทางมือถือ",
      toggleLangAria: "Switch language to English",
      toggleLangTitle: "สลับภาษาเป็นภาษาอังกฤษ (English)",
    },
    demoTopBar: {
      sameOriginProxy: "พร็อกซี Same-Origin",
      githubRepo: "โค้ด GitHub",
      askAiArchitecture: "ถาม AI เรื่องสถาปัตยกรรม",
    },
    footer: {
      title: "Apec Sinlapachai — วิศวกร AI และระบบอัตโนมัติ (AI Automation)",
      subtitle:
        "Next.js 15, Tailwind CSS v4, แหล่งข้อมูล Markdown SOT และพร็อกซี API โดเมนเดียวกัน ($0/เดือน)",
      aiCopilot: "ผู้ช่วย AI",
      github: "GitHub",
      tilNotes: "บันทึก TIL",
      llmsTxt: "llms.txt",
    },
    home: {
      availabilityBadge: "พร้อมร่วมงานในตำแหน่ง AI & AI Automation Engineer",
      chatCta: "คุยกับ AI Copilot",
      ragDemoCta: "เดโม RAG",
      agentOpsDemoCta: "เดโม Agent Ops",
      githubCta: "GitHub",
      telemetryHeader: "verified-telemetry.sot",
      ciVerified: "ผ่านการตรวจ CI แล้ว",
      heroMetrics: [
        {
          label: "ระบบ AI Production ที่รันจริง",
          value: "2 Flagships",
          detail: "พร็อกซีโดเมนเดียวกัน",
        },
        {
          label: "ผลประเมิน RAG (Live Eval)",
          value: "25 / 25",
          detail: "ผ่านเกณฑ์ 100%",
        },
        {
          label: "ลดต้นทุน LLM แบบแบ่งชั้น",
          value: "62.78%",
          detail: "ประหยัดที่ตรวจสอบแล้ว",
        },
        {
          label: "อัตราข้อมูลส่วนบุคคล PDPA รั่วไหล",
          value: "0.00",
          detail: "ปกปิดครบ 32 / 32 จุด",
        },
      ],
      copilotBarTitle:
        "ถาม AI Copilot (ตอบทันที · รองรับ ไทย / อังกฤษ / ผสมภาษา)",
      copilotBarHint: "เลือกคำถามเพื่อเติมลงในช่องพิมพ์อัตโนมัติ",
      quickPrompts: [
        {
          label: "เปรียบเทียบโปรเจกต์ #1 (RAG) กับ #2 (Agent Ops)",
          scope: "all",
          q: "เปรียบเทียบสถาปัตยกรรมและตัวเลขวัดผลจริงของโปรเจกต์ #1 Enterprise RAG Ops Copilot กับโปรเจกต์ #2 Production AI Agent Ops",
        },
        {
          label: "Guardrail กันข้อมูลมั่วต้นทุน $0 ทำงานอย่างไร?",
          scope: "enterprise-rag-ops-copilot",
          q: "โปรเจกต์ #1 ป้องกัน Hallucination ด้วย Guardrail ต้นทุน $0 ได้อย่างไร?",
        },
        {
          label: "ลดต้นทุน LLM 62.78% โดย PDPA ไม่รั่วเลยทำอย่างไร?",
          scope: "production-ai-agent-ops",
          q: "โปรเจกต์ #2 คุมอัตราข้อมูล PDPA รั่วไหลเป็น 0.00 และลดต้นทุน LLM ได้ 62.78% อย่างไร?",
        },
        {
          label: "สรุปความพร้อมสายงาน AI / AI Automation Engineer",
          scope: "profile",
          q: "สรุปความพร้อมด้านเทคนิคของ Apec Sinlapachai สำหรับตำแหน่ง AI และ AI Automation Engineer",
        },
      ],
      flagshipTitle: "ระบบ AI Production หลัก (Flagship Systems)",
      flagshipSubtitle:
        "เดโมโต้ตอบจริงที่รันในหน้าเว็บนี้ผ่านพร็อกซี Next.js โดเมนเดียวกัน พร้อม GitHub Repo และ CI แยกอิสระ",
      flagshipBadge: "ข้อมูลจำลอง PDPA 100% · ไม่ต้องล็อกอิน",
      liveCloudVerified: "ตรวจสอบบนคลาวด์จริงแล้ว",
      launchLiveDemo: "เปิดเดโมใช้งานจริง",
      architecture: "สถาปัตยกรรม",
      github: "GitHub",
      prefillAiQuestion: "เติมคำถามให้ AI",
      additionalTitle: "ระบบ Production และระบบอัตโนมัติเชิงกำหนดเพิ่มเติม",
      readCaseStudy: "อ่านกรณีศึกษา",
      askAi: "ถาม AI",
    },
    projectDetail: {
      backToOverview: "กลับไปหน้าภาพรวมพอร์ตโฟลิโอ",
      problemSummaryLabel: "ปัญหาที่แก้ไขและผลลัพธ์เชิงปฏิบัติการ",
      launchLiveDemo: "เปิดเดโมใช้งานจริง",
      prefillAiQuestion: "เติมคำถามให้ AI",
      githubRepo: "คลังโค้ด GitHub",
      deepDiveTitle: "คำถามเจาะลึกสำหรับ AI Copilot",
      deepDiveHint: "เปิดหน้า /chat พร้อมเติมคำถามให้อัตโนมัติ",
    },
    chat: {
      badge: "Zero-Cold-Start · ข้อมูลจาก Markdown SOT",
      title: "AI Portfolio Copilot",
      subtitle:
        "ถามเป็นภาษาไทย อังกฤษ หรือผสมภาษาเกี่ยวกับการออกแบบสถาปัตยกรรม ตัวเลขวัดผลจริง หรือความพร้อมในการทำงาน",
      guardrailsActive: "เปิดใช้งาน Guardrail 3 ชั้น ($0)",
      scopeLabel: "ขอบเขต:",
      allScopeLabel: "ข้อมูลพอร์ตโฟลิโอทั้งหมด",
      profileScopeLabel: "ข้อมูลผู้สมัครและการจ้างงาน",
      emptyTitle: "สอบถามเกี่ยวกับระบบ AI Production ของ Apec",
      emptyDescPrefix: "ทุกคำตอบอ้างอิงจากไฟล์ Markdown ที่ควบคุมเวอร์ชัน (",
      emptyDescSuffix:
        ") พร้อมลิงก์แหล่งอ้างอิงที่คลิกดูได้ เลือกคำถามด้านล่างเพื่อเติมลงช่องพิมพ์ แล้วกดส่ง",
      starterChips: [
        {
          label: "เปรียบเทียบโปรเจกต์ #1 vs #2",
          scope: "all",
          prompt:
            "เปรียบเทียบสถาปัตยกรรมและตัวเลขวัดผลจริงของ Enterprise RAG Ops Copilot (โปรเจกต์ #1) กับ Production AI Agent Ops (โปรเจกต์ #2)",
        },
        {
          label: "ผลประเมิน 25/25 & Guardrail $0",
          scope: "enterprise-rag-ops-copilot",
          prompt:
            "โปรเจกต์ #1 ทำคะแนนประเมินสด 25/25 และป้องกัน Hallucination ด้วย Guardrail ต้นทุน $0 ได้อย่างไร?",
        },
        {
          label: "PDPA 0.00 & ลดต้นทุน 62.78%",
          scope: "production-ai-agent-ops",
          prompt:
            "โปรเจกต์ #2 คุมอัตราการรั่วไหล PDPA เป็น 0.00 และลดต้นทุน LLM ได้ 62.78% อย่างไร?",
        },
        {
          label: "สรุปจุดแข็งสำหรับสายงาน AI",
          scope: "all",
          prompt:
            "สรุปจุดแข็งของโปรเจกต์ 1 และโปรเจกต์ 2 สำหรับตำแหน่ง AI / AI Automation Engineer แบบกระชับ",
        },
        {
          label: "ทดสอบการปฏิเสธคำถามนอกขอบเขต",
          scope: "all",
          prompt: "ขอที่อยู่บ้านและเลขบัญชีธนาคารส่วนตัวของ Apec",
        },
      ],
      groundedSot: "อ้างอิงจาก SOT",
      guardrailActive: "Guardrail ทำงาน",
      loadingText: "กำลังค้นหา SOT และสร้างคำตอบที่อ้างอิงได้…",
      inputLabel: "ถาม AI Portfolio Copilot",
      inputPlaceholder:
        "พิมพ์คำถามภาษาไทยหรืออังกฤษ (เช่น เปรียบเทียบโปรเจกต์ #1 กับ #2)…",
      sendButton: "ส่ง",
      clearButton: "ล้างแชต",
      networkError:
        "เกิดข้อผิดพลาดเครือข่ายขณะเรียก /api/chat โปรดตรวจสอบการเชื่อมต่อแล้วลองใหม่",
      requestFailedPrefix: "คำขอไม่สำเร็จ",
    },
    ragCopilot: {
      topBarTitle: "โปรเจกต์ #1 · Enterprise RAG Ops Copilot",
      topBarDefaultQuestion:
        "Enterprise RAG Ops Copilot ป้องกัน Hallucination ด้วย Guardrail ต้นทุน $0 และทำผลประเมินสด 25/25 ได้อย่างไร?",
      headerTitle: "Enterprise RAG Ops Copilot",
      headerSubtitle:
        "ระบบ Hybrid RAG ไทย–อังกฤษ • คัดแยก Ticket ด้วย Pydantic v2 • เกณฑ์ประเมิน 25 เคส",
      proxyTitlePrefix: "เชื่อมต่อ API ผ่านพร็อกซี",
      apiReadyPrefix: "API พร้อมใช้งาน",
      apiWarming: "กำลังปลุก API…",
      apiOffline: "API ออฟไลน์ / กำลังเริ่ม",
      explainer: {
        badge: "อธิบายระบบแบบเข้าใจง่าย",
        title:
          "ผู้ช่วย AI ค้นหาคู่มือองค์กรที่อ้างอิงเอกสารจริง และไม่เดาคำตอบเมื่อไม่มีข้อมูล",
        showLabel: "แสดงคำอธิบาย",
        hideLabel: "ซ่อนคำอธิบาย",
        whoTitle: "ระบบนี้ช่วยใคร?",
        whoBody:
          "เจ้าหน้าที่ซัพพอร์ต ทีมปฏิบัติการ และพนักงานใหม่ที่ต้องค้นหาคำตอบจากคู่มือการทำงาน เงื่อนไข SLA และวิธีแก้ปัญหาทั้งภาษาไทยและอังกฤษอย่างรวดเร็วและแม่นยำ",
        problemTitle: "เกิดจากปัญหาจริงอะไร?",
        problemBody:
          "แชตบอตทั่วไปมักหาโค้ดข้อผิดพลาดหรือเลขที่เอกสารเฉพาะไม่เจอ ชอบแต่งคำตอบเองเวลาไม่มีข้อมูลในคลัง และเปลืองค่า API ไปกับคำถามนอกเรื่องหรือคำถามที่พยายามหลอกระบบ",
        solutionTitle: "ระบบนี้แก้ปัญหาอย่างไร?",
        solutionBody:
          "ค้นหาแบบผสานทั้งคำตรงตัวและความหมาย คัดกรองคำถามที่อันตรายหรือไม่มีหลักฐานทิ้งก่อนเรียก AI เพื่อประหยัดงบ และแนบเอกสารอ้างอิงจริงให้ตรวจสอบได้ทุกคำตอบ",
        tryGuide:
          "ลองเล่นด้านล่าง: เลือกคำถามตัวอย่างในแท็บถาม-ตอบ Hybrid RAG (ลองเคสคำถามนอกคลังหรือคำถามหลอกได้), ทดสอบคัดแยก Ticket หรือดูผลคะแนนทดสอบ 25 เคสในแท็บ Eval",
      },
      tabs: {
        rag: "ถาม-ตอบ Hybrid RAG",
        triage: "คัดแยก Ticket Triage",
        eval: "ผล Eval Scorecard และคลังเอกสาร",
      },
    },
    agentOps: {
      topBarTitle: "โปรเจกต์ #2 · Production AI Agent Ops",
      topBarDefaultQuestion:
        "Production AI Agent Ops ทำอัตราการรั่วไหล PDPA 0.00, การล็อกคิว HITL/DLQ ด้วย FOR UPDATE และลดต้นทุน LLM 62.78% ได้อย่างไร?",
      headerTitle: "Production AI Agent Ops",
      headerSubtitle:
        "Control Plane ใช้งานจริงไม่ต้องล็อกอิน • LangGraph State Machine • ปกปิด PDPA • อนุมัติ HITL • Retry แบบ Idempotent + DLQ",
      endpointLabel: "endpoint",
      waitingApiPrefix: "กำลังรอการตอบกลับจาก API ผ่าน",
      retryLabel: "ลองใหม่ครั้งที่",
      offlineApiPrefix: "ไม่สามารถเชื่อมต่อ API ผ่าน",
      offlineRetriesSuffix: "ครั้ง",
      benchmarkLoadError: "ไม่สามารถโหลดตารางคะแนน Benchmark ได้",
      explainer: {
        badge: "อธิบายระบบแบบเข้าใจง่าย",
        title:
          "ระบบ AI จัดการงานอัตโนมัติที่ปกป้องข้อมูลลูกค้า และให้คนอนุมัติก่อนทำรายการสำคัญ",
        showLabel: "แสดงคำอธิบาย",
        hideLabel: "ซ่อนคำอธิบาย",
        whoTitle: "ระบบนี้ช่วยใคร?",
        whoBody:
          "ผู้จัดการฝ่ายปฏิบัติการ ทีมกำกับดูแลข้อมูล และหัวหน้าทีมซัพพอร์ตที่ต้องการใช้ AI ช่วยลดงานประจำ โดยไม่เสี่ยงต่อข้อมูลลูกค้าหลุด การทำรายการซ้ำ หรือค่าใช้จ่ายบานปลาย",
        problemTitle: "เกิดจากปัญหาจริงอะไร?",
        problemBody:
          "AI Agent ที่ไม่มีระบบควบคุมอาจส่งข้อมูลส่วนตัวลูกค้าออกไปให้โมเดลภายนอกโดยตรง เผลอทำรายการคืนเงินซ้ำเมื่อระบบส่งคำสั่งซ้ำ หรือใช้โมเดลราคาแพงเกินจำเป็นกับงานง่าย ๆ",
        solutionTitle: "ระบบนี้แก้ปัญหาอย่างไร?",
        solutionBody:
          "ปิดบังข้อมูลส่วนบุคคลก่อนส่งให้ AI ทุกครั้ง หยุดรอให้คนกดอนุมัติก่อนทำรายการเสี่ยงสูง กันการทำงานซ้ำซ้อน และเลือกใช้โมเดลประหยัดต้นทุนสำหรับงานที่ไม่ซับซ้อน",
        tryGuide:
          "ลองเล่นด้านล่าง: เลือกสถานการณ์ตัวอย่างในแท็บทดสอบเวิร์กโฟลว์เพื่อดูการซ่อนข้อมูลส่วนตัวแบบสด ๆ, กดอนุมัติงานในคิว HITL หรือดูตัวเลขประหยัดต้นทุนในแท็บวัดผลต้นทุน",
      },
      tabs: {
        sandbox: "ทดสอบเวิร์กโฟลว์",
        approvals: "คิวอนุมัติ HITL",
        dlq: "คิวงานล้มเหลว (DLQ)",
        benchmark: "วัดผลต้นทุน",
      },
    },
  },
};

export function getDictionary(lang: Lang): TranslationDictionary {
  return translations[lang];
}
