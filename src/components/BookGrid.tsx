import { books } from "@/data/books";
import { BookCard } from "./BookCard";

export const BookGrid = ({ title, subtitle, id }: { title: string; subtitle: string; id?: string }) => {
  return (
    <section id={id} className="container py-20">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-accent">{subtitle}</p>
          <h2 className="mt-2 font-serif text-4xl font-semibold md:text-5xl">{title}</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {books.slice(0, 8).map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
    </section>
  );
};
