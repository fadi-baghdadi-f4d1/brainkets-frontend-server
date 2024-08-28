// noinspection JSAnnotator

import axios from 'axios';
import cookie from 'cookie';
import baseApi from './baseApi';

interface AddLinkPayload {
  projectId: number;
  title: string;
  url: string;
}

export const addLink = async (payload: AddLinkPayload) => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];

    if (!token) {
      throw new Error("No access token found in cookies");
    }

    const response = await baseApi.post('/add-project-link', payload, {
      headers: {
        Authorization: token,
      },
    });

    return response.data; // Adjust based on the actual data structure returned by the API

  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Add project link failed');
    } else {
      console.error('Non-Axios error:', error.message || 'Add project link failed');
      throw new Error('Add project link failed');
    }
  }
};
