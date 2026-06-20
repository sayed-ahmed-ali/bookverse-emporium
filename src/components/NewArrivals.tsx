import { useQuery } from "@tanstack/react-query";
import { BookCard } from "@/components/BookCard";
import { fetchBooks, type Book } from "@/lib/books";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const NewArrivals = () => {
    const { data: books = [], isLoading } = useQuery<Book[]>({
        queryKey: ["books"],
        queryFn: fetchBooks,
    });

    const shuffledBooks = [...books].sort(() => 0.5 - Math.random());
    const newArrivals = shuffledBooks.slice(0, 6);

    if (isLoading) {
        return (
            <section className="container px-2 py-20 sm:px-3">
                <p className="text-center text-muted-foreground">Loading new arrivals...</p>
            </section>
        );
    }

    return (
        <section className="container px-2 py-20 sm:px-3">
            <div className="mb-12 flex items-end justify-between">
                <div>
                    <p className="text-sm font-medium uppercase tracking-wider text-accent">Recently Added</p>
                    <h2 className="mt-2 font-serif text-4xl font-semibold md:text-5xl">New Arrivals</h2>
                </div>
                <Link
                    to="/shop"
                    className="hidden items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all md:flex"
                >
                    View All <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr">
                {newArrivals.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </section>
    );
};
