import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearError, directLogin, logout } from '@/store/slices/authSlice';
import { router } from 'expo-router';

export const useAuthViewModel = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector(
    (state) => state.auth
  );

  const handleLogin = async (url: string, email: string, password: string) => {
    // Skip API call - directly authenticate
    dispatch(directLogin({ email }));
    router.replace('/(tabs)');
    return { success: true };
  };

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/login');
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    handleLogin,
    handleLogout,
    clearAuthError,
  };
};

