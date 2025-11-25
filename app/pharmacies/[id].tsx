import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function BusinessDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Mock data - in a real app this would come from an API based on the ID
  const business = {
    name: 'Lucha Restaurant',
    category: 'Restaurant',
    rating: 4.8,
    reviewCount: 124,
    address: '123 Main Street, Pal City',
    description: 'Experience the finest authentic cuisine in the heart of Pal City. We offer a wide variety of dishes made from fresh, locally sourced ingredients. Perfect for family dinners, romantic dates, or business meetings.',
    phone: '+1 234 567 8900',
    website: 'https://example.com',
    hours: 'Open today: 10:00 AM - 10:00 PM',
    images: [
      require('@/assets/images/home_background.jpg'),
      require('@/assets/images/home_background.jpg'),
      require('@/assets/images/home_background.jpg'),
    ]
  };

  const onCall = () => {
    Linking.openURL(`tel:${business.phone}`);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#fff', dark: '#000' }}
        headerImage={
          <View style={{ flex: 1 }}>
             <Image
              source={require('@/assets/images/home_background.jpg')}
              style={styles.headerImage}
            />
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => router.back()}
            >
              <IconSymbol name="chevron.left" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.favoriteButton} 
            >
              <IconSymbol name="heart" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        }>
        <ThemedView style={styles.container}>
            <ThemedView style={styles.titleContainer}>
                <View style={styles.titleHeader}>
                    <ThemedText type="title" style={styles.businessName}>{business.name}</ThemedText>
                    <View style={styles.ratingContainer}>
                        <IconSymbol name="star.fill" size={16} color="#FFD700" />
                        <ThemedText style={styles.rating}>{business.rating}</ThemedText>
                        <ThemedText style={styles.reviewCount}>({business.reviewCount} reviews)</ThemedText>
                    </View>
                </View>
                <ThemedText style={styles.category}>{business.category}</ThemedText>
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
            <ThemedText style={styles.description}>{business.description}</ThemedText>
            </ThemedView>

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

            <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Photos</ThemedText>
            <View style={styles.photosGrid}>
                {business.images.map((img, index) => (
                <Image key={index} source={img} style={styles.photo} />
                ))}
            </View>
            </ThemedView>
        </ThemedView>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerImage: {
    height: 250,
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    gap: 8,
    marginBottom: 24,
  },
  titleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  rating: {
    fontWeight: 'bold',
    color: '#B78103',
  },
  reviewCount: {
    fontSize: 12,
    color: '#B78103',
  },
  category: {
    fontSize: 16,
    color: '#666',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  actionButton: {
    alignItems: 'center',
    gap: 8,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF0EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    marginBottom: 24,
    gap: 12,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  description: {
    lineHeight: 24,
    color: '#444',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    flex: 1,
    color: '#444',
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  photo: {
    width: '48%',
    height: 150,
    borderRadius: 12,
    marginBottom: 8,
  },
  businessName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
