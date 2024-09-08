import axios from 'axios';
import baseApi from '../baseApi';
import { CurrencyFormatResponse } from './dto/CurrencyFormatResponse';
import { UpdateCurrencyFormatRequest } from './dto/UpdateCurrencyFormatRequest';

export const updateCurrencyFormat = async (currencyFormatId: number, data: UpdateCurrencyFormatRequest): Promise<CurrencyFormatResponse> => {
    try {
        const response = await baseApi.put<{ data: CurrencyFormatResponse }>(`/currencies/currency-format/${currencyFormatId}`, data);
        return response.data.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'update currency format failed');
        } else {
            throw new Error('update currency format failed');
        }
    }
};
