// noinspection JSAnnotator

import axios from 'axios';
import qs from 'qs';

interface ResetPasswordResponse {
  message: string;
}

interface ResetPasswordError {
  status: number;
  message: string;
}

export const resetPasswordApi = async (userName: string, code: string, password: string): Promise<ResetPasswordResponse | ResetPasswordError> => {
  try {
    console.log('Sending request with:', { userName, code, password });

    const response = await axios.post<ResetPasswordResponse>(
        'https://erp.smcare.net/v0_0_3-users/reset-password',
            qs.stringify({ userName, code, password }), // Convert to URL-encoded form data
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Language': 'en',
              },
            }
    );

    console.log('Response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('API Error:', error.response?.data || error.message || 'Unknown error');
    if (axios.isAxiosError(error) && error.response) {
      return {
        status: error.response.status,
        message: error.response.data.message || 'An error occurred',
      };
    }

    return {
      status: 500,
      message: 'Unexpected error',
    };
  }
};
