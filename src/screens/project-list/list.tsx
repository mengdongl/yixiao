import React from "react";
import { User } from "./search-panal";
import { Button, Dropdown, Table, Menu } from "antd";
import { ColumnsType, TableProps } from "antd/lib/table";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useProjectModal, useProjectsQueryKey } from "./utils";
import { useDeleteProject } from "utils/project";

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
      sorter(a, b) {
        return a.name.localeCompare(b.name);
      },
      render(value, project) {
        return <Link to={String(project.id)}>{project.name}</Link>;
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
    {
      render(value, project) {
        return <More project={project} />;
      },
    },
  ];
  return (
    <Table
      pagination={false}
      columns={columns}
      rowKey={(column) => column.id}
      {...props}
    ></Table>
  );
};

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());
  const editProject = (id: number) => () => {
    startEdit(id);
  };
  const confirmDeleteProject = (id: number) => () => {
    deleteProject({ id });
  };
  const overlay = (
    <Menu>
      <Menu.Item onClick={editProject(project.id)} key={"edit"}>
        编辑
      </Menu.Item>
      <Menu.Item
        onClick={confirmDeleteProject(project.id)}
        key={"delete"}
      >
        删除
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <Button type={"link"}>...</Button>
    </Dropdown>
  );
};
