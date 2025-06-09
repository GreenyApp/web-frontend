/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import type { Product } from '../types/product';
import productService from '../services/productService';
import { useUIStore } from './uiStore';

interface DeviceState {
    devices: Product[];
    isLoading: boolean;
    error: string | null;
    fetchDevices: () => Promise<void>;
    addDevice: (deviceData: { code: string; name: string }) => Promise<Product | null>;
    updateDeviceName: (deviceId: number, newName: string) => Promise<boolean>;
    deleteDevice: (deviceId: number) => Promise<boolean>; 
    waterDevice: (deviceId: number) => Promise<void>;
    clearDevices: () => void;
    getDeviceById: (id: number) => Product | undefined;
}

export const useDeviceStore = create<DeviceState>((set, get) => ({
    devices: [],
    isLoading: false,
    error: null,
    fetchDevices: async () => {
        set({ isLoading: true, error: null });
        try {
            const devices = await productService.getAllUserProducts();
            set({ devices, isLoading: false });
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Failed to fetch devices';
            set({ error: errorMsg, isLoading: false });
            useUIStore.getState().showNotification(errorMsg, 'error');
        }
    },
    addDevice: async (deviceData) => {
        set({ isLoading: true, error: null });
        try {
            const newDevice = await productService.addProductToUser(deviceData);
            set((state) => ({
                devices: [...state.devices, newDevice],
                isLoading: false,
            }));
            useUIStore.getState().showNotification('Пристрій успішно додано', 'success');
            return newDevice;
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Failed to add device';
            set({ error: errorMsg, isLoading: false });
            useUIStore.getState().showNotification(errorMsg, 'error');
            return null;
        }
    },
    updateDeviceName: async (deviceId: number, newName: string): Promise<boolean> => {
        set({ isLoading: true, error: null });
        const { showNotification } = useUIStore.getState();
        try {
            const updatedProduct = await productService.updateProductByUser(deviceId, newName);
            set((state) => ({
                devices: state.devices.map((device) =>
                    device.id === deviceId ? { ...device, ...updatedProduct } : device
                ),
                isLoading: false,
            }));
            showNotification('Назву пристрою успішно оновлено', 'success');
            return true;
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Помилка оновлення назви пристрою';
            set({ error: errorMsg, isLoading: false });
            showNotification(errorMsg, 'error');
            return false;
        }
    },
    deleteDevice: async (deviceId: number): Promise<boolean> => {
        set({ isLoading: true, error: null });
        const { showNotification } = useUIStore.getState();
        try {
            await productService.deleteProductByUser(deviceId);
            set((state) => ({
                devices: state.devices.filter((device) => device.id !== deviceId),
                isLoading: false,
            }));
            showNotification('Пристрій успішно видалено зі списку', 'success');
            return true;
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Помилка видалення пристрою';
            set({ error: errorMsg, isLoading: false });
            showNotification(errorMsg, 'error');
            return false;
        }
    },
    waterDevice: async (deviceId: number) => {
        try {
            await productService.waterAction(deviceId);
            useUIStore.getState().showNotification('Команду поливу надіслано', 'success');
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Failed to send water command';
            useUIStore.getState().showNotification(errorMsg, 'error');
        }
    },
    clearDevices: () => set({ devices: [], isLoading: false, error: null }),
    getDeviceById: (id: number) => get().devices.find(device => device.id === id),
}));