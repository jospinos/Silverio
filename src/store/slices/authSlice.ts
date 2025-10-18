import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authService, LoginRequest, LoginResponse, ApiError } from '@api/services/authService';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  tokens: {
    access_token: string | null;
    refresh_token: string | null;
    expires_in: number | null;
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  tokens: {
    access_token: null,
    refresh_token: null,
    expires_in: null,
  },
  isLoading: false,
  error: null,
};

// Async thunk para login
export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: ApiError }
>(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      return response;
    } catch (error: any) {
      return rejectWithValue(error as ApiError);
    }
  }
);

// Async thunk para logout
export const logoutUser = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error: any) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      const { access_token, refresh_token, expires_in, user } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      state.tokens = {
        access_token,
        refresh_token,
        expires_in,
      };
      state.error = null;
      state.isLoading = false;
    },
    clearCredentials: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.tokens = {
        access_token: null,
        refresh_token: null,
        expires_in: null,
      };
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.tokens = {
          access_token: action.payload.access_token,
          refresh_token: action.payload.refresh_token,
          expires_in: action.payload.expires_in,
        };
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.tokens = {
          access_token: null,
          refresh_token: null,
          expires_in: null,
        };
        state.error = action.payload?.message || 'Login failed';
      })
      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.tokens = {
          access_token: null,
          refresh_token: null,
          expires_in: null,
        };
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Logout failed';
      });
  },
});

export const { clearError, setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
