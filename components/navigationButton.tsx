import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface NavigationButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outlinedPrimary'; // Variant for the button style
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ title, onPress, variant = 'primary' }) => {
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const textColor = useThemeColor({}, 'text');
  const whiteColor = useThemeColor({}, 'white');

  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return [styles.button, { backgroundColor: primaryColor }];
      case 'secondary':
        return [styles.button, { backgroundColor: secondaryColor }];
      case 'outlinedPrimary':
        return [styles.button, styles.outlinedPrimary, { borderColor: primaryColor }];
      default:
        return [styles.button, { backgroundColor: primaryColor }];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outlinedPrimary':
        return [styles.buttonText, { color: primaryColor }];
      default:
        return [styles.buttonText, { color: whiteColor }];
    }
  };

  return (
    <TouchableOpacity style={getButtonStyle()} onPress={onPress}>
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    height: 50,
  },
  outlinedPrimary: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default NavigationButton;