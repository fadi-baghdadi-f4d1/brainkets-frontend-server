// noinspection JSAnnotator

import baseApi from './baseApi';
import axios from 'axios';
import cookie from 'cookie';

export const deleteOption = async (option: { id: number; type: string }) => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];

    const response = await baseApi.delete(`/delete-option`, {
      params: {
        id: option.id,
        type: option.type,
      },
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Delete option failed');
    } else {
      throw new Error('Delete option failed');
    }
  }
};
