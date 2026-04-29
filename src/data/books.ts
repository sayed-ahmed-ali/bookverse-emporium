import book1 from "@/assets/book-1.jpg";
import book2 from "@/assets/book-2.jpg";
import book3 from "@/assets/book-3.jpg";
import book4 from "@/assets/book-4.jpg";
import book5 from "@/assets/book-5.jpg";
import book6 from "@/assets/book-6.jpg";
import book7 from "@/assets/book-7.jpg";
import book8 from "@/assets/book-8.jpg";

export type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  language: string;
  cover: string;
  description: string;
  badge?: string;
};

export const categories = [
  { name: "Fiction", icon: "📖", count: 1240 },
  { name: "Non-Fiction", icon: "📚", count: 890 },
  { name: "Academic", icon: "🎓", count: 560 },
  { name: "Kids", icon: "🧸", count: 430 },
  { name: "Islamic", icon: "🕌", count: 320 },
  { name: "Technology", icon: "💻", count: 670 },
];

export const books: Book[] = [
  {
    id: "1",
    title: "The Silent Garden",
    author: "Elena March",
    price: 18.99,
    rating: 4.8,
    reviews: 2341,
    category: "Fiction",
    language: "English",
    cover: book1,
    description:
      "A breathtaking literary journey through memory, loss, and the gentle resilience of the human spirit. Set in a quiet coastal village, Elena March's prose blooms like the garden at the heart of her story.",
    badge: "Bestseller",
  },
  {
    id: "2",
    title: "Atomic Mindset",
    author: "James Holden",
    price: 22.5,
    rating: 4.9,
    reviews: 5120,
    category: "Non-Fiction",
    language: "English",
    cover: book2,
    description:
      "Rewire your habits, sharpen your focus, and build a mindset capable of compounding small wins into extraordinary results.",
    badge: "Trending",
  },
  {
    id: "3",
    title: "Whispers of the Sea",
    author: "Hamen Hissen",
    price: 16.75,
    rating: 4.6,
    reviews: 980,
    category: "Fiction",
    language: "English",
    cover: book3,
    description:
      "A poetic novel about two strangers whose lives intertwine across decades, told in the rhythm of the tides.",
  },
  {
    id: "4",
    title: "Code & Coffee",
    author: "Ethan Harson",
    price: 29.99,
    rating: 4.7,
    reviews: 1432,
    category: "Technology",
    language: "English",
    cover: book4,
    description:
      "An honest, deeply practical field guide for software engineers who want to ship better software and live a balanced life.",
    badge: "New",
  },
  {
    id: "5",
    title: "The Brave Little Fox",
    author: "Mira Leone",
    price: 12.0,
    rating: 4.9,
    reviews: 3211,
    category: "Kids",
    language: "English",
    cover: book5,
    description:
      "A heartwarming illustrated tale of courage, friendship, and finding your way home through the magical autumn forest.",
  },
  {
    id: "6",
    title: "The Wisdom of Patience",
    author: "Williance",
    price: 19.5,
    rating: 4.8,
    reviews: 1876,
    category: "Islamic",
    language: "English",
    cover: book6,
    description:
      "Timeless reflections on patience, gratitude, and inner stillness drawn from classical wisdom and modern life.",
  },
  {
    id: "7",
    title: "Quantum Realities",
    author: "Dr. Asha Verma",
    price: 34.0,
    rating: 4.5,
    reviews: 612,
    category: "Academic",
    language: "English",
    cover: book7,
    description:
      "A clear, rigorous introduction to the strange and beautiful universe of quantum mechanics for curious minds.",
  },
  {
    id: "8",
    title: "Midnight in Tokyo",
    author: "Spirk Lasen",
    price: 21.25,
    rating: 4.7,
    reviews: 2204,
    category: "Fiction",
    language: "English",
    cover: book8,
    description:
      "Neon-lit streets, secret meetings, and a mystery that unfolds across one electric night in the heart of Shibuya.",
    badge: "Trending",
  },
];

export const testimonials = [
  {
    name: "Sophia Patel",
    role: "Avid Reader",
    quote:
      "BookVerse has completely changed how I discover books. The curation feels personal, and the packaging is always beautiful.",
    rating: 5,
  },
  {
    name: "Marcus Chen",
    role: "Book Club Host",
    quote:
      "Fast shipping, fair prices, and a catalog that goes far beyond the bestseller lists. My new go-to bookstore.",
    rating: 5,
  },
  {
    name: "Aisha Rahman",
    role: "Literature Student",
    quote:
      "I love the academic and Islamic sections — hard to find elsewhere with this much care. Highly recommend.",
    rating: 5,
  },
];
