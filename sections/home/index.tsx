import HomeHeader from "@/components/home/header";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import useHomeFeed from "@/hooks/useHomeFeed";
import HomeBusiness from "@/sections/home/business";
import HomeEvents from "@/sections/home/events";
import News from "@/sections/home/news";
import HomeOffers from "@/sections/home/offers";
import HomePlaces from "@/sections/home/places";
import { RefreshControl } from "react-native";
import HomeSection from "./section";

export default function Home() {
  const { businesses, loadingBusinesses, errorBusinesses, events, loadingEvents, errorEvents,
    places, loadingPlaces, errorPlaces, news, loadingNews, errorNews, offers, loadingOffers,
    errorOffers, refetch } = useHomeFeed();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFFFF', dark: '#FFFFFF' }}
      header={<HomeHeader />}
      refreshControl={
        <RefreshControl
          refreshing={loadingBusinesses || loadingEvents || loadingPlaces || loadingNews || loadingOffers}
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
