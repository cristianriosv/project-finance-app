type ProjectProps = {
    id: number;
    title: string;
    client: string;
    total: number;
    invoices: InvoiceProps[];
}

type InvoiceProps = {
    id: number;
    items: ItemInvoiceProps[];
    discountOrFee: number;
    taxPercentage: number;
    total: number;
    subTotal: number;
    dueDate: Date;
}

type ItemProps = {
    id: number;
    title: string;
    quantity: number;
    unit: UNITS;
    unitPrice: number;
}
type ItemInvoiceProps = Record<keyof ItemProps | string, number, UNITS>

type InvoiceFormProps = {
    data?: InvoiceProps;
    projectId?: number;
    isNew: boolean;
    open: boolean;
}