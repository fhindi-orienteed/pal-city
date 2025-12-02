import { Offer } from '@/model';
import { useEffect, useState } from 'react';
import { OfferService } from '../services';

/**
 * Custom hook to fetch offers feed with refetch
 */
export const useOffersFeed = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOffersFeed = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await OfferService.getOffersFeed();
      setOffers(data);
    } catch (err) {
      setError('Failed to fetch offers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffersFeed();
  }, []);

  return { offers, loading, error, refetch: fetchOffersFeed };
};