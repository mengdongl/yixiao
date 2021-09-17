import styled from "@emotion/styled";
import { Drawer, Spin, Form, Input, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { UserSelect } from "components/user-select";
import React, { useEffect } from "react";
import { useAddProject, useEditProject } from "utils/project";
import { Project } from "./list";
import { useProjectModal, useProjectsQueryKey } from "./utils";

export const ProjectModal = () => {
  const {
    projectModalOpen,
    editingProject,
    isLoading,
    close,
  } = useProjectModal();
  const useMutateProject = editingProject ? useEditProject : useAddProject
  const {mutateAsync,isLoading:mutateLoading} = useMutateProject(useProjectsQueryKey())
  const [form] = useForm();
  const title = editingProject ? "编辑项目" : "新增项目";
  const onFinish = (values: Partial<Project>) => {
    mutateAsync({...editingProject,...values}).then(() => {
      onClose()
    })
  }
  const onClose = () =>{
    form.resetFields()
    close();
  }
  useEffect(()=>{
    form.setFieldsValue(editingProject)
  },[editingProject,form])
  return (
    <Drawer
      width={"100%"}
      forceRender={true}
      visible={projectModalOpen}
      onClose={onClose}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={undefined}></ErrorBox>
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入项目名" }]}
              >
                <Input placeholder={"请输入项目名称"} />
              </Form.Item>

              <Form.Item
                label={"部门"}
                name={"organization"}
                rules={[{ required: true, message: "请输入部门名" }]}
              >
                <Input placeholder={"请输入部门名"} />
              </Form.Item>

              <Form.Item label={"负责人"} name={"personId"}>
                <UserSelect defaultOptionName={'负责人'}></UserSelect>
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  type={"primary"}
                  htmlType={"submit"}
                  loading={mutateLoading}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
