import { DataItem } from '../components/CertificationTable';
import { api } from './config';

//request
export interface FetchCertDataParams {
    page?: number;
    limit?: number;
}

// response
interface CocData {
    totalCoc: number;
    totalCompleted: number;
    totalRegular: number;
    totalDistance: number;
    totalPracticalPassed: number;
    totalCountByCity: { _count: { city: number }; city: string }[];
    totalCocThisMonth: number;
    totalCocByMonth: { _count: { month: number }; month: string }[];
    totalPracticalPassedAndFailed: { _count: { practical_result: number }; practical_result: string }[];
}

interface AllDataResponse {
    data: DataItem[];
    total: number;
    totalPages: number;
}


export const fetchCocData = async (): Promise<CocData> => {
    try {
        const response = await api.get<CocData>('/coc/data');
        return response.data;
    } catch (error) {
        console.error('Error fetching COC data:', error);
        throw error;
    }
};




export const fetchCertData = async ({ page = 1, limit = 10 }: FetchCertDataParams = {}): Promise<{ data: DataItem[]; total: number; totalPages: number }> => {
    const response = await api.get('/coc/get-all', { params: { page, limit } });
    return response.data;
};


export const fetchAllCertData = async (): Promise<DataItem[]> => {
    let allData: DataItem[] = [];
    let page = 1;
    let limit = 10;

    while (true) {
        const response = await api.get(`/coc/get-all`, { params: { page, limit } });
        const responseData: AllDataResponse = response.data;

        allData.push(...responseData.data); // Concatenate new data to the existing array

        // Check if we have reached the last page
        if (page >= responseData.totalPages) break;

        // Move to the next page
        page++;
    }

    return allData;
};