import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeHeader() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require('@/assets/images/home_background.jpg')}
        style={styles.background}
      />

      {/* Notification Button */}
      <TouchableOpacity
        style={styles.notificationButton}
        onPress={() => router.push('/notifications/index' as any)}
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

const styles = StyleSheet.create({
  background: {
    height: 250,
    width: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    overflow: 'hidden',
  },
  profileButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 20,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  notificationButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 20,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF3B30',
    borderWidth: 1,
    borderColor: '#fff',
  },
  searchContainer: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    zIndex: 10,
    padding: 5,
    gap: 8,
    backgroundColor: 'transparent',
  },
  searchInputContainer: {
    position: 'relative',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'transparent',
  },
  searchInputBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    opacity: 0.7,
  },
  searchInput: {
    height: 35,
    backgroundColor: '#fff',
    borderRadius: 10,
    fontSize: 14,
    shadowColor: '#000',
    paddingHorizontal: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
