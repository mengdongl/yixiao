import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import styled from "@emotion/styled";
import { Row } from "components/lib";
// import { ReactComponent as SoftWareLogo } from "assets/software-logo.svg";
import { Dropdown, Menu, Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { ProjectScreen } from "screens/project/index";
import { ProjectModal } from "screens/project-list/project-modal";

export const AuthenticatedApp = () => {
  return (
    <Container>
      <Router>
        <PageHeader></PageHeader>
        <Main>
          <Routes>
            <Route path={"/projects"} element={<ProjectListScreen />}></Route>
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            ></Route>
            <Navigate to={"/projects"}></Navigate>
          </Routes>
        </Main>
        <ProjectModal />
      </Router>
    </Container>
  );
};

type NavMenuProps = React.ComponentProps<typeof Menu>;

const PageHeader = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const handleNav: NavMenuProps["onClick"] = ({ key, keyPath, domEvent }) => {
    navigate("/" + key);
  };
  return (
    <Header>
      <HeaderLeft marginRight={true} marginBottom={false}>
        <SoftWareLogo>
          <Icon src="/logo-simple.png" />
          <Title>亿效</Title>
        </SoftWareLogo>
        <NavMenu mode="horizontal" onClick={handleNav}>
          <Menu.Item key="projects" style={{ fontSize: "1.4rem" }}>
            项目
          </Menu.Item>
          <Menu.Item key="user" style={{ fontSize: "1.4rem" }}>
            用户
          </Menu.Item>
        </NavMenu>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={"logout"}>
                <Button type={"link"} onClick={() => logout()}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <UserContainer>
            <img src="/tx.png" alt="" />
            <div>Hi, {user?.name}</div>
          </UserContainer>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
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
  height: 100%;
  background-color: #373d41;
  -webkit-box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const SoftWareLogo = styled.div`
  height: 100%;
  line-height: 50px;
  background: #373d41;
  text-align: center;
  overflow: hidden;
  padding: 0 16px;
`;
const Icon = styled.img`
  width: auto;
  height: 28px;
  vertical-align: middle;
  margin-right: 8px;
`;
const Title = styled.div`
  display: inline-block;
  margin: 0;
  color: #fff;
  font-weight: 600;
  line-height: 50px;
  font-size: 16px;
`;
const NavMenu = styled(Menu)`
  height: 50px;
  padding: 0;
  color: rgba(255, 255, 255, 0.65);
  border-bottom-color: transparent;
  background-color: rgb(55, 61, 65);
`;
const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
  cursor: pointer;
  & > img {
    cursor: pointer;
    width: 24px;
    height: 24px;
    border-radius: 999px;
    vertical-align: middle;
    margin-right: 10px;
  }
  & > div {
    font-size: 1.4rem;
    color: hsla(0, 0%, 100%, 0.65);
    vertical-align: middle;
  }
`;
const HeaderRight = styled.div``;
const Main = styled.main`
  grid-area: main;
`;
