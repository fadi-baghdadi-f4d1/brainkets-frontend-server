// noinspection JSAnnotator

import baseApi from '../baseApi';
import axios from 'axios';
import cookie from 'cookie';

// Updated deleteTask API function
export const deleteTask = async (option: { id: number}) => {
    try {
      const cookies = cookie.parse(document.cookie);
      const token = cookies['accessToken'];
  
      const response = await baseApi.get('/delete-task', {
        headers: {
          Authorization: token,
        },
        params: {
            id: option.id,
          },
      });
  
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Delete task failed');
      } else {
        throw new Error('Delete task failed');
      }
    }
  };
  