export interface Item {
  id: string;
  text: string;
  category?: string;
  createdAt: Date;
}

export interface ItemsResponse {
  items: Item[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

export interface SearchResponse {
  items: Item[];
  query: string;
  count: number;
} 