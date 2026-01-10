import { useBusinessesFeed } from './useBusinessesFeed';
import { useEventsFeed } from './useEventsFeed';
import { useNewsFeed } from './useNewsFeed';
import { useOffersFeed } from './useOffersFeed';
import { usePlacesFeed } from './usePlacesFeed';

export default function useHomeFeed() {
    const businessesFeed = useBusinessesFeed();
    const eventsFeed = useEventsFeed();
    const placesFeed = usePlacesFeed();
    const newsFeed = useNewsFeed();
    const offersFeed = useOffersFeed();

    const refetch = () => {
        businessesFeed.refetch();
        eventsFeed.refetch();
        placesFeed.refetch();
        newsFeed.refetch();
        offersFeed.refetch();
    };

    return {
        businessesFeed,
        eventsFeed,
        placesFeed,
        newsFeed,
        offersFeed,
        refetch,
        loading: businessesFeed.loading || eventsFeed.loading || placesFeed.loading || newsFeed.loading || offersFeed.loading
    };
}
