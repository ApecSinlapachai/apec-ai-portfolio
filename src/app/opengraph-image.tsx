import { ImageResponse } from "next/og";

export const alt =
  "Apec Sinlapachai — AI & AI Automation Engineer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PROOF_BADGES = [
  { label: "25/25 RAG Eval", dot: "#10b981" },
  { label: "0.00 PDPA Leak", dot: "#10b981" },
  { label: "62.78% Cost Cut", dot: "#38bdf8" },
  { label: "Live Cloud Demos", dot: "#38bdf8" },
] as const;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#070b12",
          backgroundImage:
            "radial-gradient(circle at 88% 12%, rgba(56, 189, 248, 0.16), transparent 48%), radial-gradient(circle at 12% 88%, rgba(239, 68, 68, 0.1), transparent 42%), linear-gradient(135deg, #070b12 0%, #0e1420 100%)",
          padding: "56px 64px",
          color: "#f1f5f9",
          border: "1px solid #1e293b",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top bar: Red Maple Leaf emblem + domain + status pill */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "18px",
            }}
          >
            <svg
              width="52"
              height="52"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.5"
                width="31"
                height="31"
                rx="7.5"
                fill="#0f172a"
                stroke="#334155"
              />
              <path
                d="M16 4.5L17.9 8.6L20.1 7.6L18.7 13.3L22.5 10.3L22.2 12.4L26.4 12.2L24.3 14.9L25.4 16.8L20.4 18.6L21.1 20.8L16.7 20.1L17 27H15L15.3 20.1L10.9 20.8L11.6 18.6L6.6 16.8L7.7 14.9L5.6 12.2L9.8 12.4L9.5 10.3L13.3 13.3L11.9 7.6L14.1 8.6L16 4.5Z"
                fill="#ef4444"
                stroke="#dc2626"
                strokeWidth="0.75"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: "#94a3b8",
                letterSpacing: "0.01em",
              }}
            >
              apec-ai-portfolio.vercel.app
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
              padding: "10px 18px",
              borderRadius: "9999px",
              backgroundColor: "#0e1420",
              border: "1px solid #2c3a4f",
              fontSize: 16,
              fontWeight: 600,
              color: "#10b981",
              letterSpacing: "0.04em",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "9px",
                height: "9px",
                borderRadius: "9999px",
                backgroundColor: "#10b981",
              }}
            />
            <span>LIVE PORTFOLIO HUB</span>
          </div>
        </div>

        {/* Center hero identity */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 66,
              fontWeight: 700,
              color: "#f1f5f9",
              letterSpacing: "-0.025em",
              lineHeight: 1.06,
            }}
          >
            Apec Sinlapachai
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              fontWeight: 600,
              color: "#38bdf8",
              lineHeight: 1.2,
            }}
          >
            AI &amp; AI Automation Engineer
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 400,
              color: "#94a3b8",
              lineHeight: 1.4,
              marginTop: "6px",
            }}
          >
            Production Hybrid RAG · Stateful LangGraph Agents · Zero-Cold-Start Copilot
          </div>
        </div>

        {/* Bottom verified proof badges */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            width: "100%",
          }}
        >
          {PROOF_BADGES.map((badge) => (
            <div
              key={badge.label}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                flex: 1,
                justifyContent: "center",
                padding: "16px 18px",
                borderRadius: "14px",
                backgroundColor: "#0e1420",
                border: "1px solid #2c3a4f",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "10px",
                  height: "10px",
                  borderRadius: "9999px",
                  backgroundColor: badge.dot,
                }}
              />
              <span
                style={{
                  fontSize: 19,
                  fontWeight: 600,
                  color: "#f1f5f9",
                }}
              >
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
