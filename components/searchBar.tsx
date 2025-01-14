import { useThemeColor } from '@/hooks/useThemeColor';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';


interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChangeText }) => {
  const borderColor = useThemeColor({}, 'primary');  // Use appropriate color from your theme
  const backgroundColor = useThemeColor({}, 'background'); // Get background color from theme
  const placeholderColor = useThemeColor({}, 'white'); // Placeholder color from theme
  const textColor = useThemeColor({}, 'text'); // Text color from theme
  
  return (
    <View style={styles.wrapper}>
      <View style={styles.group}>
        <FontAwesome name="home" style={[styles.icon]} color={placeholderColor}/>
        <TextInput
          style={[styles.input, { borderColor, backgroundColor, color: textColor }]}
          placeholder="Search"
          placeholderTextColor={placeholderColor}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  group: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    left: 10,
    fontSize: 18,  // Adjust icon size
  },
  input: {
    paddingLeft: 40,  // Make space for the icon inside the input
    height: 40,
    width: 200,  // Adjust width as needed
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
});

export default SearchInput;
