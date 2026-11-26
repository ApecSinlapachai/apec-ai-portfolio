import type { NextConfig } from "next";

const normalizeTarget = (value: string | undefined, fallback: string): string =>
  (value || fallback).replace(/\/+$/, "");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    const ragTarget = normalizeTarget(
      process.env.RAG_API_PROXY_TARGET,
      "https://enterprise-rag-ops-copilot-api.onrender.com"
    );
    const agentTarget = normalizeTarget(
      process.env.AGENT_API_PROXY_TARGET,
      "https://production-ai-agent-ops-api.onrender.com"
    );

    return [
      {
        source: "/api/proxy/rag/:path*",
        destination: `${ragTarget}/:path*`,
      },
      {
        source: "/api/proxy/agent/:path*",
        destination: `${agentTarget}/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
