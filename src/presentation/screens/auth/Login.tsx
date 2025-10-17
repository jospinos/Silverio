import React from 'react';
import { View, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { GlobalStyleSheet } from '@shared/theme/styleSheet';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@presentation/navigation/RootStackParamList';

// Custom hook
import { useLogin } from '@presentation/hooks/auth/useLogin';

// Components
import { LoadingOverlay } from '@presentation/components/common/LoadingOverlay';
import { LoginHeader } from '@presentation/components/auth/LoginHeader';
import { LoginForm } from '@presentation/components/auth/LoginForm';

type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation }: LoginScreenProps) => {
  const {
    formData,
    errors,
    isLoading,
    updateField,
    handleLogin,
    showPassword,
    togglePasswordVisibility,
    inputFocus,
    setInputFocus,
  } = useLogin();

  const handleForgotPassword = () => {
    navigation.navigate('Forgot');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
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
            <LoginHeader />
            
            <LoginForm
              email={formData.email}
              password={formData.password}
              errors={errors}
              showPassword={showPassword}
              inputFocus={inputFocus}
              isLoading={isLoading}
              onEmailChange={(email) => updateField('email', email)}
              onPasswordChange={(password) => updateField('password', password)}
              onEmailFocus={() => setInputFocus('email', true)}
              onEmailBlur={() => setInputFocus('email', false)}
              onPasswordFocus={() => setInputFocus('password', true)}
              onPasswordBlur={() => setInputFocus('password', false)}
              onTogglePassword={togglePasswordVisibility}
              onLogin={handleLogin}
              onForgotPassword={handleForgotPassword}
              onRegister={handleRegister}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Login;