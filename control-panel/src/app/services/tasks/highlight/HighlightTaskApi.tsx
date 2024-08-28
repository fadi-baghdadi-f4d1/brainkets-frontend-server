// noinspection JSAnnotator

import baseApi from '../baseApi';
import axios from 'axios';
import cookie from 'cookie';

export const highlightTask = async (id: number, color: string | null) => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];

    const response = await baseApi.get('/highlight-task', { 
        headers: {
            Authorization: token,
          },
        params: {
            id,
            color,
          },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Highlight Task failed');
    } else {
      throw new Error('Highlight Task failed');
    }
  }
};
