import CodeBlock from "../CodeBlock";
import ScrollReveal from "../ScrollReveal";
import { CodeSnippet } from "@/data/projects";

export default function CodeShowcase({ snippets }: { snippets: CodeSnippet[] }) {
  return (
    <div className="space-y-16">
      {snippets.map((s, i) => (
        <ScrollReveal key={s.filename + i} delay={0.05}>
          <CodeBlock
            code={s.code}
            language={s.language}
            filename={s.filename}
            caption={s.caption}
          />
        </ScrollReveal>
      ))}
    </div>
  );
}
