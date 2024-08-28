// noinspection JSAnnotator

import baseApi from '../baseApi';
import axios from 'axios';
import cookie from 'cookie';
import qs from 'qs';

interface MoveTaskPayload {
  id: number;
  projectId: string;
  status: string;
  assignedTo: string;
}

export const moveTaskToProject = async (payload: MoveTaskPayload) => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];

    // Serialize the payload using qs
    const formData = qs.stringify(payload);

    const response = await baseApi.post('/move-task-to-project', formData, { 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: token,
        },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Move task to project failed');
    } else {
      throw new Error('Move task to project failed');
    }
  }
};
