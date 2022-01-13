import { Modal, Form, Input, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { EpicSelect } from "components/epic-select";
import { ErrorBox } from "components/lib";
import { TaskTypeSelect } from "components/task-type-select";
import { UserSelect } from "components/user-select";
import React, { useEffect, useMemo } from "react";
import { useWorkQueryKey } from "screens/works/utils";
import { useEditTask } from "utils/task";
import { useProjectIdInUrl, useTaskModal, useTaskQueryKey } from "./utils";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
export const TaskModal = () => {
  const { editingTaskId, error, editingTask, isLoading, close } = useTaskModal();
  const taskQueryKey = useTaskQueryKey()
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(taskQueryKey);
  const [form] = useForm();

  const onCancel = () => {
    close();
    form.resetFields();
  };
  const onOk = async () => {
    await editTask({
      ...editingTask,
      ...form.getFieldsValue(),
      status: editingTask?.status ? editingTask?.status : 1,
    });

    close();
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);
  return (
    <Modal
      forceRender={true}
      visible={!!editingTaskId}
      onCancel={onCancel}
      onOk={onOk}
      okText={"确认"}
      cancelText={"取消"}
      confirmLoading={editLoading}
      title={"编辑任务"}
    >
      <ErrorBox error={error as Error}></ErrorBox>
      {isLoading ? (
        <Spin size={"large"}></Spin>
      ) : (
        <Form {...layout} form={form} initialValues={editingTask}>
          <Form.Item
            label={"任务名"}
            name={"name"}
            rules={[{ required: true, message: "请输入任务名" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={"任务组"} name={"epicId"}>
            <EpicSelect defaultOptionName={"任务组"} />
          </Form.Item>
          <Form.Item label={"经办人"} name={"processorId"}>
            <UserSelect defaultOptionName={"经办人"} />
          </Form.Item>
          <Form.Item label={"类型"} name={"typeId"}>
            <TaskTypeSelect />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};
