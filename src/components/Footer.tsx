import { BookOpen, Instagram, Twitter, Facebook } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-serif text-xl font-semibold">
            <BookOpen className="h-6 w-6 text-primary" />
            BookVerse
          </div>
          <p className="text-sm text-muted-foreground">
            Curated stories, ideas and knowledge — delivered to your door, beautifully.
          </p>
          <div className="flex gap-3 pt-2">
            <a href="#" aria-label="Instagram" className="text-muted-foreground transition-smooth hover:text-foreground"><Instagram className="h-5 w-5" /></a>
            <a href="#" aria-label="Twitter" className="text-muted-foreground transition-smooth hover:text-foreground"><Twitter className="h-5 w-5" /></a>
            <a href="#" aria-label="Facebook" className="text-muted-foreground transition-smooth hover:text-foreground"><Facebook className="h-5 w-5" /></a>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-serif text-base font-semibold">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Fiction</li><li>Non-Fiction</li><li>Academic</li><li>Kids</li><li>Islamic</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-serif text-base font-semibold">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>About</li><li>Blog</li><li>Careers</li><li>Press</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 font-serif text-base font-semibold">Help</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Shipping</li><li>Returns</li><li>FAQ</li><li>Contact</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} BookVerse. Made with care for readers everywhere.
      </div>
    </footer>
  );
};
