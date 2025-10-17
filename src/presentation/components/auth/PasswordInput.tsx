import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS, IMAGES } from '@shared/theme/theme';
import { GlobalStyleSheet } from '@shared/theme/styleSheet';

interface PasswordInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry: boolean;
  onToggleSecureEntry: () => void;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  error?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  onToggleSecureEntry,
  isFocused,
  onFocus,
  onBlur,
  error,
}) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={[GlobalStyleSheet.inputlable, { color: colors.title }]}>
        {label}
      </Text>
      <View
        style={[
          GlobalStyleSheet.inputBox,
          {
            backgroundColor: colors.input,
          },
          isFocused && {
            borderColor: COLORS.primary,
          },
          error && {
            borderColor: '#FF6B6B',
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
          source={IMAGES.lock}
        />

        <TextInput
          style={[GlobalStyleSheet.input, { color: colors.title }]}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onFocus={onFocus}
          onBlur={onBlur}
          autoCapitalize="none"
          autoCorrect={false}
        />
        
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            position: 'absolute',
            right: 15,
          }}
          onPress={onToggleSecureEntry}
        >
          <Image
            style={[
              GlobalStyleSheet.inputSecureIcon,
              {
                tintColor: theme.dark ? colors.title : colors.text,
              }
            ]}
            source={secureTextEntry ? IMAGES.eyeclose : IMAGES.eyeopen}
          />
        </TouchableOpacity>
      </View>
      
      {error && (
        <Text style={[
          GlobalStyleSheet.inputlable, 
          { 
            color: '#FF6B6B', 
            fontSize: 12, 
            marginTop: 5,
            marginLeft: 5
          }
        ]}>
          {error}
        </Text>
      )}
    </View>
  );
};