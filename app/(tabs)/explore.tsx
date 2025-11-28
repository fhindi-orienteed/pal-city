import { Stack } from 'expo-router';
import { RefreshControl, StyleSheet, View } from 'react-native';

import HomeCategories from '@/components/categories';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { useSelectedCity } from '@/hooks/use-selected-city';

export default function ExploreScreen() {
  const selectedCity = useSelectedCity();

  const onRefresh = () => {

  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        header={
          <View style={styles.headerContainer}>
            <IconSymbol
              size={310}
              color="#808080"
              name="safari.fill"
              style={styles.headerImage}
            />
            <View style={styles.headerContent}>
              <ThemedText type="title" style={styles.headerTitle}>Explore</ThemedText>
              <ThemedText style={styles.headerSubtitle}>
                Discover {selectedCity?.name || 'your city'}
              </ThemedText>
            </View>
          </View>
        }
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
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    overflow: 'hidden',
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  headerContent: {
    zIndex: 1,
  },
  headerTitle: {
    fontFamily: Fonts.rounded,
    fontSize: 32,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  container: {
    flex: 1,
    gap: 24,
    paddingBottom: 20,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    paddingHorizontal: 20,
  },
});
