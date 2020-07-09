import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../../providers/UserProvider';
import { auth } from '../../firebaseInit';

const StyledWrapper = styled.div`
  text-align: center;
`;

const StyledButton = styled.button`
  border: none;
  background: none;
  font-size: 1.1em;
  text-decoration: underline;
  cursor: pointer;
`;

export default function Main() {
  const { user } = useContext(UserContext);

  return (
    <StyledWrapper>
      <h1>Hi {user.displayName}!</h1>
      <StyledButton onClick={() => auth.signOut()}>Sign Out</StyledButton>
    </StyledWrapper>
  )
};