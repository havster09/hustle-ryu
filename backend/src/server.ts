import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { mockItems } from './data/mockData';
import { Item } from './types/Item';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Get all items endpoint
app.get('/api/items', (req: Request, res: Response) => {
  try {
    // Simulate pagination parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    
    const paginatedItems = mockItems.slice(offset, offset + limit);
    
    res.json({
      items: paginatedItems,
      pagination: {
        page,
        limit,
        total: mockItems.length,
        hasMore: offset + limit < mockItems.length
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Search items endpoint
app.get('/api/items/search', (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    
    if (!query) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }
    
    // Simple search implementation - in production, you'd use a proper search engine
    const filteredItems = mockItems.filter(item => 
      item.text.toLowerCase().includes(query.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(query.toLowerCase()))
    );
    
    res.json({
      items: filteredItems,
      query,
      count: filteredItems.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Items API: http://localhost:${PORT}/api/items`);
  console.log(`Search API: http://localhost:${PORT}/api/items/search?q=<query>`);
});

export default app; 