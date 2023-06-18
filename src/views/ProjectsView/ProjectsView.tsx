import InvoiceForm from "../../components/containers/InvoiceForm";
import ProjectsList from "../../components/containers/ProjectsList";
import ProjectsProvider from "../../store/ProjectsProvider";

const ProjectsView = () => {
    return (
        <ProjectsProvider>
            <InvoiceForm />
            <ProjectsList />
        </ProjectsProvider>
    );
};

export default ProjectsView;
