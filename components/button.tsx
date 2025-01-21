import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ButtonProps {
  title: string;  // Title for the button (e.g., 'Register')
  onPress: () => void;   // Function to handle button press
  variant?: 'primary' | 'secondary' | 'outlinedPrimary' | 'logout'; // Variant for the button style
}

const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary' }) => {
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const textColor = useThemeColor({}, 'text');
  const whiteColor = useThemeColor({}, 'white');
  const logoutColor = useThemeColor({}, 'red'); // Red color for logout button

  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return [styles.button, { backgroundColor: primaryColor }];
      case 'secondary':
        return [styles.button, { backgroundColor: secondaryColor }];
      case 'outlinedPrimary':
        return [styles.button, styles.outlinedPrimary, { borderColor: primaryColor }];
      case 'logout':
        return [styles.button, { backgroundColor: logoutColor }];
      default:
        return [styles.button, { backgroundColor: primaryColor }];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outlinedPrimary':
        return [styles.buttonText, { color: primaryColor }];
      case 'logout':
        return [styles.buttonText, { color: whiteColor }];
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

export default Button;