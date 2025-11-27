import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Business } from '@/services/businessService';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import styles from './styles';

export default function Header({ business }: { business: Business }) {
  const router = useRouter();
  const onFavorite = () => { }

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{ uri: business.images?.[0] }}
        style={styles.header}
      />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <IconSymbol name="chevron.left" size={28} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={onFavorite}
      >
        <IconSymbol name="heart" size={24} color="#fff" />
      </TouchableOpacity>

      <ThemedText style={styles.categoryBadge}>{business.category}</ThemedText>
    </View>
  )
}