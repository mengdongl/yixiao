import React from "react";
import { User } from "../../types/User";
import { Button, Dropdown, Table, Menu, Tag, Progress } from "antd";
import { ColumnsType, TableProps } from "antd/lib/table";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useProjectModal, useProjectsQueryKey } from "./utils";
import { useDeleteProject, useProjectTypes } from "utils/project";
import { Project } from "types/project";
import styled from "@emotion/styled";

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  const {data:types} = useProjectTypes()
  const columns: ColumnsType<Project> = [
    {
      width: 80,
      render(value, project) {
        return <Tag color={"green"}>{types?.find(item => item.id === project.type)?.name}</Tag>;
      },
    },
    {
      title: "名称",
      sorter(a, b) {
        return a.name.localeCompare(b.name);
      },
      render(value, project) {
        return (
          <ProjectNameColumn>
            <Link to={String(project.id)} style={{ color: "#606266" }}>
              {project.name}
            </Link>
            <span>
              项目负责人：
              {users.find((user) => user.id === project.personId)?.name ||
                "未知"}
            </span>
          </ProjectNameColumn>
        );
      },
    },
    {
      width: 250,
      render(value, project) {
        return (
          <div>
            <span style={{color:'rgb(96, 98, 102)',fontSize:'1.2rem'}}>已完成1134条 / 共1134条</span>
            <Progress percent={90} showInfo={false}></Progress>
          </div>
        );
      },
    },
    {
      width: 150,
      title: "部门",
      dataIndex: "organization",
    },
    {
      width: 170,
      title: "创建时间",
      render(value, project) {
        return (
          <span>
            {project.created
              ? dayjs(project.created).format("YYYY-MM-DD hh:mm")
              : "无"}
          </span>
        );
      },
    },
    {
      width: 100,
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
      showHeader={false}
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
      <Menu.Item onClick={editProject(project.id)} key={"top"}>
        置顶
      </Menu.Item>
      <Menu.Item onClick={editProject(project.id)} key={"edit"}>
        编辑
      </Menu.Item>
      <Menu.Item onClick={confirmDeleteProject(project.id)} key={"delete"}>
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

const ProjectNameColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & > span {
    margin-top: 1rem;
    color: #909399;
    font-size: 1.2rem;
  }
`;
