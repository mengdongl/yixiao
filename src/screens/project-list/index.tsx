import React, { useState, useEffect } from "react";
import { SearchPanel } from "./search-panal";
import { List } from "./list";
import * as qs from "qs";
import { cleanObject, useMount, useDebounce } from "utils/index";
const baseUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  const debouncedValue = useDebounce(param, 500);
  useMount(() => {
    fetch(`${baseUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  useEffect(() => {
    fetch(`${baseUrl}/projects?${qs.stringify(cleanObject(debouncedValue))}`).then(
      async (response) => {
        if (response.ok) {
          setList(await response.json());
        }
      }
    );
  }, [debouncedValue]);
  return (
    <div>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users}
      ></SearchPanel>
      <List list={list} users={users}></List>
    </div>
  );
};
