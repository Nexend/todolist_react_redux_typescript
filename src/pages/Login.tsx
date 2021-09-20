import React, { FC } from "react";
import { Alert, Card, Layout, Row } from "antd";
import LoginForm from "../components/LoginForm";
import { useTypedSelector } from "../hooks/useTypedSelector";

const Login: FC = () => {
  const { isSuccess } = useTypedSelector((state) => state.auth);
  return (
    <Layout>
      {isSuccess && (
        <Alert
          message="Success"
          description={"Вы успешно зарегестрировались"}
          type="success"
          showIcon
          style={{ position: "absolute", left: "0", right: "0", top: "64px" }}
        />
      )}
      <Row justify="center" align="middle" className="h100">
        <Card>
          <LoginForm />
        </Card>
      </Row>
    </Layout>
  );
};

export default Login;
