import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Item } from '../types/Item';
import { ItemCard } from '../components/ItemCard';
import { SearchBar } from '../components/SearchBar';
import { useFeedData } from '../hooks/useFeedData';
import { COLORS } from '../constants/colors';

export const FeedScreen: React.FC = () => {
  const { state, handleRefresh, handleLoadMore, handleSearchQueryChange } = useFeedData();

  const renderItem = ({ item }: { item: Item }) => (
    <ItemCard item={item} />
  );

  const renderFooter = () => {
    if (state.isSearchMode || !state.hasMore) {
      return null;
    }

    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.loadMoreButton}
          onPress={handleLoadMore}
          disabled={state.isLoadingMore}
        >
          {state.isLoadingMore ? (
            <ActivityIndicator size="small" color={COLORS.white} />
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
        {state.isSearchMode ? 'No items found for your search' : 'No items available'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        value={state.searchQuery}
        onChangeText={handleSearchQueryChange}
        placeholder="Search items..."
      />
      
      {state.isLoading && state.items.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.blue} />
          <Text style={styles.loadingText}>Loading items...</Text>
        </View>
      ) : (
        <FlatList
          data={state.items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={renderEmptyState}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={state.isRefreshing}
              onRefresh={handleRefresh}
              colors={[COLORS.blue]}
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
    backgroundColor: COLORS.cleanWhite,
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
    color: COLORS.grayMedium,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.grayMedium,
    textAlign: 'center',
  },
  footerContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadMoreButton: {
    backgroundColor: COLORS.redMedium,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.redDeep,
  },
  loadMoreText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FeedScreen; 