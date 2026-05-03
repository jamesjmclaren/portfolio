export default function StackBadges({ stack }: { stack: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {stack.map((s) => (
        <span
          key={s}
          className="text-sm font-mono text-text-secondary border border-border bg-surface rounded-lg px-3 py-1.5"
        >
          {s}
        </span>
      ))}
    </div>
  );
}
