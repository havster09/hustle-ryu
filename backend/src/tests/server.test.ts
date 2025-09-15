import request from 'supertest';
import express from 'express';
import cors from 'cors';
import { mockItems } from '../data/mockData';

// Create a test app with the same setup as our main server
const createTestApp = () => {
  const app = express();
  
  app.use(cors());
  app.use(express.json());

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  // Get items with pagination
  app.get('/api/items', (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const items = mockItems.slice(startIndex, endIndex);
    const hasMore = endIndex < mockItems.length;
    
    res.json({
      items,
      pagination: {
        page,
        limit,
        total: mockItems.length,
        hasMore
      }
    });
  });

  // Search items
  app.get('/api/items/search', (req, res) => {
    const query = (req.query.q as string) || '';
    
    if (!query.trim()) {
      return res.json({ items: [], query, count: 0 });
    }
    
    const filteredItems = mockItems.filter(item =>
      item.text.toLowerCase().includes(query.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(query.toLowerCase()))
    );
    
    res.json({
      items: filteredItems,
      query,
      count: filteredItems.length
    });
  });

  return app;
};

describe('Backend API Tests', () => {
  let app: express.Application;

  beforeAll(() => {
    app = createTestApp();
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /api/items', () => {
    it('should return paginated items', async () => {
      const response = await request(app)
        .get('/api/items?page=1&limit=5')
        .expect(200);

      expect(response.body).toHaveProperty('items');
      expect(response.body).toHaveProperty('pagination');
      expect(response.body.items).toHaveLength(5);
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(5);
    });

    it('should handle default pagination', async () => {
      const response = await request(app)
        .get('/api/items')
        .expect(200);

      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(10);
      expect(response.body.items.length).toBeLessThanOrEqual(10);
    });

    it('should return correct hasMore flag', async () => {
      const response = await request(app)
        .get('/api/items?page=1&limit=5')
        .expect(200);

      expect(response.body.pagination.hasMore).toBe(true);
    });
  });

  describe('GET /api/items/search', () => {
    it('should search items by text', async () => {
      const response = await request(app)
        .get('/api/items/search?q=hadoken')
        .expect(200);

      expect(response.body).toHaveProperty('items');
      expect(response.body).toHaveProperty('query', 'hadoken');
      expect(response.body).toHaveProperty('count');
      expect(response.body.items.length).toBeGreaterThan(0);
    });

    it('should search items by category', async () => {
      const response = await request(app)
        .get('/api/items/search?q=work')
        .expect(200);

      expect(response.body.items.length).toBeGreaterThan(0);
      response.body.items.forEach((item: any) => {
        expect(
          item.text.toLowerCase().includes('work') ||
          (item.category && item.category.toLowerCase().includes('work'))
        ).toBe(true);
      });
    });

    it('should return empty results for non-matching query', async () => {
      const response = await request(app)
        .get('/api/items/search?q=nonexistentterm')
        .expect(200);

      expect(response.body.items).toHaveLength(0);
      expect(response.body.count).toBe(0);
    });

    it('should handle empty query', async () => {
      const response = await request(app)
        .get('/api/items/search?q=')
        .expect(200);

      expect(response.body.items).toHaveLength(0);
      expect(response.body.count).toBe(0);
    });
  });
}); 