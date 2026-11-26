import React from "react";

export function renderInlineMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-semibold text-[var(--foreground)]">
          {renderInlineMarkdown(part.slice(2, -2))}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={idx}
          className="rounded border border-[var(--border)] bg-[var(--surface-elevated)] px-1.5 py-0.5 font-mono text-xs text-[var(--accent)]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

export default function MarkdownArticle({ content }: { content: string }) {
  const lines = content.split(/\r?\n/);
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = (keyPrefix: string) => {
    if (listItems.length === 0) return;
    elements.push(
      <ul
        key={`${keyPrefix}-ul`}
        className="my-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--muted)] sm:text-[15px]"
      >
        {listItems.map((item, idx) => (
          <li key={`${keyPrefix}-li-${idx}`}>{renderInlineMarkdown(item)}</li>
        ))}
      </ul>
    );
    listItems = [];
  };

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();
    if (!line) {
      flushList(`line-${index}`);
      return;
    }

    if (line.startsWith("## ")) {
      flushList(`line-${index}`);
      elements.push(
        <h2
          key={`h2-${index}`}
          className="mt-8 mb-3 scroll-mt-20 border-b border-[var(--border)] pb-2 text-xl font-bold tracking-tight text-[var(--foreground)]"
        >
          {renderInlineMarkdown(line.slice(3))}
        </h2>
      );
      return;
    }

    if (line.startsWith("### ")) {
      flushList(`line-${index}`);
      elements.push(
        <h3
          key={`h3-${index}`}
          className="mt-5 mb-2 scroll-mt-20 text-base font-semibold text-[var(--accent)]"
        >
          {renderInlineMarkdown(line.slice(4))}
        </h3>
      );
      return;
    }

    if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
      return;
    }

    flushList(`line-${index}`);
    elements.push(
      <p
        key={`p-${index}`}
        className="my-3 text-sm leading-7 text-[var(--muted)] sm:text-[15px]"
      >
        {renderInlineMarkdown(line)}
      </p>
    );
  });

  flushList("end");

  return <div className="max-w-[72ch]">{elements}</div>;
}
