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

  return (
    <Link href={`/business/${business.id}`} asChild>
      <TouchableOpacity style={styles.container}>
        {/* Business Image */}
        <View style={styles.imageContainer}>
          {business.images && business.images.length > 0 ? (
            <Image source={{ uri: business.images[0] }} style={styles.businessImage} />
          ) : (
            <View style={[styles.businessImage, styles.placeholderImage]}>
              <IconSymbol name="building.2" size={40} color="#999" />
            </View>
          )}
        </View>

        {/* Business Info */}
        <View style={styles.businessInfo}>
          <View style={styles.textContainer}>
            <ThemedText style={styles.businessName} numberOfLines={2}>
              {business.name}
            </ThemedText>

            {business.address && (
              <ThemedText style={styles.address} numberOfLines={1}>
                {business.address}
              </ThemedText>
            )}

            <View style={styles.categoryAndRatingContainer}>
              <ThemedText style={styles.category}>{business.category}</ThemedText>
              {business.rating && (
                <View style={styles.ratingContainer}>
                  <IconSymbol name="star.fill" size={14} color="#FFD700" />
                  <ThemedText style={styles.ratingText}>
                    {business.rating.toFixed(1)}
                  </ThemedText>
                </View>
              )}
            </View>
          </View>
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
            color={isFavorite ? "#009736" : "#999"}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Link >
  );
}

const styles = StyleSheet.create({
  container: {
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
    gap: 8,
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
  businessInfo: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  textContainer: {
    flex: 1,
  },
  category: {
    fontSize: 11,
    color: '#009736',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  businessName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  address: {
    fontSize: 12,
    color: '#666',

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
  categoryAndRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
