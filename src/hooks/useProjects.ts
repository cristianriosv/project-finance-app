import { useEffect, useState } from "react";
import useRequest from "./useRequest";

const useProjects = () => {
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const { getData } = useRequest();

    const loadProjects = async () => {
        const getProjects: Record<'data', ProjectType[]> = await getData('projects');
        setProjects(getProjects.data);
    };

    useEffect(() => {
        loadProjects();
    }, []);

    return {
        projects,
        loadProjects
    }
};

export default useProjects;
