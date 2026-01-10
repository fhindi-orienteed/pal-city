import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import Business from '@/model/Business';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface Props {
  businesses: Business[];
}

export default function HomeBusiness({ businesses }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

      {businesses.slice(0, 5).map((business) => {
        const isFavorite = false;
        return (
          <Link key={business.id} href={`/business/${business.id}`} asChild>
            <TouchableOpacity style={styles.card}>
              {/* Business Image */}
              {business.coverImage ? (
                <Image source={{ uri: business.coverImage }} style={styles.image} />
              ) : (
                <View style={[styles.image, styles.placeholderImage]}>
                  <FontAwesome color="#999" size={60} name="building" />
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

              <TouchableOpacity style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}>
                <IconSymbol
                  name={isFavorite ? "heart.fill" : "heart"}
                  size={20}
                  color={isFavorite ? "#FFFFFF" : "#009736"}
                />
              </TouchableOpacity>

              <View style={styles.cardContent}>
                {business.category && (
                  <ThemedText style={styles.category}>{business.category}</ThemedText>
                )}
                <ThemedText style={styles.name} numberOfLines={1}>
                  {business.name}
                </ThemedText>
              </View>
            </TouchableOpacity>
          </Link>
        );
      })}
    </ScrollView>
  );
}

