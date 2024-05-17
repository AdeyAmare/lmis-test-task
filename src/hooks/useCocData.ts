import { useQuery } from '@tanstack/react-query';
import { fetchCocData } from '../services/api';

interface CocDataApiResponse {
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

export const useCocData = () => {
  return useQuery<CocDataApiResponse, Error>({
    queryKey: ['cocData'],
    queryFn: fetchCocData
  });
};