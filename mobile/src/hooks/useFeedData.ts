import { useReducer, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { Item } from '../types/Item';
import { ApiService } from '../services/api';

interface FeedState {
  items: Item[];
  searchQuery: string;
  isLoading: boolean;
  isLoadingMore: boolean;
  isRefreshing: boolean;
  hasMore: boolean;
  currentPage: number;
  isSearchMode: boolean;
}

type FeedAction =
  | { type: 'SET_LOADING_STATE'; payload: { isLoading?: boolean; isLoadingMore?: boolean; isRefreshing?: boolean } }
  | { type: 'SET_SEARCH'; payload: { query: string; isSearchMode: boolean } }
  | { type: 'SET_ITEMS'; payload: { items: Item[]; append?: boolean } }
  | { type: 'SET_PAGINATION'; payload: { hasMore: boolean; currentPage: number } }
  | { type: 'RESET_TO_INITIAL' };

const initialState: FeedState = {
  items: [],
  searchQuery: '',
  isLoading: false,
  isLoadingMore: false,
  isRefreshing: false,
  hasMore: true,
  currentPage: 1,
  isSearchMode: false,
};

const feedReducer = (state: FeedState, action: FeedAction): FeedState => {
  switch (action.type) {
    case 'SET_LOADING_STATE':
      return { ...state, ...action.payload };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload.query, isSearchMode: action.payload.isSearchMode };
    case 'SET_ITEMS':
      return { 
        ...state, 
        items: action.payload.append ? [...state.items, ...action.payload.items] : action.payload.items 
      };
    case 'SET_PAGINATION':
      return { ...state, hasMore: action.payload.hasMore, currentPage: action.payload.currentPage };
    case 'RESET_TO_INITIAL':
      return { ...initialState };
    default:
      return state;
  }
};

export const useFeedData = () => {
  const [state, dispatch] = useReducer(feedReducer, initialState);

  const handleApiError = useCallback((error: any, message: string) => {
    Alert.alert('Error', message);
    console.error(message, error);
  }, []);

  const loadItems = useCallback(async (page: number = 1, append: boolean = false) => {
    try {
      dispatch({ 
        type: 'SET_LOADING_STATE', 
        payload: page === 1 ? { isLoading: true } : { isLoadingMore: true }
      });

      const response = await ApiService.getItems(page, 10);
      
      dispatch({ type: 'SET_ITEMS', payload: { items: response.items, append } });
      dispatch({ type: 'SET_PAGINATION', payload: { hasMore: response.pagination.hasMore, currentPage: page } });
    } catch (error) {
      handleApiError(error, 'Failed to load items. Please try again.');
    } finally {
      dispatch({ type: 'SET_LOADING_STATE', payload: { isLoading: false, isLoadingMore: false, isRefreshing: false } });
    }
  }, [handleApiError]);

  const searchItems = useCallback(async (query: string) => {
    const trimmedQuery = query.trim();
    
    if (!trimmedQuery) {
      dispatch({ type: 'SET_SEARCH', payload: { query, isSearchMode: false } });
      await loadItems(1, false);
      return;
    }

    try {
      dispatch({ type: 'SET_LOADING_STATE', payload: { isLoading: true } });
      dispatch({ type: 'SET_SEARCH', payload: { query, isSearchMode: true } });
      
      const response = await ApiService.searchItems(trimmedQuery);
      dispatch({ type: 'SET_ITEMS', payload: { items: response.items } });
      dispatch({ type: 'SET_PAGINATION', payload: { hasMore: false, currentPage: 1 } });
    } catch (error) {
      handleApiError(error, 'Failed to search items. Please try again.');
    } finally {
      dispatch({ type: 'SET_LOADING_STATE', payload: { isLoading: false } });
    }
  }, [loadItems, handleApiError]);

  const handleRefresh = useCallback(() => {
    dispatch({ type: 'SET_LOADING_STATE', payload: { isRefreshing: true } });
    dispatch({ type: 'SET_SEARCH', payload: { query: '', isSearchMode: false } });
    loadItems(1, false);
  }, [loadItems]);

  const handleLoadMore = useCallback(() => {
    if (!state.isLoadingMore && state.hasMore && !state.isSearchMode) {
      loadItems(state.currentPage + 1, true);
    }
  }, [state.isLoadingMore, state.hasMore, state.isSearchMode, state.currentPage, loadItems]);

  const handleSearchQueryChange = useCallback((query: string) => {
    dispatch({ type: 'SET_SEARCH', payload: { query, isSearchMode: state.isSearchMode } });
  }, [state.isSearchMode]);

  // Auto-search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchItems(state.searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [state.searchQuery, searchItems]);

  // Initial load
  useEffect(() => {
    loadItems();
  }, [loadItems]);

  return {
    state,
    handleRefresh,
    handleLoadMore,
    handleSearchQueryChange,
  };
}; 