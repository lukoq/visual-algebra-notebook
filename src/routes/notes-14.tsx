import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { useI18n } from "@/i18n/I18nProvider";

export const Route = createFileRoute("/notes-14")({
  head: () => ({
    meta: [
      { title: "Przestrzenie Hilberta" }
    ],
  }),
  component: Notes,
});

function Notes() {
  const { locale } = useI18n();
  const [content, setContent] = useState("");

  useEffect(() => {
    const file = locale === "pl" ? "/notes-14-pl.md" : "/notes-14-en.md";
    fetch(file)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch ${file}`);
        return res.text();
      })
      .then(setContent)
      .catch(() => setContent(""));
  }, [locale]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
      {content ? (
        <>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Github: lukoq
          </div>
          <div className="w-full text-left prose prose-invert max-w-none markdown-body">
            <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{content}</ReactMarkdown>
          </div>
        </>
      ) : (
        <div className="text-left text-sm text-muted-foreground/60">Loading&hellip;</div>
      )}
    </div>
  );
}
