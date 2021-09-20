import React, { FC, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { rules } from "../utils/rules";
import { useActions } from "../hooks/useActions";
import { IUser } from "../models/IUser";
import { useTypedSelector } from "../hooks/useTypedSelector";

const RegistrationForm: FC = () => {
  const { isSuccess, isLoading } = useTypedSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { registration } = useActions();

  const onSubmit = () => {
    const data: IUser = {
      email,
      password,
      name: username,
    };
    registration(data);
  };
  return (
    <>
      {isSuccess && <Redirect to="/login" />}
      <Form onFinish={onSubmit}>
        <Form.Item
          label="Email"
          name="email"
          rules={[rules.required("Пожалуйста введите email!")]}
        >
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Form.Item>
        <Form.Item
          label="Имя пользователя"
          name="username"
          rules={[rules.required("Пожалуйста введите имя пользователя!")]}
        >
          <Input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          rules={[rules.required("Пожалуйста введите пароль!")]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Отправить
          </Button>
          <Link to="/login">
            <Button type="link" style={{ float: "right" }}>
              Уже есть аккаунт?
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default RegistrationForm;
