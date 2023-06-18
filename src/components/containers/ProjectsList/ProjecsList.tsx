import { useState, useContext } from "react";
import { Card, IconButton, Typography } from "@material-tailwind/react";
import ProjectTableRow from "../../domains/ProjectTableRow/ProjectTableRow";
import TableHead from "../../common/TableHead/TableHead";
import { ProjectsContext } from "../../../store/ProjectsProvider";
import { formatNumber } from "../../../utils/numberUtils";


const ProjectsList = () => {
    const TABLE_HEAD = ["id", "Client", "Project title", "Total"];
    const [openedProject, setOpenedProject] = useState<number | null>(null);
    const { projects } = useContext(ProjectsContext)

    const handleOpen = (id: number) => {
        setOpenedProject(openedProject === id ? null : id);
    }

    return (
        <Card className="h-full w-full">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head, index) => <TableHead key={index} headName={head} />)}
                        <TableHead
                            headName={
                                <div className="flex gap-2 items-center">
                                    <Typography variant="small">
                                        Add new project
                                    </Typography>
                                    <IconButton
                                        size="sm"
                                        variant="outlined"
                                        className="w-full m-0 text-center flex items-center gap-1"
                                        // onClick={handleAddNewItem}
                                    >
                                        <i className="fas fa-add" />
                                    </IconButton>
                                </div>
                            }
                        />
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project, index) => {
                        const isLast = index === projects.length - 1;
                        const isOpened = project.id === openedProject;
                        return (
                            <ProjectTableRow
                                id={project.id}
                                client={project.client}
                                title={project.title}
                                total={formatNumber(project.total)}
                                isLast={isLast}
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