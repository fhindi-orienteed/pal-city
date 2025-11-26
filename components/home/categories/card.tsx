import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type IconSymbolName = React.ComponentProps<typeof IconSymbol>['name'];

interface Props {
    category: { id: string; name: string; icon: IconSymbolName}
}

export function HomeCategoriesCard({ category }: Props) {
  return (
    <TouchableOpacity key={category.id} style={styles.container}>
      <View style={styles.iconContainer}>
        <IconSymbol name={category.icon} size={24} color="#009736" />
      </View>
      <ThemedText style={styles.categoryName} numberOfLines={1}>
        {category.name}
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
