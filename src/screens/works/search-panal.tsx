import React from "react";
import { Tabs } from "antd";
import { List } from "./list";
import styled from "@emotion/styled";
import { useWorksSearchParams } from "./utils";

export const SearchPanel = () => {
  const [{ taskType}, setParam] = useWorksSearchParams();
  const handleChange = (activeKey: string) => {
    setParam({ taskType: activeKey});
  };
  return (
    <Tabs type="card" activeKey={taskType} onChange={handleChange}>
      <Tabs.TabPane tab={`bug  0`} key="bug">
        <List></List>
      </Tabs.TabPane>
      <Tabs.TabPane tab={`任务  80`} key="task">
        <List></List>
      </Tabs.TabPane>
      <Tabs.TabPane tab={`需求  0`} key="rp">
        <List></List>
      </Tabs.TabPane>
    </Tabs>
  );
};
