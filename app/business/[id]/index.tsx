import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useBusiness } from '@/hooks/useBusinesses';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Linking, TouchableOpacity, View } from 'react-native';
import About from './about';
import Gallery from './gallery';
import Header from './header';
import Placeholder from './placeholder';
import styles from './styles';
import Title from './title';

export default function BusinessDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { t } = useTranslation();

  const { business, loading } = useBusiness(id.toString());

  const onCall = () => {
    Linking.openURL(`tel:${business?.phone}`);
  };


  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      {loading ? (
        <Placeholder />
      ) : business != null ? (
        <ParallaxScrollView headerBackgroundColor={{ light: '#fff', dark: '#000' }} header={<Header business={business} />}>
          <ThemedView style={styles.container}>
            <Title business={business} />

            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity style={styles.actionButton} onPress={onCall}>
                <View style={styles.actionIcon}>
                  <IconSymbol name="phone.fill" size={24} color="#E25822" />
                </View>
                <ThemedText style={styles.actionLabel}>Call</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIcon}>
                  <IconSymbol name="map.fill" size={24} color="#E25822" />
                </View>
                <ThemedText style={styles.actionLabel}>Directions</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIcon}>
                  <IconSymbol name="globe" size={24} color="#E25822" />
                </View>
                <ThemedText style={styles.actionLabel}>Website</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIcon}>
                  <IconSymbol name="square.and.arrow.up" size={24} color="#E25822" />
                </View>
                <ThemedText style={styles.actionLabel}>Share</ThemedText>
              </TouchableOpacity>
            </View>

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
