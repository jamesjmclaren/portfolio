// Tool entries lifted from ai-tools.json in the categorais repo —
// real names, descriptions, logos, categories and pricing tiers,
// curated to a representative cross-section of categories.
// Role-task mappings come from data/role-tasks.json in the same repo.

export type Pricing = "free" | "freemium" | "paid";

export interface Tool {
  name: string;
  description: string;
  logo: string;
  pricing: Pricing;
  url: string;
  categories: string[];
  features: string[];
  popularity: number;
  preview?: string;
  pricingTiers?: { name: string; price: string; features: string }[];
}

export const directoryTools: Tool[] = [
  {
    name: "ChatGPT",
    description: "Conversational AI assistant for writing, research and code.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png",
    pricing: "freemium",
    url: "https://chat.openai.com",
    categories: ["chat", "writing"],
    features: ["conversation", "reasoning", "code"],
    popularity: 95,
  },
  {
    name: "Claude",
    description: "Anthropic's assistant — strong at long-form writing and code.",
    logo: "https://claude.ai/images/claude_app_icon.png",
    pricing: "freemium",
    url: "https://claude.ai",
    categories: ["chat", "writing"],
    features: ["long context", "reasoning", "artifacts"],
    popularity: 92,
  },
  {
    name: "GitHub Copilot",
    description: "AI pair programmer that completes code as you type.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/2048px-GitHub_Invertocat_Logo.svg.png",
    pricing: "paid",
    url: "https://github.com/features/copilot",
    categories: ["code", "productivity"],
    features: ["code completion", "chat", "PR reviews"],
    popularity: 90,
  },
  {
    name: "Perplexity Pro",
    description: "AI-powered answer engine with citations and live web search.",
    logo: "https://logo.clearbit.com/perplexity.ai",
    pricing: "paid",
    url: "https://www.perplexity.ai",
    categories: ["research", "chat"],
    features: ["citations", "web search", "Copilot mode"],
    popularity: 85,
  },
  {
    name: "Midjourney",
    description: "Generative AI art with a distinctive editorial aesthetic.",
    logo: "https://logo.clearbit.com/midjourney.com",
    pricing: "paid",
    url: "https://midjourney.com",
    categories: ["image", "design"],
    features: ["text-to-image", "style refs", "upscaling"],
    popularity: 88,
  },
  {
    name: "Sora",
    description: "OpenAI's text-to-video model for realistic short clips.",
    logo: "https://logo.clearbit.com/openai.com",
    pricing: "paid",
    url: "https://openai.com/sora",
    categories: ["video"],
    features: ["text-to-video", "60s clips"],
    popularity: 80,
  },
  {
    name: "ElevenLabs",
    description: "Studio-quality voice cloning and text-to-speech.",
    logo: "https://logo.clearbit.com/elevenlabs.io",
    pricing: "freemium",
    url: "https://elevenlabs.io",
    categories: ["audio"],
    features: ["voice cloning", "TTS", "dubbing"],
    popularity: 82,
  },
  {
    name: "Canva",
    description: "All-in-one design platform with AI image and copy tools.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Canva_icon_2021.svg/2048px-Canva_icon_2021.svg.png",
    pricing: "freemium",
    url: "https://canva.com",
    categories: ["design", "marketing"],
    features: ["templates", "Magic Studio", "brand kits"],
    popularity: 78,
  },
  {
    name: "Gamma",
    description: "Generate slide decks, docs and websites from a prompt.",
    logo: "https://logo.clearbit.com/gamma.app",
    pricing: "freemium",
    url: "https://gamma.app",
    categories: ["productivity", "writing"],
    features: ["AI decks", "doc design", "site builder"],
    popularity: 72,
  },
];

export interface Role {
  id: string;
  name: string;
  icon: string;
}

export const wizardRoles: Role[] = [
  { id: "hr-manager", name: "HR Manager", icon: "👔" },
  { id: "software-developer", name: "Software Developer", icon: "💻" },
  { id: "marketing-manager", name: "Marketing Manager", icon: "📊" },
  { id: "content-creator", name: "Content Creator", icon: "✍️" },
  { id: "designer", name: "Designer", icon: "🎨" },
  { id: "sales-professional", name: "Sales Professional", icon: "💼" },
  { id: "project-manager", name: "Project Manager", icon: "📋" },
  { id: "student", name: "Student", icon: "🎓" },
  { id: "entrepreneur", name: "Entrepreneur", icon: "🚀" },
  { id: "custom", name: "Something Else", icon: "✏️" },
];

export interface Recommendation {
  toolName: string;
  reason: string;
  match: number;
}

export const recommendationsByRole: Record<string, Recommendation[]> = {
  "software-developer": [
    {
      toolName: "GitHub Copilot",
      reason: "Inline code completion across 80+ languages and IDE integrations.",
      match: 96,
    },
    {
      toolName: "Claude",
      reason: "Long-context reasoning for code reviews, refactors and architecture.",
      match: 93,
    },
    {
      toolName: "Perplexity Pro",
      reason: "Cited web answers when learning a new framework or library.",
      match: 84,
    },
  ],
  "marketing-manager": [
    {
      toolName: "Canva",
      reason: "Brand-consistent ad creative and social posts at scale.",
      match: 91,
    },
    {
      toolName: "ChatGPT",
      reason: "Drafts campaign copy, email sequences and audience personas.",
      match: 89,
    },
    {
      toolName: "Gamma",
      reason: "Turn a quarterly plan into a polished deck in under five minutes.",
      match: 80,
    },
  ],
  "designer": [
    {
      toolName: "Midjourney",
      reason: "Mood-board imagery and editorial-grade concept art.",
      match: 94,
    },
    {
      toolName: "Canva",
      reason: "Templates and brand kits for fast handoff to non-designers.",
      match: 78,
    },
    {
      toolName: "Sora",
      reason: "Pitchable motion mockups from a single prompt.",
      match: 70,
    },
  ],
  "content-creator": [
    {
      toolName: "ElevenLabs",
      reason: "Voiceovers in your own cloned voice for video and podcasts.",
      match: 92,
    },
    {
      toolName: "ChatGPT",
      reason: "Scripts, captions and SEO-friendly titles in one pass.",
      match: 87,
    },
    {
      toolName: "Sora",
      reason: "B-roll and short-form video without a camera.",
      match: 75,
    },
  ],
};

export const featuredTool: Tool = {
  name: "Claude",
  description:
    "Anthropic's assistant for writing, research and code — with industry-leading long-context reasoning, file uploads, and Artifacts that render code, charts and docs inline.",
  logo: "https://claude.ai/images/claude_app_icon.png",
  pricing: "freemium",
  url: "https://claude.ai",
  categories: ["chat", "writing", "research"],
  features: [
    "200K-token context window",
    "Artifacts (code & docs)",
    "File uploads (PDF, CSV, images)",
    "Projects & memory",
    "Tool use / API",
  ],
  popularity: 92,
  preview:
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
  pricingTiers: [
    {
      name: "Free",
      price: "$0",
      features: "Daily message cap, web access, file uploads",
    },
    {
      name: "Pro",
      price: "$20 / mo",
      features: "5× usage, Projects, priority access",
    },
    {
      name: "Team",
      price: "$25 / user / mo",
      features: "Shared Projects, central billing, admin",
    },
  ],
};

export const similarToFeatured: Tool[] = [
  {
    name: "ChatGPT",
    description: "Conversational AI assistant for writing, research and code.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/2048px-ChatGPT_logo.svg.png",
    pricing: "freemium",
    url: "https://chat.openai.com",
    categories: ["chat"],
    features: [],
    popularity: 95,
  },
  {
    name: "Perplexity Pro",
    description: "AI-powered answer engine with citations and live web search.",
    logo: "https://logo.clearbit.com/perplexity.ai",
    pricing: "paid",
    url: "https://www.perplexity.ai",
    categories: ["research"],
    features: [],
    popularity: 85,
  },
  {
    name: "Mistral AI",
    description: "European AI lab with strong open-weights chat models.",
    logo: "https://logo.clearbit.com/mistral.ai",
    pricing: "freemium",
    url: "https://mistral.ai",
    categories: ["chat", "code"],
    features: [],
    popularity: 65,
  },
];
