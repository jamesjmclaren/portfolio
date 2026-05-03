# James McLaren — Portfolio

Personal portfolio site. Single-page infinite-scroll narrative covering About, Projects, Work and Contact, with deep-dive infinite-scroll pages for each project that showcase real code, CSS and feature lists pulled from the original repos.

Built with **Claude Code**.

## Stack

- Next.js 15 (App Router) + React 19
- TypeScript
- Tailwind CSS v4
- Shiki (server-side syntax highlighting)
- Framer Motion (scroll animations)

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `src/app/page.tsx` — home page, composes all sections
- `src/app/projects/[slug]/page.tsx` — per-project deep-dive
- `src/data/projects.ts` — typed project content (pitch, features, code excerpts)
- `src/components/sections/*` — home page sections
- `src/components/project/*` — project deep-dive building blocks
- `src/components/{CodeBlock,ScrollReveal,Section,Nav}.tsx` — shared
