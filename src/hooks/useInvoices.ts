import useProjects from "./useProjects";
import useRequest from "./useRequest";

const useInvoices = () => {
    const { loadProjects } = useProjects();
    const { setData } = useRequest();
    
    const saveInvoiceData = async (projectId: number, invoiceData: InvoiceType, isNew = false) => {
        if (isNew) {
            await setData('invoices/new', { projectId, invoice: invoiceData });
        } else {
            await setData('invoices', { projectId, invoice: invoiceData });
        }
        loadProjects();
    }

    const deleteInvoice = async (projectId: number, invoiceId: number) => {
        await setData('invoices/delete', { projectId, invoiceId });
        loadProjects();
    }

    return {
        saveInvoiceData,
        deleteInvoice
    }
}

export default useInvoices;