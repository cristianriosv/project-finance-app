import { useEffect, useState } from "react";
import useRequest from "./useRequest";

const useProjects = () => {
    const [projects, setProjects] = useState<ProjectProps[]>([]);
    const { getData } = useRequest();

    const loadProjects = async () => {
        const getProjects: ProjectProps[] = await getData('projects');
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
