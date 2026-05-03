import type { Scene } from "@/data/projects";
import BurgerlistFeed from "./Feed";
import BurgerlistListDetail from "./ListDetail";
import BurgerlistAddEntry from "./AddEntry";

export const burgerlistScenes: Scene[] = [
  {
    number: "01",
    eyebrow: "Feed",
    title: "Discovery feed.",
    blurb:
      "Friends-and-follows feed of recent burgers. Photo, rating, location, tags — and an AI-moderation badge baked into every image.",
    features: [
      "Per-entry photo, rating, price and tags",
      "AI moderation badge on every image",
      "Hashtag taxonomy for browsing",
      "Like / comment / add-to-list affordances",
      "Per-author attribution and 'tried at' framing",
    ],
    url: "https://burgerlist.app/feed",
    Component: BurgerlistFeed,
  },
  {
    number: "02",
    eyebrow: "List detail",
    title: "Curated lists with map view.",
    blurb:
      "Lists are first-class. Each entry gets a ranked card and a Google-Maps pin so you can plan a tour.",
    features: [
      "Ranked entries with notes",
      "Google Maps integration with custom pins",
      "Follow & share lists",
      "Distance / locality summary",
      "Per-entry rating with star UI",
    ],
    url: "https://burgerlist.app/lists/edinburghs-best",
    Component: BurgerlistListDetail,
  },
  {
    number: "03",
    eyebrow: "Add entry",
    title: "Logging a burger, end to end.",
    blurb:
      "Photo upload runs through Cloudinary with optional AWS Rekognition moderation; spot autocomplete uses Google Places. Feedback is live — try clicking around.",
    features: [
      "Cloudinary upload with AWS Rekognition moderation",
      "Real-time moderation state on the photo",
      "Google Places autocomplete for the spot",
      "Slider rating (1.0 – 10.0)",
      "Tag input with chip UI",
      "Submit blocked while photo is still scanning",
    ],
    url: "https://burgerlist.app/feed?modal=add",
    height: "640px",
    Component: BurgerlistAddEntry,
  },
];
