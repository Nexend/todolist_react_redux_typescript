import React, { FC } from "react";
import { Alert, Card, Layout, Row } from "antd";
import RegistrationForm from "../components/RegistrationForm";
import { useTypedSelector } from "../hooks/useTypedSelector";

const Registration: FC = () => {
  const { error } = useTypedSelector((state) => state.auth);
  return (
    <Layout>
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          style={{ position: "absolute", left: "0", right: "0", top: "64px" }}
        />
      )}
      <Row justify="center" align="middle" className="h100">
        <Card title="Регистрация">
          <RegistrationForm />
        </Card>
      </Row>
    </Layout>
  );
};

export default Registration;
