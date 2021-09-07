import React from "react";
import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from ".";
import { useAsync } from "utils/use-async";

export const LoginScreen = ({onError}: {onError: (error: Error|null)=>void;}) => {
  const { login } = useAuth();
  const {run,isLoading} = useAsync(undefined,{isThrowError:true})
  const handleSubmit = async (values:{username: string, password: string}) => {
    try {
    await run(login(values))
    } catch (error) {
      onError(error as Error)
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type={'password'} placeholder={"密码"} autoComplete={'true'}/>
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
