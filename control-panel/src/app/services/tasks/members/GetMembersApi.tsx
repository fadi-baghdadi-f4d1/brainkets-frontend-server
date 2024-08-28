// noinspection JSAnnotator

import baseApi from '../baseApi';
import axios from 'axios';
import cookie from 'cookie';

export const getMembers = async (
  page: number,
  projectId: number | null, // Update the type to include null
  searchQuery: string
) => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];

    if (projectId === null) {
      throw new Error('Project ID cannot be null');
    }

    const response = await baseApi.post(
      '/get-members',
      {
        // Request body if needed
      },
      {
        headers: {
          Authorization: token,
        },
        params: {
          projectId,
          page,
          searchQuery,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Get members failed');
    } else {
      throw new Error('Get members failed');
    }
  }
};
