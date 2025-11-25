import { Event, getAllEvents } from '@/services/eventService';
import { useCallback, useEffect, useState } from 'react';

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEvents = useCallback(async () => {
    try {
      setError(null);
      const data = await getAllEvents();
      setEvents(data);
    } catch (err) {
      setError('Failed to fetch events');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const refetch = () => {
    setRefreshing(true);
    fetchEvents();
  };

  return { events, loading, error, refetch, refreshing };
}
