import React, { useState } from 'react';
import styled from 'styled-components/native';
import { TextInput, View, Text } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface InputProps {
  value: string;
  onChange: (text: string) => void;
  label: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'ascii-capable';
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  label,
  placeholder,
  error,
  disabled = false,
  secureTextEntry = false,
  keyboardType = 'default',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  // Utilisation des couleurs du thème
  const primaryColor = useThemeColor({}, 'primary');
  const white = useThemeColor({}, 'white');
  const gray = useThemeColor({}, 'gray');
  const text = useThemeColor({}, 'text');

  return (
    <StyledWrapper>
      <View style={{ position: 'relative' }}>
        <StyledTextInput
          value={value}
          onChangeText={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor={gray}
          editable={!disabled}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          style={{ borderBottomColor: isFocused ? primaryColor : gray }}
          color = {text}
        />
        <StyledLabel isFocused={isFocused || !!value} color={isFocused ? primaryColor : gray}>
          {label}
        </StyledLabel>
        {isFocused && <StyledHighlight background={primaryColor} />}
        {error && <StyledErrorText>{error}</StyledErrorText>}
      </View>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.View`
  margin-bottom: 20px;
`;

const StyledTextInput = styled(TextInput)`
  font-size: 16px;
  padding: 10px 10px 10px 5px;
  width: 100%;
  border: none;
  border-bottom-width: 1px;
  background: transparent;
`;

const StyledLabel = styled(Text)<{ isFocused: boolean; color: string }>`
  font-size: ${(props: { isFocused: any; }) => (props.isFocused ? '14px' : '18px')};
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: ${(props: { isFocused: any; }) => (props.isFocused ? '-20px' : '10px')};
  color: ${(props: { color: any; }) => props.color};
  transition: 0.2s ease all;
`;

const StyledHighlight = styled.View<{ background: string }>`
  position: absolute;
  height: 60%;
  width: 100%;
  top: 25%;
  left: 0;
  pointer-events: none;
  opacity: 0.5
`;

const StyledErrorText = styled.Text`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

export default Input;
