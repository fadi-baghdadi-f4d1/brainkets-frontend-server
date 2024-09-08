import axios from 'axios';
import baseApi from '../baseApi';
import { RateResponse } from './dto/RateResponse';
import { CreateRateRequest } from './dto/CreateRateRequest';

export const createRate = async (data: CreateRateRequest): Promise<RateResponse> => {
    try {
        const response = await baseApi.post<RateResponse>(`/rates`, data);
        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'create rate failed');
        } else {
            throw new Error('create rate failed');
        }
    }
};
