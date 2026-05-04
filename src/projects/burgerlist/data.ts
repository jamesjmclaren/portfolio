// Real Unsplash photos lifted from prisma/seed.ts in the burgerlist repo
// (the same images the live app seeds with — free to use, attribution-friendly)

export interface Burger {
  id: string;
  name: string;
  spot: string;
  city: string;
  rating: number;
  votes: number;
  price: string;
  imageUrl: string;
  user: { name: string; initials: string; color: string };
  ago: string;
  tags: string[];
}

export const feed: Burger[] = [
  {
    id: "b1",
    name: "Smashed double cheese",
    spot: "Bross Burgers",
    city: "Edinburgh",
    rating: 9.4,
    votes: 142,
    price: "£11",
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    user: { name: "James M.", initials: "JM", color: "bg-amber-500" },
    ago: "2h ago",
    tags: ["smash", "classic", "double"],
  },
  {
    id: "b2",
    name: "The Buffalo",
    spot: "Burger Pilgrim",
    city: "London",
    rating: 8.9,
    votes: 89,
    price: "£14",
    imageUrl:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
    user: { name: "Sarah K.", initials: "SK", color: "bg-pink-500" },
    ago: "5h ago",
    tags: ["spicy", "blue cheese"],
  },
  {
    id: "b3",
    name: "Triple stack",
    spot: "Patty & Bun",
    city: "London",
    rating: 9.1,
    votes: 211,
    price: "£15",
    imageUrl:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80",
    user: { name: "Marco G.", initials: "MG", color: "bg-emerald-500" },
    ago: "1d ago",
    tags: ["triple", "challenge"],
  },
  {
    id: "b4",
    name: "Truffle wagyu",
    spot: "Hawksmoor",
    city: "Edinburgh",
    rating: 9.7,
    votes: 78,
    price: "£22",
    imageUrl:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80",
    user: { name: "James M.", initials: "JM", color: "bg-amber-500" },
    ago: "3d ago",
    tags: ["wagyu", "luxury"],
  },
];

export interface ListEntry {
  id: string;
  name: string;
  spot: string;
  rating: number;
  notes: string;
  imageUrl: string;
  pin: { x: number; y: number };
}

export const listEntries: ListEntry[] = [
  {
    id: "e1",
    name: "Smashed double cheese",
    spot: "Bross Burgers",
    rating: 9.4,
    notes:
      "American cheese running off the patty, perfect crispy edges. Best in the city.",
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    pin: { x: 32, y: 38 },
  },
  {
    id: "e2",
    name: "Bacon brioche",
    spot: "El Perro Negro",
    rating: 8.7,
    notes: "Bun is the star here. Slightly sweet, holds up to the juice.",
    imageUrl:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&q=80",
    pin: { x: 58, y: 51 },
  },
  {
    id: "e3",
    name: "Truffle wagyu",
    spot: "Hawksmoor",
    rating: 9.7,
    notes: "Pricey but worth it once. Truffle aioli not overpowering.",
    imageUrl:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80",
    pin: { x: 47, y: 30 },
  },
  {
    id: "e4",
    name: "Korean fried chicken burger",
    spot: "Bonnie Burrito",
    rating: 8.2,
    notes: "Off-menu, ask for it. Gochujang mayo is the move.",
    imageUrl:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80",
    pin: { x: 70, y: 65 },
  },
];

export const addEntryHeroImage =
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80";
