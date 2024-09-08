import axios from 'axios';
import baseApi from '../baseApi';
import { CurrencyResponse } from './dto/CurrencyResponse';

export const deleteCurrency = async (currencyId: number): Promise<CurrencyResponse> => {
    try {
        const response = await baseApi.delete<{ data: CurrencyResponse }>(`/currencies/${currencyId}`);
        return response.data.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'delete currency failed');
        } else {
            throw new Error('delete currency failed');
        }
    }
};
