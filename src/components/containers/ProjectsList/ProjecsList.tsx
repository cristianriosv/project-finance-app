import { useState, useContext } from "react";
import { Card } from "@material-tailwind/react";
import ProjectTableRow from "../../domains/ProjectTableRow/ProjectTableRow";
import TableHead from "../../common/TableHead/TableHead";
import { ProjectsContext } from "../../../store/ProjectsProvider";


const ProjectsList = () => {
    const TABLE_HEAD = ["id", "Client", "Project title", "Total", ""];
    const [openedProject, setOpenedProject] = useState<number | null>(null);
    const { projects } = useContext(ProjectsContext)

    const handleOpen = (id: number) => {
        setOpenedProject(openedProject === id ? null : id);
    }

    const renderTableRow = (project: ProjectType, index: number) => {
        const isLast = index === projects.length - 1;
        const isOpened = project.id === openedProject;
        return (
            <ProjectTableRow
                id={project.id}
                client={project.client}
                title={project.title}
                total={project.total}
                isLast={isLast}
                isOpened={isOpened}
                handleOpen={handleOpen}
                key={project.id}
                invoices={project.invoices}
            />
        )
    };

    return (
        <Card className="h-full w-full">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => <TableHead key={head} headName={head} />)}
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project, index) => renderTableRow(project, index))}
                </tbody>
            </table>
        </Card>
    )
};

export default ProjectsList;