# FurForce Cursor - Architecture Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture Overview](#architecture-overview)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Application Flow](#application-flow)
6. [Component Architecture](#component-architecture)
7. [State Management](#state-management)
8. [API Layer](#api-layer)
9. [Navigation Structure](#navigation-structure)
10. [Styling & Theming](#styling--theming)
11. [Authentication Flow](#authentication-flow)
12. [Features](#features)
13. [Setup & Development](#setup--development)

---

## Project Overview

**FurForce Cursor** is a React Native mobile application built with Expo Router for logistics and shipment management. The app provides a comprehensive interface for tracking shipments, filtering by status, and managing logistics operations.

### Key Features
- User authentication with validation
- Shipment tracking and management
- Advanced search and filtering
- Bottom sheet filter modal
- Tab-based navigation
- Dark/Light theme support

---

## Architecture Overview

### Architecture Pattern
The application follows **MVVM (Model-View-ViewModel) Architecture** with:
- **File-based routing** (Expo Router)
- **Redux Toolkit** for centralized state management
- **ViewModels** to connect Views with Models
- **Separation of concerns** (Components, Services, ViewModels, Store)
- **Mock API layer** for development

### MVVM Structure
- **Model**: Data structures and business logic (`services/api.ts`)
- **View**: UI components (`app/`, `components/`)
- **ViewModel**: Presentation logic connecting View to Model (`viewmodels/`)
- **Store**: Redux store for state management (`store/`)

### Design Principles
1. **MVVM Pattern**: Clear separation between View, ViewModel, and Model
2. **Redux Toolkit**: Centralized state management with Redux
3. **Type Safety**: Full TypeScript implementation
4. **Scalability**: Easy to extend with new features
5. **Testability**: ViewModels can be tested independently

---

## Technology Stack

### Core Technologies
- **React Native**: 0.81.5
- **React**: 19.1.0
- **Expo**: ~54.0.26
- **Expo Router**: ~6.0.16 (File-based routing)
- **TypeScript**: 5.9.2

### Key Libraries
- **@reduxjs/toolkit**: Redux Toolkit for state management
- **react-redux**: React bindings for Redux
- **@react-navigation/native**: Navigation framework
- **expo-image**: Image optimization
- **expo-splash-screen**: Splash screen management
- **react-native-reanimated**: Animations
- **react-native-gesture-handler**: Gesture handling

### Development Tools
- **ESLint**: Code linting
- **TypeScript**: Type checking
- **Expo CLI**: Development server

---

## Project Structure

```
furfoce_cursor/
├── app/                          # Expo Router app directory
│   ├── _layout.tsx              # Root layout with navigation
│   ├── login.tsx                # Login screen
│   └── (tabs)/                  # Tab navigation group
│       ├── _layout.tsx          # Tab layout configuration
│       ├── index.tsx            # Home/Shipments screen
│       ├── scan.tsx             # Scan tab screen
│       ├── wallet.tsx           # Wallet tab screen
│       └── profile.tsx          # Profile tab screen
│
├── components/                   # Reusable UI components
│   ├── splash-screen.tsx        # Splash screen component
│   ├── themed-text.tsx          # Themed text component
│   ├── themed-view.tsx          # Themed view component
│   ├── haptic-tab.tsx           # Haptic feedback tab
│   └── ui/
│       ├── icon-symbol.tsx       # Icon component
│       └── icon-symbol.ios.tsx   # iOS-specific icons
│
├── store/                        # Redux store
│   ├── index.ts                 # Store configuration
│   ├── hooks.ts                 # Typed Redux hooks
│   └── slices/                  # Redux slices
│       ├── authSlice.ts         # Authentication state
│       └── shipmentsSlice.ts    # Shipments state
│
├── viewmodels/                   # MVVM ViewModels
│   ├── AuthViewModel.ts         # Authentication ViewModel
│   └── ShipmentsViewModel.ts    # Shipments ViewModel
│
├── services/                     # Business logic & API
│   └── api.ts                   # Mock API layer
│
├── hooks/                        # Custom React hooks
│   ├── use-color-scheme.ts      # Color scheme detection
│   ├── use-color-scheme.web.ts  # Web color scheme
│   └── use-theme-color.ts       # Theme color hook
│
├── constants/                    # App constants
│   └── theme.ts                 # Theme configuration
│
├── assets/                       # Static assets
│   └── images/                  # Image files
│
├── app.json                      # Expo configuration
├── package.json                  # Dependencies
└── tsconfig.json                # TypeScript config
```

---

## Application Flow

### 1. App Launch Flow
```
Splash Screen → Login Button Click → Login Screen → Authentication → Home Screen
```

### 2. Authentication Flow
```
1. User sees splash screen with "Login" button
2. User clicks "Login" → Login modal appears
3. User enters credentials (URL, Email, Password)
4. Validation checks:
   - Email format validation
   - Required fields check
   - Password length validation
5. API call to mock authentication
6. On success → Navigate to Home (Tabs)
7. On failure → Show error alert
```

### 3. Home Screen Flow
```
Home Screen → Search/Filter → Filter Modal → Apply Filters → Filtered Results
```

---

## Component Architecture

### MVVM Component Structure

```
View (Component)
    ↓ uses
ViewModel (Hook)
    ↓ uses
Redux Store (Slices)
    ↓ uses
Model (API Service)
```

### Component Hierarchy

```
RootLayout (with Redux Provider)
├── SplashScreen (Initial)
└── Stack Navigator
    ├── LoginScreen (uses AuthViewModel)
    └── TabNavigator
        ├── HomeScreen (uses ShipmentsViewModel)
        ├── ScanScreen
        ├── WalletScreen
        └── ProfileScreen
```

### Component Details

#### 1. **SplashScreen** (`components/splash-screen.tsx`)
- **Purpose**: Initial app loading screen
- **Features**: 
  - Animated logo display
  - Login button trigger
- **Props**: `onLoginPress?: () => void`
- **Architecture**: Pure View component (no ViewModel needed)

#### 2. **LoginScreen** (`app/login.tsx`)
- **Purpose**: User authentication
- **ViewModel**: `useAuthViewModel()`
- **Features**:
  - Form validation (email, password, URL)
  - Test credentials helper
  - Loading states from Redux
- **State Flow**: 
  - Local state: `url`, `email`, `password` (form inputs)
  - Redux state: `isLoading`, `error` (from authSlice)
  - Actions: `handleLogin()` dispatches `loginUser` thunk

#### 3. **HomeScreen** (`app/(tabs)/index.tsx`)
- **Purpose**: Main shipments dashboard
- **ViewModel**: `useShipmentsViewModel()`
- **Features**:
  - Shipment list display
  - Search functionality
  - Filter bottom sheet modal
  - Mark all selection
- **State Flow**:
  - Redux state: `filteredShipments`, `searchQuery`, `selectedStatusFilters`, `markAll`
  - Local state: `showFilters` (UI-only state)
  - Actions: All handled through ViewModel methods

#### 4. **FilterModal** (Embedded in HomeScreen)
- **Purpose**: Filter shipments by status
- **Features**:
  - Bottom sheet animation
  - Multi-select status filters
  - Apply/Cancel actions

---

## State Management

### State Management Approach
The application uses **Redux Toolkit** for centralized state management:

#### Redux Store Structure
- **Auth Slice**: Authentication state (user, isAuthenticated, isLoading, error)
- **Shipments Slice**: Shipments state (shipments, filteredShipments, search, filters, selections)

#### State Flow (MVVM Pattern)
1. **View**: User interacts with UI component
2. **ViewModel**: Handles user action, dispatches Redux action
3. **Redux Slice**: Updates state based on action
4. **ViewModel**: Selects updated state from Redux store
5. **View**: Re-renders with new data from ViewModel

#### Example State Structure

```typescript
// Redux Store State
{
  auth: {
    user: User | null,
    isAuthenticated: boolean,
    isLoading: boolean,
    error: string | null
  },
  shipments: {
    shipments: Shipment[],
    filteredShipments: Shipment[],
    selectedShipments: string[],
    searchQuery: string,
    selectedStatusFilters: FilterStatus[],
    isLoading: boolean,
    error: string | null,
    markAll: boolean
  }
}
```

### ViewModel Pattern
ViewModels act as intermediaries between Views and Redux Store:

```typescript
// ViewModel Example
export const useShipmentsViewModel = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.shipments);
  
  return {
    // State
    shipments: state.shipments,
    // Actions
    handleSearch: (query) => dispatch(setSearchQuery(query)),
    // Helpers
    isShipmentSelected: (id) => state.selectedShipments.includes(id)
  };
};
```

---

## Redux Store Architecture

### Store Configuration (`store/index.ts`)
```typescript
export const store = configureStore({
  reducer: {
    auth: authReducer,
    shipments: shipmentsReducer,
  },
});
```

### Redux Slices

#### Auth Slice (`store/slices/authSlice.ts`)
- **State**: User authentication state
- **Actions**: `loginUser` (async thunk), `logout`, `clearError`
- **Reducers**: Handle pending/fulfilled/rejected states

#### Shipments Slice (`store/slices/shipmentsSlice.ts`)
- **State**: Shipments data and UI state
- **Actions**: 
  - `fetchShipments` (async thunk)
  - `setSearchQuery`
  - `toggleStatusFilter`
  - `toggleShipmentSelection`
  - `toggleMarkAll`
- **Selectors**: Computed filtered shipments

### Typed Hooks (`store/hooks.ts`)
```typescript
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## ViewModels

### AuthViewModel (`viewmodels/AuthViewModel.ts`)
- **Purpose**: Authentication logic and state management
- **Exposes**:
  - State: `user`, `isAuthenticated`, `isLoading`, `error`
  - Actions: `handleLogin()`, `handleLogout()`, `clearAuthError()`

### ShipmentsViewModel (`viewmodels/ShipmentsViewModel.ts`)
- **Purpose**: Shipments management logic
- **Exposes**:
  - State: `filteredShipments`, `searchQuery`, `selectedStatusFilters`, `markAll`, `isLoading`
  - Actions: `handleSearch()`, `handleToggleStatusFilter()`, `handleToggleShipmentSelection()`, etc.
  - Helpers: `isShipmentSelected()`, `getSelectedCount()`

## API Layer

### Mock API Structure (`services/api.ts`)

#### Authentication API
```typescript
authAPI.login(credentials: LoginRequest): Promise<LoginResponse>
```

**Valid Credentials:**
- URL: `https://www.brandimic.com`
- Email: `ali@brandimic.com` / `test@example.com`
- Password: `password123`

#### Shipments API
```typescript
shipmentsAPI.getShipments(
  page?: number,
  limit?: number,
  search?: string,
  filters?: SearchFilters
): Promise<ShipmentsResponse>
```

### Data Models

#### Shipment Interface
```typescript
interface Shipment {
  id: string;
  trackingNumber: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'cancelled' | 'rejected' | 'lost' | 'on-hold';
  origin: string;
  destination: string;
  carrier: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  weight: number;
  dimensions: { length: number; width: number; height: number };
  sender: { name: string; address: string };
  recipient: { name: string; address: string };
  items: Array<{ name: string; quantity: number; value: number }>;
  createdAt: string;
  updatedAt: string;
}
```

### Mock Data
- 10 sample shipments with various statuses
- Includes shipments from Cairo → Alexandria
- Multiple carriers (FedEx, UPS, DHL, USPS)

---

## Navigation Structure

### Navigation Stack

```
Root Stack
├── Splash Screen (Initial)
├── Login Screen (Modal)
└── Tabs Stack
    ├── Shipments Tab (index)
    ├── Scan Tab
    ├── Wallet Tab
    └── Profile Tab
```

### Navigation Configuration

#### Root Layout (`app/_layout.tsx`)
- Manages splash screen visibility
- Handles authentication flow
- Configures stack navigator

#### Tab Layout (`app/(tabs)/_layout.tsx`)
- Configures bottom tab navigation
- Sets tab icons and labels
- Applies haptic feedback

### Route Structure
- `/` → Splash Screen
- `/login` → Login Modal
- `/(tabs)` → Tab Navigator
  - `/(tabs)/` → Home/Shipments
  - `/(tabs)/scan` → Scan
  - `/(tabs)/wallet` → Wallet
  - `/(tabs)/profile` → Profile

---

## Styling & Theming

### Theme System
- **Light/Dark Mode**: Automatic detection via `useColorScheme`
- **Theme Colors**: Defined in `constants/theme.ts`
- **Themed Components**: `ThemedText`, `ThemedView`

### Color Scheme
```typescript
Colors = {
  light: {
    text: '#000000',
    background: '#FFFFFF',
    tint: '#007AFF',
    // ...
  },
  dark: {
    text: '#FFFFFF',
    background: '#000000',
    tint: '#0A84FF',
    // ...
  }
}
```

### Status Colors
- **RECEIVED**: `#2196F3` (Blue)
- **DELIVERED**: `#4CAF50` (Green)
- **CANCELED**: `#9E9E9E` (Gray)
- **REJECTED**: `#F44336` (Red)
- **LOST**: `#FF5722` (Orange)
- **ON HOLD**: `#FFC107` (Yellow)

---

## Authentication Flow

### Authentication State
- **No persistent storage**: Authentication state is session-based
- **Mock validation**: Uses hardcoded credentials
- **Navigation-based**: Success navigates to tabs

### Login Process
1. User enters URL, Email, Password
2. Client-side validation
3. API call to `authAPI.login()`
4. On success: `router.replace('/(tabs)')`
5. On failure: Show error alert

### Test Credentials
```
URL: https://www.brandimic.com
Email: ali@brandimic.com
Password: password123

OR

URL: https://www.brandimic.com
Email: test@example.com
Password: password123
```

---

## Features

### 1. Splash Screen
- Dark blue background (#1A237E)
- SHIPPEX logo with animation
- Login button at bottom
- Smooth fade-in animation

### 2. Login Screen
- Modal presentation
- Three input fields (URL, Email, Password)
- Real-time validation
- Test credentials helper
- Loading states

### 3. Home Screen (Shipments)
- Header with profile icon, logo, bell icon
- Personalized greeting
- Search bar with magnifying glass
- Filter and Add Scan buttons
- Shipment list with:
  - Checkboxes for selection
  - Package icons
  - AWB tracking numbers
  - Origin → Destination routes
  - Status badges
  - Expand arrows
- Mark All functionality

### 4. Filter Modal
- Bottom sheet animation
- Semi-transparent overlay
- Status filter options:
  - Received
  - Putaway
  - Delivered
  - Canceled
  - Rejected
  - Lost
  - On Hold
- Multi-select capability
- Apply/Cancel actions

### 5. Search Functionality
- Real-time search across:
  - Tracking numbers
  - Origin locations
  - Destination locations
  - Carrier names
- Combined with filter results

---

## Setup & Development

### Prerequisites
- Node.js (v18+)
- Yarn or npm
- Expo CLI
- iOS Simulator / Android Emulator / Physical device

### Installation

```bash
# Install dependencies
yarn install
# or
npm install
```

### Running the App

```bash
# Start Expo development server
yarn start
# or
npm start

# Run on iOS
yarn ios

# Run on Android
yarn android

# Run on Web
yarn web
```

### Development Commands

```bash
# Lint code
yarn lint

# Type check
npx tsc --noEmit
```

### Environment Setup
- No environment variables required
- All configuration in `app.json`
- Mock API in `services/api.ts`

---

## Code Organization Principles

### 1. File Naming
- **Components**: PascalCase (e.g., `SplashScreen.tsx`)
- **Utilities**: camelCase (e.g., `api.ts`)
- **Constants**: camelCase (e.g., `theme.ts`)

### 2. Component Structure
```typescript
// Imports
import React from 'react';
import { ... } from 'react-native';

// Types/Interfaces
interface Props { ... }

// Component
export default function Component({ ... }: Props) {
  // Hooks
  // State
  // Effects
  // Handlers
  // Render
}

// Styles
const styles = StyleSheet.create({ ... });
```

### 3. Type Safety
- All components typed with TypeScript
- Interfaces for all data models
- Type-safe API responses

---

## Future Enhancements

### Potential Improvements
1. **State Management**: Consider Context API or Zustand for global state
2. **Persistence**: Add AsyncStorage for authentication tokens
3. **Real API Integration**: Replace mock API with actual backend
4. **Error Handling**: Implement error boundaries
5. **Testing**: Add unit and integration tests
6. **Performance**: Implement React.memo for optimization
7. **Accessibility**: Add accessibility labels and hints
8. **Offline Support**: Implement offline data caching

---

## Troubleshooting

### Common Issues

1. **Navigation not working**
   - Check `app/_layout.tsx` configuration
   - Verify route names match file names

2. **Styles not applying**
   - Check theme color scheme
   - Verify StyleSheet usage

3. **API calls failing**
   - Check mock API delay simulation
   - Verify credentials format

4. **Filter modal not showing**
   - Check `showFilters` state
   - Verify Modal component setup

---

## Contributing

### Code Style
- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent naming conventions
- Add comments for complex logic

### Git Workflow
1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

---

## License

This project is private and proprietary.

---

## Contact & Support

For questions or issues, please contact the development team.

---

**Last Updated**: December 2024
**Version**: 1.0.0

