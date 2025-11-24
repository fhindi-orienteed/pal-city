import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const BUSINESSES = [
  {
    id: '1',
    name: 'Lucha Restaurant',
    category: 'Restaurants',
    rating: 5.0,
    image: require('@/assets/images/home_background.jpg'), // Using placeholder for now
    isFavorite: true,
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Auto Repair',
    category: 'Automotive',
    rating: 4.8,
    image: require('@/assets/images/home_background.jpg'), // Using placeholder for now
    isFavorite: false,
    isFeatured: false,
  },
] as const;

export function HomeBusiness() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="subtitle">Business</ThemedText>
        <TouchableOpacity>
          <ThemedText style={styles.viewAll}>More</ThemedText>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {BUSINESSES.map((business) => (
          <Link key={business.id} href={`/business/${business.id}`} asChild>
            <TouchableOpacity style={styles.card}>
              <Image source={business.image} style={styles.image} />
              
              {business.isFeatured && (
                <View style={styles.featuredBadge}>
                  <ThemedText style={styles.featuredText}>Featured</ThemedText>
                </View>
              )}

              <View style={styles.ratingBadge}>
                <IconSymbol name="star.fill" size={12} color="#FFD700" />
                <ThemedText style={styles.ratingText}>{business.rating}</ThemedText>
              </View>

              <TouchableOpacity style={styles.favoriteButton}>
                <IconSymbol 
                  name={business.isFavorite ? "heart.fill" : "heart"} 
                  size={20} 
                  color={business.isFavorite ? "#E25822" : "#FFF"} 
                />
              </TouchableOpacity>

              <View style={styles.cardContent}>
                <ThemedText style={styles.category}>{business.category}</ThemedText>
                <ThemedText style={styles.name}>{business.name}</ThemedText>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  viewAll: {
    color: '#E25822',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 12,
    gap: 16,
  },
  card: {
    width: 280,
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  featuredText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    right: 50,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)', // Note: Linear gradient needs expo-linear-gradient, using simple overlay for now
  },
  category: {
    color: '#E25822',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  name: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
