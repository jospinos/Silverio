import React from 'react';
import { ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { GlobalStyleSheet } from '@shared/theme/styleSheet';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@presentation/navigation/RootStackParamList';

// Custom hook
import { useRegister } from '@presentation/hooks/auth/useRegister';

// Components
import { LoadingOverlay } from '@presentation/components/common/LoadingOverlay';
import { RegisterHeader } from '@presentation/components/auth/RegisterHeader';
import { RegisterForm } from '@presentation/components/auth/RegisterForm';

type RegisterScreenProps = StackScreenProps<RootStackParamList, 'Register'>;

const Register = ({ navigation }: RegisterScreenProps) => {
  const {
    formData,
    errors,
    isLoading,
    updateField,
    handleRegister,
    showPassword,
    togglePasswordVisibility,
    inputFocus,
    setInputFocus,
  } = useRegister();

  const handleLogin = () => {
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
            <RegisterHeader />
            
            <RegisterForm
              username={formData.username}
              email={formData.email}
              password={formData.password}
              errors={errors}
              showPassword={showPassword}
              inputFocus={inputFocus}
              isLoading={isLoading}
              onUsernameChange={(username) => updateField('username', username)}
              onEmailChange={(email) => updateField('email', email)}
              onPasswordChange={(password) => updateField('password', password)}
              onUsernameFocus={() => setInputFocus('username', true)}
              onUsernameBlur={() => setInputFocus('username', false)}
              onEmailFocus={() => setInputFocus('email', true)}
              onEmailBlur={() => setInputFocus('email', false)}
              onPasswordFocus={() => setInputFocus('password', true)}
              onPasswordBlur={() => setInputFocus('password', false)}
              onTogglePassword={togglePasswordVisibility}
              onRegister={handleRegister}
              onLogin={handleLogin}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Register;