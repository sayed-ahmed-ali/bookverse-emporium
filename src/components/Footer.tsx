import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="mt-24 border-t border-border bg-gradient-to-b from-background to-secondary/20">
      <div className="container grid gap-12 py-16 md:grid-cols-4">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-serif text-xl font-semibold">
            <BookOpen className="h-6 w-6 text-primary" />
            BookVerse
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Discover your next favorite read with a calm, curated shopping experience.
          </p>
        </div>

        {/* Shop Column */}
        <div>
          <h4 className="mb-4 font-serif text-base font-semibold">Shop</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="/shop" className="text-muted-foreground hover:text-foreground transition-colors">All Books</a></li>
            <li><a href="/shop" className="text-muted-foreground hover:text-foreground transition-colors">Fiction</a></li>
            <li><a href="/shop" className="text-muted-foreground hover:text-foreground transition-colors">Non-Fiction</a></li>
            <li><a href="/shop" className="text-muted-foreground hover:text-foreground transition-colors">Academic</a></li>
            <li><a href="/shop" className="text-muted-foreground hover:text-foreground transition-colors">Kids</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="border-t border-border py-6">
        <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} BookVerse. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
