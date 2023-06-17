import { mockData } from "./mockData";

const mockServer = (url: string, method: string, body?: Record<string, any>): Promise<any> => {
    if (method === 'GET') {
        switch (url) {
            case 'projects':
                return Promise.resolve(mockData.projects);
            default:
                return Promise.resolve(null);
        }
    }
    return Promise.resolve(null);
};


export default mockServer;