import { Link } from "react-router-dom";
import { Star, Heart } from "lucide-react";
import type { Book } from "@/lib/books";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "@/components/ui/use-toast";

export const BookCard = ({ book }: { book: Book }) => {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(book.id);

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
          aria-pressed={wishlisted}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(book);
          }}
          className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full transition-smooth backdrop-blur ${wishlisted ? "bg-destructive/15 text-destructive" : "bg-background/90 text-muted-foreground hover:text-destructive"}`}
        >
          <Heart className={`h-4 w-4 ${wishlisted ? "fill-destructive text-destructive" : ""}`} fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" />
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
        <div className="flex flex-col gap-1">
          <span className="font-serif text-lg font-semibold">
            ₨{book.discountPrice ? book.discountPrice.toFixed(2) : book.price.toFixed(2)}
          </span>
          {book.discountPrice && (
            <div className="flex items-center gap-2">
              <span className="text-xs line-through text-muted-foreground">₨{book.price.toFixed(2)}</span>
              {book.percentage && (
                <span className="text-xs font-semibold text-destructive">-{book.percentage}%</span>
              )}
            </div>
          )}
        </div>
        <Button
          size="sm"
          variant="secondary"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(book, 1);
            toast({ title: "Added to cart", description: `${book.title} has been added to your cart.` });
          }}
        >
          Add
        </Button>
      </div>
    </Link>
  );
};
