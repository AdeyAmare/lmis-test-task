import { useQuery } from '@tanstack/react-query';
import { FetchCertDataParams, fetchAllCertData } from '../services/api';


export const useCertData = ({ page, limit }: FetchCertDataParams) => {
    return useQuery({
        queryKey: ['certData', { page, limit }],
        queryFn: () => fetchAllCertData()
    });
};





