import BusinessCard from '@/components/business/business-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useBusinesses } from '@/hooks/useBusinesses';
import { Business } from '@/types/interface';
import { useCallback } from 'react';
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
  const { businesses, loading, error, totalRecords, refetch, fetchNextPage, hasMore } = useBusinesses();

  const renderBusinessItem = ({ item }: { item: Business }) => (
    <BusinessCard business={item} />
  );

  const renderFooter = () => {
    return <Footer loading={loading} hasMore={hasMore} total={totalRecords} />
  };

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <ThemedView style={styles.container}>
      <Header />

      {/* Business List */}
      {loading && businesses.length === 0 ? (
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
      ) : totalRecords === 0 ? (
        <View style={styles.centerContainer}>
          <IconSymbol name="magnifyingglass" size={50} color="#999" />
          <ThemedText style={styles.emptyText}>
            No businesses found
          </ThemedText>
        </View>
      ) : (
        <FlatList
          data={businesses}
          renderItem={renderBusinessItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          onEndReached={fetchNextPage}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={handleRefresh}
              tintColor="#009736"
              colors={['#009736']}
            />
          }
        />
      )}
    </ThemedView>
  );
}
