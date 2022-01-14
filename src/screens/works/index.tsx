import styled from "@emotion/styled";
import { Button, Card, Col, Progress, Row, Spin } from "antd";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { TaskModal } from "screens/kanban/task-modal";
import { Project } from "types/project";
import { Task } from "types/task";
import { User } from "types/User";
import { useHttp } from "utils/http";
import { useProjects, useProjectTypes } from "utils/project";
import { useUser } from "utils/user";
import { useWorkQueryKey } from "./utils";
import { WorkList } from "./work-list";

export const WorkListContext = React.createContext<{
  users: User[];
  projectTypes: { name: string; id: number }[];
  taskStatus:{name:string,id:number}[]
}>({ users: [], projectTypes: [], taskStatus:[] });
export const WorkListScreen = () => {
  const { data: users } = useUser();
  const { data: projectTypes } = useProjectTypes();

  return (
    <Container>
      <WorkListContext.Provider
        value={{
          users: users ? users : [],
          projectTypes: projectTypes ? projectTypes : [],
          taskStatus:[{name:'新建',id:1},{name:'进行中',id:2},{name:'完成',id:3}]
        }}
      >
        <Top>
          <ProjectItems />
        </Top>
        <Body>
          <WorkList></WorkList>
        </Body>
      </WorkListContext.Provider>
    </Container>
  );
};

export const ProjectItems = () => {
  const { isLoading, data } = useProjects();
  const list = data ? data.slice(0, 3) : [];
  const navigate = useNavigate();
  const handleNav = (route: string) => {
    navigate(route);
  };
  if (isLoading) return <Spin size={"large"}></Spin>;
  return (
    <Row gutter={16}>
      {list.map((project) => {
        return (
          <Col span={7} key={project.id}>
            <ProjectItem
              project={project}
              onClick={() => {
                handleNav(`/projects/${project.id}`);
              }}
            ></ProjectItem>
          </Col>
        );
      })}
      <Col span={3}>
        <Card
          hoverable={true}
          bodyStyle={{ paddingLeft: 0, paddingRight: 0, textAlign: "center" }}
          onClick={() => {
            handleNav("/projects");
          }}
        >
          ...
        </Card>
      </Col>
    </Row>
  );
};

const ProjectItem = ({
  project,
  ...props
}: {
  project: Project;
  onClick: () => void;
}) => {
  const { projectTypes } = useContext(WorkListContext);
  return (
    <Card hoverable={true} bodyStyle={{ padding: "0" }} {...props}>
      <ProjectItemContent>
        <Progress
          type="circle"
          style={{ height: "100%", margin: "1rem" }}
          width={46}
          showInfo={false}
          strokeWidth={12}
        ></Progress>
        <div className="project-content">
          <div>{project.name}</div>
          <div>
            {projectTypes.find((item) => item.id === project.type)?.name}
          </div>
        </div>
        <div className="project-detail">
          <span>0</span>
          <div>我的待办</div>
        </div>
      </ProjectItemContent>
    </Card>
  );
};

const Container = styled.div`
  padding: 3.2rem;
  height: 100%;
  background-color: #f0f2f5;
`;
const Top = styled.div`
  width: 100%;
  margin-bottom: 2.4rem;
`;
const Body = styled.div`
  width: 100%;
  border: 1px solid #dcdfe6;
  -webkit-box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
`;
const ProjectItemContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .project-content {
    flex-basis: 100%;
    & div:first-of-type {
      font-size: 1.4rem;
      margin-bottom: 1rem;
    }
    & div:last-of-type {
      font-size: 1.2rem;
      color: #909399;
    }
  }
  & > .project-detail {
    width: 8rem;
    height: 100%;
    text-align: center;
    border-left: 1px solid #dcdfe6;
    flex-shrink: 0;
    span {
      font-size: 3.6rem;
      color: #303133;
    }
    div {
      line-height: 18px;
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      color: #909399;
    }
  }
`;
