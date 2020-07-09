import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { navigate } from "@reach/router";
import { Typography, Button } from "antd";
import { UserContext } from "../../providers/UserProvider";
import { auth, googleProvider } from "../../firebase";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Login(props) {
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user ) navigate("/app", { replace: true });
  });

  return (
    <Wrapper>
      <Typography.Title>writes.</Typography.Title>
      <Button onClick={() => auth.signInWithPopup(googleProvider)}>Zaloguj się z Google</Button>
    </Wrapper>
  );
}
