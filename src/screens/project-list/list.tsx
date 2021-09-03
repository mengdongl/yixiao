import React from "react";
import { User } from "./search-panal";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";

interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
}

interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: ListProps) => {
  const columns: ColumnsType<Project> = [
    {
      title: "名称",
      dataIndex: "name",
      sorter(a, b) {
        return a.name.localeCompare(b.name);
      },
    },
    {
      title: "负责人",
      render(value, project) {
        return (
          <span>
            {users.find((user) => user.id === project.personId)?.name || "未知"}
          </span>
        );
      },
    },
  ];
  return <Table pagination={false} columns={columns} dataSource={list}></Table>;
};
