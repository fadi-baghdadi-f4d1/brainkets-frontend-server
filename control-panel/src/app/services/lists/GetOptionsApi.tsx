// noinspection JSAnnotator

// services/lists/GetOptionsApi.ts
import baseApi from './baseApi';
import axios from 'axios';
import cookie from 'cookie';
import qs from 'qs';

export const getOptions = async (entityType: string, page: number = 1, searchQuery: string = '') => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];

    const response = await baseApi.get('/get-options', {
      headers: {
        Authorization: token,
      },
      params: {
        type: entityType,
        page,
        searchQuery,
      },
      paramsSerializer: params => qs.stringify(params, { indices: false }),
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Get options failed');
    } else {
      throw new Error('Get options failed');
    }
  }
};
