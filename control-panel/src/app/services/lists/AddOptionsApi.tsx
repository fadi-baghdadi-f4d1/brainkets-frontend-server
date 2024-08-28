// noinspection JSAnnotator

import baseApi from './baseApi';
import axios from 'axios';
import cookie from 'cookie';
import qs from 'qs';

export const addOption = async (option: { name: string; type: string }) => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];

    const response = await baseApi.post('/add-option', qs.stringify(option), {
      headers: {
        Authorization: token,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Add options failed');
    } else {
      throw new Error('Add options failed');
    }
  }
};
