import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface SwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ value, onChange }) => {
  const handlePress = () => {
    onChange(!value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.switch, value && styles.switchChecked]}
        onPress={handlePress}
      >
        <View
          style={[styles.slider, value && styles.sliderChecked]}
        />
      </TouchableOpacity>
      <Text style={styles.label}>{value ? 'On' : 'Off'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switch: {
    width: 56,
    height: 30,
    backgroundColor: '#d4acfb',
    borderRadius: 50,
    justifyContent: 'center',
    padding: 5,
    position: 'relative',
  },
  switchChecked: {
    backgroundColor: '#b84fce',
  },
  slider: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 50,
    boxShadow: '0 0px 20px rgba(0,0,0,0.4)',
  },
  sliderChecked: {
    transform: [{ translateX: 26 }],
    width: 24,
    height: 24,
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default Switch;
