import { BusinessService } from '@/services';
import { Business } from '@/types/interface';
import { useEffect, useState } from 'react';

/**
 * Custom hook to fetch a single business by ID
 */
export const useBusiness = (id: string) => {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchBusiness = async () => {
      try {
        setLoading(true);
        const data = await BusinessService.getBusinessById(id);
        setBusiness(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error in useBusiness:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [id]);

  return { business, loading, error };
};
