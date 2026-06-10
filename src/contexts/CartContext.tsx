import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Book } from "@/lib/books";

type CartItem = Book & {
    quantity: number;
};

type CartContextValue = {
    cartItems: CartItem[];
    itemCount: number;
    totalPrice: number;
    addToCart: (book: Book, quantity?: number) => void;
    updateQuantity: (id: string, quantity: number) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const CART_STORAGE_KEY = "bookverse_cart";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Rehydrate from localStorage on mount to ensure consistency across environments
    useEffect(() => {
        try {
            const stored = window.localStorage.getItem(CART_STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as CartItem[];
                setCartItems(parsed);
            }
        } catch (e) {
            // ignore parse errors
            // console.warn("Failed to parse cart from storage", e);
        }
    }, []);

    useEffect(() => {
        try {
            window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        } catch {
            // ignore quota / write errors
        }
    }, [cartItems]);

    // Keep cart in sync across tabs
    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key === CART_STORAGE_KEY) {
                try {
                    const val = e.newValue;
                    setCartItems(val ? (JSON.parse(val) as CartItem[]) : []);
                } catch {
                    setCartItems([]);
                }
            }
        };

        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    const addToCart = (book: Book, quantity = 1) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === book.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === book.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [...prev, { ...book, quantity }];
        });
    };

    const updateQuantity = (id: string, quantity: number) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeFromCart = (id: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const itemCount = useMemo(
        () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
        [cartItems]
    );

    const totalPrice = useMemo(
        () =>
            cartItems.reduce(
                (sum, item) => sum + (item.discountPrice ?? item.price) * item.quantity,
                0
            ),
        [cartItems]
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                itemCount,
                totalPrice,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
