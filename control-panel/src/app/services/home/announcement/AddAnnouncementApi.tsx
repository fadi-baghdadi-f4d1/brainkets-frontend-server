// noinspection JSAnnotator

import baseApi from '../baseApi';
import axios from 'axios';
import cookie from 'cookie';

interface AnnouncementPayload {
  body: string;
  startDate: string;
  endDate: string;
  file: File;
}

export const addAnnouncement = async (data: AnnouncementPayload) => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];

    const formData = new FormData();
    formData.append('body', data.body);
    formData.append('startDate', data.startDate);
    formData.append('endDate', data.endDate);
    formData.append('file', data.file);

    const response = await baseApi.post('/add-announcement', formData, {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Add announcement failed');
    } else {
      throw new Error('Add announcement failed');
    }
  }
};
