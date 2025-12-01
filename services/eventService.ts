import { API_ENDPOINTS } from '@/config/apiConfig';
import { Event } from '@/types/interface';
import { apiClient } from './apiClient';

export class EventService {
  /**
   * Get all events
   */
  public static async getEventsFeed(): Promise<Event[]> {
    try {
      const response = await apiClient.get<Event[]>(API_ENDPOINTS.EVENTS.LIST);
      return response;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  /**
   * Get event by ID
   */
  public static async getEventById(eventId: string): Promise<Event | null> {
    try {
      const response = await apiClient.get<Event>(
        API_ENDPOINTS.EVENTS.BY_ID(eventId)
      );
      return response;
    } catch (error: any) {
      if (error.statusCode === 404) {
        console.log('No such event found!');
        return null;
      }
      console.error('Error fetching event:', error);
      throw error;
    }
  }

  /**
   * Create new event (requires authentication)
   */
  public static async createEvent(eventData: Partial<Event>): Promise<Event> {
    try {
      const response = await apiClient.post<Event>(
        API_ENDPOINTS.EVENTS.CREATE,
        eventData
      );
      return response;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }

  /**
   * Update event (requires authentication)
   */
  public static async updateEvent(
    eventId: string,
    eventData: Partial<Event>
  ): Promise<Event> {
    try {
      const response = await apiClient.put<Event>(
        API_ENDPOINTS.EVENTS.UPDATE(eventId),
        eventData
      );
      return response;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  }

  /**
   * Delete event (requires authentication)
   */
  public static async deleteEvent(eventId: string): Promise<void> {
    try {
      await apiClient.delete(API_ENDPOINTS.EVENTS.DELETE(eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }
}
