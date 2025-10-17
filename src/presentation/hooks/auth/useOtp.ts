import { useState, useEffect, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@presentation/navigation/RootStackParamList';

type OtpNavigationProp = StackNavigationProp<RootStackParamList, 'Otp'>;

export interface OtpRouteParams {
  email?: string;
  phone?: string;
  verificationType?: 'email' | 'phone' | 'forgotPassword';
}

export interface UseOtpReturn {
  // OTP state
  otpCode: string;
  isLoading: boolean;
  error: string | null;
  
  // Timer state
  timeLeft: number;
  canResend: boolean;
  
  // OTP handlers
  handleOtpChange: (code: string) => void;
  handleVerifyOtp: () => Promise<void>;
  handleResendOtp: () => Promise<void>;
  clearError: () => void;
  
  // Route data
  email?: string;
  phone?: string;
  verificationType: 'email' | 'phone' | 'forgotPassword';
}

const RESEND_TIMEOUT = 60; // 60 seconds

export const useOtp = (): UseOtpReturn => {
  const navigation = useNavigation<OtpNavigationProp>();
  const route = useRoute();
  const routeParams = route.params as OtpRouteParams | undefined;
  
  // OTP state
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState(RESEND_TIMEOUT);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Extract route parameters
  const email = routeParams?.email;
  const phone = routeParams?.phone;
  const verificationType = routeParams?.verificationType || 'forgotPassword';

  // Initialize timer on mount
  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    setTimeLeft(RESEND_TIMEOUT);
    setCanResend(false);
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setCanResend(true);
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const validateOtp = (code: string): boolean => {
    if (!code || code.length !== 4) {
      setError('Please enter a valid 4-digit code');
      return false;
    }
    
    if (!/^\d{4}$/.test(code)) {
      setError('Code must contain only numbers');
      return false;
    }
    
    return true;
  };

  const handleOtpChange = (code: string) => {
    setOtpCode(code);
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  const handleVerifyOtp = async (): Promise<void> => {
    try {
      if (!validateOtp(otpCode)) {
        return;
      }

      setIsLoading(true);
      setError(null);

      // TODO: Aquí irá la llamada a la API de verificación de OTP
      // const result = await verifyOtp({
      //   code: otpCode,
      //   email,
      //   phone,
      //   type: verificationType
      // });
      
      // Simulación temporal
      await new Promise<void>(resolve => setTimeout(() => resolve(), 2000));
      
      // Navigate based on verification type
      switch (verificationType) {
        case 'forgotPassword':
          navigation.navigate('ChangePassword');
          break;
        case 'email':
        case 'phone':
          // Navigate to success screen or main app
          navigation.navigate('Login');
          break;
        default:
          navigation.navigate('Login');
      }
      
    } catch (error: any) {
      setError(error.message || 'Invalid code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async (): Promise<void> => {
    if (!canResend) return;
    
    try {
      setIsLoading(true);
      setError(null);

      // TODO: Aquí irá la llamada a la API de reenvío de OTP
      // const result = await resendOtp({
      //   email,
      //   phone,
      //   type: verificationType
      // });
      
      // Simulación temporal
      await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));
      
      // Reset timer
      startTimer();
      
      // Clear current OTP
      setOtpCode('');
      
    } catch (error: any) {
      setError(error.message || 'Failed to resend code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    // OTP state
    otpCode,
    isLoading,
    error,
    
    // Timer state
    timeLeft,
    canResend,
    
    // OTP handlers
    handleOtpChange,
    handleVerifyOtp,
    handleResendOtp,
    clearError,
    
    // Route data
    email,
    phone,
    verificationType,
  };
};