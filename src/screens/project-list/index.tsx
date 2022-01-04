import React, { useState } from "react";
import { SearchPanel } from "./search-panal";
import { List } from "./list";
import { useMount, useDebounce } from "utils/index";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { Button } from "antd";
import { useProjects } from "utils/project";
import { useProjectModal, useProjectsSearchParams } from "./utils";

export const ProjectListScreen = () => {
  const [param, setParam] = useProjectsSearchParams();
  const { open } = useProjectModal();
  const [users, setUsers] = useState([]);

  const client = useHttp();
  const { isLoading, data: list } = useProjects(useDebounce(param, 200));
  // const {run,isLoading,data:list} = useAsync<Project[]>()
  useMount(() => {
    client("/users").then(setUsers);
    client("https://my-json-server.typicode.com/mengdongl/yixiao/users").then(
      (res) => {
        console.log(res);
        client("https://my-json-server.typicode.com/mengdongl/yixiao/users", {
          method: "POST",
          data: { name: "阿湘" },
        });
      }
    );
  });

  return (
    <Container>
      <TableContainer>
        <TableHeader>
          <Row between={true} >
            <h1>项目列表</h1>
            <SearchPanel
              param={param}
              setParam={setParam}
              users={users}
            ></SearchPanel>
            <Button onClick={() => open()}>创建项目</Button>
          </Row>
        </TableHeader>
        <List loading={isLoading} dataSource={list || []} users={users}></List>
      </TableContainer>
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
  background-color: #f0f2f5;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const TableContainer = styled.div`
  width: 70%;
  background-color: white;
`;

const TableHeader = styled.div`
  padding: 1.2rem;
  background-color: #f5f7fa;
`;
