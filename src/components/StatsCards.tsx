import { Book, Star, Users } from "lucide-react";

export const StatsCards = () => {
    const stats = [
        {
            icon: Book,
            label: "10k+",
            description: "Books",
            value: "10,000+ curated titles",
        },
        {
            icon: Star,
            label: "4.9★",
            description: "Rating",
            value: "Highly rated by readers",
        },
        {
            icon: Users,
            label: "50k+",
            description: "Readers",
            value: "Happy customers worldwide",
        },
    ];

    return (
        <section className="container px-2 py-16 sm:px-3">
            <div className="grid gap-6 md:grid-cols-3">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-xl border border-border bg-card/50 p-8 transition-all duration-300 hover:border-primary/50 hover:bg-card"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="relative">
                                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 transition-colors duration-300 group-hover:bg-primary/20">
                                    <Icon className="h-6 w-6 text-primary" />
                                </div>
                                <div className="mb-2 text-3xl font-bold text-foreground">{stat.label}</div>
                                <div className="text-sm font-medium text-muted-foreground">{stat.description}</div>
                                <div className="mt-3 text-xs text-muted-foreground">{stat.value}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
