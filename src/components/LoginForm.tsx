import React, { FC, useState } from "react";
import { Button, Form, Input } from "antd";
import { rules } from "../utils/rules";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { Link } from "react-router-dom";

const LoginForm: FC = () => {
  const { error, isLoading } = useTypedSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useActions();

  const onSubmit = () => {
    login(email, password);
  };

  return (
    <Form onFinish={onSubmit}>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Form.Item
        label="Email"
        name="email"
        rules={[rules.required("Пожалуйста введите email")]}
      >
        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Введите email"
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
          placeholder="Введите пароль"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Войти
        </Button>
        <Link to="/registration">
          <Button type="default" style={{ float: "right" }}>
            Регистрация
          </Button>
        </Link>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
