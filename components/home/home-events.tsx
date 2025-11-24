import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Image } from 'expo-image';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const EVENTS = [
  {
    id: '1',
    name: 'Summer Music Festival',
    date: 'Aug 24, 2025',
    location: 'Central Park',
    image: require('@/assets/images/home_background.jpg'), // Using placeholder
    isFavorite: false,
  },
  {
    id: '2',
    name: 'Art Exhibition',
    date: 'Sep 10, 2025',
    location: 'City Gallery',
    image: require('@/assets/images/home_background.jpg'), // Using placeholder
    isFavorite: true,
  },
] as const;

export function HomeEvents() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="subtitle">Events</ThemedText>
        <TouchableOpacity>
          <ThemedText style={styles.viewAll}>More</ThemedText>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {EVENTS.map((event) => (
          <TouchableOpacity key={event.id} style={styles.card}>
            <Image source={event.image} style={styles.image} />
            
            <View style={styles.dateBadge}>
              <IconSymbol name="calendar" size={12} color="#E25822" />
              <ThemedText style={styles.dateText}>{event.date}</ThemedText>
            </View>

            <TouchableOpacity style={styles.favoriteButton}>
              <IconSymbol 
                name={event.isFavorite ? "heart.fill" : "heart"} 
                size={20} 
                color={event.isFavorite ? "#E25822" : "#FFF"} 
              />
            </TouchableOpacity>

            <View style={styles.cardContent}>
              <ThemedText style={styles.location}>{event.location}</ThemedText>
              <ThemedText style={styles.name}>{event.name}</ThemedText>
            </View>
          </TouchableOpacity>
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
  dateBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  dateText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
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
    backgroundColor: 'rgba(0,0,0,0.4)', // Simple overlay
  },
  location: {
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
