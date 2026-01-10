import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import Event from '@/model/Event';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import styles from './styles';

interface Props {
  events: Event[];
}

export default function HomeEvents({ events }: Props) {
  const router = useRouter();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent} >
      {events.map((event) => (
        <TouchableOpacity
          key={event.id}
          style={styles.card}
          onPress={() => router.push(`/event/${event.id}` as any)}
        >

          <View style={styles.eventHeader}>
            {event.coverImage ? (
              <Image source={{ uri: event.coverImage }} style={styles.image} />
            ) : (
              <View style={[styles.image, styles.placeholderImage]}>
                <IconSymbol name="newspaper" size={60} color="#999" />
              </View>
            )}

            <View style={styles.overlay}>
              <ThemedText style={styles.title}>{event.title}</ThemedText>
            </View>
          </View>

          <View style={styles.eventDetails}>
            <View style={styles.dateContainer}>
              <ThemedText style={styles.dateText}><IconSymbol name="calendar" size={12} color="#4CAA4A" /> Monday, Nov 18</ThemedText>
              <ThemedText style={styles.timeText}><IconSymbol name="clock" size={12} color="#4CAA4A" /> 10:00 AM - 12:00 PM</ThemedText>
            </View>

            <ThemedText style={styles.location}><IconSymbol name="location" size={12} color="#4CAA4A" /> {event.location}</ThemedText>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
