import apiClient from '../config/api';
import type { User } from '../types/user';

const userService = {
    getMe: async (): Promise<User> => {
        const response = await apiClient.get<User>('/user/me');
        return response.data;
    },
    changePassword: async (newPassword: string): Promise<boolean> => {
        const response = await apiClient.put<boolean>('/user/change-password', { newPassword });
        return response.data;
    },
    // deleteUser: async (): Promise<boolean> => {
    //     const response = await apiClient.delete<boolean>('/user');
    //     return response.data;
    // }
};

export default userService;