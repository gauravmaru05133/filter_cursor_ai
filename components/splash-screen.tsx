import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './themed-text';

interface SplashScreenProps {
  onLoginPress?: () => void;
}

export function SplashScreen({
  onLoginPress
}: SplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <ThemedText style={styles.logoIconText}>S</ThemedText>
          </View>
          <ThemedText style={styles.appName}>
            SHIPPEX
          </ThemedText>
        </View>
      </Animated.View>

      {/* Login Button */}
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <TouchableOpacity style={styles.loginButton} onPress={onLoginPress}>
          <ThemedText style={styles.loginButtonText}>Login</ThemedText>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A237E', // Dark blue background
    paddingBottom: 60,
    paddingTop: 60,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIconText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A237E',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  loginButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
  },
  loginButtonText: {
    color: '#1A237E',
    fontSize: 16,
    fontWeight: '600',
  },
});
