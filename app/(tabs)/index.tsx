import HomeBusiness from "@/components/home/business";
import HomeEvents from "@/components/home/events";
import HomeHeader from "@/components/home/header";
import HomeOffers from "@/components/home/offers";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { useBusinesses } from "@/hooks/useBusinesses";
import { useEvents } from "@/hooks/useEvents";
import { RefreshControl, StyleSheet } from "react-native";

export default function HomeScreen() {
  const { businesses, loading: loadingBusinesses, error: errorBusinesses, refetch, refreshing } = useBusinesses();
  const { events, loading: loadingEvents, error: errorEvents } = useEvents();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFFFF', dark: '#FFFFFF' }}
      header={<HomeHeader />}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refetch}
          tintColor="#E25822"
          colors={['#E25822']}
        />
      }
    >

      <HomeBusiness
        businesses={businesses}
        loading={loadingBusinesses}
        error={errorBusinesses}
      />

      <HomeOffers />

      <HomeEvents
        events={events}
        loading={loadingEvents}
        error={errorEvents}
      />

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
