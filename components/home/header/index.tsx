import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';

export default function HomeHeader() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/home_background.jpg')}
        style={styles.background}
      />

      {/* Notification Button */}
      <TouchableOpacity
        style={styles.notificationButton}
        onPress={() => router.push('/notifications' as any)}
      >
        <Ionicons name="notifications-outline" size={28} color="#fff" />
        <View style={styles.badge} />
      </TouchableOpacity>


      <ThemedView style={styles.searchContainer}>
        <Text style={styles.title}>
          Good morning, {user?.name || 'Guest'}
        </Text>
        <ThemedView style={styles.searchInputContainer}>
          <View style={styles.searchInputBackground} ></View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#888"
          />
        </ThemedView>
      </ThemedView>
    </View>
  );
}
