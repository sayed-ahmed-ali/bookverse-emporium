import { describe, expect, it } from "vitest";
import { buildWhatsAppMessage } from "./checkout";

describe("buildWhatsAppMessage", () => {
    it("formats selected books into the expected WhatsApp order message", () => {
        const message = buildWhatsAppMessage([
            {
                id: "1",
                title: "Atomic Habits",
                price: 1500,
                quantity: 2,
            },
            {
                id: "2",
                title: "The Psychology of Money",
                price: 1200,
                quantity: 1,
            },
        ]);

        expect(message).toContain("Hello, I would like to order the following books:");
        expect(message).toContain("1. Atomic Habits");
        expect(message).toContain("Quantity: 2");
        expect(message).toContain("Subtotal: Rs. 3,000");
        expect(message).toContain("Grand Total: Rs. 4,200");
    });
});
