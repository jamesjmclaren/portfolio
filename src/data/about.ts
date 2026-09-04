import { projectMeta } from "./projects";

/** Everything the site knows about James — the single source for the hero copy,
 *  the employment list, and the context the "ask about me" search runs on. */

export const profile = {
  name: "James McLaren",
  eyebrow: "Quality Engineering / Agentic QA",
  location: "Edinburgh, Scotland — working remote",
  email: "jamesjmclaren@gmail.com",
  github: "https://github.com/jamesjmclaren",
  linkedin: "https://www.linkedin.com/in/james-mclaren-5baaab2b",
  cv: "/James_McLaren_CV.pdf",
  blurb:
    "Quality engineering leader, 13+ years. Currently the sole automation engineer at io.finnet, running QA through agentic workflows built on Claude Code — nightly triage, root cause analysis, test generation, and fixing defects directly in the codebase. Built and led QA teams at io.finnet and YouView before that.",
};

export interface Job {
  company: string;
  /** Employer site — the row links here. */
  url: string;
  role: string;
  years: string;
  logo: string;
  /** YouView's mark is white-on-transparent, so its chip needs a dark background. */
  darkChip?: boolean;
  location: string;
  skills: string[];
  /** Not rendered — read by the ask-about-me context so answers can go deeper. */
  highlights: string[];
}

/** Newest first. The sort toggle reverses this list. */
export const jobs: Job[] = [
  {
    company: "io.finnet",
    url: "https://iofinnet.com",
    role: "Lead Software Quality Assurance Engineer",
    years: "Jan 2026 – Present",
    logo: "/logos/iofinnet.svg",
    location: "Remote",
    skills: ["Claude Code", "Agentic QA", "Playwright", "TypeScript", "Appium", "QASE", "Allure"],
    highlights: [
      "Sole engineer responsible for all test automation across a multi-product blockchain platform, sustaining coverage previously maintained by a team of four by rebuilding the function around agentic workflows.",
      "Built an agentic QA capability on Claude Code: reusable Skills that triage nightly test runs, cluster failures, identify likely root cause, propose fixes and raise Jira tickets, so each day starts with a prioritised list rather than raw logs.",
      "Fixes product defects directly in the application codebase rather than raising and handing off, removing a dependency on developer capacity for QA-found issues.",
      "Authors reusable Claude Skills and prompt templates across work repositories and personal projects, standardising QA workflows and reducing token spend on repeatable tasks.",
      "Claude Code as the primary agentic tool, with AWS Kiro, OpenAI Codex and CodeRabbit for code review and proof-of-concept work.",
      "Generates QASE test cases via AI for compliance, network transfer and vault operation flows.",
      "Built an Appium/WebDriver mobile automation framework to extend coverage to native app releases.",
      "Set up Allure reporting across the automation suite; optimised nightly CI jobs so results are triaged before the working day starts.",
      "Delivered QA for the multi-million dollar tokenisation launch and the onboarding of top 20 crypto exchanges, OTC desks and banking clients.",
    ],
  },
  {
    company: "io.finnet",
    url: "https://iofinnet.com",
    role: "Head of QA",
    years: "Dec 2021 – Jan 2026",
    logo: "/logos/iofinnet.svg",
    location: "Remote",
    skills: ["Playwright", "TypeScript", "GitHub Actions", "CI/CD", "Blockchain", "MPC", "Smart Contracts"],
    highlights: [
      "Built the QA function from scratch — hired, managed and mentored a team of 4 engineers across a multi-product blockchain environment.",
      "Developed a Playwright/TypeScript automation framework of hundreds of end-to-end tests, automating 80%+ of the regression pack.",
      "Implemented CI/CD via GitHub Actions with automated test runs on deployment, production smoke tests and rollback triggers on failure.",
      "Led testing across 20+ blockchain networks including Ethereum, Bitcoin, Solana, Tron and Ripple, and tested MPC technology across mobile and server-hosted virtual devices.",
      "Delivered QA for smart contract functionality (minting, burning, transaction logic) on private EVM networks built for banking clients, and integrations with Bitfinex, Kiln and WalletConnect.",
      "Release manager for 15+ major releases and the coordination point between tech leads across multiple workstreams.",
    ],
  },
  {
    company: "YouView TV Ltd",
    url: "https://www.youview.com",
    role: "QA Manager",
    years: "Jul 2014 – Dec 2021",
    logo: "/logos/youview.svg",
    darkChip: true,
    location: "London",
    skills: ["Selenium", "Team Leadership", "React/HTML5 UI", "Release Management", "Connected TV"],
    highlights: [
      "Led 11 QA engineers as direct reports across 5 SCRUM teams, covering manual and automated testing for set-top box software serving 2 million+ customers.",
      "Managed 3 SDETs building Selenium automation running on physical set-top box hardware, plus component suites for the React/HTML5 UI layer.",
      "Delivered QA for the HTML5 UI migration replacing legacy ActionScript, the Sony Android TV app, and the 4K set-top box with BT as technical lead.",
      "Led testing for the first UK Netflix integration in connected TV.",
      "Tested the full stack: middleware on Humax, Huawei and Sony hardware, the frontend layer, and streaming via digital and DTT.",
      "Drove full automation of the deployment pipeline, and helped establish the graduate and internship programmes.",
    ],
  },
  {
    company: "Accenture",
    url: "https://www.accenture.com",
    role: "Graduate Software Engineer",
    years: "Aug 2011 – Jul 2014",
    logo: "/logos/accenture.svg",
    location: "London",
    skills: ["Software Engineering", "Client Delivery"],
    highlights: ["Worked across several large-scale client projects including DWP and BT Sport."],
  },
  {
    company: "Mastercard (Datacash)",
    url: "https://www.mastercard.com",
    role: "Software Engineer Intern",
    years: "Jul – Sep 2010",
    logo: "/logos/mastercard.svg",
    location: "London",
    skills: ["Software Engineering"],
    highlights: ["Summer internship on the Datacash payments platform."],
  },
];

export const education = [
  { qualification: "BSc Applied Computing, First Class", place: "University of Dundee", years: "2007 – 2011" },
];

export const skillGroups = [
  {
    label: "AI and agentic",
    items: [
      "Claude Code", "Claude Skills", "agentic QA workflows", "AI-assisted test generation",
      "AI root cause analysis", "prompt engineering", "AWS Kiro", "OpenAI Codex", "CodeRabbit",
    ],
  },
  {
    label: "Automation and testing",
    items: [
      "Playwright", "TypeScript", "JavaScript", "Appium", "WebDriver", "Selenium",
      "API testing", "test strategy", "regression automation", "QASE", "Allure",
    ],
  },
  {
    label: "Engineering and infrastructure",
    items: ["Git", "GitHub Actions", "CI/CD", "Docker", "Docker Compose", "AWS", "Node.js"],
  },
  {
    label: "Domain",
    items: [
      "blockchain", "Web3", "MPC", "smart contracts", "EVM",
      "digital asset custody", "exchange and banking integrations",
    ],
  },
  {
    label: "Leadership",
    items: [
      "team building", "hiring and recruitment", "mentoring", "release management",
      "stakeholder management", "Agile (SCRUM and Kanban)",
    ],
  },
];

/** Lifted from the CV so the search answers about things the page never shows. */
export const cvProfile = `Quality engineering leader with 13+ years' experience building QA functions and driving delivery across complex technical environments. Now working in an AI-first capacity as the sole automation engineer at io.finnet, sustaining and extending the full automation estate through agentic workflows built on Claude Code — nightly triage, root cause analysis, test generation and reporting, and fixing product defects directly in the codebase rather than handing them off. Converted a four-person QA function into an agent-driven operation run single-handedly, without loss of coverage. Previously built the io.finnet QA function from zero to four engineers, establishing a Playwright/TypeScript framework that reached 80%+ automated regression coverage across MPC technology, smart contracts, 20+ blockchain networks, exchange integrations and banking partnerships. Before that, led 11 QA engineers across 5 SCRUM teams at YouView. Known internally as the person who unblocks problems, understands how products actually work, and always knows the real state of play across deployments and environments.

Seeking remote Agentic QA, QA Engineering or Quality Engineering roles.`;

/** Assembled at request time from the same data the page renders, so the search
 *  and the site can never drift apart. */
export function buildAboutContext(): string {
  const experience = jobs
    .map((j) =>
      [
        `${j.role} — ${j.company} (${j.location}), ${j.years}`,
        `Skills: ${j.skills.join(", ")}`,
        ...j.highlights.map((h) => `- ${h}`),
      ].join("\n"),
    )
    .join("\n\n");

  const projects = projectMeta
    .map((p) =>
      [
        `${p.title} (${p.status}${p.url ? `, live at ${p.url}` : ""}, repo github.com/${p.repo})`,
        p.tagline,
        p.longPitch,
        `Stack: ${p.stack.join(", ")}`,
        p.features?.length ? `Features: ${p.features.join("; ")}` : null,
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n\n");

  const skills = skillGroups.map((g) => `${g.label}: ${g.items.join(", ")}`).join("\n");
  const educationText = education
    .map((e) => `${e.qualification}, ${e.place}, ${e.years}`)
    .join("\n");

  return `NAME: ${profile.name}
LOCATION: ${profile.location}
CONTACT: ${profile.email} | ${profile.github} | ${profile.linkedin}

PROFILE
${cvProfile}

PROFESSIONAL EXPERIENCE
${experience}

SKILLS
${skills}

EDUCATION
${educationText}

PERSONAL PROJECTS
${projects}`;
}
