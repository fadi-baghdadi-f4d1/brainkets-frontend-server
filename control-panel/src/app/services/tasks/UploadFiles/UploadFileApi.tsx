// noinspection JSAnnotator

import baseApi from '../baseApi';
import axios, { AxiosProgressEvent } from 'axios';
import cookie from 'cookie';

export const uploadFiles = async (
    file: File, 
    definer: string, 
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void
) => {
    try {
        const cookies = cookie.parse(document.cookie);
        const token = cookies['accessToken'];

        const formData = new FormData();
        formData.append('file', file);
        formData.append('definer', definer);

        const response = await baseApi.post('/upload-file', formData, {
            headers: {
                Authorization: token,
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress, 
        });

        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Upload file failed');
        } else {
            throw new Error('Upload file failed');
        }
    }
};
