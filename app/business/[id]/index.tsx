import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useBusiness } from '@/hooks/useBusinesses';
import { Stack, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import About from './about';
import Actions from './actions';
import Gallery from './gallery';
import Header from './header';
import Placeholder from './placeholder';
import styles from './styles';
import Title from './title';

export default function BusinessDetailsScreen() {
  const { id } = useLocalSearchParams();

  const { business, loading } = useBusiness(id.toString());

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      {loading ? (
        <Placeholder />
      ) : business != null ? (
        <ParallaxScrollView headerBackgroundColor={{ light: '#fff', dark: '#000' }} header={<Header business={business} />}>
          <ThemedView style={styles.container}>
            <Title business={business} />

            <Actions business={business} />

            <About business={business} />

            <ThemedView style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>Information</ThemedText>

              <View style={styles.infoRow}>
                <IconSymbol name="clock.fill" size={20} color="#666" />
                <ThemedText style={styles.infoText}>{business.hours}</ThemedText>
              </View>

              <View style={styles.infoRow}>
                <IconSymbol name="location.fill" size={20} color="#666" />
                <ThemedText style={styles.infoText}>{business.address}</ThemedText>
              </View>

              <View style={styles.infoRow}>
                <IconSymbol name="phone.fill" size={20} color="#666" />
                <ThemedText style={styles.infoText}>{business.phone}</ThemedText>
              </View>
            </ThemedView>

            <Gallery business={business} />
          </ThemedView>
        </ParallaxScrollView>
      ) : (
        <Placeholder />
      )}
    </>
  );
}
