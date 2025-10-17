import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import OTPTextInput from 'react-native-otp-textinput';
import { COLORS, SIZES } from '@shared/theme/theme';

interface OtpInputProps {
  value: string;
  onChangeText: (code: string) => void;
  error?: string;
  inputCount?: number;
  autoFocus?: boolean;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChangeText,
  error,
  inputCount = 4,
  autoFocus = true,
}) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  return (
    <View style={{ alignItems: 'center', marginBottom: 20 }}>
      <OTPTextInput 
        handleTextChange={onChangeText}
        inputCount={inputCount}
        autoFocus={autoFocus}
        tintColor={error ? COLORS.danger : COLORS.primary}
        offTintColor={colors.border}
        textInputStyle={{
          borderBottomWidth: 0,
          height: 48,
          width: 48,
          borderRadius: SIZES.radius,
          backgroundColor: colors.input,
          fontSize: 18,
          fontWeight: 'bold',
          textAlign: 'center',
          borderWidth: 1,
          borderColor: error ? COLORS.danger : colors.border,
        } as any}
        containerStyle={{
          marginHorizontal: 10,
        }}
      />
      
      {error && (
        <Text style={{ 
          color: COLORS.danger, 
          marginTop: 10, 
          fontSize: 12,
          textAlign: 'center',
        }}>
          {error}
        </Text>
      )}
    </View>
  );
};