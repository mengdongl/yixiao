import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import styled from "@emotion/styled";
import { Row } from 'components/lib'
import { ReactComponent as SoftWareLogo } from 'assets/software-logo.svg'
import { Dropdown,Menu,Button } from "antd";

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderLeft marginRight={true} marginBottom={false}>
            <SoftWareLogo width={'18rem'} color={"rgb(38, 132, 255)"}></SoftWareLogo>
            <h3>项目</h3>
            <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
            <Dropdown overlay={<Menu>
                <Menu.Item>
                <Button type={'link'} onClick={() => logout()}>登出</Button>
                </Menu.Item>
            </Menu>}>
            <Button type={'link'}>Hi, {user?.name}</Button>
            </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen></ProjectListScreen>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    "header header header"
    "main main main"
    "footer footer footer";
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  grid-area: header;
  justify-content: space-between;
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)`
`;
const HeaderRight = styled.div``;
const Main = styled.main`
  grid-area: main;
`;
