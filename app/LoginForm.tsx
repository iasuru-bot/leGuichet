import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '@/components/input';
import Button from '@/components/button'; // Import the Button component
import { useThemeColor } from '@/hooks/useThemeColor';
import { HomeScreenNavigationProp } from '@/types/navigation';
import { useSession } from './SessionContext';
import CustomBackButton from '@/components/customBackButton';

const LoginForm = () => {
  const { setUserInfo } = useSession();
  const primaryColor = useThemeColor({}, 'primary');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const onClick = () => {
    navigation.navigate('SignUp');
  };

  const handleSubmit = async () => {
    let isValid = true;

    if (!email.includes('@')) {
      setEmailError('Invalid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!isValid) {
      return;
    }

    try {
      const response = await fetch('https://your-backend-url.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const { token, user } = data;

      // Stocker le token dans AsyncStorage
      await AsyncStorage.setItem('userToken', token);

      // Mettre à jour les informations de l'utilisateur dans le contexte
      setUserInfo(user);

      // Rediriger vers la page d'accueil
      navigation.navigate('Home');
    } catch (error) {
      setLoginError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <StyledWrapper style={{ backgroundColor }}>
      <CustomBackButton />
      <StyledForm>
        <StyledTitle style={{ color: primaryColor }}>Sign In</StyledTitle>
        <Input
          label="Email"
          value={email}
          onChange={setEmail}
          error={emailError}
          keyboardType="email-address"
        />
        <Input
          label="Password"
          value={password}
          onChange={setPassword}
          error={passwordError}
          secureTextEntry
        />
        {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
        <Button title="Submit" onPress={handleSubmit} variant="secondary" />
        <StyledFooter style={{ color: textColor }}>
          Don't have an account? <StyledLink onPress={onClick} style={{ color: primaryColor }}>Register</StyledLink>
        </StyledFooter>
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

const StyledFooter = styled.Text`
  text-align: center;
  margin-top: 15px;
`;

const StyledLink = styled.Text`
  text-decoration: underline;
`;

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginForm;