import React from 'react';
import { View, ScrollView, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { COLORS } from '@shared/theme/theme';
import { GlobalStyleSheet } from '@shared/theme/styleSheet';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@presentation/navigation/RootStackParamList';
import { useChangePassword } from '@presentation/hooks/auth/useChangePassword';
import { ChangePasswordHeader } from '@presentation/components/auth/ChangePasswordHeader';
import { ChangePasswordForm } from '@presentation/components/auth/ChangePasswordForm';

type ChangePasswordScreenProps = StackScreenProps<RootStackParamList, 'ChangePassword'>;

const ChangePassword = ({ navigation }: ChangePasswordScreenProps) => {
  const theme = useTheme();
  const { colors }: { colors: any } = theme;

  const {
    // Estados del formulario
    newPassword,
    confirmPassword,
    loading,
    errors,
    
    // Estados de visibilidad
    showNewPassword,
    showConfirmPassword,
    
    // Estados de focus
    focusStates,
    
    // Manejadores de texto
    handleNewPasswordChange,
    handleConfirmPasswordChange,
    
    // Manejadores de focus
    handleNewPasswordFocus,
    handleNewPasswordBlur,
    handleConfirmPasswordFocus,
    handleConfirmPasswordBlur,
    
    // Manejadores de visibilidad
    toggleNewPasswordVisibility,
    toggleConfirmPasswordVisibility,
    
    // Acciones
    handleSubmit,
    navigateToLogin,
  } = useChangePassword({ navigation });

  return (
    <SafeAreaView style={[GlobalStyleSheet.container, { padding: 0, flex: 1 }]}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ backgroundColor: COLORS.secondary, flex: 1 }}>
            <ChangePasswordHeader />
            
            <View style={[GlobalStyleSheet.loginarea, { backgroundColor: colors.card }]}>
              <ChangePasswordForm
                newPassword={newPassword}
                confirmPassword={confirmPassword}
                loading={loading}
                errors={errors}
                
                showNewPassword={showNewPassword}
                showConfirmPassword={showConfirmPassword}
                
                focusStates={focusStates}
                
                onNewPasswordChange={handleNewPasswordChange}
                onConfirmPasswordChange={handleConfirmPasswordChange}
                
                onNewPasswordFocus={handleNewPasswordFocus}
                onNewPasswordBlur={handleNewPasswordBlur}
                onConfirmPasswordFocus={handleConfirmPasswordFocus}
                onConfirmPasswordBlur={handleConfirmPasswordBlur}
                
                onToggleNewPasswordVisibility={toggleNewPasswordVisibility}
                onToggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
                
                onSubmit={handleSubmit}
                onNavigateToLogin={navigateToLogin}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChangePassword;