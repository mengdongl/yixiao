import React from "react";
import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from '.'
import { useAsync } from "utils/use-async";

export const RegisterScreen = ({onError}: {onError: (error: Error|null)=>void;}) => {
  const { register } = useAuth();
  const {run,isLoading} = useAsync(undefined,{isThrowError:true})
  const handleSubmit = async (values:{username: string; password: string; passwordc:string}) => {
    try {
      if(values.passwordc!==values.password){
        throw new Error('输入确认密码不一致')
      }
      await run(register(values))
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
        <Input type="text" placeholder={"用户名"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type={"password"} placeholder={'密码'} autoComplete={'true'}/>
      </Form.Item>
      <Form.Item
        name={"passwordc"}
        rules={[{ required: true, message: "请输入确认密码" }]}
      >
        <Input type={"password"} placeholder={'确认密码'} autoComplete={'true'}/>
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
