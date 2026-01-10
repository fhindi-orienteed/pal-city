import BusinessCard from '@/components/business/business-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useBusinesses } from '@/hooks/useBusinesses';
import { Business } from '@/types/interface';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View
} from 'react-native';
import Filters from './filters';
import SearchBox from './searchBox';
import styles from './styles';

export default function Search() {
  const { t } = useTranslation();
  const { businesses, loading } = useBusinesses();

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);


  // Filter businesses based on search query and category
  const filterBusinesses = useCallback(() => {
    let filtered = businesses;

    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(
        business => business.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        business =>
          business.name.toLowerCase().includes(query) ||
          business.description?.toLowerCase().includes(query) ||
          business.category?.toLowerCase().includes(query) ||
          business.address?.toLowerCase().includes(query)
      );
    }

    setFilteredBusinesses(filtered);
  }, [businesses, searchQuery, selectedCategory]);

  useEffect(() => {
    filterBusinesses();
  }, [filterBusinesses]);

  // Handle search submission
  const handleSearch = useCallback(() => {
    if (searchQuery.trim() && !recentSearches.includes(searchQuery.trim())) {
      setRecentSearches(prev => [searchQuery.trim(), ...prev.slice(0, 4)]);
    }
  }, [searchQuery, recentSearches]);

  // Handle recent search click
  const handleRecentSearchClick = useCallback((search: string) => {
    setSearchQuery(search);
  }, []);

  // Clear recent searches
  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
  }, []);

  // Remove individual recent search
  const removeRecentSearch = useCallback((search: string) => {
    setRecentSearches(prev => prev.filter(s => s !== search));
  }, []);

  // Render business item
  const renderBusinessItem = ({ item }: { item: Business }) => (
    <BusinessCard business={item} />
  );

  // Render recent search item
  const renderRecentSearchItem = (search: string, index: number) => (
    <View key={index} style={styles.recentSearchItem}>
      <TouchableOpacity
        style={styles.recentSearchContent}
        onPress={() => handleRecentSearchClick(search)}
      >
        <IconSymbol name="clock" size={18} color="#666" />
        <ThemedText style={styles.recentSearchText}>{search}</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => removeRecentSearch(search)}
        style={styles.removeButton}
      >
        <IconSymbol name="xmark" size={16} color="#999" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <SearchBox onChange={setSearchQuery} />

      <Filters onChange={setSelectedTypes} />

      {/* Content */}
      {searchQuery.trim() === '' && recentSearches.length > 0 ? (
        // Recent Searches
        <View style={styles.recentSearchesContainer}>
          <View style={styles.recentSearchesHeader}>
            <ThemedText style={styles.recentSearchesTitle}>
              {t('search.recentSearches')}
            </ThemedText>
            <TouchableOpacity onPress={clearRecentSearches}>
              <ThemedText style={styles.clearButton}>Clear All</ThemedText>
            </TouchableOpacity>
          </View>
          <View style={styles.recentSearchesList}>
            {recentSearches.map((search, index) => renderRecentSearchItem(search, index))}
          </View>
        </View>
      ) : loading ? (
        // Loading State
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#009736" />
          <ThemedText style={styles.loadingText}>Searching...</ThemedText>
        </View>
      ) : filteredBusinesses.length === 0 ? (
        // Empty State
        <View style={styles.centerContainer}>
          <IconSymbol name="magnifyingglass" size={60} color="#E0E0E0" />
          <ThemedText style={styles.emptyTitle}>No Results Found</ThemedText>
          <ThemedText style={styles.emptySubtitle}>
            {searchQuery.trim()
              ? `No businesses found for "${searchQuery}"`
              : 'Try searching for businesses, cafes, or restaurants'}
          </ThemedText>
        </View>
      ) : (
        // Results List
        <View style={styles.resultsContainer}>
          <ThemedText style={styles.resultsCount}>
            {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'result' : 'results'} found
          </ThemedText>
          <FlatList
            data={filteredBusinesses}
            renderItem={renderBusinessItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </ThemedView>
  );
}
