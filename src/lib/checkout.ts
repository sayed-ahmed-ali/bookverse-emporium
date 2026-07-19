export type CheckoutItem = {
    id: string;
    title: string;
    price: number;
    quantity: number;
};

const formatCurrency = (value: number) =>
    `Rs. ${value.toLocaleString("en-PK", { maximumFractionDigits: 0 })}`;

export const buildWhatsAppMessage = (items: CheckoutItem[]) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const body = [
        "Hello, I would like to order the following books:",
        "",
        ...items.flatMap((item, index) => [
            `${index + 1}. ${item.title}`,
            "",
            `Quantity: ${item.quantity}`,
            "",
            `Price: ${formatCurrency(item.price)}`,
            "",
            `Subtotal: ${formatCurrency(item.price * item.quantity)}`,
            index < items.length - 1 ? "" : "",
        ]),
        `Grand Total: ${formatCurrency(total)}`,
        "",
        "Please confirm availability and delivery details.",
    ];

    return body.join("\n");
};

export const createWhatsAppUrl = (message: string, phoneNumber = "923XXXXXXXXX") =>
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
