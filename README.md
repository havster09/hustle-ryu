# Hustle Task - Full-Stack Application

A simplified Feed application built with Node.js/Express backend and React Native mobile client.

## Development Environment Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (Mac) or Android Studio (for Android development)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The backend server will run on `http://localhost:3000` with the following endpoints:
- Health check: `GET /health`
- Get items: `GET /api/items?page=1&limit=10`
- Search items: `GET /api/items/search?q=query`

### Mobile Client Setup

1. Navigate to the mobile directory:
```bash
cd mobile
```

2. Install dependencies:
```bash
npm install
```

3. Start the Expo development server:
```bash
npm start
```

4. Use the Expo Go app on your device or run on simulator:
- iOS: Press `i` to open iOS Simulator
- Android: Press `a` to open Android Emulator
- Web: Press `w` to open in web browser

### Environment Variables

The application uses the following default configuration:
- Backend Port: `3000` (configurable via `PORT` environment variable)
- API Base URL in mobile app: `http://localhost:3000`

For production deployment, update the `API_BASE_URL` in `mobile/src/services/api.ts`.

## Technical Decisions

### Backend Architecture

Framework Choice: Express.js with TypeScript
- Express.js provides a minimal, flexible web framework for RESTful APIs
- TypeScript adds type safety and better developer experience
- Clean separation of concerns with dedicated folders for types, data, and services

API Design
- RESTful endpoints following conventional patterns
- Pagination support for scalability
- Error handling with appropiate HTTP status codes
- CORS enabled for cross-origin requests from mobile client

Data Layer
- In-memory mock data for simplicity
- Structured item objects with id, text, category, and timestamp
- Simple text-based search implementation across text and category fields

### Mobile Client Architecture

Framework Choice: React Native with Expo
- Expo provides rapid development setup and developer experience
- React Native enables code sharing between iOS and Android
- TypeScript througout for type safety and maintainability

State Management
- Local component state using React hooks
- Custom hooks pattern for API calls with loading/error states
- Debounced search to minimize API calls

Component Architecture
- Functional components with TypeScript interfaces
- Reusable components (ItemCard, SearchBar)
- Clean separation between UI components and business logic

Navigation
- React Navigation with bottom tab navigator
- Simple two-screen structure (Feed and Acount)
- Consistent styling and user experience

### UI/UX Design

Design System
- Modern, clean interface with consistent color palette
- Card-based layout for items with visual hierarchy
- Category badges with color coding for quick identification
- Loading states and error handling for better user experience

Performance Considerations
- FlatList for efficient rendering of large item lists
- Image optimization ready for production assets
- Debounced search input to prevent excessive API calls

## Further Improvements

### Full Infinite Pagination

Current Implementation:
- Basic "Load More" button with page-based paginaton
- Simple hasMore flag to control button visibility

Production Implementation:
- Replace "Load More" with true infinite scroll using onEndReached
- Implement pull-to-refresh functionality  
- Add skeleton loading states
- Cache management for offline support

### Real-world Search Indexing

Current Implementation:
- Simple string matching on text and category fields
- In-memory filtering

Production Implementation:
- Elasticsearch or Algolia for advanced search capabilities
- Full-text search with relevance scoring
- Search result highlighting
- Auto-complete and suggestions
- Search analytics and optimization

### Complete User Authentication Flow

Architecture Overview:
- JWT-based authentication with refresh tokens
- OAuth integration (Google, Apple, GitHub)
- Role-based access control
- Multi-factor authentication

Mobile Client Authentication:
- Secure storage for tokens using device keychain
- Biometric authentication support
- Authentication state management with React Context

Security Considerations:
- Secure token storage using device keychain
- Biometric authentication support
- Session management with automatic token refresh
- Rate limiting and abuse protection
- Data encryption at rest and in transit

### Database & Infrastructure

Production Database:
- PostgreSQL with proper indexing for performance
- User table with email authentication
- Items table with user relationships
- Full-text search indexes for efficient queries

Caching Strategy:
- Redis for session storage and frequently accessed data
- CDN for static assets and images
- Application-level caching for search results

## CI/CD Pipeline

### Recommended Tools
- GitHub Actions for CI/CD automation
- Docker for containerization
- AWS ECS/EKS or Google Cloud Run for deployment
- Expo EAS for mobile app builds and distribution

### Backend Pipeline

The pipeline would include:
- Automated testing (unit, integration, e2e)
- Code quality checks (ESLint, Prettier)
- Security scanning
- Docker image building
- Deployment to staging and production environments

### Mobile Pipeline

The mobile pipeline would include:
- Automated testing and linting
- Building preview and production versions using Expo EAS
- Submission to app stores (iOS App Store and Google Play)
- Automated distribution for internal testing

### Pipeline Features

Quality Gates:
- Automated testing (unit, intergration, e2e)
- Code quality checks (ESLint, Prettier)
- Security scanning
- Performance monitoring integration

Deployment Strategy:
- Staging environment for preview builds
- Blue-green deployment for zero downtime
- Automatic rollback on deployment failures
- Environment-specific configuration management

Monitoring & Alerting:
- Application performance monitoring
- Error tracking and logging
- Health checks and uptime monitoring
- Notifications for critical issues

## Project Structure

```
hustle-task/
├── backend/
│   ├── src/
│   │   ├── data/
│   │   ├── types/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── mobile/
│   ├── src/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── services/
│   │   └── types/
│   ├── App.tsx
│   ├── package.json
│   └── app.json
└── README.md
```

## Core Features Implemented

Backend API
- Items endpoint with pagination support
- Search endpoint with query parameter
- Error handling and CORS configuration
- TypeScript throughout

Mobile Client
- Feed screen with search functionality
- Account screen (placeholder)
- Bottom tab navigation
- Real-time search with debouncing
- Load more button (infinite scroll placeholder)
- Loading states and error handling

Modern Development Practices
- TypeScript for type safety
- Component-based architecture
- Responsive design principles
- Clean code and documentation

This implementation provides a solid foundation for a production-ready application. 