import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type IconSymbolName = React.ComponentProps<typeof IconSymbol>['name'];

interface Props {
  category: { id: string; key: string; icon: IconSymbolName, type: string }
}

export function HomeCategoriesCard({ category }: Props) {
  const router = useRouter();

  const handleCategoryPress = (category: Props['category']) => {
    if (category.type === 'business') {
      router.push(`/business/list?category=${category.key}`);
    }
  }

  return (
    <TouchableOpacity key={category.id} style={styles.container} onPress={() => handleCategoryPress(category)}>
      <View style={styles.iconContainer}>
        <IconSymbol name={category.icon} size={24} color="#009736" />
      </View>
      <ThemedText style={styles.categoryName} numberOfLines={1}>
        {category.key}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '23%',
    marginBottom: 16,
    gap: 8,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 12,
    textAlign: 'center',
  },
});
