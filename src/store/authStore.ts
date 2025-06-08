/* eslint-disable @typescript-eslint/no-explicit-any */
// src/store/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import authService from '../services/authService';
import userService from '../services/userService';
import type { SignInDto, SignUpDto, AuthResponse } from '../types/auth';
import type { User } from '../types/user';
import { useDeviceStore } from './deviceStore'; // For clearing devices on logout

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    error: string | null;
    login: (credentials: SignInDto) => Promise<boolean>;
    register: (credentials: SignUpDto) => Promise<boolean>;
    logout: () => void;
    setTokens: (accessToken: string, refreshToken: string) => void;
    fetchCurrentUser: () => Promise<void>;
    checkAuthStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            user: null,
            isLoading: false,
            error: null,

            setTokens: (accessToken, refreshToken) => {
                set({
                    accessToken,
                    refreshToken,
                    isAuthenticated: !!accessToken,
                    error: null,
                });
                if (accessToken) {
                    get().fetchCurrentUser();
                } else {
                    set({ user: null });
                }
            },

            login: async (credentials) => {
                set({ isLoading: true, error: null });
                try {
                    const data: AuthResponse = await authService.signIn(credentials);
                    get().setTokens(data.accessToken, data.refreshToken);
                    set({ isLoading: false });
                    return true;
                } catch (err: any) {
                    const errorMessage = err.response?.data?.message || err.message || 'Login failed';
                    set({ error: errorMessage, isLoading: false, isAuthenticated: false });
                    return false;
                }
            },

            register: async (credentials) => {
                set({ isLoading: true, error: null });
                try {
                    const data: AuthResponse = await authService.signUp(credentials);
                    get().setTokens(data.accessToken, data.refreshToken);
                    set({ isLoading: false });
                    return true;
                } catch (err: any) {
                    const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
                    set({ error: errorMessage, isLoading: false, isAuthenticated: false });
                    return false;
                }
            },

            logout: () => {
                // Consider calling a backend /logout endpoint if it exists
                // to invalidate refresh token server-side
                set({
                    accessToken: null,
                    refreshToken: null,
                    isAuthenticated: false,
                    user: null,
                    error: null,
                });
                useDeviceStore.getState().clearDevices(); // Clear device data on logout
                // No need to remove from localStorage explicitly if `persist` options handle it
            },

            fetchCurrentUser: async () => {
                if (!get().accessToken) return;
                set({ isLoading: true });
                try {
                    const userData = await userService.getMe();
                    set({ user: userData, isAuthenticated: true, isLoading: false, error: null });
                } catch (error: any) {
                    const errorMessage = error.response?.data?.message || 'Failed to fetch user data';
                    console.error("Failed to fetch user:", errorMessage);
                    // If token is invalid and refresh fails, interceptor handles logout.
                    // If it's another error, we might not want to log out immediately.
                    set({ isLoading: false, error: errorMessage });
                    // If 401 and refresh fails, the interceptor should trigger logout
                    if (error.response?.status === 401) {
                        get().logout();
                    }
                }
            },
            checkAuthStatus: async () => {
                const token = get().accessToken; // `persist` middleware loads from localStorage
                if (token) {
                    set({ isAuthenticated: true });
                    await get().fetchCurrentUser(); // Try to fetch user data if token exists
                } else {
                    set({ isAuthenticated: false, user: null });
                }
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage), // Use localStorage with correct PersistStorage interface
            partialize: (state) => ({
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
            }), // Only persist tokens
        }
    )
);