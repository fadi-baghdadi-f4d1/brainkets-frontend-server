// noinspection JSAnnotator

import baseApi from '../baseApi';
import qs from 'qs';
import axios from 'axios';
import cookie from 'cookie';

interface CreateUserPayload {
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  gender: string;
  active: boolean;
  countryId: number;
  designationId: number;
  phone: string;
}

export const createUsers = async (payload: CreateUserPayload) => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];

    const response = await baseApi.post(
        '/create-user',
        qs.stringify(payload),
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
    );

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Create users failed');
    } else {
      throw new Error('Create users failed');
    }
  }
};
