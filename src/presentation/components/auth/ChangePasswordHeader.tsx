import React from 'react';
import { View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IMAGES } from '@shared/theme/theme';
import { GlobalStyleSheet } from '@shared/theme/styleSheet';

export const ChangePasswordHeader = () => {
  return (
    <View style={{ alignItems: 'center' }}>
      <LinearGradient 
        colors={['rgba(255, 255, 255, 0.00)', 'rgba(255, 255, 255, 0.08)']} 
        style={GlobalStyleSheet.cricleGradient1}
      />
      <LinearGradient 
        colors={['rgba(255, 255, 255, 0.00)', 'rgba(255, 255, 255, 0.08)']} 
        style={GlobalStyleSheet.cricleGradient2}
      />
      <View
        style={{
          paddingTop: 40,
          paddingBottom: 20
        }}
      >
        <Image
          style={{ width: 80, height: 80 }}
          source={IMAGES.logo}
        />
      </View>
      <Text style={GlobalStyleSheet.formtitle}>Change Password</Text>
      <Text style={GlobalStyleSheet.forndescription}>
        Create a strong password to secure your account. Make sure it contains at least 8 characters.
      </Text>
    </View>
  );
};