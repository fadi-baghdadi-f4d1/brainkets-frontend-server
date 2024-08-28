// noinspection JSAnnotator

import axios from 'axios';

interface ForgetPasswordResponse {
  message: string;
  email: string;
}

interface ForgetPasswordError {
  status: number;
  message: string;
}

export const forgetPasswordApi = async (userName: string): Promise<ForgetPasswordResponse | ForgetPasswordError> => {
  try {
    const response = await axios.get<ForgetPasswordResponse>('https://erp.smcare.net/v0_0_3-users/forget-password', {
      params: { userName },
    });

    return response.data;
  } catch (error: any) {
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
