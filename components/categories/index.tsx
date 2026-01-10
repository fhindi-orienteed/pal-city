import appConfig from '@/config/appConfig';
import { useTranslation } from '@/hooks/useTranslation';
import { Text, View } from 'react-native';
import CategoriesCard from './card';
import styles from './styles';

export default function Categories() {
  const { t } = useTranslation()

  const categorySections = Object.entries(appConfig.businessCategories).map(([key, items]) => ({
    title: t('categories.' + key),
    categories: items
  }));

  return (
    <View style={styles.container}>
      {categorySections.map((section) => (
        <View key={section.title} style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.gridContainer}>
            {section.categories.map((category) => (
              <CategoriesCard key={category.key} category={category} />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}
