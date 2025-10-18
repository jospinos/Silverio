import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@presentation/navigation/RootStackParamList';
import { authService, ApiError } from '@api/services/authService';

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export interface UseLoginReturn {
  // Form state
  formData: LoginFormData;
  errors: LoginFormErrors;
  isLoading: boolean;
  
  // Form handlers
  updateField: (field: keyof LoginFormData, value: string) => void;
  handleLogin: () => Promise<void>;
  clearErrors: () => void;
  
  // UI state
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  
  // Focus state
  inputFocus: {
    email: boolean;
    password: boolean;
  };
  setInputFocus: (field: 'email' | 'password', focused: boolean) => void;
}

export const useLogin = (): UseLoginReturn => {
  const navigation = useNavigation<LoginNavigationProp>();
  
  // Form state
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  
  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [inputFocus, setInputFocusState] = useState({
    email: false,
    password: false,
  });

  // Form handlers
  const updateField = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (): Promise<void> => {
    try {
      if (!validateForm()) {
        return;
      }

      setIsLoading(true);
      setErrors({});

      // Llamada a la API de login
      const result = await authService.login({
        email: formData.email.trim(),
        password: formData.password,
      });
      
      // Navigate to home on success
      navigation.navigate('DrawerNavigation', { screen: 'Home' });
      
    } catch (error: any) {
      const apiError = error as ApiError;
      
      if (apiError.errors) {
        // Manejar errores de validación específicos del servidor
        const newErrors: LoginFormErrors = {};
        
        if (apiError.errors.email) {
          newErrors.email = apiError.errors.email[0];
        }
        if (apiError.errors.password) {
          newErrors.password = apiError.errors.password[0];
        }
        
        // Si hay errores específicos, usarlos; sino, usar mensaje general
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
        } else {
          setErrors({ general: apiError.message });
        }
      } else {
        // Manejar errores generales
        let errorMessage = 'Login failed. Please try again.';
        
        if (apiError.status_code === 401) {
          errorMessage = 'Invalid email or password.';
        } else if (apiError.status_code === 422) {
          errorMessage = 'Please check your input and try again.';
        } else if (apiError.status_code === 0) {
          errorMessage = 'Network error. Please check your connection.';
        } else if (apiError.message) {
          errorMessage = apiError.message;
        }
        
        setErrors({ general: errorMessage });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearErrors = () => {
    setErrors({});
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const setInputFocus = (field: 'email' | 'password', focused: boolean) => {
    setInputFocusState(prev => ({ ...prev, [field]: focused }));
  };

  // Reset loading state when component focuses
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsLoading(false);
    });
    return unsubscribe;
  }, [navigation]);

  return {
    // Form state
    formData,
    errors,
    isLoading,
    
    // Form handlers
    updateField,
    handleLogin,
    clearErrors,
    
    // UI state
    showPassword,
    togglePasswordVisibility,
    
    // Focus state
    inputFocus,
    setInputFocus,
  };
};