import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    directLogin: (state, action: PayloadAction<{ email: string }>) => {
      // Skip API call and directly authenticate
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = {
        id: '1',
        email: action.payload.email,
        name: action.payload.email.split('@')[0],
        role: 'user',
      };
      state.error = null;
    },
  },
});

export const { logout, clearError, directLogin } = authSlice.actions;
export default authSlice.reducer;

