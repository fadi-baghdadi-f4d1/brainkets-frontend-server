import axios from 'axios';
import baseApi from '../baseApi';
import { RateResponse } from './dto/RateResponse';

export const getRates = async (defaultCurrencyId: number): Promise<RateResponse[]> => {
  try {
    const response = await baseApi.get<{ data: RateResponse[] }>(`/rates`, {
      params: { defaultCurrencyId }
    });
    return response.data.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Get rate data failed');
    } else {
      throw new Error('Get rate data failed');
    }
  }
};