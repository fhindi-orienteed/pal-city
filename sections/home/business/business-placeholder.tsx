import { ThemedText } from '@/components/themed-text';
import { ScrollView, StyleSheet, View } from 'react-native';

/**
 * Skeleton placeholder cards shown while business data is loading
 */
export function BusinessPlaceholder() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="subtitle">Business</ThemedText>
        <ThemedText style={styles.viewAll}>More</ThemedText>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Show 3 placeholder cards */}
        {[1, 2, 3].map((index) => (
          <View key={`placeholder-${index}`} style={styles.card}>
            <View style={[styles.image, styles.placeholderImage]}>
              <View style={styles.shimmer} />
            </View>
            
            {/* Placeholder badges */}
            <View style={[styles.ratingBadge, styles.placeholderBadge]}>
              <View style={styles.shimmerSmall} />
            </View>

            <View style={[styles.favoriteButton, styles.placeholderButton]}>
              <View style={styles.shimmerTiny} />
            </View>

            {/* Placeholder content */}
            <View style={styles.cardContent}>
              <View style={[styles.placeholderCategory, styles.shimmerSmall]} />
              <View style={[styles.placeholderName, styles.shimmerSmall]} />
            </View>
          </View>
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
  placeholderImage: {
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shimmer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#D0D0D0',
  },
  shimmerSmall: {
    backgroundColor: '#D0D0D0',
    borderRadius: 4,
  },
  shimmerTiny: {
    width: 16,
    height: 16,
    backgroundColor: '#D0D0D0',
    borderRadius: 8,
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
  placeholderBadge: {
    width: 50,
    height: 24,
    backgroundColor: 'transparent',
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
  placeholderButton: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  placeholderCategory: {
    width: 60,
    height: 12,
    marginBottom: 8,
  },
  placeholderName: {
    width: 140,
    height: 18,
  },
});
