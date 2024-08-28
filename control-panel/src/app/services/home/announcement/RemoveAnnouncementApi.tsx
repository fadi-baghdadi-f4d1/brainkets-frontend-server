// noinspection JSAnnotator

import baseApi from '../baseApi';
import axios from 'axios';
import cookie from 'cookie';


export const removeAnnouncement = async (id: number) => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];

    const response = await baseApi.delete('/remove-announcement', {
     headers: {
        Authorization: token,
      },
      params:{
        id
      }
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Delete announcement failed');
    } else {
      throw new Error('Delete announcement failed');
    }
  }
};
