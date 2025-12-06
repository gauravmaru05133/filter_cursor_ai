import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Provider } from "react-redux";

import { store } from "@/src/store";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export const unstable_settings = {
  initialRouteName: "index",
};

function AppContent() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />

        <Stack.Screen
          name="login"
          options={{
            gestureEnabled: false,
            presentation: "modal",
          }}
        />

        <Stack.Screen name="(tabs)"
        options={{
          gestureEnabled: false,
          presentation: "fullScreenModal",
        }}
        />
        {/* <Stack.Screen name="index" />
      
        <Stack.Screen name="(tabs)" /> */}
      </Stack>
      <StatusBar style="auto" />
    </View>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  );
}
