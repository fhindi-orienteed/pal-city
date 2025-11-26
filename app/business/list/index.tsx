import BusinessCard from '@/components/business/business-card';
import FilterSidebar, { RatingFilter, SortOption } from '@/components/business/filters';
import BusinessSearchBox from '@/components/business/search-box';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useBusinesses } from '@/hooks/useBusinesses';
import { Business } from '@/services/businessService';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';

import appConfig from '@/config/appConfig';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

export default function BusinessListScreen() {
  const { businesses, loading, error, refetch, refreshing } = useBusinesses();
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(appConfig.businessList.pageSize);
  const [loadingMore, setLoadingMore] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Filter states
  const [sortOption, setSortOption] = useState<SortOption>('rating');
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filterVisible, setFilterVisible] = useState(false);

  const params = useLocalSearchParams();
  const { title } = params


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

  // Extract unique categories from businesses
  const categories = Array.from(new Set(businesses.map(b => b.category).filter(Boolean))) as string[];

  // Filter businesses based on search query, category, and rating
  const filteredBusinesses = businesses
    .filter(business => {
      // Search filter
      const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.address?.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === null || business.category === selectedCategory;

      // Rating filter
      let matchesRating = true;
      if (ratingFilter === '4+' && business.rating) {
        matchesRating = business.rating >= 4;
      } else if (ratingFilter === '3+' && business.rating) {
        matchesRating = business.rating >= 3;
      }

      return matchesSearch && matchesCategory && matchesRating;
    })
    .sort((a, b) => {
      // Sort logic
      if (sortOption === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      } else if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'newest') {
        // Assuming createdAt exists and is a timestamp
        const aTime = a.createdAt?.seconds || 0;
        const bTime = b.createdAt?.seconds || 0;
        return bTime - aTime;
      }
      return 0;
    });

  // Get businesses to display (with pagination)
  const displayedBusinesses = filteredBusinesses.slice(0, pageSize);
  const hasMore = pageSize < filteredBusinesses.length;

  // Load more businesses when scrolling
  const loadMore = useCallback(() => {
    if (hasMore && !loadingMore) {
      setLoadingMore(true);
      setTimeout(() => {
        setPageSize(prev => prev + appConfig.businessList.pageSize);
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
          title: (typeof title === 'string' ? title : undefined) || 'All Businesses',
          headerBackTitle: 'Back',
        }}
      />

      <View style={styles.header}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <BusinessSearchBox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </View>

        <View style={styles.filterContainer}>
          <TouchableOpacity onPress={() => setFilterVisible(true)} style={styles.filterButton}>
            <IconSymbol name="calendar" size={22} color="#009736" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Sidebar */}
      <FilterSidebar
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        selectedSort={sortOption}
        onSortChange={setSortOption}
        selectedRating={ratingFilter}
        onRatingChange={setRatingFilter}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Business List */}
      {loading && displayedBusinesses.length === 0 ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#009736" />
          <ThemedText style={styles.loadingText}>Loading businesses...</ThemedText>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <IconSymbol name="exclamationmark.triangle" size={50} color="#009736" />
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
              tintColor="#009736"
              colors={['#009736']}
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
    color: '#009736',
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
  filterButton: {
    padding: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 16,
    gap: 8,
  },
  searchContainer: {
    flex: 1,
  },
  filterContainer: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  }
});
