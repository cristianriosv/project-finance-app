import InvoiceForm from "../../components/containers/InvoiceForm";
import ProjectsList from "../../components/containers/ProjectsList";
import QuestionForm from "../../components/containers/QuestionForm/QuestionForm";
import ProjectsProvider from "../../store/ProjectsProvider";

const ProjectsView = () => {
    return (
        <ProjectsProvider>
            <QuestionForm />
            <InvoiceForm />
            <ProjectsList />
        </ProjectsProvider>
    );
};

export default ProjectsView;
