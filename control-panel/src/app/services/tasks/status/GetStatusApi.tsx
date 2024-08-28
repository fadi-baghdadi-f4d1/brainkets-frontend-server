// noinspection JSAnnotator

import baseApi from '../baseApi';
import axios from 'axios';
import cookie from 'cookie';

export const getStatus = async (projectId: number, withData: boolean = true) => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];


    const response = await baseApi.get('/get-status' , {
        headers: {
            Authorization: token,
          },
          params: {
            projectId,
            withData
          },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Get status failed');
    } else {
      throw new Error('Get status failed');
    }
  }
};
