import { Input, Form } from "antd";
import { IdSelect } from "components/id-select";
import React from "react";
import { Project } from "./list";

export interface User {
  id: number;
  name: string;
  token: string;
}

interface SearchPanelProps {
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
  users: User[];
}

export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder={"项目名"}
          value={param.name}
          onChange={(value) => setParam({ ...param, name: value.target.value })}
        ></Input>
      </Form.Item>
      <Form.Item>
        <IdSelect
          value={users.length ? param.personId : undefined}
          defaultOptionName={"负责人"}
          options={users}
          onChange={(value) => setParam({ ...param, personId: value })}
        ></IdSelect>
      </Form.Item>
    </Form>
  );
};
