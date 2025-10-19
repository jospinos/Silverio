import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, IMAGES } from '@shared/theme/theme';
import { GlobalStyleSheet } from '@shared/theme/styleSheet';
import { LoginInput } from './LoginInput';
import Button from '@presentation/components/common/button/Button';

interface LoginFormProps {
  email: string;
  password: string;
  errors: {
    email?: string;
    password?: string;
    general?: string;
  };
  showPassword: boolean;
  inputFocus: {
    email: boolean;
    password: boolean;
  };
  isLoading: boolean;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onEmailFocus: () => void;
  onEmailBlur: () => void;
  onPasswordFocus: () => void;
  onPasswordBlur: () => void;
  onTogglePassword: () => void;
  onLogin: () => void;
  onForgotPassword: () => void;
  onRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  email = 'alex@example.com',
  password = '123456',
  errors,
  showPassword,
  inputFocus,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onEmailFocus,
  onEmailBlur,
  onPasswordFocus,
  onPasswordBlur,
  onTogglePassword,
  onLogin,
  onForgotPassword,
  onRegister,
}) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  return (
    <View style={[GlobalStyleSheet.loginarea, { backgroundColor: colors.card }]}>
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

      {/* Forgot Password Link */}
      <View style={{ alignItems: 'flex-end' }}>
        <TouchableOpacity onPress={onForgotPassword}>
          <Text style={GlobalStyleSheet.btnlink}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* General Error */}
      {errors.general && (
        <Text style={{ color: COLORS.danger, textAlign: 'center', marginVertical: 10 }}>
          {errors.general}
        </Text>
      )}

      {/* Login Button */}
      <Button
        title="Login"
        onPress={onLogin}
        disabled={isLoading}
      />

      {/* Divider */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 40, flex: 1 }}>
        <View style={{ flex: 1, width: 0, backgroundColor: colors.border, height: 1 }}></View>
        <View>
          <Text style={{ ...FONTS.font, paddingHorizontal: 30, color: colors.text }}>
            or login with
          </Text>
        </View>
        <View style={{ flex: 1, width: 0, backgroundColor: colors.border, height: 1 }}></View>
      </View>

      {/* Google Login Button */}
      <TouchableOpacity 
        style={[
          GlobalStyleSheet.mediabtn, 
          { backgroundColor: theme.dark ? 'rgba(255,255,255,.1)' : '#E8ECF2' }
        ]}
      >
        <Text style={{ ...FONTS.font, fontSize: 15, color: colors.title }}>
          Login with Google
        </Text>
      </TouchableOpacity>

      {/* Register Link */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
        <Text style={{ ...FONTS.font, color: colors.text }}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={onRegister}>
          <Text style={{ 
            ...FONTS.font, 
            color: COLORS.primary, 
            textDecorationLine: 'underline', 
            textDecorationColor: '#2979F8', 
            marginLeft: 5 
          }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};