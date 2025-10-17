// Auth service interfaces and types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ChangePasswordRequest {
  newPassword: string;
  confirmPassword: string;
  token?: string; // Para reset password con token
  currentPassword?: string; // Para cambio de password estando logueado
}

export interface OtpRequest {
  code: string;
  email?: string;
  phone?: string;
  type: 'email' | 'phone' | 'forgotPassword';
}

export interface ResendOtpRequest {
  email?: string;
  phone?: string;
  type: 'email' | 'phone' | 'forgotPassword';
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  };
  token: string;
  refreshToken: string;
}

export interface RegisterResponse {
  user: {
    id: string;
    username: string;
    email: string;
    name: string;
    avatar?: string;
  };
  token: string;
  refreshToken: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  email: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export interface OtpResponse {
  success: boolean;
  message: string;
  nextStep?: 'changePassword' | 'login' | 'verified';
}

export interface AuthError {
  message: string;
  code?: string;
  field?: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: AuthError;
}

// User entity
export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}