import { useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import ProjectTableRow from "../../domains/ProjectTableRow/ProjectTableRow";

type ProjectsListProps = {
    projects: ProjectProps[]
}

const ProjectsList = ({ projects }: ProjectsListProps) => {
    const TABLE_HEAD = ["id", "Client", "Project title", "Due date", "Total", ""];
    const [openedProject, setOpenedProject] = useState<number | null>(null);

    const handleOpen = (id: number) => {
        setOpenedProject(openedProject === id ? null : id);
    }

    const renderTableHead = (headName: string) => (
        <th key={headName} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
            <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
            >
                {headName}
            </Typography>
        </th>
    );

    const renderTableRow = (project: ProjectProps, index: number) => {
        const isLast = index === projects.length - 1;
        const isOpened = project.id === openedProject;
        return (
            <ProjectTableRow
                id={project.id}
                client={project.client}
                title={project.title}
                dueDate={project.dueDate}
                total={project.total}
                isLast={isLast}
                isOpened={isOpened}
                handleOpen={handleOpen}
                key={project.id}
            />
        )
    };

    return (
        <Card className="overflow-scroll h-full w-full">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                <tr>
                    {TABLE_HEAD.map((head) => renderTableHead(head))}
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