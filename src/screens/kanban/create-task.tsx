import { Card, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Task } from "types/task";
import { useAddTask } from "utils/task";
import { useProjectInUrl, useTaskQueryKey } from "./utils";

export const CreateTask = ({ kanbanId,handleRefresh }: { kanbanId: number, handleRefresh: ()=>void }) => {
  const [name, setName] = useState("");
  const [inputMode, setInputMode] = useState(false);
  const { mutate: addTask } = useAddTask(useTaskQueryKey());
  const {data:currentProject} = useProjectInUrl()
  const toggle = () => {
    setInputMode((state) => !state);
  };
  const submit = async () => {
    await addTask({ name, projectId:currentProject?.id, kanbanId , status:1 , projectName:currentProject?.name});
    handleRefresh()
    setInputMode(false);
    setName("");
  };
  useEffect(() => {
    setName("");
  }, [inputMode]);
  if (!inputMode) return <div onClick={toggle}>+创建任务</div>;
  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder={"需要做些什么"}
        autoFocus={true}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      ></Input>
    </Card>
  );
};
