export type Book = {
    id: string;
    title: string;
    author: string;
    price: number;
    rating: number;
    reviews: number;
    category: string;
    language: string;
    cover: string;
    description: string;
    badge?: string;
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

const API_BASE_URL = "http://192.168.100.5:8081/mehranbookstore_com";
const IMAGE_BASE_URL = "http://192.168.100.5:8081/mehranbookstore_com";
const BOOKS_URL = "http://192.168.100.5:8081/mehranbookstore_com/books";

const normalizeBook = (apiBook: ApiBook): Book => ({
    id: String(apiBook.id),
    title: apiBook.name,
    author: apiBook.author?.name ?? "Unknown author",
    price: apiBook.discountPrice ?? apiBook.price,
    rating: 4.8,
    reviews: 0,
    category: apiBook.category?.name ?? "Uncategorized",
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
