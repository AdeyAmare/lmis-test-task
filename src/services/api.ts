import { api } from './config';

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

interface CocCertificate {
    id: number;
    reg_no: string;
    first_name: string;
    father_name: string;
    occ_name: string;
    grand_father_name: string;
    practical_result: string;
    nationality: string;
    sub_city: string;
    home_phone: string | null;
    office_phone: string | null;
    marital_status: string;
    disability: string;
    disability_nature: string | null;
    institute_type: string;
    occupation_trained_on: string | null;
    mode_of_training: string;
    competent_status: string;
    region: string;
    city: string;
    month: string;
    location: string;
    level: number;
    age: number;
    knowledge_result: number;
    out_of_result: number;
    week: string;
    year: string;
    branch_code: string;
    assessed: string;
    occ_code: string;
    result_modified_by: string;
    national_id: string | null;
    institution_nam: string | null;
    field_of_study: string | null;
    certificate_obtained: string | null;
    start_date: string | null;
    end_date: string | null;
    reference_number: string | null;
    competency_taken_date: string | null;
    sex: string;
    training_en: string | null;
    createdAt: string;
    updatedAt: string;
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

export const fetchCocCertificates = async (page: number, limit: number): Promise<{ data: CocCertificate[], total: number, page: number, limit: number, totalPages: number }> => {
    try {
        const response = await api.get('/coc/get-all', {
            params: { page, limit },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching COC certificates:', error);
        throw error;
    }
};
