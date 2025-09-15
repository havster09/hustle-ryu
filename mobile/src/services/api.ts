import { Item, ItemsResponse, SearchResponse } from '../types/Item';

const API_BASE_URL = 'http://localhost:3000';

export class ApiService {
  private static async request<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  static async getItems(page: number = 1, limit: number = 10): Promise<ItemsResponse> {
    return this.request<ItemsResponse>(`/api/items?page=${page}&limit=${limit}`);
  }

  static async searchItems(query: string): Promise<SearchResponse> {
    const encodedQuery = encodeURIComponent(query);
    return this.request<SearchResponse>(`/api/items/search?q=${encodedQuery}`);
  }
}

export default ApiService; 