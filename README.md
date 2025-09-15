# Hustle Task - Full-Stack Application

A simplified Feed application built with Node.js/Express backend and React Native mobile client.

## Quick Start Guide

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

### Running the Application (5 minute setup)

1. **Clone and navigate to project:**
```bash
git clone <repository-url>
cd hustle-task
```

2. **Start Backend (Terminal 1):**
```bash
cd backend
npm install
npm run build
node dist/server.js
```
Backend running at `http://localhost:3000`

3. **Start Mobile Client (Terminal 2):**
```bash
cd mobile
npm install
npx expo start --web
```
Mobile app running at `http://localhost:19006`

**Alternative Mobile Setup:**
- For device testing: `npx expo start` then scan QR code with Expo Go app
- For iOS Simulator: Press `i` after `npx expo start`
- For Android Emulator: Press `a` after `npx expo start`

### API Endpoints Available
- Health check: `GET http://localhost:3000/health`
- Get items: `GET http://localhost:3000/api/items?page=1&limit=10`
- Search items: `GET http://localhost:3000/api/items/search?q=streetfighter`

## Troubleshooting

**Backend not starting?**
```bash
cd backend
npm run build  # Compile TypeScript first
node dist/server.js  # Run compiled JavaScript
```

**Mobile app file watcher issues on macOS?**
```bash
cd mobile
npx expo start --web  # Use web version (works reliably)
```

**API calls failing?**
- Ensure backend is running on port 3000
- Check `mobile/src/services/api.ts` for correct API_BASE_URL

## Running Tests

### Backend Tests
```bash
cd backend
npm test
```

Expected output: 8 tests passing covering all API endpoints

### Mobile Tests
```bash
cd mobile
npm test
```

Expected output: 7 tests passing for types and constants validation

**Test Coverage:**
- Backend: API endpoints, pagination, search functionality
- Mobile: TypeScript interfaces, color constants, data validation

## Demo & Testing Features

**Core Features to Test:**

1. **Item Feed**: View Street Fighter themed items on the main screen
2. **Real-time Search**: Type "hadoken", "ryu", or "chun-li" in search bar
3. **Pagination**: Click "Load More" button at bottom of feed
4. **Navigation**: Switch between "Feed" and "Account" tabs
5. **Pull-to-refresh**: Pull down on feed to refresh items
6. **Account Screen**: View Ryu's profile with Book of Five Rings references
7. **Unit Tests**: Run `npm test` in both backend and mobile directories

**Technical Features Demonstrated:**
- TypeScript throughout both frontend and backend
- Comprehensive unit test coverage
- Responsive design with modern UI
- Error handling and loading states
- Debounced search (300ms delay)
- RESTful API with pagination
- Component-based architecture

## Technical Decisions

### Backend Architecture

**Framework Choice: Express.js with TypeScript**
- Express.js provides a minimal, flexible web framework for RESTful APIs
- TypeScript adds type safety and better developer experience
- Clean separation of concerns with dedicated folders for types, data, and services

**API Design**
- RESTful endpoints following conventional patterns
- Pagination support for scalability  
- Error handling with appropriate HTTP status codes
- CORS enabled for cross-origin requests from mobile client

**Data Layer**
- In-memory mock data for simplicity (no database required)
- Structured item objects with id, text, category, and timestamp
- Simple text-based search implementation across text and category fields

### Mobile Client Architecture

**Framework Choice: React Native with Expo**
- Expo provides rapid development setup and developer experience
- React Native enables code sharing between iOS and Android
- TypeScript throughout for type safety and maintainability

**State Management**
- useReducer for complex state management in feed screen
- Custom hooks pattern (useFeedData) for API calls with loading/error states
- Debounced search to minimize API calls

**Component Architecture**
- Functional components with TypeScript interfaces
- Reusable components (ItemCard, SearchBar)
- Clean separation between UI components and business logic
- Centralized color constants for consistent theming

**Navigation**
- React Navigation with bottom tab navigator
- Simple two-screen structure (Feed and Account)
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

**Current Implementation:**
- Basic "Load More" button with page-based pagination
- Simple hasMore flag to control button visibility

**Production Implementation:**
- Replace "Load More" with true infinite scroll using onEndReached
- Implement pull-to-refresh functionality (already added)
- Add skeleton loading states
- Cache management for offline support

### Real-world Search Indexing

**Current Implementation:**
- Simple string matching on text and category fields
- In-memory filtering with debounced input

**Production Implementation:**
- Elasticsearch or Algolia for advanced search capabilities
- Full-text search with relevance scoring
- Search result highlighting
- Auto-complete and suggestions
- Search analytics and optimization

### Complete User Authentication Flow

**Architecture Overview:**
- JWT-based authentication with refresh tokens
- OAuth integration (Google, Apple, GitHub)
- Role-based access control
- Multi-factor authentication

**Mobile Client Authentication:**
- Secure storage for tokens using device keychain
- Biometric authentication support
- Authentication state management with React Context

**Security Considerations:**
- Secure token storage using device keychain
- Session management with automatic token refresh
- Rate limiting and abuse protection
- Data encryption at rest and in transit

### Database & Infrastructure

**Production Database:**
- PostgreSQL with proper indexing for performance
- User table with email authentication
- Items table with user relationships
- Full-text search indexes for efficient queries

**Caching Strategy:**
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
- Automated testing (unit, integration, e2e)
- Code quality checks (ESLint, Prettier)
- Security scanning
- Docker image building
- Deployment to staging and production environments

### Mobile Pipeline
- Automated testing and linting
- Building preview and production versions using Expo EAS
- Submission to app stores (iOS App Store and Google Play)
- Automated distribution for internal testing

### Pipeline Features

**Quality Gates:**
- Automated testing (unit, integration, e2e)
- Code quality checks (ESLint, Prettier)
- Security scanning
- Performance monitoring integration

**Deployment Strategy:**
- Staging environment for preview builds
- Blue-green deployment for zero downtime
- Automatic rollback on deployment failures
- Environment-specific configuration management

**Monitoring & Alerting:**
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

**Backend API**
- Items endpoint with pagination support (`/api/items`)
- Search endpoint with query parameter (`/api/items/search`)
- Error handling and CORS configuration
- TypeScript throughout
- Health check endpoint (`/health`)
- Complete unit test coverage (8 tests)

**Mobile Client**
- Feed screen with search functionality
- Account screen with Street Fighter theme
- Bottom tab navigation
- Real-time search with debouncing
- Load more button (infinite scroll placeholder)
- Loading states and error handling
- Pull-to-refresh functionality
- Unit tests for types and constants (7 tests)

**Modern Development Practices**
- TypeScript for type safety
- Comprehensive unit testing with Jest
- Component-based architecture with custom hooks
- Responsive design principles
- Centralized color constants
- Clean code separation and documentation

**Architecture Highlights**
- useReducer for complex state management
- Custom hooks for API logic extraction
- Reusable components with consistent styling
- Error boundary handling
- Performance optimized with proper memoization
- Test-driven development approach

**Testing Strategy**
- Backend: API endpoint testing with supertest
- Mobile: TypeScript interface and constants validation
- Fast test execution (under 2 seconds each)
- Easy setup with minimal dependencies

This implementation demonstrates production-ready development practices and provides a solid foundation for scalability. 