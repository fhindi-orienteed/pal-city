import { Place } from '@/model';
import { useEffect, useState } from 'react';
import { PlacesService } from '../services';

/**
 * Custom hook to fetch places feed with refetch
 */
export const usePlacesFeed = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlacesFeed = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await PlacesService.getPlacesFeed();
      setPlaces(data);
    } catch (err) {
      setError('Failed to fetch places');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlacesFeed();
  }, []);

  return { places, loading, error, refetch: fetchPlacesFeed };
};