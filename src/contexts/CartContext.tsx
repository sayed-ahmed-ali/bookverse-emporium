import { createContext, useContext, useMemo, useState } from "react";
import type { Book } from "@/lib/books";

type CartItem = Book & {
    quantity: number;
};

type SelectedBook = Book & {
    quantity: number;
};

type CartContextValue = {
    cartItems: CartItem[];
    itemCount: number;
    totalPrice: number;
    selectedBooks: SelectedBook[];
    selectedTotal: number;
    addToCart: (book: Book, quantity?: number) => void;
    updateQuantity: (id: string, quantity: number) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    toggleSelectedBook: (book: Book, quantity?: number) => void;
    updateSelectedQuantity: (id: string, quantity: number) => void;
    removeSelectedBook: (id: string) => void;
    clearSelectedBooks: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [selectedBooks, setSelectedBooks] = useState<SelectedBook[]>([]);

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

    const toggleSelectedBook = (book: Book, quantity = 1) => {
        setSelectedBooks((prev) => {
            const existing = prev.find((item) => item.id === book.id);
            if (existing) {
                return prev.filter((item) => item.id !== book.id);
            }
            return [...prev, { ...book, quantity }];
        });
    };

    const updateSelectedQuantity = (id: string, quantity: number) => {
        setSelectedBooks((prev) =>
            prev
                .map((item) =>
                    item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeSelectedBook = (id: string) => {
        setSelectedBooks((prev) => prev.filter((item) => item.id !== id));
    };

    const clearSelectedBooks = () => {
        setSelectedBooks([]);
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

    const selectedTotal = useMemo(
        () => selectedBooks.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [selectedBooks]
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                itemCount,
                totalPrice,
                selectedBooks,
                selectedTotal,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                toggleSelectedBook,
                updateSelectedQuantity,
                removeSelectedBook,
                clearSelectedBooks,
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
