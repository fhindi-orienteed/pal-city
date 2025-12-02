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
  const { businessesFeed, eventsFeed, placesFeed, newsFeed, offersFeed, refetch, loading } = useHomeFeed();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFFFF', dark: '#FFFFFF' }}
      header={<HomeHeader />}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={refetch}
          tintColor="#4CAA4A"
          colors={['#4CAA4A']}
        />
      }
    >
      <HomeSection id="news" loading={newsFeed.loading} error={newsFeed.error} >
        <News news={newsFeed.news} />
      </HomeSection>

      <HomeSection id="events" loading={eventsFeed.loading} error={eventsFeed.error} >
        <HomeEvents events={eventsFeed.events} />
      </HomeSection>

      <HomeSection id="offers" loading={offersFeed.loading} error={offersFeed.error} >
        <HomeOffers offers={offersFeed.offers} />
      </HomeSection>


      <HomeSection id="places" loading={placesFeed.loading} error={placesFeed.error} >
        <HomePlaces places={placesFeed.places} />
      </HomeSection>

      <HomeSection id="businesses" loading={businessesFeed.loading} error={businessesFeed.error} >
        <HomeBusiness businesses={businessesFeed.businesses} />
      </HomeSection>

    </ParallaxScrollView>
  );
}
