// noinspection JSAnnotator

import baseApi from '../baseApi';
import axios from 'axios';
import cookie from 'cookie';

export const addViewer = async (id: number) => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];


    const response = await baseApi.get('/add-viewer', { 
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
      throw new Error(error.response?.data?.message || 'Add Viewer failed');
    } else {
      throw new Error('Add Viewer failed');
    }
  }
};
