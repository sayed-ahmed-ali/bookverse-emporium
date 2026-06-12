import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { BookGrid } from "@/components/BookGrid";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";
import { StatsCards } from "@/components/StatsCards";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TrendingNow } from "@/components/TrendingNow";
import { NewArrivals } from "@/components/NewArrivals";
import { fetchBooks, fetchCategories, type Book, type Category } from "@/lib/books";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: books = [] } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const filteredBooks = useMemo(() => {
    if (activeCategory === "All") return books;

    // Prefer matching by categoryId when available
    const selectedById = categories.find((c) => String(c.id) === activeCategory);
    if (selectedById) {
      return books.filter((book) => String(book.categoryId ?? "") === String(selectedById.id));
    }

    // Otherwise try matching by category name (case-insensitive exact match)
    const activeName = (activeCategory ?? "").toString().trim().toLowerCase();
    return books.filter((book) => (book.category ?? "").toString().trim().toLowerCase() === activeName);
  }, [books, activeCategory, categories]);

  const title =
    activeCategory === "All"
      ? "Trending & bestselling"
      : categories.find((c) => String(c.id) === activeCategory)?.name ?? "Trending & bestselling";
  const subtitle =
    activeCategory === "All"
      ? "This week"
      : `Books in ${categories.find((c) => String(c.id) === activeCategory)?.name ?? activeCategory}`;

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <StatsCards />
        <Categories
          categories={categories}
          activeCategory={activeCategory}
          onCategorySelect={setActiveCategory}
          navigateOnSelect={false}
          id="categories"
        />
        {activeCategory !== "All" && (
          <BookGrid id="bestsellers" title={title} subtitle={subtitle} books={filteredBooks} />
        )}
        <TrendingNow />
        <NewArrivals />
        {activeCategory === "All" && (
          <BookGrid id="bestsellers" title={title} subtitle={subtitle} books={filteredBooks} />
        )}
        <FeaturesSection />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
