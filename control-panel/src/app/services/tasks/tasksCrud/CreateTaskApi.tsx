// noinspection JSAnnotator

import baseApi from '../baseApi';
import axios from 'axios';
import cookie from 'cookie';
import qs from 'qs';

interface CreateTaskParams {
    title: string;
    description: string;
    projectId: number;
    status: number;
    priority: string;
    assignedTo: string;
    definer: string | null;
}

// Add definer to the createTask API
export const createTask = async (params: CreateTaskParams) => {
    try {
        const cookies = cookie.parse(document.cookie);
        const token = cookies['accessToken'];

        const response = await baseApi.post('/create-task', qs.stringify(params), {
            headers: {
                Authorization: token,
            },
        });

        return response.data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Create task failed');
        } else {
            throw new Error('Create task failed');
        }
    }
};
