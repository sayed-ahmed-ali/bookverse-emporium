import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookCard } from "@/components/BookCard";
import { BuyNowPanel } from "@/components/BuyNowPanel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchBooks, type Book } from "@/lib/books";

const Shop = () => {
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const initialCategory = searchParams.get("category") ?? "All";

  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>(initialCategory);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minRating, setMinRating] = useState(0);

  const { data: books = [], isLoading, isError } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(books.map((b) => b.category).filter(Boolean)));
    return ["All", ...uniqueCats];
  }, [books]);

  const maxBookPrice = useMemo(
    () => Math.max(0, ...books.map((b) => b.discountPrice ?? b.price)),
    [books]
  );

  useEffect(() => {
    if (maxBookPrice > 0) {
      setMaxPrice((current) => (current === 0 ? maxBookPrice : current));
    }
  }, [maxBookPrice]);

  useEffect(() => {
    setActiveCat(initialCategory);
  }, [initialCategory]);

  const filtered = useMemo(() => {
    return books.filter((b) => {
      if (activeCat !== "All" && b.category !== activeCat) return false;
      if (maxPrice > 0 && (b.discountPrice ?? b.price) > maxPrice) return false;
      if (b.rating < minRating) return false;
      if (query && !`${b.title} ${b.author}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [books, query, activeCat, maxPrice, minRating]);

  const suggestions = query
    ? books
      .filter((b) => `${b.title} ${b.author}`.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 10)
    : [];

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container py-12">
          <p className="text-center text-lg text-muted-foreground">Loading books…</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container py-12">
          <p className="text-center text-lg text-destructive">Unable to load books. Please try again later.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-12">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">Catalog</p>
          <h1 className="mt-2 font-serif text-4xl font-semibold md:text-5xl">All books</h1>
          <p className="mt-2 text-muted-foreground">Find your next favorite read among our curated collection.</p>
        </div>

        <div className="relative mb-8 max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search books, authors..."
            className="h-12 rounded-full pl-11"
          />
          {suggestions.length > 0 && query && (
            <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-popover shadow-elegant">
              {suggestions.map((s) => (
                <Link
                  key={s.id}
                  to={`/book/${s.id}`}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-smooth hover:bg-secondary"
                >
                  <img src={s.cover} alt="" className="h-10 w-8 rounded object-cover" />
                  <div>
                    <p className="text-sm font-medium">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.author}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-8">
            <div>
              <h3 className="mb-3 font-serif text-base font-semibold">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Button
                    key={c}
                    variant={activeCat === c ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                    onClick={() => setActiveCat(c)}
                  >
                    {c}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 font-serif text-base font-semibold">Max price: ₨{maxPrice}</h3>
              <input
                type="range"
                min={0}
                max={maxBookPrice}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <h3 className="mb-3 font-serif text-base font-semibold">Min rating: {minRating}★</h3>
              <input
                type="range"
                min={0}
                max={5}
                step={0.5}
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </aside>

          <div>
            <p className="mb-4 text-sm text-muted-foreground">{filtered.length} books</p>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
              {filtered.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </div>
        </div>
        <BuyNowPanel />
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
