import axios from 'axios';
import baseApi from '../baseApi';
import { CurrencyResponse } from './dto/CurrencyResponse';

export const getCurrencyById = async (currenyId: number): Promise<CurrencyResponse> => {
    try {
        const response = await baseApi.get<{ data: CurrencyResponse }>(`/currencies/${currenyId}`);
        return response.data.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Get currency data failed');
        } else {
            throw new Error('Get currency data failed');
        }
    }
};
