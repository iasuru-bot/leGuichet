import React, { useState } from 'react';
import styled from 'styled-components/native';
import Input from '@/components/input';
import CustomBackButton from '@/components/customBackButton';
import SearchBar from '@/components/searchBar';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = () => {
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

    if (isValid) {
      console.log('Form submitted:', { email, password });
    }
  };

  return (
    <StyledWrapper>
      <CustomBackButton/>
      <StyledForm>
        <StyledTitle>Login</StyledTitle>
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
        <StyledButton onPress={handleSubmit}>
          <StyledButtonText>Submit</StyledButtonText>
        </StyledButton>
        <StyledFooter>
          Don't have an account? <StyledLink>Register</StyledLink>
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
  background-color: #1a1a1a;
  border: 1px solid #333;
`;

const StyledTitle = styled.Text`
  font-size: 28px;
  font-weight: 600;
  color: #00bfff;
  margin-bottom: 30px;
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

export default LoginForm;
