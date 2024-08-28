// noinspection JSAnnotator

import baseApi from '../baseApi';
import axios from 'axios';
import cookie from 'cookie';
import qs from 'qs';

interface AddCommentParams {
  id: number;
  text: string;
  mentionIds?: number[];
}

export const addComment = async (params: AddCommentParams) => {
  try {
    const cookies = cookie.parse(document.cookie);
    const token = cookies['accessToken'];

    const formData = qs.stringify({
      id: params.id,
      text: params.text,
      mentionIds: params.mentionIds,
    });

    const response = await baseApi.post('/add-comment', formData, {
        headers: {
            Authorization: token,
          },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Add comment failed');
    } else {
      throw new Error('Add comment failed');
    }
  }
};
