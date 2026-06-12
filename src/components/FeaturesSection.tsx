import { Truck, Lock, RotateCcw, Zap } from "lucide-react";

export const FeaturesSection = () => {
    const features = [
        {
            icon: Truck,
            title: "Free Shipping",
            description: "On orders over $50. Fast delivery nationwide.",
        },
        {
            icon: Lock,
            title: "Secure Payments",
            description: "100% secure transactions with SSL encryption.",
        },
        {
            icon: RotateCcw,
            title: "Easy Returns",
            description: "30-day money-back guarantee. No questions asked.",
        },
        {
            icon: Zap,
            title: "Huge Collection",
            description: "10,000+ books across all genres and categories.",
        },
    ];

    return (
        <section className="container px-2 py-20 sm:px-3">
            <div className="mb-12 text-center">
                <p className="text-sm font-medium uppercase tracking-wider text-accent">Why Choose Us</p>
                <h2 className="mt-2 font-serif text-4xl font-semibold md:text-5xl">Premium Book Shopping Experience</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary/5 to-secondary/5 p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
                        >
                            <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 transition-transform duration-300 group-hover:scale-110">
                                <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="mb-2 font-semibold text-foreground">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
