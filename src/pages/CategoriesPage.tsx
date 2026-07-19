import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Categories } from "@/components/Categories";
import { BookCard } from "@/components/BookCard";
import { BuyNowPanel } from "@/components/BuyNowPanel";
import { fetchBooks, fetchCategories, type Book, type Category } from "@/lib/books";

const CategoriesPage = () => {
    const { data: books = [] } = useQuery<Book[]>({ queryKey: ["books"], queryFn: fetchBooks });
    const { data: categories = [] } = useQuery<Category[]>({ queryKey: ["categories"], queryFn: fetchCategories });

    const categoryGroups = useMemo(() => {
        return categories.map((category) => ({
            ...category,
            books: books.filter((book) => String(book.categoryId ?? book.category) === String(category.id) || book.category === category.name),
        }));
    }, [books, categories]);

    return (
        <div className="min-h-screen">
            <Header />
            <main className="container py-12">
                <div className="mb-10">
                    <p className="text-sm font-medium uppercase tracking-wider text-accent">Browse</p>
                    <h1 className="mt-2 font-serif text-4xl font-semibold md:text-5xl">Categories</h1>
                    <p className="mt-2 text-muted-foreground">Explore books by category and pick your favorites for a WhatsApp order.</p>
                </div>
                <Categories categories={categories} activeCategory="All" onCategorySelect={() => undefined} navigateOnSelect={false} />
                <div className="space-y-10">
                    {categoryGroups.map((category) => (
                        <section key={category.id} id={category.name.toLowerCase().replace(/\s+/g, "-")}>
                            <div className="mb-6 flex items-end justify-between">
                                <div>
                                    <h2 className="font-serif text-2xl font-semibold">{category.name}</h2>
                                    <p className="text-sm text-muted-foreground">{category.books.length} books</p>
                                </div>
                            </div>
                            {category.books.length > 0 ? (
                                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                                    {category.books.slice(0, 8).map((book) => (
                                        <BookCard key={book.id} book={book} />
                                    ))}
                                </div>
                            ) : (
                                <p className="rounded-2xl border border-dashed border-border bg-muted px-4 py-8 text-sm text-muted-foreground">
                                    No books available in this category yet.
                                </p>
                            )}
                        </section>
                    ))}
                </div>
                <BuyNowPanel />
            </main>
            <Footer />
        </div>
    );
};

export default CategoriesPage;
