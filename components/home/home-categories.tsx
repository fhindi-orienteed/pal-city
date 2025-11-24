import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const CATEGORIES = [
  { id: '1', name: 'Automotive', icon: 'car.fill' },
  { id: '2', name: 'Books', icon: 'book.fill' },
  { id: '3', name: 'Cameras', icon: 'camera.fill' },
  { id: '4', name: 'Electronics', icon: 'desktopcomputer' },
  { id: '5', name: 'Fashion', icon: 'tshirt.fill' },
] as const;

export function HomeCategories() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="subtitle">Categories</ThemedText>
        <TouchableOpacity>
          <ThemedText style={styles.viewAll}>More</ThemedText>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity key={category.id} style={styles.categoryItem}>
            <View style={styles.iconContainer}>
              <IconSymbol name={category.icon} size={24} color="#E25822" />
            </View>
            <ThemedText style={styles.categoryName} numberOfLines={1}>
              {category.name}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  viewAll: {
    color: '#E25822',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 12,
    gap: 12,
  },
  categoryItem: {
    alignItems: 'center',
    width: 72,
    gap: 8,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#FFF0EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 12,
    textAlign: 'center',
  },
});
