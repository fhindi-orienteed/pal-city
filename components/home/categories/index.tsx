import { IconSymbol } from '@/components/ui/icon-symbol';
import appConfig from '@/config/appConfig';
import { useState } from 'react';
import { LayoutAnimation, Platform, StyleSheet, TouchableOpacity, UIManager, View } from 'react-native';
import { HomeCategoriesCard } from './card';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function HomeCategories() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const displayedCategories = expanded ? appConfig.businessCategories : appConfig.businessCategories.slice(0, 8);

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {displayedCategories.map((category) => (
          <HomeCategoriesCard key={category.id} category={category} />
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

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  categoryItem: {
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
  expandButton: {
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 4,
  },
});
