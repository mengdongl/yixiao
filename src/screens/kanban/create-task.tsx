import { Card, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useAddTask } from "utils/task";
import { useProjectIdInUrl, useTaskQueryKey } from "./utils";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const [inputMode, setInputMode] = useState(false);
  const { mutate: addTask } = useAddTask(useTaskQueryKey());
  const projectId = useProjectIdInUrl();
  const toggle = () => {
    setInputMode((state) => !state);
  };
  const submit = () => {
    addTask({ name, projectId, kanbanId });
    setInputMode(false);
    setName("");
  };
  useEffect(() => {
    setName("");
  }, [inputMode]);
  if (!inputMode) return <div onClick={toggle}>+创建事务</div>;
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
