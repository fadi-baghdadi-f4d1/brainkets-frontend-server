// noinspection JSAnnotator

import axios from 'axios';
import cookie from 'cookie';
import baseApi from './baseApi';
import qs from 'qs';

interface CreateProjectPayload {
  name: string;
  budget: number;
  description: string;
  categoryId: number;
  currencyId: number;
  departmentId: number | null;
  startDate: string;
  dueDate: string;
  status: string;
  clients?: string;
  members?: string;
  admins?: number[];
  isPersonal?: string;
  definer?: string;
}

export const createProject = async (payload: CreateProjectPayload) => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];

    if (!token) {
      throw new Error("No access token found in cookies");
    }

    // Debugging: Log the payload
    console.log("Payload to be sent:", qs.stringify(payload));

    const response = await baseApi.post('/create-project', payload, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Create project failed');
    } else if (error instanceof Error) {
      console.error('Non-Axios error:', error.message);
      throw new Error(error.message || 'Create project failed');
    } else {
      console.error('Unknown error:', error);
      throw new Error('Create project failed');
    }
  }
};
