import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, IMAGES } from '@shared/theme/theme';
import { GlobalStyleSheet } from '@shared/theme/styleSheet';
import { LoginInput } from './LoginInput'; // Reutilizamos el componente LoginInput
import Button from '@presentation/components/common/button/Button';

interface RegisterFormProps {
  username: string;
  email: string;
  password: string;
  errors: {
    username?: string;
    email?: string;
    password?: string;
    general?: string;
  };
  showPassword: boolean;
  inputFocus: {
    username: boolean;
    email: boolean;
    password: boolean;
  };
  isLoading: boolean;
  onUsernameChange: (username: string) => void;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onUsernameFocus: () => void;
  onUsernameBlur: () => void;
  onEmailFocus: () => void;
  onEmailBlur: () => void;
  onPasswordFocus: () => void;
  onPasswordBlur: () => void;
  onTogglePassword: () => void;
  onRegister: () => void;
  onLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  username,
  email,
  password,
  errors,
  showPassword,
  inputFocus,
  isLoading,
  onUsernameChange,
  onEmailChange,
  onPasswordChange,
  onUsernameFocus,
  onUsernameBlur,
  onEmailFocus,
  onEmailBlur,
  onPasswordFocus,
  onPasswordBlur,
  onTogglePassword,
  onRegister,
  onLogin,
}) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  return (
    <View style={[GlobalStyleSheet.loginarea, { backgroundColor: colors.card }]}>
      {/* Username Input */}
      <LoginInput
        label="Username"
        value={username}
        placeholder="Enter your username"
        onChangeText={onUsernameChange}
        onFocus={onUsernameFocus}
        onBlur={onUsernameBlur}
        isFocused={inputFocus.username}
        error={errors.username}
        icon={IMAGES.usename}
        keyboardType="default"
      />

      {/* Email Input */}
      <LoginInput
        label="Email"
        value={email}
        placeholder="Enter your email"
        onChangeText={onEmailChange}
        onFocus={onEmailFocus}
        onBlur={onEmailBlur}
        isFocused={inputFocus.email}
        error={errors.email}
        icon={IMAGES.email}
        keyboardType="email-address"
      />

      {/* Password Input */}
      <LoginInput
        label="Password"
        value={password}
        placeholder="Enter your password"
        onChangeText={onPasswordChange}
        onFocus={onPasswordFocus}
        onBlur={onPasswordBlur}
        isFocused={inputFocus.password}
        isSecure={true}
        showPassword={showPassword}
        onTogglePassword={onTogglePassword}
        error={errors.password}
        icon={IMAGES.lock}
      />

      {/* General Error */}
      {errors.general && (
        <Text style={{ color: COLORS.danger, textAlign: 'center', marginVertical: 10 }}>
          {errors.general}
        </Text>
      )}

      {/* Register Button */}
      <View style={{ marginTop: 10 }}>
        <Button
          title="Register"
          onPress={onRegister}
          disabled={isLoading}
        />
      </View>

      {/* Spacer */}
      <View style={{ flex: 1 }}></View>

      {/* Login Link */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
        <Text style={{ ...FONTS.font, color: colors.text }}>
          Already have an account?
        </Text>
        <TouchableOpacity onPress={onLogin}>
          <Text style={{ 
            ...FONTS.font, 
            color: COLORS.primary, 
            textDecorationLine: 'underline', 
            textDecorationColor: '#2979F8', 
            marginLeft: 5 
          }}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};