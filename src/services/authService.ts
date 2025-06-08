import apiClient from '../config/api';
import type { SignInDto, SignUpDto, AuthResponse } from '../types/auth';

const authService = {
    signUp: async (signUpInput: SignUpDto): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/signUp', signUpInput);
        return response.data;
    },
    signIn: async (signInInput: SignInDto): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/signin', signInInput);
        return response.data;
    },
    refreshTokens: async (refreshToken: string): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/refresh', { refreshToken });
        return response.data;
    },
};

export default authService;