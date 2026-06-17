import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchBooks, type Book } from "@/lib/books";
import heroBooks from "@/assets/hero-books.jpg";

export const Hero = () => {
  const [query, setQuery] = useState("");

  const { data: books = [] } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  const suggestions = useMemo(() => {
    if (!query) return [];
    return books
      .filter((b) => `${b.title} ${b.author}`.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 10);
  }, [books, query]);

  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="container grid gap-12 py-16 md:grid-cols-2 md:py-24 md:gap-8 items-center">
        <div className="animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            New arrivals every week
          </span>
          <h1 className="mt-6 font-serif text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Stories that <em className="italic text-primary">shape</em> who you become.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Discover thousands of carefully curated books across fiction, non-fiction, academic and more — at BookVerse, the home of thoughtful readers.
          </p>

          <div className="relative mt-8 max-w-lg">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search books, authors..."
              className="h-12 rounded-full px-4"
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

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/shop">
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <a href="#bestsellers">Browse Bestsellers</a>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="relative animate-float">
            <img
              src={heroBooks}
              alt="Stack of beautifully bound books with a warm cup of coffee"
              width={1536}
              height={1024}
              className="rounded-3xl shadow-elegant"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-card p-4 shadow-book md:block">
            <p className="font-serif text-sm font-semibold">Free shipping</p>
            <p className="text-xs text-muted-foreground">On orders over 5000</p>
          </div>
        </div>
      </div>
    </section>
  );
};
