import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS } from '@shared/theme/theme';
import { GlobalStyleSheet } from '@shared/theme/styleSheet';
import { OtpInput } from './OtpInput';
import Button from '@presentation/components/common/button/Button';

interface OtpFormProps {
  otpCode: string;
  error: string | null;
  isLoading: boolean;
  timeLeft: number;
  canResend: boolean;
  onOtpChange: (code: string) => void;
  onVerifyOtp: () => void;
  onResendOtp: () => void;
  onBackToLogin: () => void;
}

export const OtpForm: React.FC<OtpFormProps> = ({
  otpCode,
  error,
  isLoading,
  timeLeft,
  canResend,
  onOtpChange,
  onVerifyOtp,
  onResendOtp,
  onBackToLogin,
}) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={[GlobalStyleSheet.loginarea, { backgroundColor: colors.card }]}>
      {/* OTP Input */}
      <OtpInput
        value={otpCode}
        onChangeText={onOtpChange}
        error={error}
        inputCount={4}
        autoFocus={true}
      />

      {/* Resend Section */}
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        {!canResend ? (
          <Text style={{ ...FONTS.font, color: colors.text }}>
            Resend code in {formatTime(timeLeft)}
          </Text>
        ) : (
          <TouchableOpacity 
            onPress={onResendOtp}
            disabled={isLoading}
            style={{
              opacity: isLoading ? 0.6 : 1,
            }}
          >
            <Text style={{ 
              ...FONTS.font, 
              color: COLORS.primary, 
              textDecorationLine: 'underline',
              fontWeight: '500',
            }}>
              Resend Code
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Verify Button */}
      <View style={{ marginTop: 10 }}>
        <Button
          title="Verify Code"
          onPress={onVerifyOtp}
          disabled={isLoading || otpCode.length !== 4}
        />
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