import { API_ENDPOINTS } from '@/config/apiConfig';
import { apiClient } from './apiClient';

export interface Place {
    id: string;
    name: string;
    description: string;
    category: string;
    address: string;
    images: string[];
    rating?: number;
    reviewCount?: number;
    openingHours?: string;
    phone?: string;
    website?: string;
    latitude?: number;
    longitude?: number;
    isFeatured?: boolean;
}

export const placeService = {
    async getAll(): Promise<Place[]> {
        try {
            const response = await apiClient.get<Place[]>(API_ENDPOINTS.PLACES.LIST);
            return response;
        } catch (error) {
            console.error('Error fetching places:', error);
            throw new Error('Failed to fetch places');
        }
    },

    async getById(id: string): Promise<Place | null> {
        try {
            const response = await apiClient.get<Place>(
                API_ENDPOINTS.PLACES.BY_ID(id)
            );
            return response;
        } catch (error: any) {
            if (error.statusCode === 404) {
                return null;
            }
            console.error('Error fetching place:', error);
            throw new Error('Failed to fetch place');
        }
    },

    async getFeatured(): Promise<Place[]> {
        try {
            // Try to get featured places from API with query parameter
            // If API doesn't support it, fall back to client-side filtering
            const places = await this.getAll();
            return places.filter(place => place.isFeatured);
        } catch (error) {
            console.error('Error fetching featured places:', error);
            throw new Error('Failed to fetch featured places');
        }
    },

    async create(placeData: Partial<Place>): Promise<Place> {
        try {
            const response = await apiClient.post<Place>(
                API_ENDPOINTS.PLACES.CREATE,
                placeData
            );
            return response;
        } catch (error) {
            console.error('Error creating place:', error);
            throw new Error('Failed to create place');
        }
    },

    async update(id: string, placeData: Partial<Place>): Promise<Place> {
        try {
            const response = await apiClient.put<Place>(
                API_ENDPOINTS.PLACES.UPDATE(id),
                placeData
            );
            return response;
        } catch (error) {
            console.error('Error updating place:', error);
            throw new Error('Failed to update place');
        }
    },

    async delete(id: string): Promise<void> {
        try {
            await apiClient.delete(API_ENDPOINTS.PLACES.DELETE(id));
        } catch (error) {
            console.error('Error deleting place:', error);
            throw new Error('Failed to delete place');
        }
    },
};
