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
      "Your follows' recent burgers — photo, rating, price and tags, with a Rekognition moderation badge on every image. Like, comment or save to a list without leaving the feed.",
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
      "Lists are shareable and map-backed: each entry gets a ranking, notes and a Google Maps pin, so any list doubles as a tour route.",
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
      "Upload a photo through Cloudinary with live Rekognition moderation feedback, autocomplete the spot via Google Places, slide the rating, add tags — and the submit button stays locked until scanning clears.",
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
