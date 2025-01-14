import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface CheckboxProps {
  defaultChecked?: boolean;
  onToggle?: (isChecked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ defaultChecked = false, onToggle }) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  // Récupère les couleurs depuis le thème
  const primaryColor = useThemeColor({}, 'primary');
  const checkmarkColor = useThemeColor({}, 'text');

  const handlePress = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    onToggle?.(newState);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View
        style={[
          styles.checkmark,
          isChecked && { backgroundColor: primaryColor },
        ]}
      >
        {isChecked && (
          <View
            style={[
              styles.checkmarkIndicator,
              { borderColor: checkmarkColor },
            ]}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: 32,
    height: 32,
    backgroundColor: 'transparent',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkIndicator: {
    width: 10,
    height: 20,
    borderWidth: 2,
    borderColor: 'white',
    transform: [{ rotate: '45deg' }],
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRadius: 0,
  },
});

export default Checkbox;
