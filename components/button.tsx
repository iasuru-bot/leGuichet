import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  title: string;  // Title for the button (e.g., 'Register')
  onPress: () => void;   // Function to handle button press
}

const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
      backgroundColor: '#FF0000',
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      width: '100%',
      height: 50,
  },
  buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
});


export default Button;