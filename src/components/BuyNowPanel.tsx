import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { buildWhatsAppMessage, createWhatsAppUrl } from "@/lib/checkout";
import { toast } from "@/components/ui/use-toast";

export const BuyNowPanel = () => {
    const { selectedBooks, updateSelectedQuantity, removeSelectedBook, selectedTotal } = useCart();

    const handleBuyNow = () => {
        if (selectedBooks.length === 0) {
            toast({
                title: "No books selected",
                description: "Please select at least one book.",
            });
            return;
        }

        const message = buildWhatsAppMessage(
            selectedBooks.map((book) => ({
                id: book.id,
                title: book.title,
                price: book.price,
                quantity: book.quantity,
            }))
        );

        const url = createWhatsAppUrl(message);
        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <section className="sticky bottom-4 z-30 mt-10 rounded-3xl border border-border/70 bg-card/95 p-4 shadow-elegant backdrop-blur md:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Quick order</p>
                    <h3 className="mt-1 font-serif text-2xl font-semibold">Selected books</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Adjust quantities and send your order directly on WhatsApp.</p>
                </div>
                <Button size="lg" className="rounded-full" onClick={handleBuyNow}>
                    Buy Now
                </Button>
            </div>

            {selectedBooks.length === 0 ? (
                <p className="mt-4 rounded-2xl border border-dashed border-border bg-background/70 px-4 py-3 text-sm text-muted-foreground">
                    Please select at least one book.
                </p>
            ) : (
                <div className="mt-5 space-y-3">
                    {selectedBooks.map((book) => (
                        <div key={book.id} className="flex flex-col gap-3 rounded-2xl border border-border bg-background p-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="font-medium">{book.title}</p>
                                <p className="text-sm text-muted-foreground">{book.author}</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <div className="flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8"
                                        onClick={() => updateSelectedQuantity(book.id, book.quantity - 1)}
                                        disabled={book.quantity <= 1}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="min-w-[2rem] text-center text-sm font-medium">{book.quantity}</span>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8"
                                        onClick={() => updateSelectedQuantity(book.id, book.quantity + 1)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <span className="text-sm font-semibold">Rs. {(book.price * book.quantity).toLocaleString("en-PK")}</span>
                                <Button size="sm" variant="outline" onClick={() => removeSelectedBook(book.id)}>
                                    <Trash2 className="mr-2 h-4 w-4" /> Remove
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <p className="text-sm text-muted-foreground">Grand total</p>
                <p className="text-lg font-semibold">Rs. {selectedTotal.toLocaleString("en-PK")}</p>
            </div>
        </section>
    );
};
