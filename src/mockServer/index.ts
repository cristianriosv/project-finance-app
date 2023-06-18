import { mockData } from "./mockData";

// let PROJECT_ID_COUNT = mockData.projects.length;
let INVOICE_ID_COUNT = mockData.projects[0].invoices.length;

const getProjectById = (id: number) => mockData.projects.find((project) => project.id === id);
const getInvoiceIndexById = (invoices: InvoiceType[] = [], id: number = -1) => invoices?.findIndex((invoice) => invoice.id === id);

const calculateAndSaveTotals = (project: ProjectType) => {
    let projectTotal = 0;
    project.invoices.forEach((invoice) => {
        const subTotalInvoice = invoice.items.reduce((total: number, value) => total + Number(value.quantity) * Number(value.unitPrice), 0);
        invoice.subTotal = subTotalInvoice;
        const taxRate = 1 + Number(invoice.taxPercentage) / 100;
        const totalAfterTaxesAndExtras = (subTotalInvoice + Number(invoice.discountOrFee)) * taxRate;
        invoice.total = totalAfterTaxesAndExtras;
        projectTotal += totalAfterTaxesAndExtras;
    });
    project.total = projectTotal;
}

const deepCloneObject = (object: object) => JSON.parse(JSON.stringify(object));

const mockServer = (url: string, method: string, requestBody?: Record<string, any>): Promise<any> => {
    const body = deepCloneObject(requestBody || {});
    if (method === 'GET') {
        switch (url) {
            case 'projects':
                return Promise.resolve({ data: deepCloneObject(mockData.projects) });
        }
    }
    if (method === 'POST' && body) {
        let project;
        switch (url) {
            case 'invoices':
                project = getProjectById(body['projectId']);
                const invoiceId = body['invoice'].id;
                const invoiceIndex = getInvoiceIndexById(project?.invoices, invoiceId);
                if (project && invoiceIndex >= 0) {
                    project.invoices[invoiceIndex] = { ...body['invoice'], id: invoiceId };
                    calculateAndSaveTotals(project);
                    return Promise.resolve({ data: deepCloneObject(project.invoices[invoiceIndex]) });
                };
                return Promise.resolve(null);
            case 'invoices/new':
                project = getProjectById(body['projectId']);
                if (project) {
                    INVOICE_ID_COUNT++;
                    project.invoices.push({...body['invoice'], id: INVOICE_ID_COUNT});
                    calculateAndSaveTotals(project);
                    return Promise.resolve({ data: deepCloneObject(project.invoices) });
                }
                return Promise.resolve(null);

        }
    }
    return Promise.resolve(null);
};


export default mockServer;