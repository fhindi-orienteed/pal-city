import { useEffect } from 'react';
import { useBusinessesFeed } from './useBusinessesFeed';
import { useEvents } from './useEvents';
import { useNews } from './useNews';
import { useOffers } from './useOffers';
import { usePlaces } from './usePlaces';

export default function useHomeFeed() {
    const { businesses, loading: loadingBusinesses, error: errorBusinesses } = useBusinessesFeed();
    const { events, loading: loadingEvents, error: errorEvents } = useEvents();
    const { places, loading: loadingPlaces, error: errorPlaces } = usePlaces();
    const { news, loading: loadingNews, error: errorNews } = useNews();
    const { offers, loading: loadingOffers, error: errorOffers } = useOffers();

    useEffect(() => {

    }, []);

    const refetch = () => {

    };

    return {
        businesses,
        loadingBusinesses,
        errorBusinesses,
        events,
        loadingEvents,
        errorEvents,
        places,
        loadingPlaces,
        errorPlaces,
        news,
        loadingNews,
        errorNews,
        offers,
        loadingOffers,
        errorOffers,
        refetch
    };
}
