import { useEffect, useState } from "react";
import useRequest from "./useRequest";

const useProjects = () => {
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const { getData, setData } = useRequest();

    const loadProjects = async () => {
        const getProjects: Record<'data', ProjectType[]> = await getData('projects');
        setProjects(getProjects.data);
    };

    const saveInvoiceData = async (projectId: number, invoiceData: InvoiceType, isNew = false) => {
        if (isNew) {
            await setData('invoices/new', { projectId, invoice: invoiceData });
        } else {
            await setData('invoices', { projectId, invoice: invoiceData });
        }
        loadProjects();
    }

    useEffect(() => {
        loadProjects();
    }, []);

    return {
        projects,
        saveInvoiceData,
        loadProjects
    }
};

export default useProjects;
