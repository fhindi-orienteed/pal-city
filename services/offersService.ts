import { API_ENDPOINTS } from '@/config/apiConfig';
import { Offer } from '@/model';
import { IOfferResponse } from '@/types/interface/response';
import { apiClient } from './apiClient';

export class OfferService {
    /**
       * Fetch offers feed
       */
    public static async getOffersFeed(): Promise<Offer[]> {
        try {
            const response = await apiClient.get<IOfferResponse[]>(API_ENDPOINTS.OFFERS.FEED);

            return response.map((offer) => new Offer(offer));
        } catch (error) {
            console.error('Error fetching offers feed:', error);
            throw error;
        }
    }

    /**
     * Get all offers
     */
    public static async getAll(): Promise<Offer[]> {
        try {
            const response = await apiClient.get<IOfferResponse[]>(API_ENDPOINTS.OFFERS.LIST);
            return response;
        } catch (error) {
            console.error('Error fetching offers:', error);
            throw new Error('Failed to fetch offers');
        }
    }

    /**
     * Get offer by ID
     */
    public static async getById(id: string): Promise<Offer | null> {
        try {
            const response = await apiClient.get<IOfferResponse>(
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
    }

    /**
     * Create new offer (requires authentication)
     */
    public static async create(offerData: Partial<Offer>): Promise<Offer> {
        try {
            const response = await apiClient.post<IOfferResponse>(
                API_ENDPOINTS.OFFERS.CREATE,
                offerData
            );
            return response;
        } catch (error) {
            console.error('Error creating offer:', error);
            throw new Error('Failed to create offer');
        }
    }

    /**
     * Update offer (requires authentication)
     */
    public static async update(id: string, offerData: Partial<Offer>): Promise<Offer> {
        try {
            const response = await apiClient.put<IOfferResponse>(
                API_ENDPOINTS.OFFERS.UPDATE(id),
                offerData
            );
            return response;
        } catch (error) {
            console.error('Error updating offer:', error);
            throw new Error('Failed to update offer');
        }
    }

    /**
     * Delete offer (requires authentication)
     */
    public static async delete(id: string): Promise<void> {
        try {
            await apiClient.delete(API_ENDPOINTS.OFFERS.DELETE(id));
        } catch (error) {
            console.error('Error deleting offer:', error);
            throw new Error('Failed to delete offer');
        }
    }
};
