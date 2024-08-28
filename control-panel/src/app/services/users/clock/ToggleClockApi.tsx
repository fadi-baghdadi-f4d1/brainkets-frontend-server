import baseApi from '../baseApi';
import axios from 'axios';
import cookie from 'cookie';

export const toggleClock = async (): Promise<any> => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];

    const response = await baseApi.get('/toggle-clock', {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Toggle clock failed');
    } else {
      throw new Error('Toggle clock failed');
    }
  }
};
