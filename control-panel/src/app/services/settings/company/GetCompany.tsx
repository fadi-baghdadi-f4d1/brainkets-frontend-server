import axios from 'axios';
import baseApi from '../baseApi';
import { CompanyResponse } from './dto/CompanyResponse';

export const getCompany = async (): Promise<CompanyResponse['data']> => {
    try {
        const response = await baseApi.get<CompanyResponse>('/companies/1');
        return response.data.data; // Access the `data` field within the response
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                return null; // Resource not found
            }
            throw new Error(error.response?.data?.message || 'Get company data failed');
        } else {
            throw new Error('Get company data failed');
        }
    }
};
