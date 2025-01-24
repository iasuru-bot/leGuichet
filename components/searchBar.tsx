import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import { useThemeColor } from '@/hooks/useThemeColor';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSubmitEditing?: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Search',
  onSubmitEditing,
}) => {

  const primaryColor = useThemeColor({}, 'primary');
  const backgroundColor = useThemeColor({}, 'background');
  const placeholderColor = useThemeColor({}, 'gray');
  const textColor = useThemeColor({}, 'text');

  return (
    <TextInput
      mode="outlined"
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={placeholderColor}
      style={[styles.input, { backgroundColor }]}
      outlineColor={primaryColor}
      activeOutlineColor={primaryColor}
      textColor={textColor}
      onSubmitEditing={onSubmitEditing}
      left={<TextInput.Icon icon="magnify" onPress={onSubmitEditing} />}
      right={<TextInput.Icon icon="close" onPress={() => onChangeText('')} />}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
});

export default SearchInput;