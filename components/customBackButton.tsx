import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
import { FontAwesome } from '@expo/vector-icons';

interface CustomBackButtonProps {
  position?: ViewStyle; // Propriétés de style pour le positionnement
  mode?: 'outlined' | 'primary'; // Propriété pour définir le mode du bouton
  testID?: string; 
}

const CustomBackButton: React.FC<CustomBackButtonProps> = ({ position, mode = 'primary' }) => {
  const router = useRouter();
  const primaryColor = useThemeColor({}, "primary");
  const textColor = useThemeColor({}, "text"); // Couleur de texte

  const isPrimary = mode === 'primary'; // Vérifie le mode

  return (
    <TouchableOpacity
      testID="custom-back-button" 
      style={[styles.button, position, isPrimary ? styles.primaryButton : styles.outlinedButton]} // Applique les styles en fonction du mode
      onPress={() => router.back()}
    >
      <View style={[styles.circle, isPrimary ? {backgroundColor:primaryColor} : {borderWidth: 2,borderColor:primaryColor}]}>
        <FontAwesome name={"arrow-left"} size={20} color={isPrimary ? textColor : primaryColor} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    padding: 10,
    top: 30,
    left: 10,
    zIndex:1000,
  },
  primaryButton: {
    backgroundColor: 'transparent',
  },
  outlinedButton: {
    backgroundColor: 'transparent', 
  },
  circle: {
    borderRadius: 30,
    padding: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default CustomBackButton;