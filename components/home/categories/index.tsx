import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { LayoutAnimation, Platform, TouchableOpacity, UIManager, View } from 'react-native';
import { CATEGORIES } from './config';
import { styles } from './styles';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}



export default function HomeCategories() {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const displayedCategories = expanded ? CATEGORIES : CATEGORIES.slice(0, 8);

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {displayedCategories.map((category) => (
          <TouchableOpacity 
            key={category.id} 
            style={styles.categoryItem} 
            onPress={() => router.push(category.path as any)}
          >
            <View style={styles.iconContainer}>
              <IconSymbol name={category.icon} size={24} color="#009736" />
            </View>
            <ThemedText style={styles.categoryName} numberOfLines={1}>
              {category.name}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity onPress={toggleExpanded} style={styles.expandButton}>
        <IconSymbol 
          name={expanded ? 'chevron.up' : 'chevron.down'} 
          size={24} 
          color="#009736" 
        />
      </TouchableOpacity>
    </View>
  );
}


