import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useThemeColor } from '@/hooks/useThemeColor';
import { HomeScreenNavigationProp } from '@/types/navigation';
import CustomBackButton from '@/components/CustomBackButton';
import { fetchData } from '@/hooks/fetchData';

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const primaryColor = useThemeColor({}, 'primary');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute();
  const { token }: any = route.params;

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await fetchData('/public/reset-password', 'POST', { token, newPassword });
      setMessage('Password reset successfully');
      setError('');
      navigation.navigate('Login');
    } catch (error) {
      setError('Failed to reset password');
      setMessage('');
    }
  };

  return (
    <StyledWrapper style={{ backgroundColor }}>
      <CustomBackButton />
      <StyledForm>
        <StyledTitle style={{ color: primaryColor }}>Reset Password</StyledTitle>
        <Input
          label="New Password"
          value={newPassword}
          onChange={setNewPassword}
          secureTextEntry
        />
        <Input
          label="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          secureTextEntry
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

export default ResetPasswordForm;