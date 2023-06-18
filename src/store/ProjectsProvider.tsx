import { ReactNode, createContext, useState } from "react";
import useProjects from "../hooks/useProjects";
import { DEFAULT_INVOICE } from "../constants/invoiceDefaultData";

type ProjectsContextProps = {
    projects: ProjectType[];
    invoiceForm: InvoiceFormType;
    handleInvoiceForm: (open: boolean, isNew: boolean, data?: InvoiceType, projectId?: number) => void;
}

type useProjectsStoreProps = {
    children: ReactNode
}

const INITIAL_INVOICE_FORM: InvoiceFormType = { data: DEFAULT_INVOICE, isNew: false, open: false };

export const ProjectsContext = createContext<ProjectsContextProps>({
    projects: [],
    invoiceForm: INITIAL_INVOICE_FORM,
    handleInvoiceForm: () => null
});

const ProjectsProvider = ({ children }: useProjectsStoreProps) => {
    const { projects } = useProjects();
    const [invoiceForm, setInvoiceForm] = useState(INITIAL_INVOICE_FORM);

    const handleInvoiceForm = (open: boolean, isNew: boolean, data?: InvoiceType, projectId?: number) => {
        setInvoiceForm({
            open,
            isNew,
            data: data || DEFAULT_INVOICE,
            projectId
        });
    };

    const PROJECTS_STORE = {
        projects,
        invoiceForm,
        handleInvoiceForm
    };

    return (
        <ProjectsContext.Provider value={PROJECTS_STORE}>
            {children}
        </ProjectsContext.Provider>
    );
};

export default ProjectsProvider;