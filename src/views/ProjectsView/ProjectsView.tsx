import ProjectsList from "../../components/containers/ProjectsList";
import useProjects from "../../hooks/useProjects";

const ProjectsView = () => {
    const { projects } = useProjects();
    
    return (
        <ProjectsList projects={projects} />
    );
};

export default ProjectsView;
