// noinspection JSAnnotator

import baseApi from '../baseApi';
import qs from 'qs';
import axios from 'axios';
import cookie from 'cookie';

interface UpdateUserPayload {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  password?: string;
  role: string;
  gender: string;
  active: boolean;
  countryId: number;
  designationId?: number;
  phone: string;
}

export const updateUsers = async (payload: UpdateUserPayload) => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];

    // Remove undefined values from payload
    const cleanedPayload = Object.fromEntries(
        Object.entries(payload).filter(([_, v]) => v !== undefined)
    );


    const response = await baseApi.post(
        '/update-user',
        qs.stringify(cleanedPayload),
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
    );

    console.log('Update user response:', response.data);

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Update user failed');
    } else {
      console.error('Non-Axios error:', error);
      throw new Error('Update user failed');
    }
  }
};
