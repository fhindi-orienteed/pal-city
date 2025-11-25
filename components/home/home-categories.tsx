import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useState } from 'react';
import { LayoutAnimation, Platform, StyleSheet, TouchableOpacity, UIManager, View } from 'react-native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const CATEGORIES = [
  { id: '1', name: 'Automotive', icon: 'car.fill' },
  { id: '2', name: 'Books', icon: 'book.fill' },
  { id: '3', name: 'Cameras', icon: 'camera.fill' },
  { id: '4', name: 'Electronics', icon: 'desktopcomputer' },
  { id: '5', name: 'Fashion', icon: 'tshirt.fill' },
  { id: '6', name: 'Real Estate', icon: 'house.fill' },
  { id: '7', name: 'Deals', icon: 'tag.fill' },
  { id: '8', name: 'Featured', icon: 'star.fill' },
  { id: '9', name: 'Travel', icon: 'globe' },
  { id: '10', name: 'Mobile', icon: 'phone.fill' },
  { id: '11', name: 'Local', icon: 'map.fill' },
  { id: '12', name: 'Events', icon: 'calendar' },
] as const;

export function HomeCategories() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const displayedCategories = expanded ? CATEGORIES : CATEGORIES.slice(0, 8);

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {displayedCategories.map((category) => (
          <TouchableOpacity key={category.id} style={styles.categoryItem}>
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
