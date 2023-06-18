import { useState, useContext } from "react";
import { Card } from "@material-tailwind/react";
import ProjectTableRow from "../../domains/ProjectTableRow/ProjectTableRow";
import TableHead from "../../common/TableHead/TableHead";
import { ProjectsContext } from "../../../store/ProjectsProvider";
import { formatNumber } from "../../../utils/numberUtils";


type ProjectListProps = {
    className?: string;
}

const ProjectsList = ({ className }: ProjectListProps) => {
    const TABLE_HEAD = ["id", "Project title", "Client", "Total", ""];
    const [openedProject, setOpenedProject] = useState<number | null>(null);
    const { projects } = useContext(ProjectsContext)

    const handleOpen = (id: number) => {
        setOpenedProject(openedProject === id ? null : id);
    }

    return (
        <Card className={`overflow-scroll h-full w-full ${className}`}>
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head, index) => <TableHead key={index} headName={head} />)}
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project, index) => {
                        const isOpened = project.id === openedProject;
                        return (
                            <ProjectTableRow
                                id={project.id}
                                client={project.client}
                                title={project.title}
                                total={formatNumber(project.total)}
                                isOpened={isOpened}
                                handleOpen={handleOpen}
                                key={project.id}
                                invoices={project.invoices}
                            />
                        )
                    })}
                </tbody>
            </table>
        </Card>
    )
};

export default ProjectsList;