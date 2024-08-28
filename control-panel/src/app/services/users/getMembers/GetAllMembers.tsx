// noinspection JSAnnotator

import axios from 'axios';
import cookie from 'cookie';
import baseApi from '../baseApi';

export const getMembers = async (page: number, searchTerm: string = '') => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];

    if (!token) {
      throw new Error("No access token found in cookies");
    }

    const response = await baseApi.get('/get-members', {
      headers: {
        Authorization: token,
      },
      params: {
        page: page,
        searchQuery: searchTerm,
      },
    });

    return response.data.members; // Access the members array from the response

  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      console.error('Axios error details:', error.response); // Log full error details
      throw new Error(error.response?.data?.message || 'Get members failed');
    } else {
      console.error('Non-Axios error:', error.message || 'Get members failed');
      throw new Error('Get members failed');
    }
  }
};
