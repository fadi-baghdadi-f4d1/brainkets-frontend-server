import axios from 'axios';
import baseApi from '../baseApi';
import { CurrencyResponse } from './dto/CurrencyResponse';
import { UpdateCurrencyRequest } from './dto/UpdateCurrencyRequest';

export const updateCurrency = async (currencyId: number, data: UpdateCurrencyRequest): Promise<CurrencyResponse> => {
    try {
        const response = await baseApi.put<{ data: CurrencyResponse }>(`/currencies/${currencyId}`, data);
        return response.data.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'update currency failed');
        } else {
            throw new Error('update currency failed');
        }
    }
};
