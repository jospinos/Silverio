import { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@presentation/navigation/RootStackParamList';

type ChangePasswordNavigationProp = StackNavigationProp<RootStackParamList, 'ChangePassword'>;

interface UseChangePasswordProps {
  navigation: ChangePasswordNavigationProp;
}

interface PasswordValidation {
  isValid: boolean;
  errors: string[];
}

export const useChangePassword = ({ navigation }: UseChangePasswordProps) => {
  // Estados del formulario
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  // Estados de visibilidad de passwords
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Estados de focus
  const [focusStates, setFocusStates] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  // Validación de fortaleza de password
  const validatePasswordStrength = (password: string): PasswordValidation => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters');
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  // Validación de confirmación de password
  const validatePasswordMatch = (): boolean => {
    return newPassword === confirmPassword && newPassword.length > 0;
  };

  // Manejadores de cambio de texto
  const handleNewPasswordChange = (text: string) => {
    setNewPassword(text);
    // Limpiar error cuando el usuario empiece a escribir
    if (errors.newPassword) {
      setErrors(prev => ({ ...prev, newPassword: '' }));
    }
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    // Limpiar error cuando el usuario empiece a escribir
    if (errors.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  };

  // Manejadores de focus
  const handleNewPasswordFocus = () => {
    setFocusStates(prev => ({ ...prev, newPassword: true }));
  };

  const handleNewPasswordBlur = () => {
    setFocusStates(prev => ({ ...prev, newPassword: false }));
  };

  const handleConfirmPasswordFocus = () => {
    setFocusStates(prev => ({ ...prev, confirmPassword: true }));
  };

  const handleConfirmPasswordBlur = () => {
    setFocusStates(prev => ({ ...prev, confirmPassword: false }));
  };

  // Manejadores de visibilidad
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };

  // Validación del formulario
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Validar nueva password
    const passwordValidation = validatePasswordStrength(newPassword);
    if (!passwordValidation.isValid) {
      newErrors.newPassword = passwordValidation.errors[0]; // Mostrar el primer error
    }

    // Validar confirmación de password
    if (!validatePasswordMatch()) {
      if (confirmPassword.length === 0) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejo del submit
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // TODO: Implementar llamada a la API
      // const response = await authService.changePassword({
      //   newPassword,
      //   confirmPassword
      // });
      
      // Simular delay de red
      await new Promise<void>(resolve => setTimeout(() => resolve(), 1500));
      
      // TODO: Manejar respuesta exitosa
      console.log('Password changed successfully');
      
      // Navegar a Login con mensaje de éxito
      navigation.navigate('Login');
      
    } catch (error) {
      // TODO: Manejar errores de la API
      console.error('Change password error:', error);
      setErrors({ 
        submit: 'Failed to change password. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  // Navegación a Login
  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return {
    // Estados del formulario
    newPassword,
    confirmPassword,
    loading,
    errors,
    
    // Estados de visibilidad
    showNewPassword,
    showConfirmPassword,
    
    // Estados de focus
    focusStates,
    
    // Manejadores de texto
    handleNewPasswordChange,
    handleConfirmPasswordChange,
    
    // Manejadores de focus
    handleNewPasswordFocus,
    handleNewPasswordBlur,
    handleConfirmPasswordFocus,
    handleConfirmPasswordBlur,
    
    // Manejadores de visibilidad
    toggleNewPasswordVisibility,
    toggleConfirmPasswordVisibility,
    
    // Acciones
    handleSubmit,
    navigateToLogin,
    
    // Validaciones
    validatePasswordStrength,
    validatePasswordMatch,
  };
};