# FurForce Cursor - Logistics Management App

A modern React Native mobile application built with Expo Router for managing shipments and logistics operations.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- Yarn or npm
- Expo Go app (for physical device testing) or iOS Simulator / Android Emulator

### Installation

```bash
# Install dependencies
yarn install

# Start the development server
yarn start
```

### Running on Devices

```bash
# iOS Simulator
yarn ios

# Android Emulator
yarn android

# Web Browser
yarn web
```

## 📱 Features

- ✅ **Splash Screen** with animated logo and login button
- ✅ **Login Authentication** with form validation
- ✅ **Shipment Management** with search and filtering
- ✅ **Bottom Sheet Filter Modal** for status filtering
- ✅ **Tab Navigation** (Shipments, Scan, Wallet, Profile)
- ✅ **Dark/Light Theme** support
- ✅ **Real-time Search** across shipments
- ✅ **Multi-select Filters** by shipment status

## 🔐 Test Credentials

```
URL: https://www.brandimic.com
Email: ali@brandimic.com
Password: password123
```

Or use the "Use Test Credentials" button on the login screen.

## 📁 Project Structure

```
app/                    # Expo Router screens
components/             # Reusable UI components
services/               # API layer and business logic
hooks/                  # Custom React hooks
constants/              # App constants and theme
assets/                 # Images and static files
```

## 🏗️ Architecture

The app follows a **component-based architecture** with:
- File-based routing (Expo Router)
- Separation of concerns
- TypeScript for type safety
- Mock API layer for development

For detailed architecture documentation, see [ARCHITECTURE.md](./ARCHITECTURE.md)

## 🎨 Design

The app implements a clean, modern UI matching the provided design specifications:
- Dark blue splash screen (#1A237E)
- White login modal
- Shipment cards with status badges
- Bottom sheet filter modal
- Consistent color scheme throughout

## 📦 Shipment Statuses

- **RECEIVED** - Blue badge
- **PUTAWAY** - Orange badge
- **DELIVERED** - Green badge
- **CANCELED** - Gray badge
- **REJECTED** - Red badge
- **LOST** - Orange badge
- **ON HOLD** - Yellow badge

## 🛠️ Development

### Code Linting
```bash
yarn lint
```

### Type Checking
```bash
npx tsc --noEmit
```

## 📚 Documentation

- [Architecture Documentation](./ARCHITECTURE.md) - Detailed architecture and design decisions
- [API Documentation](./ARCHITECTURE.md#api-layer) - API structure and data models

## 🔄 Navigation Flow

```
Splash Screen → Login → Home (Shipments) → Filter Modal
                ↓
            Tab Navigation
                ├── Shipments
                ├── Scan
                ├── Wallet
                └── Profile
```

## 🎯 Key Components

- **SplashScreen**: Initial loading screen with login button
- **LoginScreen**: Authentication form with validation
- **HomeScreen**: Main shipments dashboard with search and filters
- **FilterModal**: Bottom sheet for filtering shipments by status

## 📝 Notes

- The app uses a mock API layer for development
- Authentication is session-based (no persistent storage)
- All shipment data is simulated for demo purposes

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler errors**: Clear cache with `yarn start --clear`
2. **Navigation issues**: Check route names match file names
3. **Style issues**: Verify theme color scheme detection

## 📄 License

Private and proprietary.

---

**Version**: 1.0.0  
**Built with**: React Native + Expo Router + TypeScript
