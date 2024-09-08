import axios from 'axios';
import baseApi from '../baseApi';
import { SmtpResponse } from './dto/SmtpResponse';

export const getSmtpById = async (smtpId: number): Promise<SmtpResponse | null> => {
    try {
        const response = await baseApi.get<{ data: SmtpResponse }>(`/smtps/${smtpId}`);
        return response.data.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                return null; // Resource not found
            }
            throw new Error(error.response?.data?.message || 'Get SMTP data failed');
        } else {
            throw new Error('Get SMTP data failed');
        }
    }
};