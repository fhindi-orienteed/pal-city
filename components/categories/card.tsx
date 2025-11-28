import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import styles from './styles';

type IconSymbolName = React.ComponentProps<typeof IconSymbol>['name'];

interface Props {
  category: { key: string; icon: IconSymbolName }
}

export default function CategoriesCard({ category }: Props) {
  const router = useRouter();
  const { t } = useTranslation();

  const handleCategoryPress = (category: Props['category']) => {
    router.push(`/business/list?category=${category.key}`);
  }

  return (
    <TouchableOpacity key={category.key} style={styles.categoryItem} onPress={() => handleCategoryPress(category)}>
      <View style={styles.iconContainer}>
        <IconSymbol name={category.icon} size={24} color="#4CAA4A" />
      </View>
      <ThemedText style={styles.categoryName} numberOfLines={1}>
        {t('categories.' + category.key)}
      </ThemedText>
    </TouchableOpacity>
  );
}