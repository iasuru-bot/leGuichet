import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '@/components/Input';
import Button from '@/components/Button'; 
import { useThemeColor } from '@/hooks/useThemeColor';
import { HomeScreenNavigationProp } from '@/types/navigation';
import { useSession } from './SessionContext';
import CustomBackButton from '@/components/CustomBackButton';
import { fetchData } from '@/hooks/fetchData';

import { useLoading } from './LoadingContext';

const LoginForm = () => {
  const {  setUserInfo, setCards , setCategories, setActiveTab} = useSession();
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

      const data = await fetchData('/public/login', 'POST', { email, motDePasse: password });
      const { token, utilisateur } = data;
  
      // Stocker le token dans AsyncStorage
      await AsyncStorage.setItem('token', token);
  
      // Mettre à jour les informations de l'utilisateur dans le contexte
      setUserInfo(utilisateur);
      

      // Recupérer les infos du backend
      const responseAnnonce = await fetchData('/annonce', 'GET',undefined);
      setCards(responseAnnonce);
      const responseCategories = await fetchData('/categorie', 'GET',undefined);
      setCategories(responseCategories);
  
      if (utilisateur.isAdmin) {
        setActiveTab("adminHome")
        navigation.navigate('AdminHome');
      }else{
        // Rediriger vers la page d'accueil
        setActiveTab("Landing")
        navigation.navigate('Landing');
      }
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
        <StyledFooter style={{ color: textColor }}>
          Forgot your password? <StyledLink onPress={() => navigation.navigate('RequestPasswordReset')} style={{ color: primaryColor }}>Reset Password</StyledLink>
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

