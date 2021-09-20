import React, { FC } from "react";
import { Layout } from "antd";
import TodoList from "../components/TodoList";

const Event: FC = () => {
  return (
    <Layout style={{ display: "block" }}>
      <TodoList />
    </Layout>
  );
};

export default Event;
