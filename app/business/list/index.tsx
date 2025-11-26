import BusinessCard from '@/components/business/business-card';
import FilterBottomSheet from '@/components/business/filters';
import BusinessSearchBox from '@/components/business/search-box';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useBusinesses } from '@/hooks/useBusinesses';
import { Business } from '@/services/businessService';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';

import { RatingOption, SortOption } from '@/components/business/filters/types';
import appConfig from '@/config/appConfig';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View
} from 'react-native';
import styles from './styles';

export default function BusinessListScreen() {
  const { businesses, loading, error, refetch, refreshing } = useBusinesses();
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(appConfig.businessList.pageSize);
  const [loadingMore, setLoadingMore] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Filter states
  const [sortOption, setSortOption] = useState<SortOption>('rating');
  const [ratingFilter, setRatingFilter] = useState<RatingOption>('all');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
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
            <IconSymbol name="filter" size={22} color="#009736" /><ThemedText>Filter</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Bottom Sheet */}
      <FilterBottomSheet
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
