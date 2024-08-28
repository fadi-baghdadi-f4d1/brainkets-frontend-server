// noinspection JSAnnotator

import baseApi from '../baseApi';
import axios from 'axios';


export const getAnnouncements = async () => {
  try {
    const response = await baseApi.get('/get-announcement', {
     params: { getAll: true },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Get announcement failed');
    } else {
      throw new Error('Get announcement failed');
    }
  }
};
