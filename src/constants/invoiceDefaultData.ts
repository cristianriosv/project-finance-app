export const DEFAULT_INVOICE: InvoiceType = {
    id: -1,
    discountOrFee: 0,
    taxPercentage: 0,
    items: [],
    total: 0,
    subTotal: 0,
    dueDate: new Date().toISOString()
}