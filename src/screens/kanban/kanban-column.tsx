import styled from "@emotion/styled";
import { Card, Dropdown, Button, Menu, Modal } from "antd";
import { Row } from "components/lib";
import React, { useState } from "react";
import { Kanban } from "types/kanban";
import { Task } from "types/task";
import { useTasks } from "utils/task";
import { useKanbansQueryKey, useTaskModal, useTaskSearchParams } from "./utils";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import { useTaskTypes } from "utils/task-type";
import { useDeleteKanban } from "utils/kanban";
import { CreateTask } from "./create-task";
import { useUrlParams } from "utils/url";
import { Mark } from "components/mark";

export const KanbanColumn = ({ kanban, ...props }: { kanban: Kanban }) => {
  const taskSearchParams = useTaskSearchParams();
  const { data: allTasks, refresh } = useTasks(taskSearchParams);
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id) || [];
  const handleRefresh = () => {
    refresh(taskSearchParams);
  };
  return (
    <Container {...props}>
      <Row between={true}>
        <h3>{kanban.name}</h3>
        <More kanban={kanban}></More>
      </Row>
      <TasksContainer>
        {tasks?.map((task) => (
          <div key={task.id}>
            <TaskCard task={task} key={task.id}></TaskCard>
          </div>
        ))}
        <CreateTask
          kanbanId={kanban.id}
          handleRefresh={handleRefresh}
        ></CreateTask>
      </TasksContainer>
    </Container>
  );
};

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }
  return <img alt={"task-icon"} src={name === "task" ? taskIcon : bugIcon} />;
};

const TaskCard = ({ task }: { task: Task }) => {
  const [{ name: keyword }] = useUrlParams(["name"]);
  const { startEdit } = useTaskModal();
  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
      key={task.id}
    >
      <p>
        <Mark keyword={keyword} name={task.name} />
      </p>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutate } = useDeleteKanban(useKanbansQueryKey());
  const startDelete = () => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除看板吗",
      onOk() {
        return mutate({ id: kanban.id });
      },
    });
  };
  const overlay = (
    <Menu>
      <Menu.Item>
        <Button type={"link"} onClick={startDelete}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <Button type={"link"}>...</Button>
    </Dropdown>
  );
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;
const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
