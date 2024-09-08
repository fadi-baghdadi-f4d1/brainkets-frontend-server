import axios from 'axios';
import baseApi from '../baseApi';
import { UpdateCompanyRequest } from './dto/UpdateCompanyRequest';

export const updateCompany = async (data: UpdateCompanyRequest): Promise<void> => {
    try {
        await baseApi.put('/companies/1', data);
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Update company data failed');
        } else {
            throw new Error('Update company data failed');
        }
    }
};