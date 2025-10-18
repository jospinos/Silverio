import apiClient from '../config/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  ForgotPasswordRequest,
  VerifyOTPRequest,
  ChangePasswordRequest,
  User,
} from '../types/auth.types';

class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      
      // Guardar datos de autenticación en AsyncStorage
      if (response.data.success) {
        await this.saveAuthData(response.data.data);
      }
      
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', userData);
      
      if (response.data.success) {
        await this.saveAuthData(response.data.data);
      }
      
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async forgotPassword(email: ForgotPasswordRequest): Promise<{ success: boolean; message: string }> {
    try {
      const response = await apiClient.post('/auth/forgot-password', email);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async verifyOTP(otpData: VerifyOTPRequest): Promise<{ success: boolean; message: string }> {
    try {
      const response = await apiClient.post('/auth/verify-otp', otpData);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async changePassword(passwordData: ChangePasswordRequest): Promise<{ success: boolean; message: string }> {
    try {
      const response = await apiClient.post('/auth/change-password', passwordData);
      return response.data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      // Continuar con logout local incluso si falla el servidor
      console.warn('Error during server logout:', error);
    } finally {
      await this.clearAuthData();
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem('user_data');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      return !!token;
    } catch (error) {
      return false;
    }
  }

  private async saveAuthData(authData: AuthResponse['data']): Promise<void> {
    try {
      await AsyncStorage.multiSet([
        ['auth_token', authData.token],
        ['refresh_token', authData.refreshToken],
        ['user_data', JSON.stringify(authData.user)],
        ['token_expires_at', (Date.now() + authData.expiresIn * 1000).toString()],
      ]);
    } catch (error) {
      console.error('Error saving auth data:', error);
      throw new Error('Failed to save authentication data');
    }
  }

  private async clearAuthData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        'auth_token',
        'refresh_token',
        'user_data',
        'token_expires_at',
      ]);
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  }

  private handleError(error: any): Error {
    if (error.response?.data?.error) {
      const apiError = error.response.data.error;
      return new Error(apiError.message || 'An error occurred');
    }
    
    if (error.message) {
      return new Error(error.message);
    }
    
    return new Error('Network error occurred');
  }
}

export const authService = new AuthService();
export default authService;
