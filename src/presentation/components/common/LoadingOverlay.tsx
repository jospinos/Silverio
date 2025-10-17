import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { COLORS } from '@shared/theme/theme';

interface LoadingOverlayProps {
  visible: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <View
      style={{
        backgroundColor: 'rgba(0,0,0,.5)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 9,
        width: '100%',
        height: '100%',
      }}
    >
      <ActivityIndicator
        size="large"
        color={COLORS.white}
      />
    </View>
  );
};