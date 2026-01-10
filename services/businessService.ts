import { API_ENDPOINTS } from '@/config/apiConfig';
import { Business } from '@/model';
import { IBusinessResponse } from '@/types/interface/response';
import { apiClient } from './apiClient';

export class BusinessService {
  /**
   * Fetch businesses list
   */
  public static async getBusinessesList(
    page: number = 1,
    pageSize: number = 10,
    filters?: any,
    sortField?: string
  ): Promise<Business[]> {
    try {
      const params: Record<string, any> = { page, limit: pageSize, };

      if (sortField) {
        params.sortBy = sortField;
        params.sortOrder = 'asc';
      }

      // Add filters to params
      if (filters && typeof filters === 'object') {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params[key] = value;
          }
        });
      }

      const response = await apiClient.get<IBusinessResponse[]>(API_ENDPOINTS.BUSINESSES.LIST, params);

      return response.map((business) => new Business(business));
    } catch (error) {
      console.error('Error fetching businesses:', error);
      throw error;
    }
  }

  /**
   * Fetch businesses feed
   */
  public static async getBusinessesFeed(): Promise<Business[]> {
    try {
      const response = await apiClient.get<IBusinessResponse[]>(API_ENDPOINTS.BUSINESSES.FEED);

      return response.map((business) => new Business(business));
    } catch (error) {
      console.error('Error fetching businesses feed:', error);
      throw error;
    }
  }

  /**
   * Fetch business by ID
   */
  public static async getBusinessById(businessId: string): Promise<Business | null> {
    try {
      const response = await apiClient.get<Business>(API_ENDPOINTS.BUSINESSES.BY_ID(businessId));

      return response;
    } catch (error: any) {
      if (error.statusCode === 404) {
        console.log('No such business found!');
        return null;
      }
      console.error('Error fetching business:', error);
      throw error;
    }
  }

  /**
   * Create new business (requires authentication)
   */
  public static async createBusiness(businessData: Partial<Business>): Promise<Business> {
    try {
      const response = await apiClient.post<Business>(
        API_ENDPOINTS.BUSINESSES.CREATE,
        businessData
      );

      return response;
    } catch (error) {
      console.error('Error creating business:', error);
      throw error;
    }
  }

  /**
   * Update business (requires authentication)
   */
  public static async updateBusiness(
    businessId: string,
    businessData: Partial<Business>
  ): Promise<Business> {
    try {
      const response = await apiClient.put<Business>(
        API_ENDPOINTS.BUSINESSES.UPDATE(businessId),
        businessData
      );

      return response;
    } catch (error) {
      console.error('Error updating business:', error);
      throw error;
    }
  }

  /**
   * Delete business (requires authentication)
   */
  public static async deleteBusiness(businessId: string): Promise<void> {
    try {
      await apiClient.delete(API_ENDPOINTS.BUSINESSES.DELETE(businessId));
    } catch (error) {
      console.error('Error deleting business:', error);
      throw error;
    }
  }
}
