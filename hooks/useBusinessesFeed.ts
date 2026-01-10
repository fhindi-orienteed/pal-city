import Business from '@/model/Business';
import { useEffect, useState } from 'react';
import { BusinessService } from '../services';

/**
 * Custom hook to fetch businesses feed with refetch
 */
export const useBusinessesFeed = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBusinessesFeed = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await BusinessService.getBusinessesFeed();
      setBusinesses(data);
    } catch (err) {
      setError('Failed to fetch businesses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessesFeed();
  }, []);

  return { businesses, loading, error, refetch: fetchBusinessesFeed };
};