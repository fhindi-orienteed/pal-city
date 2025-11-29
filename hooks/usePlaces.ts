import { Place, placeService } from '@/services/placeService';
import { useEffect, useState } from 'react';

export function usePlaces() {
    const [places, setPlaces] = useState<Place[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPlaces = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await placeService.getAll();
            setPlaces(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlaces();
    }, []);

    return {
        places,
        loading,
        error,
        refetch: fetchPlaces,
    };
}
