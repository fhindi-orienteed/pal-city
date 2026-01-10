import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function OfferDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Mock data
  const offer = {
    title: '50% Off Lunch',
    businessName: 'Lucha Restaurant',
    discount: '50% OFF',
    description: 'Get 50% off your entire lunch bill every weekday from 11 AM to 2 PM. This offer is valid for dine-in only and cannot be combined with other promotions.',
    terms: [
      'Valid Monday through Friday, 11 AM - 2 PM',
      'Dine-in only',
      'Maximum discount $20',
      'One coupon per table',
    ],
    expiresIn: '2 days left',
    image: require('@/assets/images/home_background.jpg'),
    code: 'LUNCH50',
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#fff', dark: '#000' }}
        header={
          <View style={{ flex: 1 }}>
            <Image
              source={offer.image}
              style={styles.header}
            />
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <IconSymbol name="chevron.left" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.shareButton}
            >
              <IconSymbol name="square.and.arrow.up" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        }>

        <ThemedView style={styles.container}>
          <View style={styles.headerContent}>
            <View style={styles.discountBadge}>
              <IconSymbol name="tag.fill" size={16} color="#FFF" />
              <ThemedText style={styles.discountText}>{offer.discount}</ThemedText>
            </View>
            <ThemedText style={styles.expiresIn}>Expires in {offer.expiresIn}</ThemedText>
          </View>

          <ThemedText type="title" style={styles.title}>{offer.title}</ThemedText>
          <ThemedText style={styles.businessName}>at {offer.businessName}</ThemedText>

          <View style={styles.divider} />

          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Description</ThemedText>
            <ThemedText style={styles.description}>{offer.description}</ThemedText>
          </ThemedView>

          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Terms & Conditions</ThemedText>
            {offer.terms.map((term, index) => (
              <View key={index} style={styles.termRow}>
                <View style={styles.bulletPoint} />
                <ThemedText style={styles.termText}>{term}</ThemedText>
              </View>
            ))}
          </ThemedView>

          <View style={styles.redeemContainer}>
            <View style={styles.codeContainer}>
              <ThemedText style={styles.codeLabel}>Promo Code</ThemedText>
              <ThemedText style={styles.codeText}>{offer.code}</ThemedText>
            </View>
            <TouchableOpacity style={styles.redeemButton} onPress={() => alert('Redeem clicked!')}>
              <ThemedText style={styles.redeemButtonText}>Redeem Offer</ThemedText>
            </TouchableOpacity>
          </View>

        </ThemedView>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
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
  shareButton: {
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  discountBadge: {
    backgroundColor: '#E25822',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  discountText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  expiresIn: {
    color: '#E25822',
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  businessName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  description: {
    lineHeight: 24,
    color: '#444',
    fontSize: 16,
  },
  termRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#666',
  },
  termText: {
    color: '#444',
    flex: 1,
  },
  redeemContainer: {
    marginTop: 20,
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    gap: 16,
  },
  codeContainer: {
    alignItems: 'center',
    gap: 4,
  },
  codeLabel: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  codeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: 2,
  },
  redeemButton: {
    backgroundColor: '#E25822',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  redeemButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
