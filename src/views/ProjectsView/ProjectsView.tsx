import { Typography } from "@material-tailwind/react";
import InvoiceForm from "../../components/containers/InvoiceForm";
import InvoicePrint from "../../components/containers/InvoicePrint/InvoicePrint";
import ProjectsList from "../../components/containers/ProjectsList";
import QuestionForm from "../../components/containers/QuestionForm/QuestionForm";
import ProjectsProvider from "../../store/ProjectsProvider";

const ProjectsView = () => {
    return (
        <ProjectsProvider>
            <InvoicePrint />
            <QuestionForm />
            <InvoiceForm />
            <div className="max-w-screen-2xl w-full h-full flex flex-col p-5 gap-4 m-auto">
                <Typography variant="h3">Finacial status by project:</Typography>
                <div className="w-full flex align-center justify-center">
                    <ProjectsList className="w-full mt-5" />
                </div>
            </div>
        </ProjectsProvider>
    );
};

export default ProjectsView;
