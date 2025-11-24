import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View, ScrollView, Linking } from 'react-native';

// Mock data for various venue types
const MOCK_DATA = {
  restaurant: {
    name: 'Lucha Restaurant',
    category: 'Restaurant',
    rating: 4.8,
    reviewCount: 124,
    address: '123 Main St, Pal City',
    description: 'Authentic cuisine with fresh ingredients. Perfect for family dinners or romantic dates.',
    phone: '+1 234 567 8900',
    website: 'https://example.com',
    hours: '10:00 AM – 10:00 PM',
    images: [
      require('@/assets/images/home_background.jpg'),
      require('@/assets/images/home_background.jpg'),
      require('@/assets/images/home_background.jpg'),
    ],
  },
  coffee: {
    name: 'Brewed Awakening',
    category: 'Coffee Shop',
    rating: 4.5,
    reviewCount: 87,
    address: '45 Bean Blvd, Pal City',
    description: 'Cozy spot for specialty coffee and pastries. Free Wi‑Fi and a relaxed vibe.',
    phone: '+1 234 555 1234',
    website: 'https://brewexample.com',
    hours: '7:00 AM – 6:00 PM',
    images: [
      require('@/assets/images/home_background.jpg'),
      require('@/assets/images/home_background.jpg'),
    ],
  },
  mall: {
    name: 'Pal City Mall',
    category: 'Shopping Mall',
    rating: 4.2,
    reviewCount: 210,
    address: '200 Mall Way, Pal City',
    description: 'A modern shopping destination with over 150 stores, a food court, and a cinema.',
    phone: '+1 234 800 0000',
    website: 'https://palcitymall.com',
    hours: '10:00 AM – 9:00 PM',
    images: [
      require('@/assets/images/home_background.jpg'),
    ],
  },
  university: {
    name: 'Pal City University',
    category: 'University',
    rating: 4.6,
    reviewCount: 342,
    address: '1 University Ave, Pal City',
    description: 'A leading institution offering a wide range of undergraduate and graduate programs.',
    phone: '+1 234 900 1111',
    website: 'https://pcu.edu',
    hours: 'Open Campus',
    images: [
      require('@/assets/images/home_background.jpg'),
    ],
  },
  school: {
    name: 'Pal City Elementary',
    category: 'School',
    rating: 4.7,
    reviewCount: 58,
    address: '10 School St, Pal City',
    description: 'A vibrant community school focusing on holistic child development.',
    phone: '+1 234 777 2222',
    website: 'https://pces.edu',
    hours: '8:00 AM – 3:00 PM',
    images: [
      require('@/assets/images/home_background.jpg'),
    ],
  },
} as const;

export default function DetailsScreen() {
  const { type = 'restaurant', id } = useLocalSearchParams(); // `type` determines which mock data set to use
  const router = useRouter();
  const venue = (MOCK_DATA as any)[type] || MOCK_DATA.restaurant;

  const onCall = () => {
    Linking.openURL(`tel:${venue.phone}`);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#fff', dark: '#000' }}
        headerImage={
          <View style={{ flex: 1 }}>
            <Image source={venue.images[0]} style={styles.headerImage} />
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <IconSymbol name="chevron.left" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        }>
      >
        <ThemedView style={styles.titleContainer}>
          <View style={styles.titleHeader}>
            <ThemedText type="title" style={styles.businessName}>{venue.name}</ThemedText>
            <View style={styles.ratingContainer}>
              <IconSymbol name="star.fill" size={16} color="#FFD700" />
              <ThemedText style={styles.rating}>{venue.rating}</ThemedText>
              <ThemedText style={styles.reviewCount}>({venue.reviewCount} reviews)</ThemedText>
            </View>
          </View>
          <ThemedText style={styles.category}>{venue.category}</ThemedText>
        </ThemedView>

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

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>About</ThemedText>
          <ThemedText style={styles.description}>{venue.description}</ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Information</ThemedText>
          <View style={styles.infoRow}>
            <IconSymbol name="clock.fill" size={20} color="#666" />
            <ThemedText style={styles.infoText}>{venue.hours}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <IconSymbol name="location.fill" size={20} color="#666" />
            <ThemedText style={styles.infoText}>{venue.address}</ThemedText>
          </View>
          <View style={styles.infoRow}>
            <IconSymbol name="phone.fill" size={20} color="#666" />
            <ThemedText style={styles.infoText}>{venue.phone}</ThemedText>
          </View>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Photos</ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photosScroll}>
            {venue.images.map((img, idx) => (
              <Image key={idx} source={img} style={styles.photo} />
            ))}
          </ScrollView>
        </ThemedView>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  headerImage: { height: 250, width: '100%' },
  backButton: { position: 'absolute', top: 50, left: 20, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' },
  titleContainer: { gap: 8, marginBottom: 24 },
  titleHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF8E1', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, gap: 4 },
  rating: { fontWeight: 'bold', color: '#B78103' },
  reviewCount: { fontSize: 12, color: '#B78103' },
  category: { fontSize: 16, color: '#666' },
  actionButtonsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, paddingHorizontal: 8 },
  actionButton: { alignItems: 'center', gap: 8 },
  actionIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFF0EB', justifyContent: 'center', alignItems: 'center' },
  actionLabel: { fontSize: 12, color: '#666' },
  section: { marginBottom: 24, gap: 12 },
  sectionTitle: { marginBottom: 8 },
  description: { lineHeight: 24, color: '#444', fontSize: 16 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  infoText: { flex: 1, color: '#444' },
  photosScroll: { marginHorizontal: -32 },
  photo: { width: 200, height: 150, borderRadius: 12, marginLeft: 16 },
  businessName: { fontSize: 24, fontWeight: 'bold', color: '#333' },
});
