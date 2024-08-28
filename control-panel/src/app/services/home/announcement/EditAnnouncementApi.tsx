// noinspection JSAnnotator

import baseApi from '../baseApi';
import axios from 'axios';
import cookie from 'cookie';

export const editAnnouncement = async (formData: FormData) => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];

    const response = await baseApi.post('/edit-announcement', formData, {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Edit announcement failed');
    } else {
      throw new Error('Edit announcement failed');
    }
  }
};
