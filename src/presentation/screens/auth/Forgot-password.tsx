import React from 'react';
import { ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { GlobalStyleSheet } from '@shared/theme/styleSheet';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@presentation/navigation/RootStackParamList';

// Custom hook
import { useForgotPassword } from '@presentation/hooks/auth/useForgotPassword';

// Components
import { LoadingOverlay } from '@presentation/components/common/LoadingOverlay';
import { ForgotPasswordHeader } from '@presentation/components/auth/ForgotPasswordHeader';
import { ForgotPasswordForm } from '@presentation/components/auth/ForgotPasswordForm';

type ForgotScreenProps = StackScreenProps<RootStackParamList, 'Forgot'>;

const Forgot = ({ navigation }: ForgotScreenProps) => {
  const {
    formData,
    errors,
    isLoading,
    updateField,
    handleSendCode,
    inputFocus,
    setInputFocus,
  } = useForgotPassword();

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
            <ForgotPasswordHeader />
            
            <ForgotPasswordForm
              email={formData.email}
              errors={errors}
              inputFocus={inputFocus}
              isLoading={isLoading}
              onEmailChange={(email) => updateField('email', email)}
              onEmailFocus={() => setInputFocus('email', true)}
              onEmailBlur={() => setInputFocus('email', false)}
              onSendCode={handleSendCode}
              onBackToLogin={handleBackToLogin}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Forgot;