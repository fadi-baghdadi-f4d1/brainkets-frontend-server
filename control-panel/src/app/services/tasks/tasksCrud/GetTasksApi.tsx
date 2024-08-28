// noinspection JSAnnotator

import baseApi from '../baseApi';
import axios from 'axios';
import cookie from 'cookie';
import qs from 'qs';

export const getTasks = async (projectId: number, status: number, lastIds: number[]) => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];

    const requestBody = {
      projectId: projectId,
      status: status,
      lastIds: lastIds,
    };

    const queryString = qs.stringify(requestBody, { arrayFormat: 'indices' });

    const response = await baseApi.post('/get-tasks', queryString, {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Get tasks failed');
    } else {
      throw new Error('Get tasks failed');
    }
  }
};
