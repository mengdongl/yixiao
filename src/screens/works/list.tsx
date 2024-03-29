import { Table, Tag } from "antd";
import { TagOutlined } from "@ant-design/icons";
import { useAuth } from "context/auth-context";
import React, { useContext } from "react";
import { useTasks } from "utils/task";
import { ColumnsType } from "antd/lib/table";
import { Task } from "types/task";
import { TaskType } from "types/task-type";
import { WorkListContext } from ".";
import { useTaskModal, useTaskSearchParams } from "screens/kanban/utils";

export const List = ({
  taskTypes,
  ...props
}: {
  taskTypes: TaskType[];
}) => {
  const { user } = useAuth();
//   const param = useWorksSearchParams()
//   const paramMemo = useMemo(() => ({
//     typeId: param.typeId ? param.typeId :taskTypes?.[0].id,
//     taskFrom:param.taskFrom,
//     status:param.status,
//   }),[param])
  const taskSearchParams = useTaskSearchParams()
  taskSearchParams.typeId = taskSearchParams.typeId ? taskSearchParams.typeId :taskTypes?.[0].id
  const { data: tasks, isLoading } = useTasks(taskSearchParams);
  const { taskStatus: statusList } = useContext(WorkListContext);
  const { startEdit } = useTaskModal();
  const columns: ColumnsType<Task> = [
    {
      width: 40,
      render: (value, task) => (
        <Tag color={"blue"} icon={<TagOutlined />}>
          {taskTypes.find((type) => type.id === task.typeId)?.name}
        </Tag>
      ),
    },
    {
      width: 100,
      render: (value, task) => (
        <div
          style={{ textAlign: "center", fontSize: "1.4rem", color: "#606266" }}
        >
          {statusList.find((status) => status.id === task.status)?.name}
        </div>
      ),
    },
    {
      dataIndex: "name",
      render: (value, task) => (
        <div
          style={{ fontSize: "1.6rem", color: "#606266" }}
          onClick={() => startEdit(task.id)}
        >
          {value}
        </div>
      ),
    },
    { width: 80, render: () => <span>{user?.name}</span> },
    { width: 80, render: (value, task) => <Tag>{task.projectName}</Tag> },
    { width: 150, render: (value, task) => <span>{task.note}</span> },
  ];
  return (
    <Table
      {...props}
      dataSource={tasks || []}
      columns={columns}
      rowKey={(column) => column.id}
      showHeader={false}
      loading={isLoading}
    ></Table>
  );
};
