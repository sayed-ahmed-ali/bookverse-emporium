import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookCard } from "@/components/BookCard";
import { BuyNowPanel } from "@/components/BuyNowPanel";
import { fetchBooks, type Book } from "@/lib/books";

const BestSellersPage = () => {
    const { data: books = [] } = useQuery<Book[]>({ queryKey: ["books"], queryFn: fetchBooks });

    const bestSellers = useMemo(() => {
        return books.filter((book) => book.badge?.toLowerCase().includes("bestseller") || book.rating >= 4.7).slice(0, 8);
    }, [books]);

    return (
        <div className="min-h-screen">
            <Header />
            <main className="container py-12">
                <div className="mb-10">
                    <p className="text-sm font-medium uppercase tracking-wider text-accent">Most loved</p>
                    <h1 className="mt-2 font-serif text-4xl font-semibold md:text-5xl">Best sellers</h1>
                    <p className="mt-2 text-muted-foreground">Pick the books customers love most and place your order instantly.</p>
                </div>
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                    {bestSellers.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
                <BuyNowPanel />
            </main>
            <Footer />
        </div>
    );
};

export default BestSellersPage;
