import React from 'react';
import { View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, IMAGES } from '@shared/theme/theme';
import { GlobalStyleSheet } from '@shared/theme/styleSheet';

export const RegisterHeader: React.FC = () => {
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
        
        <Text style={GlobalStyleSheet.formtitle}>Create an Account</Text>
        <Text style={GlobalStyleSheet.forndescription}>
          Please enter your credentials to access your account and detail
        </Text>
      </View>
    </View>
  );
};