import { Item, ItemsResponse, SearchResponse } from '../types/Item';

// Test type definitions and interfaces
test('Item interface should have correct structure', () => {
  const mockItem: Item = {
    id: '1',
    text: 'Test item',
    category: 'Work',
    createdAt: new Date('2025-09-15T10:00:00Z')
  };

  expect(mockItem.id).toBe('1');
  expect(mockItem.text).toBe('Test item');
  expect(mockItem.category).toBe('Work');
  expect(mockItem.createdAt).toBeInstanceOf(Date);
});

test('Item interface should work without optional category', () => {
  const mockItem: Item = {
    id: '2',
    text: 'Item without category',
    createdAt: new Date('2025-09-15T10:00:00Z')
  };

  expect(mockItem.id).toBe('2');
  expect(mockItem.text).toBe('Item without category');
  expect(mockItem.category).toBeUndefined();
  expect(mockItem.createdAt).toBeInstanceOf(Date);
});

test('ItemsResponse interface should have correct structure', () => {
  const mockResponse: ItemsResponse = {
    items: [],
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      hasMore: false
    }
  };

  expect(Array.isArray(mockResponse.items)).toBe(true);
  expect(mockResponse.pagination.page).toBe(1);
  expect(mockResponse.pagination.limit).toBe(10);
  expect(mockResponse.pagination.total).toBe(0);
  expect(mockResponse.pagination.hasMore).toBe(false);
});

test('SearchResponse interface should have correct structure', () => {
  const mockResponse: SearchResponse = {
    items: [],
    query: 'test',
    count: 0
  };

  expect(Array.isArray(mockResponse.items)).toBe(true);
  expect(mockResponse.query).toBe('test');
  expect(mockResponse.count).toBe(0);
}); 