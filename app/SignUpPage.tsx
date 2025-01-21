import React from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';
import styled from 'styled-components/native';
import SignUpForm from '@/components/SignUpForm';

const SignUpPage: React.FC = () => {

  return (
    <StyledWrapper>
      <SignUpForm />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.View`
  flex: 1;
  justify-content: center;
`;

export default SignUpPage;