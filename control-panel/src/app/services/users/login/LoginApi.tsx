// services/LoginApi.ts
import baseApi from '../baseApi';
import qs from 'qs';
import axios from 'axios';

export const login = async (userName: string, password: string) => {
  try {
    const response = await baseApi.post(
        '/login',
        qs.stringify({ userName, password })
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Login failed');
    } else {
      throw new Error('Login failed');
    }
  }
};
