// noinspection JSAnnotator

import baseApi from './baseApi';
import axios from 'axios';
import cookie from 'cookie';
import qs from 'qs';

interface EditLinkOptions {
  id: number | null;
  title: string;
  url: string;
}

export const editLink = async (options: EditLinkOptions) => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];

    const response = await baseApi.post('/edit-project-link', qs.stringify(options), {
        headers: {
            Authorization: token,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Edit Link failed');
    } else {
      throw new Error('Edit Link failed');
    }
  }
};
