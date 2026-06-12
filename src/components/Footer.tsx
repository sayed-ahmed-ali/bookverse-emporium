import { BookOpen, Instagram, Twitter, Facebook, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  return (
    <footer className="mt-24 border-t border-border bg-gradient-to-b from-background to-secondary/20">
      <div className="container grid gap-12 py-16 md:grid-cols-5">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-serif text-xl font-semibold">
            <BookOpen className="h-6 w-6 text-primary" />
            BookVerse
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Discover thousands of thoughtfully curated books for every reader. Premium quality, exceptional service.
          </p>
          <div className="flex gap-2 pt-2">
            <a href="#" aria-label="Instagram" className="p-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors">
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary" />
            </a>
            <a href="#" aria-label="Twitter" className="p-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors">
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" />
            </a>
            <a href="#" aria-label="Facebook" className="p-2 rounded-lg bg-secondary hover:bg-primary/10 transition-colors">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary" />
            </a>
          </div>
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

        {/* Company Column */}
        <div>
          <h4 className="mb-4 font-serif text-base font-semibold">Company</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Press</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
          </ul>
        </div>

        {/* Help Column */}
        <div>
          <h4 className="mb-4 font-serif text-base font-semibold">Help & Support</h4>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Shipping Info</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Returns</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <h4 className="mb-4 font-serif text-base font-semibold">Newsletter</h4>
          <p className="mb-3 text-sm text-muted-foreground">Get weekly book recommendations delivered to your inbox.</p>
          <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input 
              type="email" 
              placeholder="your@email.com" 
              className="h-10 text-sm"
            />
            <Button size="sm" variant="default" className="w-full">
              <Mail className="mr-2 h-4 w-4" />
              Subscribe
            </Button>
          </form>
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
