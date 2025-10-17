import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, FONTS } from '@shared/theme/theme';
import Button from '@presentation/components/common/button/Button';
import { PasswordInput } from './PasswordInput';

interface ChangePasswordFormProps {
  newPassword: string;
  confirmPassword: string;
  loading: boolean;
  errors: { [key: string]: string };
  
  showNewPassword: boolean;
  showConfirmPassword: boolean;
  
  focusStates: {
    newPassword: boolean;
    confirmPassword: boolean;
  };
  
  onNewPasswordChange: (text: string) => void;
  onConfirmPasswordChange: (text: string) => void;
  
  onNewPasswordFocus: () => void;
  onNewPasswordBlur: () => void;
  onConfirmPasswordFocus: () => void;
  onConfirmPasswordBlur: () => void;
  
  onToggleNewPasswordVisibility: () => void;
  onToggleConfirmPasswordVisibility: () => void;
  
  onSubmit: () => void;
  onNavigateToLogin: () => void;
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  newPassword,
  confirmPassword,
  loading,
  errors,
  
  showNewPassword,
  showConfirmPassword,
  
  focusStates,
  
  onNewPasswordChange,
  onConfirmPasswordChange,
  
  onNewPasswordFocus,
  onNewPasswordBlur,
  onConfirmPasswordFocus,
  onConfirmPasswordBlur,
  
  onToggleNewPasswordVisibility,
  onToggleConfirmPasswordVisibility,
  
  onSubmit,
  onNavigateToLogin,
}) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  return (
    <View style={{ flex: 1 }}>
      {/* New Password Input */}
      <PasswordInput
        label="New Password"
        placeholder="Enter your new password"
        value={newPassword}
        onChangeText={onNewPasswordChange}
        secureTextEntry={!showNewPassword}
        onToggleSecureEntry={onToggleNewPasswordVisibility}
        isFocused={focusStates.newPassword}
        onFocus={onNewPasswordFocus}
        onBlur={onNewPasswordBlur}
        error={errors.newPassword}
      />

      {/* Confirm Password Input */}
      <PasswordInput
        label="Confirm Password"
        placeholder="Enter your confirm password"
        value={confirmPassword}
        onChangeText={onConfirmPasswordChange}
        secureTextEntry={!showConfirmPassword}
        onToggleSecureEntry={onToggleConfirmPasswordVisibility}
        isFocused={focusStates.confirmPassword}
        onFocus={onConfirmPasswordFocus}
        onBlur={onConfirmPasswordBlur}
        error={errors.confirmPassword}
      />

      {/* Submit Error */}
      {errors.submit && (
        <Text style={[
          FONTS.font,
          { 
            color: '#FF6B6B', 
            fontSize: 14, 
            textAlign: 'center',
            marginBottom: 15,
          }
        ]}>
          {errors.submit}
        </Text>
      )}

      {/* Submit Button */}
      <View style={{ marginTop: 10 }}>
        <Button
          title={loading ? "Updating..." : "Submit"}
          onPress={onSubmit}
          disabled={loading}
        />
      </View>

      {/* Spacer */}
      <View style={{ flex: 1 }} />

      {/* Sign In Link */}
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginTop: 15 
      }}>
        <Text style={{ ...FONTS.font, color: colors.text }}>
          Already have an account
        </Text>
        <TouchableOpacity onPress={onNavigateToLogin}>
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