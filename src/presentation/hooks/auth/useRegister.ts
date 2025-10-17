import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@presentation/navigation/RootStackParamList';

type RegisterNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

export interface RegisterFormErrors {
  username?: string;
  email?: string;
  password?: string;
  general?: string;
}

export interface UseRegisterReturn {
  // Form state
  formData: RegisterFormData;
  errors: RegisterFormErrors;
  isLoading: boolean;
  
  // Form handlers
  updateField: (field: keyof RegisterFormData, value: string) => void;
  handleRegister: () => Promise<void>;
  clearErrors: () => void;
  
  // UI state
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  
  // Focus state
  inputFocus: {
    username: boolean;
    email: boolean;
    password: boolean;
  };
  setInputFocus: (field: 'username' | 'email' | 'password', focused: boolean) => void;
}

export const useRegister = (): UseRegisterReturn => {
  const navigation = useNavigation<RegisterNavigationProp>();
  
  // Form state
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  
  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [inputFocus, setInputFocusState] = useState({
    username: false,
    email: false,
    password: false,
  });

  // Form handlers
  const updateField = (field: keyof RegisterFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: RegisterFormErrors = {};
    
    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase, lowercase, and number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (): Promise<void> => {
    try {
      if (!validateForm()) {
        return;
      }

      setIsLoading(true);
      setErrors({});

      // TODO: Aquí irá la llamada a la API de registro
      // const result = await registerUser(formData);
      
      // Simulación temporal
      await new Promise<void>(resolve => setTimeout(() => resolve(), 2000));
      
      // Navigate to login on success
      navigation.navigate('Login');
      
    } catch (error: any) {
      setErrors({ 
        general: error.message || 'Registration failed. Please try again.' 
      });
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

  const setInputFocus = (field: 'username' | 'email' | 'password', focused: boolean) => {
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
    handleRegister,
    clearErrors,
    
    // UI state
    showPassword,
    togglePasswordVisibility,
    
    // Focus state
    inputFocus,
    setInputFocus,
  };
};