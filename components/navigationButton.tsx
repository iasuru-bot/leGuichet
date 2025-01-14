import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';

interface RegisterButtonProps {
  title: string;
  link: any;
}

const RegisterButton: React.FC<RegisterButtonProps> = ({ title, link }) => {
  const router = useRouter();
  
  // Utilisation des couleurs dynamiques
  const buttonBackgroundColor = useThemeColor({}, 'primary');
  const buttonTextColor = useThemeColor({}, 'white');

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonBackgroundColor }]}
      onPress={() => router.push(link)}
    >
      <Text style={[styles.buttonText, { color: buttonTextColor }]}>{title}</Text>
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
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RegisterButton;
