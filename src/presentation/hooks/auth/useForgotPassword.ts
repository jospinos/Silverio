import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@presentation/navigation/RootStackParamList';

type ForgotPasswordNavigationProp = StackNavigationProp<RootStackParamList, 'Forgot'>;

export interface ForgotPasswordFormData {
  email: string;
}

export interface ForgotPasswordFormErrors {
  email?: string;
  general?: string;
}

export interface UseForgotPasswordReturn {
  // Form state
  formData: ForgotPasswordFormData;
  errors: ForgotPasswordFormErrors;
  isLoading: boolean;
  
  // Form handlers
  updateField: (field: keyof ForgotPasswordFormData, value: string) => void;
  handleSendCode: () => Promise<void>;
  clearErrors: () => void;
  
  // UI state
  inputFocus: {
    email: boolean;
  };
  setInputFocus: (field: 'email', focused: boolean) => void;
}

export const useForgotPassword = (): UseForgotPasswordReturn => {
  const navigation = useNavigation<ForgotPasswordNavigationProp>();
  
  // Form state
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: '',
  });
  
  const [errors, setErrors] = useState<ForgotPasswordFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  
  // UI state
  const [inputFocus, setInputFocusState] = useState({
    email: false,
  });

  // Form handlers
  const updateField = (field: keyof ForgotPasswordFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ForgotPasswordFormErrors = {};
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendCode = async (): Promise<void> => {
    try {
      if (!validateForm()) {
        return;
      }

      setIsLoading(true);
      setErrors({});

      // TODO: Aquí irá la llamada a la API de forgot password
      // const result = await sendPasswordResetCode({
      //   email: formData.email
      // });
      
      // Simulación temporal
      await new Promise<void>(resolve => setTimeout(() => resolve(), 2000));
      
      // Navigate to OTP screen
      navigation.navigate('Otp');
      
    } catch (error: any) {
      setErrors({ 
        general: error.message || 'Failed to send reset code. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearErrors = () => {
    setErrors({});
  };

  const setInputFocus = (field: 'email', focused: boolean) => {
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
    handleSendCode,
    clearErrors,
    
    // Focus state
    inputFocus,
    setInputFocus,
  };
};