import { Button } from "@/components/ui/button";
import { type Category } from "@/lib/books";
import { useNavigate } from "react-router-dom";

interface CategoriesProps {
  categories: Category[];
  activeCategory: string;
  onCategorySelect: (category: string) => void;
  /** When true, navigate to /shop on selection. Default: false */
  navigateOnSelect?: boolean;
}

const categoryIcons: Record<string, string> = {
  fiction: "📖",
  "non-fiction": "📚",
  it: "💻",
  technology: "💻",
  philosophy: "🧠",
  history: "🏛️",
  kids: "🧸",
  academic: "🎓",
  islamic: "🕌",
  default: "📘",
};

const getCategoryIcon = (category: string) =>
  categoryIcons[category.toLowerCase()] ?? categoryIcons.default;

export const Categories = ({ categories, activeCategory, onCategorySelect, navigateOnSelect = false }: CategoriesProps) => {
  const navigate = useNavigate();
  return (
    <section id="categories" className="container px-2 py-20 sm:px-3">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-accent">Browse</p>
          <h2 className="mt-2 font-serif text-4xl font-semibold md:text-5xl">Shop by category</h2>
        </div>
        <p className="hidden max-w-sm text-sm text-muted-foreground md:block">
          From timeless classics to cutting-edge tech — find your next favorite read.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
        <Button
          size="sm"
          variant={activeCategory === "All" ? "default" : "outline"}
          className="group flex min-h-[80px] flex-col items-center justify-center rounded-2xl border border-border bg-card px-2 py-3 text-xs font-semibold transition-colors hover:border-primary hover:bg-primary/10 hover:text-foreground"
          onClick={() => {
            onCategorySelect("All");
            if (navigateOnSelect) navigate("/shop");
          }}
        >
          <span className="mb-1 text-2xl">📚</span>
          <span>All</span>
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            size="sm"
            variant={activeCategory === String(category.id) ? "default" : "outline"}
            className="group flex min-h-[80px] flex-col items-center justify-center rounded-2xl border border-border bg-card px-2 py-3 text-xs font-semibold transition-colors hover:border-primary hover:bg-primary/10 hover:text-foreground"
            onClick={() => {
              onCategorySelect(String(category.id));
              if (navigateOnSelect) {
                // navigate to the shop page with the category name so `/shop` can pick it up
                navigate(`/shop?category=${encodeURIComponent(category.name)}`);
              }
            }}
          >
            <span className="mb-1 text-2xl">{getCategoryIcon(category.name)}</span>
            <span>{category.name}</span>
          </Button>
        ))}
      </div>
    </section>
  );
};
