import HomeCategories from '@/components/categories';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedView } from '@/components/themed-view';
import { useSelectedCity } from '@/hooks/use-selected-city';
import { RefreshControl, View } from 'react-native';
import Header from './header';
import styles from './styles';

export default function Explore() {
  const selectedCity = useSelectedCity();

  const onRefresh = () => { };

  return (

    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      header={<Header />}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={onRefresh}
          tintColor="#4CAA4A"
          colors={['#4CAA4A']}
        />
      }
    >
      <ThemedView style={styles.container}>
        <View style={styles.section}>
          <HomeCategories />
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}
