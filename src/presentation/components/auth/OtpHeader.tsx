import React from 'react';
import { View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, IMAGES } from '@shared/theme/theme';
import { GlobalStyleSheet } from '@shared/theme/styleSheet';

interface OtpHeaderProps {
  email?: string;
  phone?: string;
  verificationType: 'email' | 'phone' | 'forgotPassword';
}

export const OtpHeader: React.FC<OtpHeaderProps> = ({ 
  email, 
  phone, 
  verificationType 
}) => {
  const getDescription = () => {
    const identifier = email || phone || 'your account';
    
    switch (verificationType) {
      case 'email':
        return `We sent a verification code to ${identifier}. Please enter the code below.`;
      case 'phone':
        return `We sent a verification code to ${identifier}. Please enter the code below.`;
      case 'forgotPassword':
        return `We sent a password reset code to ${identifier}. Please enter the code below.`;
      default:
        return 'Please enter the verification code sent to your device.';
    }
  };

  return (
    <View style={{ backgroundColor: COLORS.secondary, flex: 1 }}>
      <View style={{ alignItems: 'center' }}>
        <LinearGradient 
          colors={['rgba(255, 255, 255, 0.00)', 'rgba(255, 255, 255, 0.08)']} 
          style={GlobalStyleSheet.cricleGradient1}
        />
        <LinearGradient 
          colors={['rgba(255, 255, 255, 0.00)', 'rgba(255, 255, 255, 0.08)']} 
          style={GlobalStyleSheet.cricleGradient2}
        />
        
        <View style={{ paddingTop: 40, paddingBottom: 20 }}>
          <Image
            style={{ width: 80, height: 80 }}
            source={IMAGES.logo}
          />
        </View>
        
        <Text style={GlobalStyleSheet.formtitle}>Enter Code</Text>
        <Text style={[GlobalStyleSheet.forndescription, { textAlign: 'center', paddingHorizontal: 20 }]}>
          {getDescription()}
        </Text>
      </View>
    </View>
  );
};