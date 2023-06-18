import { useEffect, useState } from "react";
import useRequest from "./useRequest";

const useProjects = () => {
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const { getData } = useRequest();

    const loadProjects = async () => {
        const getProjects: ProjectType[] = await getData('projects');
        setProjects(getProjects);
    };

    useEffect(() => {
        loadProjects();
    }, []);

    return {
        projects
    }
};

export default useProjects;
