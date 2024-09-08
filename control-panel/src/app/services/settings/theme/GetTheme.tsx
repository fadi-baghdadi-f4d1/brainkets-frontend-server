import axios from 'axios';
import baseApi from '../baseApi';
import { ThemeResponse } from './dto/ThemeResponse';

export const getTheme = async (): Promise<ThemeResponse> => {
    try {
        const response = await baseApi.get<{data: ThemeResponse}>('/themes/1');
        return response.data.data; // Access the `data` field within the response
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Get theme data failed');
        } else {
            throw new Error('Get theme data failed');
        }
    }
};
