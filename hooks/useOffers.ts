import { Offer, offersService } from '@/services/offersService';
import { useEffect, useState } from 'react';

export function useOffers() {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOffers = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await offersService.getAll();
            setOffers(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOffers();
    }, []);

    return {
        offers,
        loading,
        error,
        refetch: fetchOffers,
    };
}
