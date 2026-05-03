export interface Burger {
  id: string;
  name: string;
  spot: string;
  city: string;
  rating: number;
  votes: number;
  price: string;
  bg: string;
  initials: string;
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
    bg: "from-amber-700/40 to-yellow-900/50",
    initials: "BB",
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
    bg: "from-rose-600/40 to-red-800/50",
    initials: "BP",
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
    bg: "from-orange-600/40 to-amber-800/50",
    initials: "PB",
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
    bg: "from-zinc-700/50 to-stone-900/60",
    initials: "HW",
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
  bg: string;
  initials: string;
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
    bg: "from-amber-700/40 to-yellow-900/50",
    initials: "BB",
    pin: { x: 32, y: 38 },
  },
  {
    id: "e2",
    name: "Bacon brioche",
    spot: "El Perro Negro",
    rating: 8.7,
    notes: "Bun is the star here. Slightly sweet, holds up to the juice.",
    bg: "from-rose-700/40 to-red-900/50",
    initials: "EPN",
    pin: { x: 58, y: 51 },
  },
  {
    id: "e3",
    name: "Truffle wagyu",
    spot: "Hawksmoor",
    rating: 9.7,
    notes: "Pricey but worth it once. Truffle aioli not overpowering.",
    bg: "from-zinc-700/50 to-stone-900/60",
    initials: "HW",
    pin: { x: 47, y: 30 },
  },
  {
    id: "e4",
    name: "Korean fried chicken burger",
    spot: "Bonnie Burrito",
    rating: 8.2,
    notes: "Off-menu, ask for it. Gochujang mayo is the move.",
    bg: "from-orange-600/40 to-amber-800/50",
    initials: "BBR",
    pin: { x: 70, y: 65 },
  },
];
