import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Input from '@/components/Input';
import Button from '@/components/button';
import { useThemeColor } from '@/hooks/useThemeColor';
import CustomBackButton from '@/components/CustomBackButton';
import { fetchData } from '@/hooks/fetchData';

const RequestPasswordResetForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const primaryColor = useThemeColor({}, 'primary');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const handleSubmit = async () => {
    try {
      await fetchData('/public/request-password-reset', 'POST', { email });
      setMessage('Reset email sent successfully');
      setError('');
    } catch (error) {
      setError('Failed to send reset email');
      setMessage('');
    }
  };

  return (
    <StyledWrapper style={{ backgroundColor }}>
      <CustomBackButton />
      <StyledForm>
        <StyledTitle style={{ color: primaryColor }}>Request Password Reset</StyledTitle>
        <Input
          label="Email"
          value={email}
          onChange={setEmail}
          keyboardType="email-address"
        />
        {message ? <Text style={styles.successText}>{message}</Text> : null}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Button title="Submit" onPress={handleSubmit} variant="primary" />
      </StyledForm>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const StyledForm = styled.View`
  width: 100%;
  max-width: 350px;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid #333;
  display: flex;
  gap: 0.5em;
`;

const StyledTitle = styled.Text`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 30px;
`;

const styles = StyleSheet.create({
  successText: {
    color: 'green',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default RequestPasswordResetForm;