import { API_ENDPOINTS } from '@/config/apiConfig';
import News from '@/model/News';
import { INewsResponse } from '@/types/interface/response/News';
import { apiClient } from './apiClient';

export class NewsService {
    /**
     * Get all news
     */
    public static async getNewsFeed(): Promise<News[]> {
        try {
            const response = await apiClient.get<INewsResponse[]>(API_ENDPOINTS.NEWS.FEED);
            return response.map((news) => new News(news));
        } catch (error) {
            console.error('Error fetching news:', error);
            throw error;
        }
    }

    /**
     * Get news by ID
     */
    public static async getById(id: string): Promise<News | null> {
        try {
            const response = await apiClient.get<News>(
                API_ENDPOINTS.NEWS.BY_ID(id)
            );
            return response;
        } catch (error: any) {
            if (error.statusCode === 404) {
                return null;
            }
            console.error('Error fetching news:', error);
            throw error;
        }
    }

    /**
     * Create new news (requires authentication)
     */
    public static async create(newsData: Partial<News>): Promise<News> {
        try {
            const response = await apiClient.post<News>(
                API_ENDPOINTS.NEWS.CREATE,
                newsData
            );
            return response;
        } catch (error) {
            console.error('Error creating news:', error);
            throw new Error('Failed to create news');
        }
    }

    /**
     * Update news (requires authentication)
     */
    public static async update(id: string, newsData: Partial<News>): Promise<News> {
        try {
            const response = await apiClient.put<News>(
                API_ENDPOINTS.NEWS.UPDATE(id),
                newsData
            );
            return response;
        } catch (error) {
            console.error('Error updating news:', error);
            throw new Error('Failed to update news');
        }
    }

    /**
     * Delete news (requires authentication)
     */
    public static async delete(id: string): Promise<void> {
        try {
            await apiClient.delete(API_ENDPOINTS.NEWS.DELETE(id));
        } catch (error) {
            console.error('Error deleting news:', error);
            throw new Error('Failed to delete news');
        }
    }
};
