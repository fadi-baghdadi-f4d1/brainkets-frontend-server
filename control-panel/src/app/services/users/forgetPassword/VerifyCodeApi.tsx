// services/verifyCodeApi.ts

import axios from 'axios';

export const verifyCodeApi = async (userName: string, code: string) => {
  try {
    const response = await axios.get('https://erp.smcare.net/v0_0_3-users/verify-code', {
      params: {
        userName,
        code,
      },
      headers: {
        'Language': 'en',
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data;
    } else {
      return { message: 'Unexpected error' };
    }
  }
};
