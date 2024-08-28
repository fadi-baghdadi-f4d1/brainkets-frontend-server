// noinspection JSAnnotator

import baseApi from '../baseApi';
import axios from 'axios';
import cookie from 'cookie';

export const getViewers = async (id: number) => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];


    const response = await baseApi.get('/get-viewers', { 
        headers: {
            Authorization: token,
          },
        params: {
            id,
          },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Get Viewers failed');
    } else {
      throw new Error('Get Viewers failed');
    }
  }
};
