import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("Welcome to BookVerse! Check your inbox 📬");
    setEmail("");
  };
  return (
    <section className="container py-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-primary px-6 py-16 text-primary-foreground md:px-16 md:py-20">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary-glow/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative mx-auto max-w-2xl text-center">
          <Mail className="mx-auto h-10 w-10 opacity-90" />
          <h2 className="mt-4 font-serif text-4xl font-semibold md:text-5xl">Join the reading list</h2>
          <p className="mt-4 text-base opacity-90 md:text-lg">
            Get weekly book recommendations, exclusive discounts, and early access to new releases.
          </p>
          <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 flex-1 border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:ring-primary-foreground/40"
            />
            <Button type="submit" size="lg" variant="secondary" className="h-12 rounded-md">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
