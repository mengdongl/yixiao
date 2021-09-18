import { Button, Input } from "antd";
import { Row } from "components/lib";
import { TaskTypeSelect } from "components/task-type-select";
import { UserSelect } from "components/user-select";
import React from "react";
import { useSetUrlParams, useUrlParams } from "utils/url";
import { useTaskSearchParams } from "./utils";

export const SearchPanel = () => {
  const param = useTaskSearchParams();
  const [{name:taskName}] = useUrlParams(['name'])
  const setUrlParam = useSetUrlParams();
  const reset = () => {
    setUrlParam({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };
  return (
    <Row marginBottom={4} marginRight={true}>
      <Input
        style={{ width: "20rem" }}
        placeholder={"任务名"}
        value={taskName}
        onChange={evt => setUrlParam({name:evt.target.value})}
      />
      <UserSelect
        defaultOptionName={"经办人"}
        value={param.processorId}
        onChange={value => setUrlParam({processorId:value})}
      />
      <TaskTypeSelect
        defaultOptionName={"类型"}
        value={param.typeId}
        onChange={value => setUrlParam({typeId:value})}
      />
      <Button onClick={reset}>清空</Button>
    </Row>
  );
};
