import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Business } from '@/services/businessService';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface BusinessCardProps {
  business: Business;
  isFavorite: boolean;
  onToggleFavorite: (businessId: string) => void;
}

export default function BusinessCard({ business, isFavorite, onToggleFavorite }: BusinessCardProps) {
  const isFeatured = business.rating && business.rating >= 4.5;

  return (
    <Link href={`/business/${business.id}`} asChild>
      <TouchableOpacity style={styles.businessCard}>
        {/* Business Image */}
        <View style={styles.imageContainer}>
          {business.imageUrl ? (
            <Image source={{ uri: business.imageUrl }} style={styles.businessImage} />
          ) : (
            <View style={[styles.businessImage, styles.placeholderImage]}>
              <IconSymbol name="building.2" size={40} color="#999" />
            </View>
          )}
          {isFeatured && (
            <View style={styles.featuredBadge}>
              <ThemedText style={styles.featuredText}>Featured</ThemedText>
            </View>
          )}
        </View>

        {/* Business Info */}
        <View style={styles.businessInfo}>
          <View style={styles.textContainer}>
            {business.category && (
              <ThemedText style={styles.category}>{business.category}</ThemedText>
            )}
            <ThemedText style={styles.businessName} numberOfLines={1}>
              {business.name}
            </ThemedText>
            {business.address && (
              <ThemedText style={styles.address} numberOfLines={1}>
                📍 {business.address}
              </ThemedText>
            )}
            {business.rating && (
              <View style={styles.ratingContainer}>
                <IconSymbol name="star.fill" size={14} color="#FFD700" />
                <ThemedText style={styles.ratingText}>
                  {business.rating.toFixed(1)}
                </ThemedText>
              </View>
            )}
          </View>

          {/* Favorite Button */}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={(e) => {
              e.preventDefault();
              onToggleFavorite(business.id);
            }}
          >
            <IconSymbol
              name={isFavorite ? "heart.fill" : "heart"}
              size={24}
              color={isFavorite ? "#E25822" : "#999"}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  businessCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: 120,
    height: 120,
    position: 'relative',
  },
  businessImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FFD700',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  featuredText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#000',
  },
  businessInfo: {
    flex: 1,
    flexDirection: 'row',
    padding: 12,
    gap: 8,
  },
  textContainer: {
    flex: 1,
  },
  category: {
    fontSize: 11,
    color: '#E25822',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  businessName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  address: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
