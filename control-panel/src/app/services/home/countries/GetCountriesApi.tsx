// noinspection JSAnnotator

import baseApi from '../baseApi';
import axios from 'axios';

interface Country {
  id: number;
  name: string;
  iso: string;
}

export const getCountries = async (page: number = 1, searchQuery: string = ''): Promise<{ countries: Country[], isEnd: boolean }> => {
  try {
    const response = await baseApi.get('/get-countries', {
      params: { page, searchQuery },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Get countries failed');
    } else {
      throw new Error('Get countries failed');
    }
  }
};
