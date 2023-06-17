type ProjectProps = {
    id: number;
    title: string;
    client: string;
    dueDate: Date;
    total: number;
    invoices: InvoiceProps[];
}

type InvoiceProps = {
    id: number;
    title: string;
    items: ItemInvoiceProps[];
    discountOrFee: number;
    taxPercentage: number;
}

type ItemInvoiceProps = {
    id: number;
    title: string;
    quantity: number;
    unit: UNITS;
    unitPrice: number;
}