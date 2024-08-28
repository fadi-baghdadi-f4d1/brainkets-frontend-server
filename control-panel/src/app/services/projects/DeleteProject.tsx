// noinspection JSAnnotator

import baseApi from './baseApi';
import axios from 'axios';
import cookie from 'cookie';

export const deleteProject = async (option: { id: number}) => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];

    const response = await baseApi.delete(`/delete-project`, {
      params: {
        id: option.id,
      },
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Delete project failed');
    } else {
      throw new Error('Delete project failed');
    }
  }
};
