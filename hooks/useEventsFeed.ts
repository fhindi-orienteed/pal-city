import { useEffect, useState } from 'react';
import { EventService } from '../services';

/**
 * Custom hook to fetch events feed with refetch
 */
export const useEventsFeed = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEventsFeed = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await EventService.getEventsFeed();
      setEvents(data);
    } catch (err) {
      setError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventsFeed();
  }, []);

  return { events, loading, error, refetch: fetchEventsFeed };
};