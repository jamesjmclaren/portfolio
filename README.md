# James McLaren — Portfolio

Personal portfolio site. A single, plainly-scrolling page: who I am, an AI search that answers
questions about my experience, personal projects, and employment history. Clicking a project opens
a modal with the full write-up — pitch, features, stack, interactive demos running on mock data,
and design screens. Employment rows link out to each employer.

Built with **Claude Code**.

## Stack

- Next.js 15 (App Router) + React 19
- TypeScript
- Tailwind CSS v4 (the in-page product demos) + CSS custom properties (page chrome)
- Anthropic API (`@anthropic-ai/sdk`) for the "Ask about me" search

## Develop

```bash
npm install
cp .env.example .env.local   # add an ANTHROPIC_API_KEY for the ask feature
npm run dev
```

Open http://localhost:3000. Without a key the page works fine — the ask box just returns
"not configured".

## Structure

- `src/app/page.tsx` — renders the one-page site
- `src/app/projects/[slug]/page.tsx` — same page with that project's modal already open, so every
  project keeps a shareable URL
- `src/app/api/ask/route.ts` — server-side Claude call for the search box
- `src/data/about.ts` — profile, employment history, skills, CV text, and `buildAboutContext()`
- `src/data/projects.ts` — typed project content (pitch, features, stack, screenshots)
- `src/components/home/*` — the page, the project modal, the ask box, the email captcha
- `src/projects/*` — the interactive product demos shown inside project modals

## Ask about me

`/api/ask` sends the question to Claude with a system prompt built by `buildAboutContext()`, which
assembles the CV profile, every role and its highlights, the skills list, education, and all project
copy from the same data the page renders — so the search can never drift from the site. The model is
told to answer only from that context, in 2-4 sentences, and to point people at the email address
when the context does not cover the question.

- Model: `claude-opus-5`, overridable with `ASK_MODEL` (e.g. `claude-sonnet-5`, `claude-haiku-4-5`)
- The key is server-side only; the browser never sees it
- Questions are capped at 300 characters, with a per-IP hourly cap as a cost speed bump
