# Developer Guide - Quick Reference

## 🚀 Getting Started

### First Time Setup
```bash
# Clone repository
git clone <repository-url>
cd furfoce_cursor

# Install dependencies
yarn install

# Start development server
yarn start
```

### Running on Devices
- **iOS**: Press `i` in terminal or `yarn ios`
- **Android**: Press `a` in terminal or `yarn android`
- **Web**: Press `w` in terminal or `yarn web`

---

## 📂 File Structure Quick Reference

### Core Files
- `app/_layout.tsx` - Root navigation and splash screen logic
- `app/login.tsx` - Login screen with validation
- `app/(tabs)/index.tsx` - Home/Shipments screen (main screen)
- `services/api.ts` - Mock API layer

### Components
- `components/splash-screen.tsx` - Splash screen component
- `components/themed-text.tsx` - Themed text wrapper
- `components/themed-view.tsx` - Themed view wrapper
- `components/haptic-tab.tsx` - Tab with haptic feedback

### Configuration
- `app.json` - Expo configuration
- `tsconfig.json` - TypeScript configuration
- `constants/theme.ts` - Theme colors and constants

---

## 🔧 Common Tasks

### Adding a New Screen
1. Create file in `app/` directory
2. Export default component
3. Add route in `app/_layout.tsx` if needed

### Adding a New Component
1. Create file in `components/` directory
2. Use TypeScript interfaces for props
3. Follow existing component patterns

### Modifying API
1. Edit `services/api.ts`
2. Update TypeScript interfaces
3. Add mock data as needed

### Changing Colors/Themes
1. Edit `constants/theme.ts`
2. Update color values
3. Components will auto-update

---

## 🎨 Component Patterns

### Standard Component Structure
```typescript
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

interface Props {
  // Define props here
}

export default function ComponentName({ ...props }: Props) {
  const [state, setState] = useState();
  
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Content</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

### Using Icons
```typescript
import { IconSymbol } from '@/components/ui/icon-symbol';

<IconSymbol name="house.fill" size={24} color="#000" />
```

### Themed Components
```typescript
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Automatically adapts to light/dark mode
<ThemedView>
  <ThemedText type="title">Title</ThemedText>
</ThemedView>
```

---

## 🔐 Authentication Flow

### Login Process
1. User clicks "Login" on splash screen
2. Login modal appears
3. User enters credentials
4. Validation runs client-side
5. API call to `authAPI.login()`
6. Navigate to `/(tabs)` on success

### Test Credentials
```typescript
URL: 'https://www.brandimic.com'
Email: 'ali@brandimic.com'
Password: 'password123'
```

---

## 📊 Data Models

### Shipment Object
```typescript
{
  id: string;
  trackingNumber: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'cancelled' | 'rejected' | 'lost' | 'on-hold';
  origin: string;
  destination: string;
  carrier: string;
  estimatedDelivery: string;
  // ... more fields
}
```

### Status Mapping
- `pending` → `RECEIVED` (Blue)
- `in-transit` → `PUTAWAY` (Orange)
- `delivered` → `DELIVERED` (Green)
- `cancelled` → `CANCELED` (Gray)
- `rejected` → `REJECTED` (Red)
- `lost` → `LOST` (Orange)
- `on-hold` → `ON HOLD` (Yellow)

---

## 🎯 Key Features Implementation

### Search Functionality
- Real-time filtering as user types
- Searches: tracking number, origin, destination, carrier
- Combined with status filters

### Filter Modal
- Bottom sheet animation
- Multi-select status filters
- Apply/Cancel actions
- Updates shipment list in real-time

### Selection Management
- Individual checkbox selection
- "Mark All" functionality
- State managed with `Set<string>`

---

## 🐛 Debugging Tips

### Check Navigation
```typescript
// In component
import { router } from 'expo-router';
console.log('Current route:', router);
```

### Check State
```typescript
// Add console.log in useEffect
useEffect(() => {
  console.log('State updated:', state);
}, [state]);
```

### Check API Calls
```typescript
// In services/api.ts
console.log('API called with:', params);
```

### Clear Cache
```bash
yarn start --clear
```

---

## 📝 Code Style Guidelines

### Naming Conventions
- **Components**: PascalCase (`HomeScreen`)
- **Files**: Match component name
- **Functions**: camelCase (`handleLogin`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_ITEMS`)

### TypeScript
- Always define interfaces for props
- Use type unions for status values
- Avoid `any` type

### Styling
- Use StyleSheet.create()
- Group related styles
- Use theme colors from constants

---

## 🔄 State Management Patterns

### Local State
```typescript
const [value, setValue] = useState<Type>(initialValue);
```

### Multiple Selections
```typescript
const [selected, setSelected] = useState<Set<string>>(new Set());

// Toggle selection
const toggle = (id: string) => {
  setSelected(prev => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  });
};
```

### API State
```typescript
const [data, setData] = useState<Type[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

---

## 🎨 Styling Tips

### Responsive Design
```typescript
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
```

### Status Badge Colors
```typescript
const getStatusColor = (status: string) => {
  const colors = {
    'RECEIVED': '#2196F3',
    'DELIVERED': '#4CAF50',
    // ... more
  };
  return colors[status] || '#9E9E9E';
};
```

### Themed Colors
```typescript
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const colorScheme = useColorScheme();
const colors = Colors[colorScheme ?? 'light'];
```

---

## 🚨 Common Issues & Solutions

### Issue: Navigation not working
**Solution**: Check route names match file names exactly

### Issue: Styles not applying
**Solution**: Verify StyleSheet.create() usage and theme colors

### Issue: Filter modal not showing
**Solution**: Check `showFilters` state and Modal component setup

### Issue: API calls not working
**Solution**: Verify mock API delay and response format

### Issue: TypeScript errors
**Solution**: Run `npx tsc --noEmit` to check types

---

## 📚 Useful Resources

- [Expo Router Docs](https://docs.expo.dev/router/introduction/)
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🔍 Quick Commands Reference

```bash
# Development
yarn start              # Start dev server
yarn ios                # Run on iOS
yarn android            # Run on Android
yarn web                # Run on web

# Code Quality
yarn lint               # Run linter
npx tsc --noEmit        # Type check

# Cache
yarn start --clear      # Clear Metro cache
```

---

## 📞 Need Help?

1. Check [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed docs
2. Review existing code patterns
3. Check component examples in codebase

---

**Last Updated**: December 2024

