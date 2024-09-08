import axios from 'axios';
import baseApi from '../baseApi';
import { SmtpResponse } from './dto/SmtpResponse';
import { SendTestEmailRequest } from './dto/sendTestEmailRequest copy';

export const sendTestEmail = async (sendEmailData: SendTestEmailRequest): Promise<SmtpResponse | null> => {
    try {
        const response = await baseApi.post<{ data: SmtpResponse }>(`/smtps/send-email`, sendEmailData);
        return response.data.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 400) {
                throw new Error(JSON.stringify(error.response.data.data));
            }
            throw new Error(error.response?.data?.message || 'Update SMTP data failed');
        } else {
            throw new Error('Update SMTP data failed');
        }
    }
};
