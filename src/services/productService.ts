import apiClient from '../config/api';
import type { Product } from '../types/product';

const productService = {
    getAllUserProducts: async (): Promise<Product[]> => {
        const response = await apiClient.get<Product[]>('/product/user');
        return response.data;
    },
    addProductToUser: async (data: { code: string; name: string }): Promise<Product> => {
        const response = await apiClient.put<Product>('/product/add', data);
        return response.data;
    },
    waterAction: async (id: number): Promise<boolean> => {
        const response = await apiClient.put<boolean>(`/product/water-action/${id}`);
        return response.data;
    },
    updateProductByUser: async (id: number, name: string): Promise<Product> => {
        const response = await apiClient.put<Product>(`/product/user/${id}`, { name });
        return response.data;
    },
    deleteProductByUser: async (id: number): Promise<void> => {
        await apiClient.delete(`/product/user/${id}`);
    },
};
export default productService;