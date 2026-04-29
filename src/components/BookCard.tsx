import { Link } from "react-router-dom";
import { Star, Heart } from "lucide-react";
import type { Book } from "@/data/books";
import { Button } from "@/components/ui/button";

export const BookCard = ({ book }: { book: Book }) => {
  return (
    <Link
      to={`/book/${book.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-card p-4 transition-smooth hover:shadow-elegant"
    >
      <div className="relative mb-4 aspect-[2/3] overflow-hidden rounded-lg bg-muted">
        <img
          src={book.cover}
          alt={`${book.title} by ${book.author}`}
          loading="lazy"
          width={512}
          height={768}
          className="h-full w-full object-cover transition-bounce group-hover:scale-105"
        />
        {book.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-gradient-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow-soft">
            {book.badge}
          </span>
        )}
        <button
          aria-label="Add to wishlist"
          onClick={(e) => e.preventDefault()}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-muted-foreground opacity-0 backdrop-blur transition-smooth hover:text-destructive group-hover:opacity-100"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>
      <div className="flex-1">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{book.category}</p>
        <h3 className="mt-1 line-clamp-1 font-serif text-lg font-semibold leading-tight">{book.title}</h3>
        <p className="text-sm text-muted-foreground">{book.author}</p>
        <div className="mt-2 flex items-center gap-1 text-xs">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          <span className="font-medium">{book.rating}</span>
          <span className="text-muted-foreground">({book.reviews.toLocaleString()})</span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-serif text-lg font-semibold">${book.price.toFixed(2)}</span>
        <Button size="sm" variant="secondary" onClick={(e) => e.preventDefault()}>
          Add
        </Button>
      </div>
    </Link>
  );
};
