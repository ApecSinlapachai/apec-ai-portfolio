import React from "react";
import type { Metadata } from "next";
import { Anuphan, Inter, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const anuphan = Anuphan({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-thai",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://apec-ai-portfolio.vercel.app";
const SITE_TITLE = "Apec Sinlapachai | AI & AI Automation Engineer Portfolio";
const SITE_DESCRIPTION =
  "Unified AI Engineering Portfolio featuring live Enterprise Hybrid RAG Copilot, Production LangGraph AI Agent Ops, verified eval benchmarks, and a Zero-Cold-Start AI Copilot.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Apec Sinlapachai — AI & AI Automation Engineer",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

const THEME_INIT_SCRIPT = `
(function() {
  try {
    var saved = localStorage.getItem('apec-portfolio-theme');
    if (saved === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.style.colorScheme = 'light';
    } else {
      document.documentElement.style.colorScheme = 'dark';
    }
  } catch (e) {}
})();
`;

const LANG_INIT_SCRIPT = `
(function() {
  try {
    var saved = localStorage.getItem('apec-portfolio-lang');
    var lang = saved === 'th' ? 'th' : 'en';
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${anuphan.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: LANG_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[var(--accent)] focus:px-3 focus:py-2 focus:text-xs focus:font-semibold focus:text-[var(--accent-fg)]"
        >
          Skip to main content
        </a>
        <LanguageProvider>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
