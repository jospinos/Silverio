import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS, IMAGES } from '@shared/theme/theme';
import { GlobalStyleSheet } from '@shared/theme/styleSheet';
import { LoginInput } from './LoginInput'; // Reutilizamos el componente LoginInput
import Button from '@presentation/components/common/button/Button';

interface ForgotPasswordFormProps {
  email: string;
  errors: {
    email?: string;
    general?: string;
  };
  inputFocus: {
    email: boolean;
  };
  isLoading: boolean;
  onEmailChange: (email: string) => void;
  onEmailFocus: () => void;
  onEmailBlur: () => void;
  onSendCode: () => void;
  onBackToLogin: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  email,
  errors,
  inputFocus,
  isLoading,
  onEmailChange,
  onEmailFocus,
  onEmailBlur,
  onSendCode,
  onBackToLogin,
}) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  return (
    <View style={[GlobalStyleSheet.loginarea, { backgroundColor: colors.card }]}>
      {/* Email Input */}
      <LoginInput
        label="Email Address"
        value={email}
        placeholder="Enter your email address"
        onChangeText={onEmailChange}
        onFocus={onEmailFocus}
        onBlur={onEmailBlur}
        isFocused={inputFocus.email}
        error={errors.email}
        icon={IMAGES.email}
        keyboardType="email-address"
      />

      {/* General Error */}
      {errors.general && (
        <Text style={{ color: COLORS.danger, textAlign: 'center', marginVertical: 10 }}>
          {errors.general}
        </Text>
      )}

      {/* Send Code Button */}
      <View style={{ marginTop: 10 }}>
        <Button
          title="Send Verification Code"
          onPress={onSendCode}
          disabled={isLoading}
        />
      </View>

      {/* Helper Text */}
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={{ 
          ...FONTS.fontSm, 
          color: colors.text, 
          textAlign: 'center',
          lineHeight: 18 
        }}>
          We'll send a 4-digit verification code to your email address to reset your password.
        </Text>
      </View>

      {/* Spacer */}
      <View style={{ flex: 1 }}></View>

      {/* Back to Login Link */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
        <Text style={{ ...FONTS.font, color: colors.text }}>
          Remember your password?
        </Text>
        <TouchableOpacity onPress={onBackToLogin}>
          <Text style={{ 
            ...FONTS.font, 
            color: COLORS.primary, 
            textDecorationLine: 'underline', 
            textDecorationColor: COLORS.primary, 
            marginLeft: 5 
          }}>
            Back to Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};