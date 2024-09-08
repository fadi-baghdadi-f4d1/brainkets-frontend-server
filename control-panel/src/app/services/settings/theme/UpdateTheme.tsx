import axios from 'axios';
import baseApi from '../baseApi';
import { ThemeResponse } from './dto/ThemeResponse';

export const updateTheme = async (formData: FormData): Promise<ThemeResponse> => {
  try {
    const response = await baseApi.put<{data: ThemeResponse}>('/themes/1', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Update theme data failed');
    } else {
      throw new Error('Update theme data failed');
    }
  }
};