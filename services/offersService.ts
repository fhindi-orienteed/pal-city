import { API_ENDPOINTS } from '@/config/apiConfig';
import { apiClient } from './apiClient';

export interface Offer {
    id: string;
    title: string;
    businessName: string;
    discount: string;
    image: string;
    expiresIn: string;
}

export const offersService = {
    /**
     * Get all offers
     */
    async getAll(): Promise<Offer[]> {
        try {
            const response = await apiClient.get<Offer[]>(API_ENDPOINTS.OFFERS.LIST);
            return response;
        } catch (error) {
            console.error('Error fetching offers:', error);
            throw new Error('Failed to fetch offers');
        }
    },

    /**
     * Get offer by ID
     */
    async getById(id: string): Promise<Offer | null> {
        try {
            const response = await apiClient.get<Offer>(
                API_ENDPOINTS.OFFERS.BY_ID(id)
            );
            return response;
        } catch (error: any) {
            if (error.statusCode === 404) {
                return null;
            }
            console.error('Error fetching offer:', error);
            throw new Error('Failed to fetch offer');
        }
    },

    /**
     * Create new offer (requires authentication)
     */
    async create(offerData: Partial<Offer>): Promise<Offer> {
        try {
            const response = await apiClient.post<Offer>(
                API_ENDPOINTS.OFFERS.CREATE,
                offerData
            );
            return response;
        } catch (error) {
            console.error('Error creating offer:', error);
            throw new Error('Failed to create offer');
        }
    },

    /**
     * Update offer (requires authentication)
     */
    async update(id: string, offerData: Partial<Offer>): Promise<Offer> {
        try {
            const response = await apiClient.put<Offer>(
                API_ENDPOINTS.OFFERS.UPDATE(id),
                offerData
            );
            return response;
        } catch (error) {
            console.error('Error updating offer:', error);
            throw new Error('Failed to update offer');
        }
    },

    /**
     * Delete offer (requires authentication)
     */
    async delete(id: string): Promise<void> {
        try {
            await apiClient.delete(API_ENDPOINTS.OFFERS.DELETE(id));
        } catch (error) {
            console.error('Error deleting offer:', error);
            throw new Error('Failed to delete offer');
        }
    },
};
