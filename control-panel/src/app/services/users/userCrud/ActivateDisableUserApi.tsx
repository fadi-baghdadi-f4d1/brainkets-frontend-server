// noinspection JSAnnotator

import baseApi from '../baseApi';
import axios from 'axios';
import cookie from 'cookie';

interface ActivateDisableUserParams {
  id: string;
  activate: boolean;
}

export const activateDisableUser = async ({ id, activate }: ActivateDisableUserParams) => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];

    const response = await baseApi.post(
        '/activate-disable-user',
        {},
        {
          headers: {
            Authorization: token,
          },
          params: {
            id,
            activate,
          },
        }
    );

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Activation/Deactivation failed');
    } else {
      throw new Error('Activation/Deactivation failed');
    }
  }
};
