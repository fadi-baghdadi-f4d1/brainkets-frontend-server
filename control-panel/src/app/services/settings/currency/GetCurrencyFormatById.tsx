import axios from 'axios';
import baseApi from '../baseApi';
import { CurrencyFormatResponse } from './dto/CurrencyFormatResponse';

export const getCurrencyFormatById = async (): Promise<CurrencyFormatResponse> => {
    try {
        const response = await baseApi.get<{data: CurrencyFormatResponse}>(`/currencies/currency-format/1`); 
        return response.data.data; 
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Get currency data failed');
        } else {
            throw new Error('Get currency data failed');
        }
    }
};
