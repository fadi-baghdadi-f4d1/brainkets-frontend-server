// noinspection JSAnnotator

import axios from 'axios';
import cookie from 'cookie';
import baseApi from './baseApi';
import qs from 'qs';

interface EditProjectPayload {
  id: number;
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

export const editProject = async (payload: EditProjectPayload) => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];

    if (!token) {
      throw new Error("No access token found in cookies");
    }

    // Debugging: Log the payload
    console.log("Payload to be sent:", qs.stringify(payload));

    const response = await baseApi.post('/update-project', payload, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Edit project failed');
    } else if (error instanceof Error) {
      console.error('Non-Axios error:', error.message);
      throw new Error(error.message || 'Edit project failed');
    } else {
      console.error('Unknown error:', error);
      throw new Error('Edit project failed');
    }
  }
};
