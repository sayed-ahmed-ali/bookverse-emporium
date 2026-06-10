import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookCard } from "@/components/BookCard";
import { fetchBooks, type Book } from "@/lib/books";
import { useWishlist } from "@/contexts/WishlistContext";

const Wishlist = () => {
    const { data: books = [], isLoading, isError } = useQuery<Book[]>({
        queryKey: ["books"],
        queryFn: fetchBooks,
    });

    const { wishlistedIds } = useWishlist();

    const wishlistedBooks = useMemo(
        () => books.filter((book) => wishlistedIds.includes(book.id)),
        [books, wishlistedIds]
    );

    return (
        <div className="min-h-screen">
            <Header />
            <main className="container py-12">
                <div className="mb-10">
                    <p className="text-sm font-medium uppercase tracking-wider text-accent">Wishlist</p>
                    <h1 className="mt-2 font-serif text-4xl font-semibold md:text-5xl">Your favorites</h1>
                    <p className="mt-2 text-muted-foreground">Books you saved with the heart button are shown here.</p>
                </div>

                {isLoading ? (
                    <p className="text-center text-lg text-muted-foreground">Loading wishlist…</p>
                ) : isError ? (
                    <p className="text-center text-lg text-destructive">Unable to load books. Please try again later.</p>
                ) : wishlistedBooks.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-border bg-muted p-12 text-center text-muted-foreground">
                        <p className="text-lg font-medium">Your wishlist is empty.</p>
                        <p className="mt-2">Click the heart icon on a book to save it here.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                        {wishlistedBooks.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Wishlist;
