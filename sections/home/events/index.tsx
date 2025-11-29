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

          <Image
            source={typeof event.image === 'string' ? { uri: event.image } : event.image}
            style={styles.image}
            contentFit="cover"
            transition={200}
          />

          <View style={styles.dateBadge}>
            <IconSymbol name="calendar" size={12} color="#4CAA4A" />
            <ThemedText style={styles.dateText}>{event.date}</ThemedText>
          </View>

          <TouchableOpacity style={styles.favoriteButton}>
            <IconSymbol
              name={event.isFavorite ? "heart.fill" : "heart"}
              size={20}
              color={event.isFavorite ? "#4CAA4A" : "#FFF"}
            />
          </TouchableOpacity>

          <View style={styles.cardContent}>
            <ThemedText style={styles.location}>{event.location}</ThemedText>
            <ThemedText style={styles.name}>{event.name}</ThemedText>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
