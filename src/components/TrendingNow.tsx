import { useQuery } from "@tanstack/react-query";
import { BookCard } from "@/components/BookCard";
import { fetchBooks, type Book } from "@/lib/books";

export const TrendingNow = () => {
    const { data: books = [], isLoading } = useQuery<Book[]>({
        queryKey: ["books"],
        queryFn: fetchBooks,
    });

    const trendingBooks = books.slice(0, 8);

    if (isLoading) {
        return (
            <section className="container px-2 py-20 sm:px-3">
                <p className="text-center text-muted-foreground">Loading trending books...</p>
            </section>
        );
    }

    return (
        <section id="trending" className="container px-2 py-20 sm:px-3">
            <div className="mb-12 flex items-end justify-between">
                <div>
                    <p className="text-sm font-medium uppercase tracking-wider text-accent">Curated Collection</p>
                    <h2 className="mt-2 font-serif text-4xl font-semibold md:text-5xl">Trending Now</h2>
                </div>
                <p className="hidden max-w-sm text-sm text-muted-foreground md:block">
                    Discover the most popular books this season handpicked for you.
                </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr">
                {trendingBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </section>
    );
};
