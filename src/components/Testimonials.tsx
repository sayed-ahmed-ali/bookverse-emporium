import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/books";

export const Testimonials = () => {
  return (
    <section className="bg-secondary/40 py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">Loved by readers</p>
          <h2 className="mt-2 font-serif text-4xl font-semibold md:text-5xl">What our community says</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="relative rounded-2xl bg-card p-8 shadow-soft transition-smooth hover:shadow-elegant">
              <Quote className="absolute right-6 top-6 h-8 w-8 text-accent/30" />
              <div className="flex gap-0.5 text-accent">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 font-serif text-lg leading-relaxed">"{t.quote}"</p>
              <div className="mt-6">
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
