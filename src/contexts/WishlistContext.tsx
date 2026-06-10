import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Book } from "@/lib/books";

type WishlistContextValue = {
    wishlistedIds: string[];
    isWishlisted: (id: string) => boolean;
    toggleWishlist: (book: Book) => void;
};

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);
const WISHLIST_STORAGE_KEY = "bookverse_wishlist";

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
    const [wishlistedIds, setWishlistedIds] = useState<string[]>([]);

    useEffect(() => {
        try {
            const stored = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
            if (stored) {
                setWishlistedIds(JSON.parse(stored) as string[]);
            }
        } catch {
            setWishlistedIds([]);
        }
    }, []);

    useEffect(() => {
        try {
            window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistedIds));
        } catch {
            // ignore write errors
        }
    }, [wishlistedIds]);

    const isWishlisted = (id: string) => wishlistedIds.includes(id);

    const toggleWishlist = (book: Book) => {
        setWishlistedIds((prev) =>
            prev.includes(book.id) ? prev.filter((id) => id !== book.id) : [...prev, book.id]
        );
    };

    const value = useMemo(
        () => ({ wishlistedIds, isWishlisted, toggleWishlist }),
        [wishlistedIds]
    );

    return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within a WishlistProvider");
    }
    return context;
};