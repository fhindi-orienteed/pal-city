import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Offer } from '@/services/offersService';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
  offers?: Offer[];
}

export default function HomeOffers({ offers = [] }: Props) {

  return (

    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {offers.map((offer) => (
        <Link href={`/offer/${offer.id}`} asChild key={offer.id}>
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: offer.image }} style={styles.image} contentFit="cover" />
            <View style={styles.discountBadge}>
              <IconSymbol name="tag.fill" size={12} color="#FFF" />
              <ThemedText style={styles.discountText}>{offer.discount}</ThemedText>
            </View>
            <View style={styles.cardContent}>
              <ThemedText style={styles.expiresIn}>{offer.expiresIn}</ThemedText>
              <ThemedText style={styles.title} numberOfLines={1}>{offer.title}</ThemedText>
              <ThemedText style={styles.businessName} numberOfLines={1}>{offer.businessName}</ThemedText>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
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
    color: '#4CAA4A',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 12,
    gap: 16,
  },
  card: {
    width: 200,
    height: 240,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#4CAA4A',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  discountText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  expiresIn: {
    color: '#FFD700',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  businessName: {
    color: '#EEE',
    fontSize: 12,
  },
});
