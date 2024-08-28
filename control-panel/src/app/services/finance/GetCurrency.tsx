import axios from 'axios';
import baseApi from './baseApi';

export const getCurrencies = async () => {
  try {
    const response = await baseApi.get('/get-currencies');
    return response.data; // Return the full data
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      console.error('Axios error details:', error.response); // Log full error details
      throw new Error(error.response?.data?.message || 'Get currencies failed');
    } else {
      console.error('Non-Axios error:', error.message || 'Get currencies failed');
      throw new Error('Get currencies failed');
    }
  }
};
