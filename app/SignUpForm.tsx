import React, { useState } from 'react';
import styled from 'styled-components/native';
import { View, Text, TouchableOpacity } from 'react-native';
import Input from '@/components/input';
import CustomBackButton from '@/components/customBackButton';

const Form = () => {
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

  const handleSubmit = () => {
    if (validateForm()) {
      // Proceed with form submission
      console.log('Form submitted:', { firstName, lastName, email, password });
    }
  };

  return (
    <StyledWrapper>
      <CustomBackButton/>
      <StyledForm>
        <StyledTitle>Register</StyledTitle>
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

        <StyledButton>
          <StyledButtonText onPress={handleSubmit}>Submit</StyledButtonText>
        </StyledButton>
        <StyledFooter>
          Already have an account? <StyledLink>Signin</StyledLink>
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
  color: #00bfff;
  margin-bottom: 30px;
`;

const StyledMessage = styled.Text`
  font-size: 14.5px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: #00bfff;
  padding: 10px;
  border-radius: 10px;
  align-items: center;
  margin-top: 20px;
`;

const StyledButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const StyledFooter = styled.Text`
  text-align: center;
  margin-top: 15px;
  color: rgba(255, 255, 255, 0.7);
`;

const StyledLink = styled.Text`
  color: #00bfff;
  text-decoration: underline;
`;

export default Form;
