import { useEffect } from 'react';
import { useBusinessesFeed } from './useBusinessesFeed';
import { useEventsFeed } from './useEventsFeed';
import { useNewsFeed } from './useNewsFeed';
import { useOffers } from './useOffers';
import { usePlaces } from './usePlaces';

export default function useHomeFeed() {
    const { businesses, loading: loadingBusinesses, error: errorBusinesses } = useBusinessesFeed();
    const { events, loading: loadingEvents, error: errorEvents } = useEventsFeed();
    const { places, loading: loadingPlaces, error: errorPlaces } = usePlaces();
    const { news, loading: loadingNews, error: errorNews } = useNewsFeed();
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
