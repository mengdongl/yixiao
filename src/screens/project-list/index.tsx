import React, { useState, useEffect } from "react";
import { SearchPanel } from "./search-panal";
import { List } from "./list";
import { cleanObject, useMount, useDebounce } from "utils/index";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { useAsync } from "utils/use-async";
import { Project } from './list'

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);

  const client = useHttp()
  const {run,isLoading,data:list} = useAsync<Project[]>()

  const debouncedValue = useDebounce(param, 200);
  useMount(() => {
    client('/users').then(setUsers)
  });

  useEffect(() => {
    run(client('/projects',{data:cleanObject(debouncedValue)}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users}
      ></SearchPanel>
      <List loading={isLoading} dataSource={list || []} users={users}></List>
    </Container>
  );
};

const Container = styled.div`
padding: 3.2rem;
`
