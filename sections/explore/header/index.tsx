import { ThemedText } from '@/components/themed-text';
import { useSelectedCity } from '@/hooks/use-selected-city';
import { Image } from 'expo-image';
import { View } from 'react-native';
import styles from './styles';

export default function Header() {
  const selectedCity = useSelectedCity();

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/explore-header.png')}
        style={styles.background}
      />

      <View style={styles.headerContainer}>
        <ThemedText type="title" style={styles.headerTitle}>Explore</ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Discover {selectedCity?.name || 'your city'}
        </ThemedText>
      </View>
    </View>
  );
}
