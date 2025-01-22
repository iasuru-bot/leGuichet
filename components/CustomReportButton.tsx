import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { FontAwesome } from '@expo/vector-icons';


interface CustomReportButtonProps {
  position?: ViewStyle; // Propriétés de style pour le positionnement
  mode?: 'outlined' | 'primary'; // Propriété pour définir le mode du bouton
  onPress: () => void;
}

const CustomReportButton: React.FC<CustomReportButtonProps> = ({ position, mode = 'primary', onPress }) => {
  const redColor = useThemeColor({}, "red");
  const textColor = useThemeColor({}, "text"); 

  const isPrimary = mode === 'primary'; // Vérifie le mode

  return (
    <TouchableOpacity
      testID="custom-report-button" 
      style={[styles.button, position, isPrimary ? styles.primaryButton : styles.outlinedButton]} // Applique les styles en fonction du mode
      onPress={onPress}
    >
      <View style={[styles.circle, isPrimary ? {backgroundColor:redColor} : {borderWidth: 2,borderColor:redColor}]}>
        <FontAwesome name={"exclamation"} size={20} color={isPrimary ? textColor : redColor} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    padding: 10,
    right: 0, // Positionné à droite
    zIndex: 1000,
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
    paddingLeft: 6.,
    paddingTop: 1,
    width: 20,
    height: 20,
  },
});

export default CustomReportButton;