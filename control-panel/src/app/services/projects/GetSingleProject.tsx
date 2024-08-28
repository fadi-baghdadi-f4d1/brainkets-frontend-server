// noinspection JSAnnotator

import axios from 'axios';
import cookie from 'cookie';
import baseApi from './baseApi';

export const getProjectDetails = async (id: number) => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];

    if (!token) {
      throw new Error("No access token found in cookies");
    }

    const response = await baseApi.get('/get-single-project', {
        headers: {
            Authorization: token,
          },
      params: {
        id: id, // Set the id parameter for the request
      },
    });

    return response.data; // Adjust based on the actual data structure returned by the API

  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      console.error('Axios error details:', error.response); // Log full error details
      throw new Error(error.response?.data?.message || 'Get project failed');
    } else {
      console.error('Non-Axios error:', error.message || 'Get project failed');
      throw new Error('Get project failed');
    }
  }
};
