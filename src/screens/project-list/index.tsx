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
  const [param,setParam] = useProjectsSearchParams()
  const {open} = useProjectModal()
  const [users, setUsers] = useState([]);

  const client = useHttp()
  const {isLoading,data:list} = useProjects(useDebounce(param, 200))
  // const {run,isLoading,data:list} = useAsync<Project[]>()
  useMount(() => {
    client('/users').then(setUsers)
  });
  
  return (
    <Container>
      <Row between={true} marginBottom={4}>
      <h1>项目列表</h1>
      <Button onClick={() => open()}>创建项目</Button>
      </Row>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users}
      ></SearchPanel>
      <List loading={isLoading} dataSource={list || []} users={users}></List>
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
padding: 3.2rem;
`
