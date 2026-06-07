import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { BookGrid } from "@/components/BookGrid";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";
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
    if (activeCategory === "All") {
      return books;
    }

    const selectedCategory = categories.find((c) => String(c.id) === activeCategory);
    const activeName = selectedCategory ? selectedCategory.name : activeCategory;
    const normalize = (s?: string) =>
      (s ?? "").toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, " ");
    const normActiveName = normalize(activeName);

    return books.filter((book) => {
      if (activeCategory && book.categoryId && book.categoryId === activeCategory) return true;
      const normBook = normalize(book.category);
      return (
        normBook === normActiveName ||
        normBook.includes(normActiveName) ||
        normActiveName.includes(normBook)
      );
    });
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
        <Categories
          categories={categories}
          activeCategory={activeCategory}
          onCategorySelect={setActiveCategory}
        />
        <BookGrid id="bestsellers" title={title} subtitle={subtitle} books={filteredBooks} />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
