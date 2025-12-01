import Business from '@/model/Business';
import { useCallback, useEffect, useState } from 'react';
import { BusinessService } from '../services';

/**
 * Custom hook to fetch businesses feed with refetch
 */
export const useBusinessesFeed = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBusinessesFeed = useCallback(async () => {
    setLoading(true);
    const data = await BusinessService.getBusinessesFeed();
    setBusinesses(data);
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBusinessesFeed();
  }, [fetchBusinessesFeed]);

  const refetch = useCallback(() => {
    fetchBusinessesFeed();
  }, [fetchBusinessesFeed]);

  return { businesses, loading, error, refetch };
};