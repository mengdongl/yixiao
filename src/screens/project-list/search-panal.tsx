import { Input, Select } from "antd";
import Form from "antd/lib/form/Form";
import React from "react";

export interface User {
  id: number;
  name: string;
  token: string;
}

interface SearchPanelProps {
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
  users: User[];
}

export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    <Form>
      <Input
        value={param.name}
        onChange={(value) => setParam({ ...param, name: value.target.value })}
      ></Input>
      <Select
        value={param.personId}
        onChange={(value) => setParam({ ...param, personId: value })}
      >
        <Select.Option value={""}>{"负责人"}</Select.Option>
        {users.map((user) => (
          <Select.Option key={user.id} value={user.id}>
            {user.name}
          </Select.Option>
        ))}
      </Select>
    </Form>
  );
};
