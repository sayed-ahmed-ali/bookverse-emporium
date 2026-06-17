import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, itemCount, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
    const [itemToRemove, setItemToRemove] = useState<string | null>(null);
    const [confirmClear, setConfirmClear] = useState(false);

    return (
        <div className="min-h-screen">
            <Header />
            <main className="container py-12">
                <div className="mb-10">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-wider text-accent">Your Cart</p>
                        <h1 className="mt-2 font-serif text-4xl font-semibold md:text-5xl">Shopping bag</h1>
                        <p className="mt-2 text-muted-foreground">Review the books you added, update quantities, or remove items before checkout.</p>
                    </div>
                </div>

                {cartItems.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-border bg-muted p-12 text-center text-muted-foreground">
                        <p className="text-lg font-medium">Your cart is empty.</p>
                        <p className="mt-2">Add books from the shop and come back to view your cart history.</p>
                        <Button className="mt-6" size="sm" onClick={() => navigate("/shop")}>
                            Browse books
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="rounded-3xl border border-border bg-card p-6">
                            <div className="mb-6">
                                <div>
                                    <p className="text-sm text-muted-foreground">You have added</p>
                                    <h2 className="text-2xl font-semibold">{itemCount} book{itemCount === 1 ? "" : "s"} in your cart</h2>
                                </div>
                                <AlertDialog open={confirmClear} onOpenChange={(open) => !open && setConfirmClear(false)}>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size="sm">
                                            Clear cart
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogTitle>Clear cart</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Do you want to delete all items from your cart?
                                        </AlertDialogDescription>
                                        <div className="flex gap-3 pt-4">
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => {
                                                    clearCart();
                                                    setConfirmClear(false);
                                                }}
                                            >
                                                Yes, clear cart
                                            </AlertDialogAction>
                                        </div>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>

                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="grid gap-4 rounded-3xl border border-border bg-background p-4 md:grid-cols-[120px_1fr_180px]">
                                        <div className="overflow-hidden rounded-2xl bg-muted">
                                            <img src={item.cover} alt={item.title} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="flex flex-col justify-between gap-4">
                                            <div>
                                                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{item.category}</p>
                                                <h3 className="mt-2 font-serif text-lg font-semibold">{item.title}</h3>
                                                <p className="mt-1 text-sm text-muted-foreground">{item.author}</p>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1">
                                                    <Button
                                                        size="icon"
                                                        variant="outline"
                                                        onClick={() => {
                                                            if (item.quantity === 1) {
                                                                setItemToRemove(item.id);
                                                            } else {
                                                                updateQuantity(item.id, item.quantity - 1);
                                                            }
                                                        }}
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                    <span className="min-w-[2rem] text-center text-sm font-medium">{item.quantity}</span>
                                                    <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <AlertDialog open={itemToRemove === item.id} onOpenChange={(open) => !open && setItemToRemove(null)}>
                                                    <AlertDialogTrigger asChild>
                                                        <Button size="sm" variant="outline" onClick={() => setItemToRemove(item.id)}>
                                                            <Trash2 className="h-4 w-4" /> Remove
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogTitle>Remove item</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you want to remove "{item.title}" from your cart?
                                                        </AlertDialogDescription>
                                                        <div className="flex gap-3">
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => {
                                                                    removeFromCart(item.id);
                                                                    setItemToRemove(null);
                                                                }}
                                                            >
                                                                Remove
                                                            </AlertDialogAction>
                                                        </div>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-between gap-4">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Price per unit</p>
                                                <p className="mt-2 font-serif text-xl font-semibold">₨{(item.discountPrice ?? item.price).toFixed(2)}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Subtotal</p>
                                                <p className="mt-2 font-semibold">₨{((item.discountPrice ?? item.price) * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-border bg-card p-6 md:flex md:items-center md:justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Order summary</p>
                                <p className="mt-2 text-3xl font-semibold">Total: ₨{totalPrice.toFixed(2)}</p>
                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Button size="lg" className="rounded-full" onClick={() => alert("Checkout functionality coming soon!")}>
                                    Checkout
                                </Button>
                                <Button variant="outline" size="lg" className="rounded-full" onClick={() => navigate("/")}>
                                    Continue shopping
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Cart;
