import { Link } from "react-router-dom";
import { categories } from "@/data/books";

export const Categories = () => {
  return (
    <section id="categories" className="container py-20">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-accent">Browse</p>
          <h2 className="mt-2 font-serif text-4xl font-semibold md:text-5xl">Shop by category</h2>
        </div>
        <p className="hidden max-w-sm text-sm text-muted-foreground md:block">
          From timeless classics to cutting-edge tech — find your next favorite read.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((c) => (
          <Link
            key={c.name}
            to={`/shop?category=${encodeURIComponent(c.name)}`}
            className="group flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-6 text-center transition-smooth hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft"
          >
            <span className="text-3xl transition-bounce group-hover:scale-110">{c.icon}</span>
            <h3 className="mt-3 font-serif text-base font-semibold">{c.name}</h3>
            <p className="text-xs text-muted-foreground">{c.count} books</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
