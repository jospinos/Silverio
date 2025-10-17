import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, IMAGES } from '@shared/theme/theme';
import { GlobalStyleSheet } from '@shared/theme/styleSheet';

interface LoginInputProps {
  label: string;
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  isFocused: boolean;
  isSecure?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  error?: string;
  icon: any; // Image source
  keyboardType?: 'default' | 'email-address' | 'number-pad';
}

export const LoginInput: React.FC<LoginInputProps> = ({
  label,
  value,
  placeholder,
  onChangeText,
  onFocus,
  onBlur,
  isFocused,
  isSecure = false,
  showPassword = false,
  onTogglePassword,
  error,
  icon,
  keyboardType = 'default',
}) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  return (
    <View>
      <Text style={[GlobalStyleSheet.inputlable, { color: colors.title }]}>
        {label}
      </Text>
      
      <View
        style={[
          GlobalStyleSheet.inputBox,
          {
            backgroundColor: colors.input,
            borderColor: error ? COLORS.danger : (isFocused ? COLORS.primary : 'transparent'),
            borderWidth: error || isFocused ? 1 : 0,
          }
        ]}
      >
        <Image
          style={[
            GlobalStyleSheet.inputimage,
            {
              tintColor: theme.dark ? colors.title : colors.text,
            }
          ]}
          source={icon}
        />

        <TextInput
          style={[GlobalStyleSheet.input, { color: colors.title }]}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          secureTextEntry={isSecure && showPassword}
          keyboardType={keyboardType}
        />

        {isSecure && onTogglePassword && (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              position: 'absolute',
              right: 15,
            }}
            onPress={onTogglePassword}
          >
            <Image
              style={[
                GlobalStyleSheet.inputSecureIcon,
                {
                  tintColor: theme.dark ? colors.title : colors.text,
                }
              ]}
              source={showPassword ? IMAGES.eyeclose : IMAGES.eyeopen}
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text style={{ color: COLORS.danger, marginTop: 5, fontSize: 12 }}>
          {error}
        </Text>
      )}
    </View>
  );
};