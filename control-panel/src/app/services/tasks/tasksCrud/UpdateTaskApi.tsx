// noinspection JSAnnotator

import baseApi from '../baseApi';
import axios from 'axios';
import cookie from 'cookie';
import qs from 'qs';

interface UpdateTaskParams {
    id: number;
    title: string;
    description: string;
    projectId: number;
    status: number;
    priority: string;
    assignedTo: string;
    definer: string | null;
}

export const updateTask = async (params: UpdateTaskParams) => {
    try {
        const cookies = cookie.parse(document.cookie);
        const token = cookies['accessToken'];

        const response = await baseApi.post('/update-task', qs.stringify(params), {
            headers: {
                Authorization: token,
            },
        });

        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Update task failed');
        } else {
            throw new Error('Update task failed');
        }
    }
};
