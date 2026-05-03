import { codeToHtml } from "shiki";

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
  caption?: string;
}

export default async function CodeBlock({
  code,
  language,
  filename,
  caption,
}: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: "github-dark-default",
  });

  return (
    <figure className="rounded-2xl border border-border bg-surface overflow-hidden shadow-2xl shadow-black/40">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-elevated">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-text-muted/30" />
            <span className="size-2.5 rounded-full bg-text-muted/30" />
            <span className="size-2.5 rounded-full bg-text-muted/30" />
            <span className="ml-3 font-mono text-xs text-text-secondary">{filename}</span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
            {language}
          </span>
        </div>
      )}
      <div className="shiki-wrap" dangerouslySetInnerHTML={{ __html: html }} />
      {caption && (
        <figcaption className="px-5 py-3 border-t border-border text-sm text-text-secondary bg-surface-elevated">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
