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
    // Placeholder for update if needed, e.g., for name change
    // updateProduct: async (id: number, data: { name: string }): Promise<Product> => {
    //     const response = await apiClient.put<Product>(`/product/${id}`, data);
    //     return response.data;
    // }
    // Placeholder for delete if product can be deleted entirely by user
    // deleteProduct: async (id: number): Promise<boolean> => {
    //     const response = await apiClient.delete<boolean>(`/product/${id}`);
    //     return response.data;
    // }
};
export default productService;