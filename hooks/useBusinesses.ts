import { useCallback, useEffect, useState } from 'react';
import { Business, getAllBusinesses, getBusinessById, getBusinessesByCategory } from '../services/businessService';

/**
 * Custom hook to fetch all businesses with refetch support
 */
export const useBusinesses = (category?: string) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBusinesses = useCallback(async (isRefreshing = false) => {
    try {
      if (isRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      const data = category 
        ? await getBusinessesByCategory(category)
        : await getAllBusinesses();
      setBusinesses(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error in useBusinesses:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [category]);

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  const refetch = useCallback(() => {
    fetchBusinesses(true);
  }, [fetchBusinesses]);

  return { businesses, loading, refreshing, error, refetch };
};

/**
 * Custom hook to fetch a single business by ID
 */
export const useBusiness = (businessId: string | null) => {
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!businessId) {
      setLoading(false);
      return;
    }

    const fetchBusiness = async () => {
      try {
        setLoading(true);
        const data = await getBusinessById(businessId);
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
  }, [businessId]);

  return { business, loading, error };
};

/**
 * Custom hook to fetch businesses by category
 */
export const useBusinessesByCategory = (category: string | null) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!category) {
      setLoading(false);
      return;
    }

    const fetchBusinesses = async () => {
      try {
        setLoading(true);
        const data = await getBusinessesByCategory(category);
        setBusinesses(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error in useBusinessesByCategory:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [category]);

  return { businesses, loading, error };
};
