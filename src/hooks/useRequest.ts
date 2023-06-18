import mockServer from "../mockServer";

const useRequest = () => {
    const getData = async (url: string) => {
        const data = await mockServer(url, 'GET');
        return {...data};
    }

    const setData = async (url: string, body?: Record<string, any>) => {
        const data = await mockServer(url, 'POST', body);
        return {...data};
    }

    return {
        getData,
        setData
    }
};

export default useRequest;