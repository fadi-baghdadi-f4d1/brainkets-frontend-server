import axios from 'axios';
import baseApi from '../baseApi';
import { CurrencyResponse } from './dto/CurrencyResponse';
import { CreateCurrencyRequest } from './dto/CreateCurrencyRequest';

export const createCurrency = async (data: CreateCurrencyRequest): Promise<CurrencyResponse> => {
    try {
        const response = await baseApi.post<{ data: CurrencyResponse }>(`/currencies`, data);
        return response.data.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'create currency failed');
        } else {
            throw new Error('create currency failed');
        }
    }
};
