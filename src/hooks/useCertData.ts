import { useQuery } from '@tanstack/react-query';
import { FetchCertDataParams, fetchAllCertData, fetchCertData } from '../services/api';


export const useCertData = ({ page, limit }: FetchCertDataParams) => {
    return useQuery({
        queryKey: ['certData', { page, limit }],
        queryFn: () => fetchAllCertData()
    });
};





