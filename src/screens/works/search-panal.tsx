import React, { useContext } from "react";
import { Tabs } from "antd";
import { List } from "./list";
import { useWorksSearchParams } from "./utils";
import { IdSelect } from "components/id-select";
import { useTaskTypes } from "utils/task-type";
import { WorkListContext } from ".";
import { useSetUrlParams } from "utils/url";

export const SearchPanel = () => {
  const { typeId, status } = useWorksSearchParams();
  const setParam = useSetUrlParams();
  const { data: taskTypes } = useTaskTypes();
  const handleChange = (activeKey: string) => {
    setParam({ typeId: activeKey });
  };

  const { taskStatus: statusList } = useContext(WorkListContext);
  const OperationsSlot = {
    right: (
      <IdSelect
        options={statusList}
        value={status}
        placeholder={"状态"}
        defaultOptionName={"全部"}
        onChange={(value) => {
          setParam({ status: value });
        }}
        style={{ width: "100px" }}
      ></IdSelect>
    ),
  };
  return (
    <Tabs
      type="card"
      activeKey={typeId ? String(typeId) : String(taskTypes?.[0].id)}
      defaultValue={taskTypes?.[0].id}
      onChange={handleChange}
      tabBarExtraContent={OperationsSlot}
    >
      {taskTypes?.map((type) => (
        <Tabs.TabPane tab={type.name} key={type.id}>
          <List
            taskTypes={taskTypes}
          ></List>
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
};
