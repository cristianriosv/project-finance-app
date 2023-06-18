import { ReactNode, createContext, useState } from "react";
import useProjects from "../hooks/useProjects";
import { DEFAULT_INVOICE } from "../constants/invoiceDefaultData";

type ProjectsContextProps = {
    projects: ProjectType[];
    invoiceForm: InvoiceFormType;
    questionForm: QuestionFormType;
    handleInvoiceForm: (open: boolean, isNew: boolean, data?: InvoiceType, projectId?: number) => void;
    handleQuestionForm: (open: boolean, question?: string, action?: () => void) => void;
}

type useProjectsStoreProps = {
    children: ReactNode
}

const INITIAL_INVOICE_FORM: InvoiceFormType = { data: DEFAULT_INVOICE, isNew: false, open: false };
const INITIAL_QUESTION_FORM: QuestionFormType = { open: false };

export const ProjectsContext = createContext<ProjectsContextProps>({
    projects: [],
    invoiceForm: INITIAL_INVOICE_FORM,
    questionForm: INITIAL_QUESTION_FORM,
    handleInvoiceForm: () => null,
    handleQuestionForm: () => null
});

const ProjectsProvider = ({ children }: useProjectsStoreProps) => {
    const { projects, loadProjects } = useProjects();
    const [invoiceForm, setInvoiceForm] = useState(INITIAL_INVOICE_FORM);
    const [questionForm, setQuestionForm] = useState(INITIAL_QUESTION_FORM);

    const handleInvoiceForm = (open: boolean, isNew: boolean, data?: InvoiceType, projectId?: number) => {
        setInvoiceForm({
            open,
            isNew,
            data: data || DEFAULT_INVOICE,
            projectId
        });
        loadProjects();
    };

    const handleQuestionForm = (open: boolean, question?: string, action?: () => void) => {
        setQuestionForm({
            open,
            question: question,
            action
        });
        loadProjects();
    };

    const PROJECTS_STORE = {
        projects,
        invoiceForm,
        questionForm,
        handleInvoiceForm,
        handleQuestionForm
    };

    return (
        <ProjectsContext.Provider value={PROJECTS_STORE}>
            {children}
        </ProjectsContext.Provider>
    );
};

export default ProjectsProvider;