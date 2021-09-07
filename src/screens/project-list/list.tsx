import React from "react";
import { User } from "./search-panal";
import { Table } from "antd";
import { ColumnsType, TableProps } from "antd/lib/table";
import dayjs from "dayjs";

export interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  const columns: ColumnsType<Project> = [
    {
      title: "名称",
      dataIndex: "name",
      sorter(a, b) {
        return a.name.localeCompare(b.name);
      },
    },
    { title: "部门", dataIndex: "organization" },
    {
      title: "创建时间",
      render(value, project) {
        return (
          <span>
            {project.created
              ? dayjs(project.created).format("YYYY-MM-DD")
              : "无"}
          </span>
        );
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
  return <Table pagination={false} columns={columns} rowKey={column => column.id} {...props} ></Table>;
};
