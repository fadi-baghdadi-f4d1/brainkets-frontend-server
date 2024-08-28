// noinspection JSAnnotator

import axios from 'axios';
import cookie from 'cookie';
import baseApi from './baseApi';

interface CreateFinancePayload {
    categoryId: number | null;
    type: string;
    amount: number;
    description: string;
    currencyId: string | number;
    date: string;
    definer?: string;
    isReceived: boolean;
  }
  

export const createFinance = async (payload: CreateFinancePayload) => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];

    if (!token) {
      throw new Error("No access token found in cookies");
    }

    const response = await baseApi.post('/create-finance', payload, {
      headers: {
        Authorization: token,
        // Optional language header, can be omitted if not needed
        Language: 'en',
      },
    });

    return response.data; // Adjust based on the actual data structure returned by the API

  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Create finance failed');
    } else {
      console.error('Non-Axios error:', error.message || 'Create finance failed');
      throw new Error('Create finance failed');
    }
  }
};
