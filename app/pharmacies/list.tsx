import BusinessCard from '@/components/business/business-card';
import BusinessSearchBox from '@/components/business/search-box';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useBusinesses } from '@/hooks/useBusinesses';
import { Business } from '@/services/businessService';
import { Stack } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View
} from 'react-native';

const ITEMS_PER_PAGE = 10;

export default function PharmaciesListScreen() {
  const { businesses, loading, error, refetch, refreshing } = useBusinesses('Pharmacies');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);
  const [loadingMore, setLoadingMore] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (businessId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(businessId)) {
        newFavorites.delete(businessId);
      } else {
        newFavorites.add(businessId);
      }
      return newFavorites;
    });
  };

  // Filter businesses based on search query
  const filteredBusinesses = businesses.filter(business =>
    business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    business.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    business.address?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get businesses to display (with pagination)
  const displayedBusinesses = filteredBusinesses.slice(0, displayCount);
  const hasMore = displayCount < filteredBusinesses.length;

  // Load more businesses when scrolling
  const loadMore = useCallback(() => {
    if (hasMore && !loadingMore) {
      setLoadingMore(true);
      setTimeout(() => {
        setDisplayCount(prev => prev + ITEMS_PER_PAGE);
        setLoadingMore(false);
      }, 500); // Simulate loading delay
    }
  }, [hasMore, loadingMore]);

  const renderBusinessItem = ({ item }: { item: Business }) => (
    <BusinessCard
      business={item}
      isFavorite={favorites.has(item.id)}
      onToggleFavorite={toggleFavorite}
    />
  );

  const renderFooter = () => {
    if (loadingMore) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color="#E25822" />
          <ThemedText style={styles.footerText}>Loading more...</ThemedText>
        </View>
      );
    }
    if (!hasMore && filteredBusinesses.length > 0) {
      return (
        <View style={styles.footerEnd}>
          <ThemedText style={styles.footerText}>
            That's all! ({filteredBusinesses.length} businesses)
          </ThemedText>
        </View>
      );
    }
    return null;
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Pharmacies',
          headerBackTitle: 'Back',
        }} 
      />

      {/* Search Bar */}
      <BusinessSearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Business List */}
      {loading && displayedBusinesses.length === 0 ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#E25822" />
          <ThemedText style={styles.loadingText}>Loading businesses...</ThemedText>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <IconSymbol name="exclamationmark.triangle" size={50} color="#E25822" />
          <ThemedText style={styles.errorText}>Unable to load businesses</ThemedText>
          <ThemedText style={styles.errorDetail}>{error}</ThemedText>
        </View>
      ) : filteredBusinesses.length === 0 ? (
        <View style={styles.centerContainer}>
          <IconSymbol name="magnifyingglass" size={50} color="#999" />
          <ThemedText style={styles.emptyText}>
            {searchQuery ? `No results for "${searchQuery}"` : 'No businesses found'}
          </ThemedText>
        </View>
      ) : (
        <FlatList
          data={displayedBusinesses}
          renderItem={renderBusinessItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refetch}
              tintColor="#E25822"
              colors={['#E25822']}
            />
          }
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
    paddingTop: 0,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#E25822',
    textAlign: 'center',
  },
  errorDetail: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
    gap: 8,
  },
  footerEnd: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#999',
  },
});
