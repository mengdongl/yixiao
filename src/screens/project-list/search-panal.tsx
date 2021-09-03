import { Input, Select, Form } from "antd";
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
    <Form style={{marginBottom:'2rem'}} layout={'inline'}>
      <Form.Item>
        <Input
          placeholder={'项目名'}
          value={param.name}
          onChange={(value) => setParam({ ...param, name: value.target.value })}
        ></Input>
      </Form.Item>
      <Form.Item>
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
      </Form.Item>
    </Form>
  );
};
