import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import styles from './styles';

type IconSymbolName = React.ComponentProps<typeof IconSymbol>['name'];

interface Props {
  category: { id: string; thumbnail: IconSymbolName; name: string }
}

export default function CategoriesCard({ category }: Props) {
  const router = useRouter();
  const { t } = useTranslation();

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/business/list?category=${categoryId}`);
  }

  return (
    <TouchableOpacity key={category.id} style={styles.categoryItem} onPress={() => handleCategoryPress(category.id)}>
      <View style={styles.iconContainer}>
        <IconSymbol name={category.thumbnail as IconSymbolName} color="#4CAA4A" />
      </View>
      <ThemedText style={styles.categoryName}>
        {category.name}
      </ThemedText>
    </TouchableOpacity>
  );
}