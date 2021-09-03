import React, { useState, useEffect } from "react";
import { SearchPanel } from "./search-panal";
import { List } from "./list";
import { cleanObject, useMount, useDebounce } from "utils/index";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  const client = useHttp()

  const debouncedValue = useDebounce(param, 500);
  useMount(() => {
    client('/users').then(setUsers)
  });

  useEffect(() => {
    client('/projects',{data:cleanObject(debouncedValue)}).then(setList)
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
      <List list={list} users={users}></List>
    </Container>
  );
};

const Container = styled.div`
padding: 3.2rem;
`
