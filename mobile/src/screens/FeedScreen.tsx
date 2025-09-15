import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { Item } from '../types/Item';
import { ApiService } from '../services/api';
import { ItemCard } from '../components/ItemCard';
import { SearchBar } from '../components/SearchBar';

export const FeedScreen: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearchMode, setIsSearchMode] = useState(false);

  const loadItems = useCallback(async (page: number = 1, append: boolean = false) => {
    try {
      if (page === 1) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      const response = await ApiService.getItems(page, 10);
      
      const newItems = append ? [...items, ...response.items] : response.items;
      setItems(newItems);
      setHasMore(response.pagination.hasMore);
      setCurrentPage(page);
    } catch (error) {
      Alert.alert('Error', 'Failed to load items. Please try again.');
      console.error('Failed to load items:', error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
      setIsRefreshing(false);
    }
  }, [items]);

  const searchItems = useCallback(async (query: string) => {
    if (!query.trim()) {
      setIsSearchMode(false);
      loadItems(1, false);
      return;
    }

    try {
      setIsLoading(true);
      setIsSearchMode(true);
      const response = await ApiService.searchItems(query);
      setItems(response.items);
      setHasMore(false); // Search results don't paginate for simplicity
    } catch (error) {
      Alert.alert('Error', 'Failed to search items. Please try again.');
      console.error('Failed to search items:', error);
    } finally {
      setIsLoading(false);
    }
  }, [loadItems]);

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchItems(searchQuery);
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchItems]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setSearchQuery('');
    setIsSearchMode(false);
    loadItems(1, false);
  };

  const handleLoadMore = () => {
    if (!isLoadingMore && hasMore && !isSearchMode) {
      loadItems(currentPage + 1, true);
    }
  };

  const renderItem = ({ item }: { item: Item }) => (
    <ItemCard item={item} />
  );

  const renderFooter = () => {
    if (isSearchMode || !hasMore) {
      return null;
    }

    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.loadMoreButton}
          onPress={handleLoadMore}
          disabled={isLoadingMore}
        >
          {isLoadingMore ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.loadMoreText}>Load More</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {isSearchMode ? 'No items found for your search' : 'No items available'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search items..."
      />
      
      {isLoading && items.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={styles.loadingText}>Loading items...</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={renderEmptyState}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              colors={['#3B82F6']}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  listContainer: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  footerContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadMoreButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  loadMoreText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FeedScreen; 