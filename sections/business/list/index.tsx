import BusinessCard from '@/components/business/business-card';
import { RatingOption, SortOption } from '@/components/business/filters/types';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import appConfig from '@/config/appConfig';
import { useBusinesses } from '@/hooks/useBusinesses';
import { Business } from '@/services/businessService';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View
} from 'react-native';
import Footer from './footer';
import Header from './header';
import styles from './styles';

export default function BusinessList() {
  const { businesses, loading, error, refetch, refreshing } = useBusinesses();
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(appConfig.businessList.pageSize);
  const [loadingMore, setLoadingMore] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Filter states
  const [sortOption, setSortOption] = useState<SortOption>('rating');
  const [ratingFilter, setRatingFilter] = useState<RatingOption>('all');
  const [selectedCategory, setSelectedCategory] = useState<any[]>([]);

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

  // Filter businesses based on search query, category, and rating
  const filteredBusinesses = businesses
    .filter(business => {
      // Search filter
      const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.address?.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory.length === 0 || selectedCategory.map(c => c.key).includes(business.category || '');

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
    return <Footer loadingMore={loadingMore} hasMore={hasMore} total={filteredBusinesses.length} />
  };

  return (
    <ThemedView style={styles.container}>
      <Header />

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
