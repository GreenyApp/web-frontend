import { create } from 'zustand';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationState {
    message: string;
    type: NotificationType;
    visible: boolean;
}

interface UIState {
    notification: NotificationState;
    showNotification: (message: string, type?: NotificationType) => void;
    hideNotification: () => void;
    isDeviceModalOpen: boolean;
    deviceModalMode: 'add' | 'edit';
    deviceToEditId: number | null;
    openDeviceModal: (mode?: 'add' | 'edit', deviceId?: number | null) => void;
    closeDeviceModal: () => void;

    isDeleteModalOpen: boolean;
    deviceToDeleteId: number | null;
    openDeleteModal: (deviceId: number) => void;
    closeDeleteModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    notification: {
        message: '',
        type: 'info',
        visible: false,
    },
    showNotification: (message, type = 'success') => {
        set({ notification: { message, type, visible: true } });
        setTimeout(() => {
            set((state) => ({
                notification: { ...state.notification, visible: false },
            }));
        }, 3000);
    },
    hideNotification: () =>
        set((state) => ({
            notification: { ...state.notification, visible: false },
        })),

    isDeviceModalOpen: false,
    deviceModalMode: 'add',
    deviceToEditId: null,
    openDeviceModal: (mode = 'add', deviceId = null) =>
        set({ isDeviceModalOpen: true, deviceModalMode: mode, deviceToEditId: deviceId }),
    closeDeviceModal: () =>
        set({ isDeviceModalOpen: false, deviceToEditId: null }),

    isDeleteModalOpen: false,
    deviceToDeleteId: null,
    openDeleteModal: (deviceId) =>
        set({ isDeleteModalOpen: true, deviceToDeleteId: deviceId }),
    closeDeleteModal: () =>
        set({ isDeleteModalOpen: false, deviceToDeleteId: null }),
}));