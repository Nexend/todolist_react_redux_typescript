import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Row, Menu } from "antd";
import { RouteNames } from "../router";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

const Navbar: FC = () => {
  const router = useHistory();
  const { isAuth, user } = useTypedSelector((state) => state.auth);
  const { logout } = useActions();

  return (
    <Layout.Header>
      <Row justify="end" align="middle" style={{ height: "64px" }}>
        {isAuth ? (
          <>
            <div style={{ color: "white" }}>{user.name}</div>
            <Menu theme="dark" mode="horizontal" selectable={false}>
              <Menu.Item key={1} onClick={() => logout()}>
                Выйти
              </Menu.Item>
            </Menu>
          </>
        ) : (
          <Menu theme="dark" mode="vertical" selectable={false}>
            <Menu.Item key={1} onClick={() => router.push(RouteNames.LOGIN)}>
              Войти
            </Menu.Item>
          </Menu>
        )}
      </Row>
    </Layout.Header>
  );
};

export default Navbar;
