import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import styled from "@emotion/styled";
import { Row } from 'components/lib'

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header marginBottom={3}>
        <HeaderLeft marginRight={true} marginBottom={false}>
            <h3>logo</h3>
            <h3>项目</h3>
            <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={() => logout()}>登出</button>
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
  grid-template-rows: 9rem 1fr 6rem;
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
  flex-direction: row;
  justify-content: space-between;
`;
const HeaderLeft = styled(Row)`
`;
const HeaderRight = styled.div``;
const Main = styled.main`
  grid-area: main;
`;
