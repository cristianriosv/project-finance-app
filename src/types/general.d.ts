type ProjectType = {
    id: number;
    title: string;
    client: string;
    total: number;
    invoices: InvoiceProps[];
}

type InvoiceType = {
    id: number;
    items: ItemInvoiceProps[];
    discountOrFee: number;
    taxPercentage: number;
    total: number;
    subTotal: number;
    dueDate: Date;
}

type ItemType = {
    id: number;
    title: string;
    quantity: number;
    unit: UNITS;
    unitPrice: number;
}
type ItemInvoiceType = Record<keyof ItemProps | string, number, UNITS>

type InvoiceFormType = {
    data?: InvoiceProps;
    projectId?: number;
    isNew: boolean;
    open: boolean;
}