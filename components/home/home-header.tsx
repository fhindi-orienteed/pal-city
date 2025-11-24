import { ThemedView } from '@/components/themed-view';
import { Image } from 'expo-image';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export function HomeHeader() {
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require('@/assets/images/home_background.jpg')}
        style={styles.background}
      />
      
      <ThemedView style={styles.searchContainer}>
        <Text style={styles.title}>Good morning, Fathi</Text>
        <ThemedView style={styles.searchInputContainer}>
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
  searchContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 10,
    padding: 5,
    gap: 8,
    backgroundColor: 'transparent',
  },
  searchInputContainer: {
    opacity: 0.7,
    padding: 10,
    borderRadius: 10,
    gap: 8,
    backgroundColor: '#ffffff',
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
