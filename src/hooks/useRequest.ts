import mockServer from "../mockServer";

const useRequest = () => {
    const getData = async (url: string) => {
        const data = await mockServer(url, 'GET');
        return data;
    }

    return {
        getData
    }
};

export default useRequest;