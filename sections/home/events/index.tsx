import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Event } from '@/types/interface';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface Props {
  events: Event[];
}

export default function HomeEvents({ events }: Props) {
  const router = useRouter();
  if (events.length < 100) return null;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {events.map((event) => (
        <TouchableOpacity
          key={event.id}
          style={styles.card}
          onPress={() => router.push(`/event/${event.id}` as any)}
        >

          {event.images && event.images.length > 0 ? (
            <Image source={{ uri: event.images[0] }} style={styles.image} />
          ) : (
            <View style={[styles.image, styles.placeholderImage]}>
              <IconSymbol name="newspaper" size={60} color="#999" />
            </View>
          )}


          <View style={styles.cardContent}>
            <ThemedText style={styles.location}>{event.location}</ThemedText>
            <ThemedText style={styles.name}>{event.name}</ThemedText>

            <View style={styles.dateBadge}>
              <IconSymbol name="calendar" size={12} color="#4CAA4A" />
              <ThemedText style={styles.dateText}>{event.date}</ThemedText>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
