import React, { useState } from 'react';
import styled from 'styled-components/native';
import Input from '@/components/Input';
import CustomBackButton from '@/components/CustomBackButton';
import { useThemeColor } from '@/hooks/useThemeColor';
import { HomeScreenNavigationProp } from '@/types/navigation';
import { useNavigation } from 'expo-router';

import { fetchData } from '@/hooks/fetchData';
import Button from './Button';


const Form = () => {

  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'primary');


  const navigation = useNavigation<HomeScreenNavigationProp>();
  const onClick = () => {
    navigation.navigate('Login');
  };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }

    if (!email.includes('@')) {
      newErrors.email = 'Invalid email';
      isValid = false;
    }

    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const data = await fetchData('/public/register', 'POST', { nom: lastName, prenom: firstName, email, motDePasse: password });
        if (data.status === 'Succès') {
          // Redirect to home page
          navigation.navigate('Login');
        }
        else{
          setErrors(data.errors);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <StyledWrapper>
      <CustomBackButton />
      <StyledForm>
        <StyledTitle style={{ color: primaryColor }} >Register</StyledTitle>
        <Input
          value={firstName}
          onChange={setFirstName}
          label="Firstname"
          error={errors.firstName}
        />
        <Input
          value={lastName}
          onChange={setLastName}
          label="Lastname"
          error={errors.lastName}
        />

        <Input
          value={email}
          onChange={setEmail}
          label="Email"
          keyboardType="email-address"
          error={errors.email}
        />

        <Input
          value={password}
          onChange={setPassword}
          label="Password"
          secureTextEntry
          error={errors.password}
        />
        <Input
          value={confirmPassword}
          onChange={setConfirmPassword}
          label="Confirm Password"
          secureTextEntry
          error={errors.confirmPassword}
        />

        <Button title="Submit" onPress={handleSubmit} variant="primary" />
        <StyledFooter style={{ color: textColor }}>
          Already have an account? <StyledLink style={{ color: primaryColor }} onPress={onClick} >Signin</StyledLink>
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

const StyledMessage = styled.Text`
  font-size: 14.5px;
  margin-bottom: 20px;
`;

const StyledButton = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 10px;
  align-items: center;
  margin-top: 20px;
`;

const StyledButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const StyledFooter = styled.Text`
  text-align: center;
  margin-top: 15px;
`;

const StyledLink = styled.Text`
  text-decoration: underline;
`;

export default Form;
