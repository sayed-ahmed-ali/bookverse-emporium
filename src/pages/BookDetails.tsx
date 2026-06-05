import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookCard } from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { fetchBooks, type Book } from "@/lib/books";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";

const BookDetails = () => {
  const { id } = useParams();
  const { data: books = [], isLoading, isError } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container py-12">
          <p className="text-center text-lg text-muted-foreground">Loading book details…</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container py-12">
          <p className="text-center text-lg text-destructive">Unable to load book details. Please try again later.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const { addToCart } = useCart();
  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container py-12">
          <p className="text-center text-lg text-muted-foreground">Book not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const related = books.filter((b) => b.id !== book.id && b.category === book.category).slice(0, 4);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-12">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link> /{" "}
          <Link to="/shop" className="hover:text-foreground">Shop</Link> /{" "}
          <span className="text-foreground">{book.title}</span>
        </nav>

        <div className="grid gap-12 md:grid-cols-2">
          <div className="flex justify-center bg-gradient-warm rounded-3xl p-10">
            <img
              src={book.cover}
              alt={book.title}
              width={512}
              height={768}
              className="book-tilt max-h-[600px] rounded-lg shadow-book"
            />
          </div>

          <div>
            <p className="text-sm uppercase tracking-wider text-accent">{book.category}</p>
            <h1 className="mt-2 font-serif text-4xl font-semibold leading-tight md:text-5xl">{book.title}</h1>
            <p className="mt-2 text-lg text-muted-foreground">by <span className="font-medium text-foreground">{book.author}</span></p>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.round(book.rating) ? "fill-current" : ""}`} />
                ))}
              </div>
              <span className="font-medium">{book.rating}</span>
              <span className="text-sm text-muted-foreground">({book.reviews.toLocaleString()} reviews)</span>
            </div>

            <p className="mt-6 leading-relaxed text-muted-foreground">{book.description}</p>

            <div className="mt-8 flex items-baseline gap-3">
              <span className="font-serif text-4xl font-semibold">
                ₨{book.discountPrice ? book.discountPrice.toFixed(2) : book.price.toFixed(2)}
              </span>
              {book.discountPrice && (
                <>
                  <span className="text-sm text-muted-foreground line-through">₨{book.price.toFixed(2)}</span>
                  {book.percentage && (
                    <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent-foreground">
                      {book.percentage}% OFF
                    </span>
                  )}
                </>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="rounded-full"
                onClick={() => {
                  addToCart(book, 1);
                  toast.success("Added to cart");
                }}
              >
                <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
              <Button size="lg" variant="secondary" className="rounded-full">Buy Now</Button>
              <Button size="lg" variant="outline" className="rounded-full" aria-label="Wishlist">
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6 text-xs">
              <div className="flex flex-col items-center gap-1 text-center text-muted-foreground">
                <Truck className="h-5 w-5 text-primary" />Free shipping
              </div>
              <div className="flex flex-col items-center gap-1 text-center text-muted-foreground">
                <ShieldCheck className="h-5 w-5 text-primary" />Secure checkout
              </div>
              <div className="flex flex-col items-center gap-1 text-center text-muted-foreground">
                <RefreshCw className="h-5 w-5 text-primary" />30-day returns
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="mb-8 font-serif text-3xl font-semibold">You may also like</h2>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {related.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BookDetails;
