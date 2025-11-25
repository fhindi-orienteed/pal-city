import { RefreshControl, StyleSheet } from 'react-native';

import { HomeBusiness } from '@/components/home/home-business';
import { HomeCategories } from '@/components/home/home-categories';
import { HomeEvents } from '@/components/home/home-events';
import { HomeHeader } from '@/components/home/home-header';
import { HomeOffers } from '@/components/home/home-offers';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { useBusinesses } from '@/hooks/useBusinesses';

export default function HomeScreen() {
  const { refetch, refreshing } = useBusinesses();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFFFF', dark: '#FFFFFF' }}
      headerImage={<HomeHeader />}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refetch}
          tintColor="#E25822"
          colors={['#E25822']}
        />
      }
    >

      <HomeCategories />
      
      <HomeBusiness />
      
      <HomeOffers />

      <HomeEvents />
        
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
