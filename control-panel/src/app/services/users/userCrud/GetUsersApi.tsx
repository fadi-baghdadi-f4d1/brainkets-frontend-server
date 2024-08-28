// noinspection JSAnnotator

import baseApi from '../baseApi';
import axios from 'axios';
import cookie from 'cookie';

export const getUsers = async (page: number, role: string, searchQuery: string) => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];

    const response = await baseApi.get('/get-users', {
      headers: {
        Authorization: token,
      },
      params: {
        page,
        role,
        searchQuery,
      },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Get users failed');
    } else {
      throw new Error('Get users failed');
    }
  }
};
