import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Event, getEventById } from '@/services/eventService';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, NativeScrollEvent, NativeSyntheticEvent, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [activeSlide, setActiveSlide] = useState(0);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      if (typeof id === 'string') {
        try {
          const data = await getEventById(id);
          setEvent(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#009736" />
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.loadingContainer}>
        <ThemedText>Event not found</ThemedText>
      </View>
    );
  }

  const eventImages = event.images && event.images.length > 0 ? event.images : [event.image];

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    if (slide !== activeSlide) {
      setActiveSlide(slide);
    }
  };

  const renderHeader = () => (
    <View style={styles.carouselContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {eventImages.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.headerImage}
          />
        ))}
      </ScrollView>
      {eventImages.length > 1 && (
        <View style={styles.pagination}>
          {eventImages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === activeSlide ? styles.paginationDotActive : styles.paginationDotInactive,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#E8F5E9', dark: '#151718' }}
        headerImage={renderHeader()}>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <ThemedText type="title" style={styles.title}>{event.name}</ThemedText>
            <View style={styles.badge}>
              <ThemedText style={styles.badgeText}>Upcoming</ThemedText>
            </View>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <View style={styles.iconBox}>
                <IconSymbol name="calendar" size={24} color="#009736" />
              </View>
              <View style={styles.infoText}>
                <ThemedText type="defaultSemiBold">{event.date}</ThemedText>
                <ThemedText style={styles.subInfo}>{event.time}</ThemedText>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.iconBox}>
                <IconSymbol name="location.fill" size={24} color="#009736" />
              </View>
              <View style={styles.infoText}>
                <ThemedText type="defaultSemiBold">{event.location}</ThemedText>
                <ThemedText style={styles.subInfo}>View on Map</ThemedText>
              </View>
            </View>

            <View style={styles.infoRow}>
               <View style={styles.iconBox}>
                <IconSymbol name="tag.fill" size={24} color="#009736" />
              </View>
              <View style={styles.infoText}>
                <ThemedText type="defaultSemiBold">{event.price}</ThemedText>
                <ThemedText style={styles.subInfo}>Per Person</ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>About Event</ThemedText>
            <ThemedText style={styles.description}>{event.description}</ThemedText>
          </View>

          <View style={styles.organizerContainer}>
             <View style={styles.organizerHeader}>
                <View style={styles.organizerAvatar}>
                    <ThemedText style={styles.organizerInitial}>P</ThemedText>
                </View>
                <View>
                    <ThemedText type="defaultSemiBold">Organized by</ThemedText>
                    <ThemedText>{event.organizer}</ThemedText>
                </View>
             </View>
          </View>
        </View>
      </ParallaxScrollView>

      {/* Sticky Footer */}
      <View style={styles.footer}>
        <View>
            <ThemedText style={styles.priceLabel}>Total Price</ThemedText>
            <ThemedText type="title" style={styles.priceValue}>{event.price}</ThemedText>
        </View>
        <TouchableOpacity style={styles.bookButton}>
            <ThemedText style={styles.bookButtonText}>Get Tickets</ThemedText>
            <IconSymbol name="chevron.right" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    height: 250,
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  headerImage: {
    height: 250,
    width: SCREEN_WIDTH,
    resizeMode: 'cover',
  },
  pagination: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  paginationDotActive: {
    backgroundColor: '#fff',
    width: 24,
  },
  paginationDotInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100, // Space for footer
  },
  titleContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#009736',
    fontSize: 12,
    fontWeight: '600',
  },
  infoSection: {
    gap: 20,
    marginBottom: 32,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
  },
  subInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  description: {
    lineHeight: 24,
    color: '#444',
  },
  organizerContainer: {
    padding: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 16,
  },
  organizerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  organizerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#009736',
    justifyContent: 'center',
    alignItems: 'center',
  },
  organizerInitial: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
  },
  priceValue: {
    color: '#009736',
  },
  bookButton: {
    backgroundColor: '#009736',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 8,
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
