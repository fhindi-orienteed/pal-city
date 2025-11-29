import HomeHeader from "@/components/home/header";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { useBusinesses } from "@/hooks/useBusinesses";
import { useEvents } from "@/hooks/useEvents";
import { useNews } from "@/hooks/useNews";
import { useOffers } from "@/hooks/useOffers";
import { usePlaces } from "@/hooks/usePlaces";
import HomeBusiness from "@/sections/home/business";
import HomeEvents from "@/sections/home/events";
import News from "@/sections/home/news";
import HomeOffers from "@/sections/home/offers";
import HomePlaces from "@/sections/home/places";
import { RefreshControl } from "react-native";
import HomeSection from "./section";

export default function Home() {
  const { businesses, loading: loadingBusinesses, error: errorBusinesses, refetch } = useBusinesses();
  const { events, loading: loadingEvents, error: errorEvents } = useEvents();
  const { places, loading: loadingPlaces, error: errorPlaces } = usePlaces();
  const { news, loading: loadingNews, error: errorNews } = useNews();
  const { offers, loading: loadingOffers, error: errorOffers } = useOffers();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFFFF', dark: '#FFFFFF' }}
      header={<HomeHeader />}
      refreshControl={
        <RefreshControl
          refreshing={loadingBusinesses}
          onRefresh={refetch}
          tintColor="#4CAA4A"
          colors={['#4CAA4A']}
        />
      }
    >
      <HomeSection id="news" loading={loadingNews} error={errorNews} >
        <News news={news} />
      </HomeSection>

      <HomeSection id="events" loading={loadingEvents} error={errorEvents} >
        <HomeEvents events={events} />
      </HomeSection>

      <HomeSection id="offers" loading={loadingOffers} error={errorOffers} >
        <HomeOffers offers={offers} />
      </HomeSection>


      <HomeSection id="places" loading={loadingPlaces} error={errorPlaces} >
        <HomePlaces places={places} />
      </HomeSection>

      <HomeSection id="businesses" loading={loadingBusinesses} error={errorBusinesses} >
        <HomeBusiness businesses={businesses} />
      </HomeSection>

    </ParallaxScrollView>
  );
}
