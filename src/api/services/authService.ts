import apiClient from '../config/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  token_type: string;
  expires_in: number;
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  };
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status_code: number;
}

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
      
      // Guardar tokens en AsyncStorage
      await AsyncStorage.multiSet([
        ['auth_token', response.data.token],
        ['refresh_token', response.data.refreshToken],
        ['user_data', JSON.stringify(response.data.user)],
      ]);
      
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw {
          message: error.response.data.message || 'Login failed',
          errors: error.response.data.errors,
          status_code: error.response.status,
        } as ApiError;
      }
      throw {
        message: 'Network error. Please check your connection.',
        status_code: 0,
      } as ApiError;
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      // Continuar con el logout local aunque falle la API
    } finally {
      await AsyncStorage.multiRemove(['auth_token', 'refresh_token', 'user_data']);
    }
  }

  async refreshToken(): Promise<string> {
    const refreshToken = await AsyncStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post<{ access_token: string }>('/auth/refresh', {
      refresh_token: refreshToken,
    });

    await AsyncStorage.setItem('auth_token', response.data.access_token);
    return response.data.access_token;
  }
}

export const authService = new AuthService();
