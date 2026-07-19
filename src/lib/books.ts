export type Book = {
    id: string;
    title: string;
    author: string;
    price: number;
    discountPrice?: number;
    percentage?: number;
    rating: number;
    reviews: number;
    category: string;
    categoryId?: string;
    language: string;
    cover: string;
    description: string;
    badge?: string;
};

export type Category = {
    id: string;
    name: string;
};

type ApiBook = {
    id: number | string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    discountPrice?: number;
    percentage?: number;
    category?: {
        id: number | string;
        name: string;
    };
    author?: {
        id: number | string;
        name: string;
    };
};

const API_BASE_URL = "http://192.168.100.15:8081/mehranbookstore_com";
const IMAGE_BASE_URL = "http://192.168.100.15:8081/mehranbookstore_com";
const BOOKS_URL = "http://192.168.100.15:8081/mehranbookstore_com/books";
const CATEGORIES_URL = "http://192.168.100.15:8081/mehranbookstore_com/categories";

const normalizeBook = (apiBook: ApiBook): Book => ({
    id: String(apiBook.id),
    title: apiBook.name,
    author: apiBook.author?.name ?? "Unknown author",
    price: apiBook.price,
    discountPrice: apiBook.discountPrice,
    percentage: apiBook.percentage,
    rating: 4.8,
    reviews: 0,
    category: apiBook.category?.name ?? "Uncategorized",
    categoryId: apiBook.category?.id != null ? String(apiBook.category.id) : undefined,
    language: "English",
    cover: apiBook.imageUrl ? new URL(apiBook.imageUrl, IMAGE_BASE_URL).href : "",
    description: apiBook.description,
});

export const fetchBooks = async (): Promise<Book[]> => {
    const response = await fetch(BOOKS_URL);

    if (!response.ok) {
        throw new Error("Failed to load books from the API");
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
        throw new Error("Books API returned unexpected data");
    }

    return data.map(normalizeBook);
};

export const fetchCategories = async (): Promise<Category[]> => {
    const response = await fetch(CATEGORIES_URL);

    if (!response.ok) {
        throw new Error("Failed to load categories from the API");
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
        throw new Error("Categories API returned unexpected data");
    }

    return data.map((category) => ({
        id: String(category.id),
        name: category.name ?? "Unknown",
    }));
};
