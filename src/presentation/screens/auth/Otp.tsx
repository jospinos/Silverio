import React from 'react';
import { ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { GlobalStyleSheet } from '@shared/theme/styleSheet';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@presentation/navigation/RootStackParamList';

// Custom hook
import { useOtp } from '@presentation/hooks/auth/useOtp';

// Components
import { LoadingOverlay } from '@presentation/components/common/LoadingOverlay';
import { OtpHeader } from '@presentation/components/auth/OtpHeader';
import { OtpForm } from '@presentation/components/auth/OtpForm';

type OtpScreenProps = StackScreenProps<RootStackParamList, 'Otp'>;

const Otp = ({ navigation }: OtpScreenProps) => {
  const {
    otpCode,
    isLoading,
    error,
    timeLeft,
    canResend,
    handleOtpChange,
    handleVerifyOtp,
    handleResendOtp,
    email,
    phone,
    verificationType,
  } = useOtp();

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <>
      <LoadingOverlay visible={isLoading} />
      
      <SafeAreaView style={[GlobalStyleSheet.container, { padding: 0, flex: 1 }]}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <OtpHeader 
              email={email}
              phone={phone}
              verificationType={verificationType}
            />
            
            <OtpForm
              otpCode={otpCode}
              error={error}
              isLoading={isLoading}
              timeLeft={timeLeft}
              canResend={canResend}
              onOtpChange={handleOtpChange}
              onVerifyOtp={handleVerifyOtp}
              onResendOtp={handleResendOtp}
              onBackToLogin={handleBackToLogin}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Otp;