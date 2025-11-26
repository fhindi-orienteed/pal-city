import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Business } from '@/services/businessService';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BusinessPlaceholder } from './business-placeholder';

interface HomeBusinessProps {
  businesses: Business[];
  loading: boolean;
  error: string | null;
}

export function HomeBusiness({ businesses, loading, error }: HomeBusinessProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (businessId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(businessId)) {
        newFavorites.delete(businessId);
      } else {
        newFavorites.add(businessId);
      }
      return newFavorites;
    });
  };

  // Loading state with placeholder cards
  if (loading) {
    return <BusinessPlaceholder />;
  }

  // Error state
  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="subtitle">Business</ThemedText>
        </View>
        <View style={styles.errorContainer}>
          <IconSymbol name="exclamationmark.triangle" size={40} color="#E25822" />
          <ThemedText style={styles.errorText}>Unable to load businesses</ThemedText>
          <ThemedText style={styles.errorDetail}>{error}</ThemedText>
        </View>
      </View>
    );
  }

  // Empty state
  if (businesses.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="subtitle">Business</ThemedText>
        </View>
        <View style={styles.emptyContainer}>
          <IconSymbol name="building.2" size={40} color="#999" />
          <ThemedText style={styles.emptyText}>No businesses found</ThemedText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="subtitle">Business</ThemedText>
        <Link href="/business/list" asChild>
          <TouchableOpacity>
            <ThemedText style={styles.viewAll}>More</ThemedText>
          </TouchableOpacity>
        </Link>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {businesses.slice(0, 5).map((business) => {
          const isFavorite = favorites.has(business.id);
          const isFeatured = business.rating && business.rating >= 4.5;

          return (
            <Link key={business.id} href={`/business/${business.id}`} asChild>
              <TouchableOpacity style={styles.card}>
                {/* Business Image */}
                {business.images && business.images.length > 0 ? (
                  <Image source={{ uri: business.images[0] }} style={styles.image} />
                ) : (
                  <View style={[styles.image, styles.placeholderImage]}>
                    <IconSymbol name="building.2" size={60} color="#999" />
                  </View>
                )}
                
                {/* Rating Badge */}
                {business.rating && (
                  <View style={styles.ratingBadge}>
                    <IconSymbol name="star.fill" size={12} color="#FFD700" />
                    <ThemedText style={styles.ratingText}>
                      {business.rating.toFixed(1)}
                    </ThemedText>
                  </View>
                )}

                {/* Favorite Button */}
                <TouchableOpacity 
                  style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
                  onPress={(e) => {
                    e.preventDefault();
                    toggleFavorite(business.id);
                  }}
                >
                  <IconSymbol 
                    name={isFavorite ? "heart.fill" : "heart"} 
                    size={20} 
                    color={isFavorite ? "#FFFFFF" : "#009736"} 
                  />
                </TouchableOpacity>

                {/* Card Content */}
                <View style={styles.cardContent}>
                  {business.category && (
                    <ThemedText style={styles.category}>{business.category}</ThemedText>
                  )}
                  <ThemedText style={styles.name} numberOfLines={1}>
                    {business.name}
                  </ThemedText>
                  {business.address && (
                    <ThemedText style={styles.address} numberOfLines={1}>
                      {business.address}
                    </ThemedText>
                  )}
                </View>
              </TouchableOpacity>
            </Link>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  viewAll: {
    color: '#009736',
    fontSize: 14,
    fontWeight: '600',
  },
  // Error state styles
  errorContainer: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#E25822',
    textAlign: 'center',
  },
  errorDetail: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  // Empty state styles
  emptyContainer: {
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 14,
    color: '#999',
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
  placeholderImage: {
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
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
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButtonActive: {
    backgroundColor: '#009736',
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  category: {
    color: '#009736',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  name: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  address: {
    color: '#CCC',
    fontSize: 11,
    marginTop: 2,
  },
});
