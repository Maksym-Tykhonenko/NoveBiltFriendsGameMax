import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type EmagovradinProps = {
  style?: StyleProp<ViewStyle>;
};

export const Milonordiendes: React.FC<EmagovradinProps> = ({ style }) => (
  <LinearGradient
    colors={['#07E5FF', '#003C82']}
    start={{ x: 0.5, y: 0 }}
    end={{ x: 0.5, y: 1 }}
    style={[
      {
        width: '100%',
        height: '100%',
        position: 'absolute',
      },
      style,
    ]}
  />
);
