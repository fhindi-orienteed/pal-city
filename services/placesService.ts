import { API_ENDPOINTS } from '@/config/apiConfig';
import { Place } from '@/model';
import { IPlacesResponse } from '@/types/interface/response';
import { apiClient } from './apiClient';

export class PlacesService {
    /**
       * Fetch places feed
       */
    public static async getPlacesFeed(): Promise<Place[]> {
        try {
            const response = await apiClient.get<IPlacesResponse[]>(API_ENDPOINTS.PLACES.FEED);

            return response.map((place) => new Place(place));
        } catch (error) {
            console.error('Error fetching places feed:', error);
            throw error;
        }
    }

    /**
     * Get all places
     */
    public static async getAll(): Promise<Place[]> {
        try {
            const response = await apiClient.get<IPlacesResponse[]>(API_ENDPOINTS.PLACES.LIST);
            return response;
        } catch (error) {
            console.error('Error fetching places:', error);
            throw new Error('Failed to fetch places');
        }
    }

    /**
     * Get place by ID
     */
    public static async getById(id: string): Promise<Place | null> {
        try {
            const response = await apiClient.get<IPlacesResponse>(
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
    }

    /**
     * Create new place (requires authentication)
     */
    public static async create(placeData: Partial<Place>): Promise<Place> {
        try {
            const response = await apiClient.post<IPlacesResponse>(
                API_ENDPOINTS.PLACES.CREATE,
                placeData
            );
            return response;
        } catch (error) {
            console.error('Error creating place:', error);
            throw new Error('Failed to create place');
        }
    }

    /**
     * Update place (requires authentication)
     */
    public static async update(id: string, placeData: Partial<Place>): Promise<Place> {
        try {
            const response = await apiClient.put<IPlacesResponse>(
                API_ENDPOINTS.PLACES.UPDATE(id),
                placeData
            );
            return response;
        } catch (error) {
            console.error('Error updating place:', error);
            throw new Error('Failed to update place');
        }
    }

    /**
     * Delete place (requires authentication)
     */
    public static async delete(id: string): Promise<void> {
        try {
            await apiClient.delete(API_ENDPOINTS.PLACES.DELETE(id));
        } catch (error) {
            console.error('Error deleting place:', error);
            throw new Error('Failed to delete place');
        }
    }
};
