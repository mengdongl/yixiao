import { Button, Card, Divider, Typography } from "antd";
import React, { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import styled from "@emotion/styled";
// import logo from "assets/logo.svg";
// import left from "assets/left.svg";
// import right from "assets/right.svg";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  return (
    <Container>
      <Header>
        {/* <Icon src={logo}></Icon> */}
      </Header>
      {/* <Background/> */}
      <MainContainer>
        <Logo src="/text.png"></Logo>
        <ShadowCard>
          <Title>{isRegister ? "请注册" : "统一认证登录"}</Title>
          {error ? (
            <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
          ) : null}
          {isRegister ? (
            <RegisterScreen onError={setError}></RegisterScreen>
          ) : (
            <LoginScreen onError={setError}></LoginScreen>
          )}
          <Divider></Divider>
          <Button type={"link"} onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "已经有帐号了？直接登录" : "没有账号?注册新账号"}
          </Button>
        </ShadowCard>
      </MainContainer>
    </Container>
  );
};

const MainContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  width: 200px;
  height: 100px;
`;

const ShadowCard = styled(Card)`
  width: 30rem;
  min-height: 36rem;
  padding: 3.2rem 2rem;
  margin-left: 20rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
  background: url(/login-box.png) no-repeat;
  background-size: 100% 100%;
  border: none;
`;
export const LongButton = styled(Button)`
  width: 100%;
`;

const Title = styled.h2`
  margin: 3.4rem 0 2.4rem;
  color: rgb(94, 108, 132);
  font-size: 1.5rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 8rem;
`;

// const Icon = styled.img`
//   width: 8rem;
//   margin-left: 2rem;
// `;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: url(/login-bg.png) no-repeat 50%/100% auto;
`;

// const Background = styled.div`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   background-repeat: no-repeat;
//   background-attachment: fixed;
//   background-position: left bottom, right bottom;
//   background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
//     calc(((100vw - 40rem) / 2) - 3.2rem), cover;
//   background-image: url(${left}), url(${right});
// `;
