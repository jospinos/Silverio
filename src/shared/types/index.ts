import { TextStyle } from 'react-native';
import { User } from '../../core/domain/entities';

// Tipos globales compartidos
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface MediaUpload {
  uri: string;
  type: string;
  name: string;
}

// Estados de carga
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Tipos de navegación
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  PostDetail: { postId: string };
  UserProfile: { userId: string };
  Chat: { chatId: string };
  CreatePost: undefined;
  CreateStory: undefined;
  CreateReel: undefined;
  Settings: undefined;
};

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Reels: undefined;
  Profile: undefined;
  Notifications: undefined;
};

// Tipos de autenticación
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

// Tipos de tema
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    error: string;
    warning: string;
    success: string;
    text: {
      primary: string;
      secondary: string;
      disabled: string;
    };
    border: string;
  };
  typography: {
    h1: TextStyle;
    h2: TextStyle;
    h3: TextStyle;
    body1: TextStyle;
    body2: TextStyle;
    caption: TextStyle;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

// Tipos de error
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Re-exportar entidades del dominio
export * from '../../core/domain/entities';