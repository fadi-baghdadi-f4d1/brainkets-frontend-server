// noinspection JSAnnotator

import axios from 'axios';
import cookie from 'cookie';
import baseApi from './baseApi';

export const getProjects = async (
  page: number,
  status?: string,
  searchQuery?: string,
  exceptId?: string | null,
) => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];

    if (!token) {
      throw new Error("No access token found in cookies");
    }

    const response = await baseApi.post('/get-projects', 
      {
        page,
        status,
        searchQuery,
        exceptId, // Include exceptId in the request body
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      console.error('Axios error details:', error.response);
      throw new Error(error.response?.data?.message || 'Get projects failed');
    } else {
      console.error('Non-Axios error:', error.message || 'Get projects failed');
      throw new Error('Get projects failed');
    }
  }
};
