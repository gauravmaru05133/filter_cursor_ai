import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// Mock API call for login
const mockLoginAPI = async (url: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const validCredentials = [
    { url: 'https://www.brandimic.com', email: 'ali@brandimic.com', password: 'password123' },
    { url: 'https://www.brandimic.com', email: 'test@example.com', password: 'password123' },
  ];

  const isValid = validCredentials.some(
    cred => cred.url === url && cred.email === email && cred.password === password
  );

  if (isValid) {
    return { success: true, message: 'Login successful!' };
  } else {
    return { success: false, message: 'Invalid credentials' };
  }
};

export default function LoginScreen() {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = url.trim() !== '' && email.trim() !== '' && password.trim() !== '';

  const handleLogin = async () => {
    if (!isFormValid) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const result = await mockLoginAPI(url, email, password);
      if (result.success) {
        router.replace('/(tabs)');
      } else {
        Alert.alert('Login Failed', result.message);
      }
    } catch {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const fillTestCredentials = () => {
    setUrl('https://www.brandimic.com');
    setEmail('ali@brandimic.com');
    setPassword('password123');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ThemedView style={styles.content}>
        {/* Cancel Button */}
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <ThemedText style={styles.cancelText}>&lt; Cancel</ThemedText>
        </TouchableOpacity>

        {/* Title */}
        <ThemedText style={styles.title}>Login</ThemedText>

        {/* Description */}
        <ThemedText style={styles.description}>
          Please enter your First, Last name and your phone number in order to register
        </ThemedText>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* URL Input */}
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              value={url}
              onChangeText={setUrl}
              placeholder="URL"
              placeholderTextColor="#999"
              keyboardType="url"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Username / Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={[
            styles.loginButton,
            isFormValid ? styles.loginButtonActive : styles.loginButtonInactive,
            isLoading && styles.loginButtonLoading
          ]}
          onPress={handleLogin}
          disabled={!isFormValid || isLoading}
        >
          <ThemedText style={[
            styles.loginButtonText,
            isFormValid ? styles.loginButtonTextActive : styles.loginButtonTextInactive
          ]}>
            {isLoading ? 'Logging in...' : 'Login'}
          </ThemedText>
        </TouchableOpacity>

        {/* Test Credentials Helper */}
        <TouchableOpacity style={styles.testButton} onPress={fillTestCredentials}>
          <ThemedText style={styles.testButtonText}>
            Use Test Credentials
          </ThemedText>
        </TouchableOpacity>

        {/* Credentials Info */}
        <View style={styles.credentialsInfo}>
          <ThemedText style={styles.credentialsText}>
            Test Credentials:{'\n'}
            URL: https://www.brandimic.com{'\n'}
            Email: ali@brandimic.com{'\n'}
            Password: password123
          </ThemedText>
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  cancelButton: {
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  cancelText: {
    fontSize: 16,
    color: '#007AFF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 32,
    lineHeight: 22,
  },
  formContainer: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  loginButton: {
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  loginButtonActive: {
    backgroundColor: '#1A237E',
  },
  loginButtonInactive: {
    backgroundColor: '#E0E0E0',
  },
  loginButtonLoading: {
    opacity: 0.6,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  loginButtonTextActive: {
    color: '#FFFFFF',
  },
  loginButtonTextInactive: {
    color: '#999999',
  },
  testButton: {
    marginTop: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  testButtonText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  credentialsInfo: {
    marginTop: 24,
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  credentialsText: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 18,
    textAlign: 'center',
  },
});