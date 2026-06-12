import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingBag, Heart, User, Menu, Sun, Moon, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

export const Header = () => {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-serif text-xl font-semibold">
          <BookOpen className="h-6 w-6 text-primary" />
          <span>BookVerse</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground">Home</Link>
          <Link to="/shop" className="text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground">Shop</Link>
          <a href="#categories" className="text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground">Categories</a>
          <a href="#bestsellers" className="text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground">Bestsellers</a>
          <a href="#trending" className="text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground">New Arrivals</a>
          <a href="#deals" className="text-sm font-medium text-muted-foreground transition-smooth hover:text-foreground">Deals</a>
        </nav>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Wishlist" className="hidden sm:inline-flex" asChild>
            <Link to="/wishlist">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="Cart">
            <Link to="/cart" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-destructive px-1.5 text-[11px] font-semibold text-white">
                  {itemCount}
                </span>
              )}
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setDark((d) => !d)}
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Menu"
            className="md:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {open && (
        <nav className="container flex flex-col gap-3 border-t border-border/60 py-4 md:hidden">
          <Link to="/" className="text-sm font-medium" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/shop" className="text-sm font-medium" onClick={() => setOpen(false)}>Shop</Link>
          <a href="#categories" className="text-sm font-medium" onClick={() => setOpen(false)}>Categories</a>
          <a href="#bestsellers" className="text-sm font-medium" onClick={() => setOpen(false)}>Bestsellers</a>
          <a href="#trending" className="text-sm font-medium" onClick={() => setOpen(false)}>New Arrivals</a>
          <a href="#deals" className="text-sm font-medium" onClick={() => setOpen(false)}>Deals</a>
        </nav>
      )}
    </header>
  );
};
