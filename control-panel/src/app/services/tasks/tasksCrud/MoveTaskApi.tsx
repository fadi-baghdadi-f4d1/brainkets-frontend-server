// noinspection JSAnnotator

import baseApi from '../baseApi';
import axios from 'axios';
import cookie from 'cookie';

export const moveTask = async (id: number, status: string) => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];
    
    const response = await baseApi.post('/move-task', null, { 
        headers: {
            Authorization: token,
          },
      params: {
        id,
        status,
      },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Move task failed');
    } else {
      throw new Error('Move task failed');
    }
  }
};
