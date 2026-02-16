import appConfig from '@/config/appConfig';
import { useTranslation } from '@/hooks/useTranslation';
import { CategoryService } from '@/services/categoryService';
import { IGlobalProperties } from '@/types/interface/Common';
import { ActivityIndicator, Text, View } from 'react-native';
import CategoriesCard from './card';
import styles from './styles';

export default function Categories() {
  const { t } = useTranslation()
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await CategoryService.getCategories();
        const mappedData = data.map((item: IGlobalProperties) => {
          const categoryIcon = (item as any).icon || 'apps-outline';
          return {
          ...item,
          key: item.id.toString(),
          icon: categoryIcon, 
          name: item.name
        };
      });

        setCategories(mappedData);
      }
        catch (error) {
          console.error('Error loading categories:', error);
          setCategories([{ id: 1, name: "Loading...", icon: "help-circle-outline" }]);
        }
        finally {
          setLoading(false);
        }
    };
    
    loadData();
  }, []);
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#009736" />
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{t('categories.title')}</Text> 
         <View style={styles.gridContainer}>
            {categories.map((category) => (
              <CategoriesCard key={category.id} category={category} />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}
