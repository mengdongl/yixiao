import React from "react";
import { Tabs, Button } from "antd";
import { SearchPanel } from "./search-panal";
import { useNavigate } from "react-router";
import styled from "@emotion/styled";
import { useWorksSearchParams } from "./utils";
import { useSetUrlParams } from "utils/url";

export const WorkList = () => {
  const navigate = useNavigate();
  const handleNav = (route: string) => {
    navigate(route);
  };
  const {taskFrom} = useWorksSearchParams()
  const setParam  = useSetUrlParams()
  const handleChange = (activeKey:string) =>{
    setParam({taskFrom:activeKey})
  }
  const OperationsSlot = {
    right: (
      <Button
        type="link"
        onClick={() => {
          handleNav("/projects");
        }}
      >
        新增任务
      </Button>
    ),
  };
  return (
    <Container>
      <Tabs type="card" tabBarExtraContent={OperationsSlot} activeKey={taskFrom} onChange={handleChange}>
        <Tabs.TabPane tab="待我处理" key="wait">
          <SearchPanel></SearchPanel>
        </Tabs.TabPane>
        <Tabs.TabPane tab="我的创建" key="mine">
          <SearchPanel></SearchPanel>
        </Tabs.TabPane>
        <Tabs.TabPane tab="抄送给我" key="other">
          <SearchPanel></SearchPanel>
        </Tabs.TabPane>
      </Tabs>
    </Container>
  );
};

const Container = styled.div`
  & p {
    margin: 0;
  }
  & > .ant-tabs-card .ant-tabs-content {
    margin-top: -16px;
  }
  & > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
    padding: 16px;
    background: #fff;
  }
  & > .ant-tabs-card > .ant-tabs-nav::before {
    display: none;
  }
  & > .ant-tabs-card .ant-tabs-tab,
  [data-theme="compact"] & > .ant-tabs-card .ant-tabs-tab {
    background: transparent;
    border-color: transparent;
  }
  & > .ant-tabs-card .ant-tabs-tab-active,
  [data-theme="compact"] & > .ant-tabs-card .ant-tabs-tab-active {
    background: #fff;
    border-color: #fff;
  }

  & > .ant-tabs-card .ant-tabs-tab-btn {
    font-size: 1.4rem;
    font-weight: 400;
  }
`;
